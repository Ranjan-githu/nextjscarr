'use client';

import { useEffect, useRef, useState } from 'react';

const POLL_INTERVAL = 10000;

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function Stars({ value, onChange, label }) {
  return (
    <div
      className="feedback-stars"
      role={onChange ? 'group' : 'img'}
      aria-label={label}
    >
      {[1, 2, 3, 4, 5].map((star) =>
        onChange ? (
          <button
            key={star}
            type="button"
            aria-pressed={value === star}
            aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`}
            className={
              star <= value ? 'feedback-star is-selected' : 'feedback-star'
            }
            onClick={() => onChange(star)}
          >
            ★
          </button>
        ) : (
          <span
            key={star}
            className={
              star <= value ? 'feedback-star is-selected' : 'feedback-star'
            }
            aria-hidden="true"
          >
            ★
          </span>
        )
      )}
    </div>
  );
}

export default function FeedbackBoard() {
  const [feedback, setFeedback] = useState([]);
  const [myFeedback, setMyFeedback] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const initialized = useRef(false);

  useEffect(() => {
    let active = true;
    let inFlight = false;

    async function refreshFeedback() {
      if (inFlight || document.visibilityState === 'hidden') return;
      inFlight = true;
      try {
        const response = await fetch('/api/feedback', {
          credentials: 'include',
          cache: 'no-store',
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || 'Feedback could not be loaded.');
        if (!active) return;

        setFeedback(data.feedback || []);
        setMyFeedback(data.myFeedback || null);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
        if (!initialized.current) {
          setRating(data.myFeedback?.rating || 0);
          setComment(data.myFeedback?.comment || '');
          initialized.current = true;
        }
        setError('');
      } catch (loadError) {
        if (active)
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Feedback could not be loaded.'
          );
      } finally {
        inFlight = false;
        if (active) setLoading(false);
      }
    }

    refreshFeedback();
    const interval = window.setInterval(refreshFeedback, POLL_INTERVAL);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshFeedback();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  async function submitFeedback(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Feedback could not be saved.');

      setFeedback(data.feedback || []);
      setMyFeedback(data.myFeedback || null);
      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
      setNotice('Your feedback has been saved.');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Feedback could not be saved.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="feedback-board" aria-labelledby="feedback-heading">
      <header className="feedback-board__header">
        <div>
          <p className="feedback-board__eyebrow">Community feedback</p>
          <h2 id="feedback-heading">Ratings &amp; Comments</h2>
        </div>
        <div className="feedback-board__summary" aria-live="polite">
          <strong>{averageRating.toFixed(1)}</strong>
          <Stars
            value={Math.round(averageRating)}
            label={`Average rating: ${averageRating.toFixed(1)} out of 5`}
          />
          <span>
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </header>

      <p className="feedback-live-status">
        Live updates every {POLL_INTERVAL / 1000} seconds
      </p>

      <form className="feedback-form" onSubmit={submitFeedback}>
        <h3>{myFeedback ? 'Update your feedback' : 'Share your experience'}</h3>
        <fieldset className="feedback-form__rating">
          <legend>Your rating</legend>
          <Stars
            value={rating}
            onChange={(nextRating) => setRating(nextRating)}
            label="Choose a rating from 1 to 5 stars"
          />
        </fieldset>
        <label className="feedback-form__comment">
          Comment
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Tell us what worked well or what could be better..."
            required
          />
          <span>{comment.length}/1000</span>
        </label>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="feedback-success" role="status">
            {notice}
          </p>
        )}
        <button
          className="button primary-button"
          type="submit"
          disabled={submitting || rating === 0 || !comment.trim()}
        >
          {submitting
            ? 'Saving...'
            : myFeedback
              ? 'Update feedback'
              : 'Submit feedback'}
        </button>
      </form>

      <div className="feedback-list">
        <h3>What users are saying</h3>
        {loading ? (
          <p>Loading feedback...</p>
        ) : feedback.length ? (
          feedback.map((entry, index) => (
            <article
              className="feedback-card"
              key={`${entry.username}-${entry.createdAt}-${index}`}
            >
              <div className="feedback-card__header">
                <div>
                  <h4>{entry.username}</h4>
                  <time dateTime={entry.updatedAt}>
                    {formatDate(entry.updatedAt)}
                  </time>
                </div>
                <Stars
                  value={entry.rating}
                  label={`${entry.rating} out of 5 stars`}
                />
              </div>
              <p>{entry.comment}</p>
            </article>
          ))
        ) : (
          <p>No feedback yet. Be the first to share your experience.</p>
        )}
        {error && !loading && feedback.length > 0 && (
          <p className="error-message" role="status">
            Live refresh failed: {error}
          </p>
        )}
      </div>
    </section>
  );
}
