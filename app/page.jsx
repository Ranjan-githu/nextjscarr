'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [job, setJob] = useState('');
  const [self, setSelf] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [reports, setReports] = useState([]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const me = await fetch('/api/auth/get-me', { credentials: 'include' });
        if (!me.ok) {
          setAuthenticated(false);
          return;
        }
        const userData = await me.json();
        setUsername(userData.user?.username || '');
        setAuthenticated(true);
        const all = await fetch('/api/interview', { credentials: 'include' });
        if (all.ok) {
          const data = await all.json();
          setReports(data.interviewReports || []);
        }
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  async function generate(e) {
    e.preventDefault();
    if (!job.trim()) {
      setError('Please enter a job description.');
      return;
    }
    if (!self.trim()) {
      setError('Please enter a self description.');
      return;
    }
    setGenerating(true);
    setError('');
    try {
      const form = new FormData();
      form.set('jobDescription', job);
      form.set('selfDescription', self);
      if (file) form.set('resume', file);
      const r = await fetch('/api/interview', {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      const d = await r.json();
      if (r.ok) router.push(`/interview/${d.interviewReport._id}`);
      else setError(d.message || 'Failed to generate report');
    } catch {
      setError('Could not connect to the server. Please try again.');
    } finally {
      setGenerating(false);
    }
  }
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.replace('/login');
    router.refresh();
  }

  if (loading)
    return (
      <main className="loading-screen">
        <h1>Loading...</h1>
      </main>
    );
  if (!authenticated)
    return (
      <main className="auth-page">
        <section className="form-container">
          <h1>CarrierGuider AI</h1>
          <p>
            Build interview preparation reports tailored to your resume and
            target job.
          </p>
          <div className="link-container">
            <Link className="button primary-button" href="/login">
              Login
            </Link>
            <Link className="button" href="/register">
              Register
            </Link>
          </div>
        </section>
      </main>
    );
  return (
    <main className="home-page">
      <header className="page-header">
        <div>
          <p>Welcome back</p>
          <h1>
            <span className="highlight">{username}</span>
          </h1>
          <h2>
            Create Your Custom <span className="highlight">Interview Plan</span>
          </h2>
        </div>
        <button className="button" onClick={logout}>
          Logout
        </button>
      </header>
      <form className="form-container wide-form" onSubmit={generate}>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Job Description</label>
          <textarea
            required
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Self Description</label>
          <textarea
            required
            value={self}
            onChange={(e) => setSelf(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Resume PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              setFile(selected);
              setFileName(selected?.name || '');
            }}
          />
          <small>
            {fileName ? `Selected: ${fileName}` : 'No resume selected'}
          </small>
        </div>
        <button className="button primary-button" disabled={generating}>
          {generating ? 'Generating report...' : 'Generate Interview Plan'}
        </button>
      </form>
      <section className="reports-list">
        <h2>Your Reports</h2>
        {reports.map((r) => (
          <Link key={r._id} href={`/interview/${r._id}`}>
            <article>
              <h3>{r.title || 'Interview Report'}</h3>
              <p>Match score: {r.matchScore}%</p>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
