# CarrierGuider AI

CarrierGuider AI is a full-stack Next.js application that helps candidates prepare for interviews. It accepts a job description, self-description, and optional resume PDF, then uses Google Gemini to generate a match score, interview questions, skill gaps, and a preparation plan. Users can also generate a tailored resume PDF.

The project uses Next.js App Router for both the UI and backend API routes, so it can be deployed as one application on Vercel.

## Features

- User registration and login
- HTTP-only authentication cookie
- Protected API routes
- Resume PDF text extraction
- AI-generated interview reports
- Technical and behavioral interview questions
- Skill-gap analysis
- Day-by-day preparation plan
- AI-tailored resume PDF generation
- Interview report history

## Technology Stack

| Area | Technology |
|---|---|
| Frontend and routing | Next.js 16, React 19, App Router |
| Styling | SCSS and CSS |
| Backend | Next.js Route Handlers |
| Database | MongoDB Atlas with Mongoose |
| Authentication | JWT stored in an HTTP-only cookie |
| Password security | bcryptjs |
| AI | Google Gemini through `@google/genai` |
| PDF parsing | pdf-parse |
| PDF creation | Puppeteer |

## Project Structure

```text
carr-nextjs/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.js
│   │   │   ├── login/route.js
│   │   │   ├── logout/route.js
│   │   │   └── get-me/route.js
│   │   └── interview/
│   │       ├── route.js
│   │       ├── report/[interviewId]/route.js
│   │       └── resume/pdf/[interviewReportId]/route.js
│   ├── interview/[interviewId]/page.jsx
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.scss
├── components/
│   ├── auth-provider.jsx
│   └── interview-provider.jsx
├── lib/
│   ├── ai.js
│   ├── auth.js
│   ├── db.js
│   └── models.js
├── .env.example
├── package.json
└── vercel.json
```

## How the App Works

### 1. Registration and login

A user submits credentials from the registration or login page. A Route Handler validates the request, hashes passwords with bcrypt during registration, and creates a JWT after successful authentication.

The JWT is written as an HTTP-only cookie named `token`. It is not accessible through browser JavaScript.

### 2. Authentication check

When a page loads, the browser requests `/api/auth/get-me`. The API reads the token cookie, verifies it with `JWT_SECRET`, checks the MongoDB blacklist, and returns the logged-in user.

### 3. Report creation

The dashboard sends a `multipart/form-data` request to `/api/interview` containing:

- Job description
- Self-description
- Optional resume PDF

The API extracts text from the resume, sends the combined profile to Gemini, validates the returned content into the application's JavaScript flow, and stores an `InterviewReport` document in MongoDB.

### 4. Report viewing

The report page requests `/api/interview/report/[interviewId]`. Before returning the result, the API verifies that the report belongs to the logged-in user.

### 5. Resume PDF generation

The report page requests `/api/interview/resume/pdf/[interviewReportId]`. The API retrieves the saved report, asks Gemini to create formatted HTML resume content, converts it to PDF with Puppeteer, and streams it back as a download.

## API Routes

### Authentication

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account and set the token cookie |
| POST | `/api/auth/login` | Authenticate and set the token cookie |
| GET | `/api/auth/logout` | Add the token to the blacklist and clear the cookie |
| GET | `/api/auth/get-me` | Return the authenticated user |

### Interviews

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/interview` | List reports for the authenticated user |
| POST | `/api/interview` | Generate and store a new report |
| GET | `/api/interview/report/[interviewId]` | Get one report owned by the user |
| POST | `/api/interview/resume/pdf/[interviewReportId]` | Generate a tailored resume PDF |

## Environment Variables

Copy `.env.example` to `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long, random secret used to sign and verify tokens |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |

Do not commit `.env.local`. Add the same variables to the Vercel project settings under **Settings → Environment Variables**.

## Local Development

Requirements:

- Node.js 20 or newer
- npm
- MongoDB Atlas or another MongoDB connection
- Google Gemini API key

Install and run:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```powershell
npm run build
npm start
```

A successful `next build` validates the routes and page compilation.

## Vercel Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Keep the framework set to Next.js.
4. Add `MONGO_URI`, `JWT_SECRET`, and `GOOGLE_GENAI_API_KEY`.
5. Deploy.

The existing `vercel.json` explicitly identifies the project as Next.js.

## Database Models

### User

- `username`
- `email`
- `password` as a bcrypt hash

### InterviewReport

- Owner user ID
- Job description
- Resume text
- Self-description
- Match score
- Technical questions
- Behavioral questions
- Skill gaps
- Preparation plan
- Job title
- Creation and update timestamps

### Blacklist

Stores JWT values that have been invalidated by logout.

## Security Notes

- Authentication tokens use the HTTP-only cookie flag.
- API ownership checks prevent one user from reading another user's report.
- Keep the JWT and Gemini secrets server-side.
- Configure MongoDB network access for Vercel deployment.
- Token blacklist storage grows over time; add cleanup/index policy for production use.

## Vercel PDF Note

PDF generation uses Puppeteer. Browser-based PDF generation is resource-heavy and may require additional serverless configuration. If Vercel deployment fails on the PDF endpoint, the most portable alternatives are:

- A separate PDF rendering service
- Playwright or Puppeteer as a dedicated container/service
- An HTML-to-PDF provider such as a hosted API

## Original Project

The former separate frontend/backend folders were removed after migration. This directory is now the complete Next.js application.
