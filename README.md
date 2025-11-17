<div align="center">
  <img src="public/robot.png" alt="Mock2Hire" width="100" />
  
  <h2>Mock2Hire</h2>
  <p>AI-powered mock interview platform for students to practice and improve.</p>
</div>

### Table of Contents

- Introduction
- Features
- Tech Stack
- Architecture
- Getting Started
- Environment Variables
- Available Scripts
- Folder Structure
- Contribution Guide (College Group)
- Roadmap
- License

## Introduction

Mock2Hire is a web app that helps students practice job interviews with an AI voice agent, receive structured feedback, and track progress over time. It’s designed for college group projects with clear contribution workflows and a modern stack.

## Features

- Authentication with email/password (Firebase)
- Create interviews by role, level, and tech stack
- Conduct voice-based mock interviews (Vapi Web SDK)
- Automatic AI feedback with scoring and insights
- Dashboard to browse and retake interviews
- Responsive modern UI with shadcn/ui and Tailwind

## Tech Stack

- Next.js 15 (App Router)
- Firebase (Auth, Admin)
- Vapi Web SDK
- Tailwind CSS 4, shadcn/ui
- Zod, React Hook Form
- Day.js

## Architecture

- UI and routes in `app/`
- API routes in `app/api/`
- Firebase client/admin in `firebase/`
- Server actions and utilities in `lib/`
- Shared types in `types/`

## Getting Started

1) Clone and install

```bash
git clone <your-repo-url>
cd ai_mock_interviews
npm install
```

2) Create env file `.env.local`

See the Environment Variables section below and fill all required keys.

3) Run dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Notes:
- Create a Firebase project and enable Email/Password Auth.
- Generate a Vapi Web Token and Workflow ID from the Vapi dashboard (`https://vapi.ai`).
- **Having issues?** See [VAPI_TROUBLESHOOTING.md](./VAPI_TROUBLESHOOTING.md) for detailed setup help.

## Available Scripts

```bash
npm run dev      # start dev server
npm run build    # build for production
npm run start    # start production server
npm run lint     # run lint checks
```

## Folder Structure

```
app/                # routes, layouts, pages
components/         # UI components
constants/          # constants and mappings
firebase/           # firebase client/admin setup
lib/                # actions, utils, SDK wrappers
public/             # static assets
types/              # TypeScript types and declarations
```

## Contribution Guide (College Group)

- Create a new branch per task: `feature/<short-name>` or `fix/<short-name>`
- Open concise PRs with a clear description and screenshots if UI changes
- Request at least 1 peer review before merging to `main`
- Keep code readable, typed, and small in scope
- Link issues or tasks in PR descriptions

Suggested roles:
- Frontend (UI/UX and components)
- Backend/Actions (API routes, server actions)
- Infra/DevOps (env, deploy, tooling)
- QA/Docs (testing, README, demos)

## Roadmap

- Add multi-language question generation
- Export feedback as PDF
- User profiles and streak tracking
- Admin panel for preset interviews

## License

This project is licensed under the MIT License.

