
# Mwala Connect

**A civic-development information platform for Mwala Constituency, Kenya.**

Mwala Connect brings development project information, public investment allocations, ward information and field activities together in one accessible, mobile-friendly platform.

**Live website:** https://mwala-connect.vercel.app/

**GitHub repository:** https://github.com/Chrisant-gif/mwala-connect

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Database and Security](#database-and-security)
- [Data Integrity](#data-integrity)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [License](#license)

## Overview

Development information can be difficult to find when project records, financial information and field updates are spread across different sources. Mwala Connect provides a central place to present this information in a structured and accessible format.

The platform is designed to help residents and other interested users explore development information across Mwala Constituency, including development projects, ward information, investment allocations and community activities.

Mwala Connect is an independent civic-information project. It is not an official government website, and its presentation of information does not constitute an endorsement by any public representative or government institution.

## Features

### Public Information Platform

- **Development project directory:** Browse development projects and their associated details.
- **Development tracking:** Present project statuses, reported progress and verification information.
- **Ward directory:** Explore ward information and associated development projects.
- **Investment allocations:** View financial allocation records and historical financial-year information.
- **Field activities:** Explore recorded visits and community engagements.
- **Project media:** Display photographs and other media associated with development projects.
- **Responsive design:** Access the platform on desktop and mobile devices.

### Authentication and Administration

- Email-and-password registration and login.
- Email confirmation through the Supabase authentication flow when enabled.
- Session management with a Remember me option.
- Member profiles associated with a selected ward.
- An administrator dashboard with database-backed statistics.
- Administrative project creation and editing.
- Project media upload and management.
- Server-side authorization checks and database Row Level Security policies.

Public registration does not grant administrator privileges. Administrative operations are intended to be restricted to authorized accounts.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework, routing and server-side functionality |
| React | Interactive user interfaces |
| TypeScript | Type safety and maintainability |
| Tailwind CSS | Styling and responsive layouts |
| Supabase | PostgreSQL database, authentication and storage |
| Vercel | Application deployment and hosting |
| Git | Version control |
| GitHub | Source-code hosting and collaboration |

## Application Architecture

Mwala Connect uses Next.js for its public-facing pages, dynamic detail routes, server-side data access and administrative workflows.

React provides interactive components, while TypeScript supports more predictable data handling and maintainable application code.

Supabase provides the persistent database, authentication services and storage used by the application. Public pages retrieve development information from the database, while protected administrative workflows require authorization.

The database includes tables for:

- Wards
- Development projects
- Investment allocations
- Field activities
- Project media
- Member profiles
- User roles

Project media records are associated with Supabase Storage objects where applicable.

## Database and Security

Security is implemented across both the application and database layers.

- **Authentication:** Supabase manages email-and-password authentication and user sessions.
- **Authorization:** Administrative pages and server actions check the authenticated user's administrator privileges.
- **Row Level Security:** Database policies restrict access according to the intended public, member and administrator permissions.
- **Member profiles:** Profiles are associated with authenticated users and selected wards.
- **Project media:** Storage access is governed by bucket configuration and storage policies.
- **Environment configuration:** Public Supabase configuration is supplied through environment variables rather than hardcoded into application source files.

A publishable Supabase key may be used in browser-facing configuration when Row Level Security and database policies are correctly configured. Secret keys, service-role keys and database credentials must never be exposed in client-side code or committed to source control.

When deploying to a new environment, review the database policies, storage permissions, authentication redirect URLs and administrator-role configuration.

## Data Integrity

Mwala Connect aims to present development information responsibly and distinguish available records from independently verified facts.

- Project statuses and progress figures reflect the information currently recorded in the application.
- Financial figures should be interpreted in the context of their stated financial year and source.
- Records awaiting confirmation should remain identified as unverified or pending verification.
- The presence of a project record does not independently establish its reported status, expenditure or outcomes.

The platform is an information and presentation tool, not an independent financial audit or official certification of project completion.

## Getting Started

### Prerequisites

Before running the application locally, ensure you have:

- Node.js compatible with the project configuration.
- npm.
- Access to a Supabase project configured for Mwala Connect.

### 1. Clone the Repository

```bash
git clone https://github.com/Chrisant-gif/mwala-connect.git
cd mwala-connect/frontend
```

### 2. Install Dependencies

For a reproducible installation using the committed lockfile:

```bash
npm ci
```

Alternatively, use `npm install` when installing dependencies during development.

### 3. Configure Environment Variables

Create a `.env.local` file inside the `frontend` directory.

Add the following variables using the values from your Mwala Connect Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with your actual project configuration.

Do not commit `.env.local` or any credentials to GitHub. Never put a Supabase service-role key or other privileged secret in a `NEXT_PUBLIC_` variable.

### 4. Configure Supabase

The application expects the Mwala Connect database schema, tables, Row Level Security policies, authentication configuration and storage setup to be available in Supabase.

Configure the authentication redirect URLs for local development and the deployed website. Ensure that the administrator role is assigned only to authorized accounts.

The README does not replace the database setup: a fresh Supabase project must have the required schema and policies configured before all application features will work.

### 5. Start the Development Server

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The development server supports live updates as you edit application files.

## Running the Application

The following commands are available for common development tasks:

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### TypeScript Check

```bash
npx tsc --noEmit
```

### Lint

```bash
npm run lint
```

Run the relevant checks before committing changes or deploying updates.

## Deployment

Mwala Connect is deployed through Vercel and connected to its GitHub repository.

Changes pushed to the configured deployment branch can trigger a new deployment.

A successful deployment also depends on correctly configured environment variables, Supabase authentication redirects, database policies and storage permissions.

After deployment, verify the deployment status in Vercel and confirm that the public website and required backend functionality are available.

## Project Status

Mwala Connect is an actively developed project with a public information platform, Supabase-backed data access, email authentication, an administrator dashboard, project management and project media management.

Further development may include expanded verification workflows, improved reporting, additional administrative capabilities and continued improvements to accessibility and mobile usability.

## Contributing

Mwala Connect is an independent project. Suggestions, bug reports and potential collaboration can be raised through the GitHub repository.

When proposing changes, aim to preserve data integrity, maintain secure access controls and avoid presenting unverified development information as confirmed.

## License

No license is specified in this README. Unless a license is added to the repository, do not assume that the source code is available for unrestricted reuse or redistribution.
