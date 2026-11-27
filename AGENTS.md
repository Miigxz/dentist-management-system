
# AGENTS.md

# Full-Stack Project Development Guidelines

You are an expert full-stack software engineer responsible for developing, maintaining, and improving this application.

Your responsibility is to maintain a clean, secure, scalable, maintainable, and production-ready codebase.

This repository contains a separate frontend and backend application.

Always inspect the existing codebase before making changes. Follow existing project architecture, coding conventions, and established patterns.

---

# 1. Project Architecture

This project follows a full-stack client-server architecture.

Project structure:

- `api/` - Backend application.
- `web/` - Frontend application.

Responsibilities:

## Frontend (web/)
- User interface and user experience.
- React components and pages.
- Client-side routing.
- Form handling and validation.
- API communication.
- Authentication interface.
- Responsive layouts.
- Frontend state management.

## Backend (api/)
- REST API development.
- Business logic.
- Request validation.
- Authentication and authorization.
- Database operations.
- Error handling.
- External service integrations.
- Server-side security.

IMPORTANT:
- Keep frontend and backend responsibilities separate.
- Do not place backend secrets or privileged operations in frontend code.
- Do not duplicate business logic unnecessarily.
- Keep API communication organized and consistent.

---

# 2. Technology Stack

The project follows a MERN-inspired architecture, replacing MongoDB with Supabase PostgreSQL.

Primary technology stack:

- Frontend: React.js
- Backend: Node.js
- Backend Framework: Express.js
- Database: PostgreSQL
- Database Provider: Supabase
- Database Language: SQL
- Authentication: Supabase Auth or existing authentication implementation
- API Architecture: REST API
- Styling: Tailwind CSS
- UI Components: DaisyUI (optional)
- Language: Follow existing JavaScript or TypeScript configuration.

IMPORTANT:
- MongoDB is NOT used in this project.
- Do not introduce Mongoose.
- Do not use MongoDB-specific queries or data models.
- Use PostgreSQL and Supabase for database operations.
- Do not replace existing dependencies without approval.
- Inspect package.json files before assuming installed technologies.

---

# 3. General Development Principles

- Write clean, readable, and maintainable code.
- Prefer simple solutions over unnecessary abstractions.
- Follow existing coding conventions.
- Avoid duplicated code.
- Build reusable components and utilities.
- Keep functions focused on a single responsibility.
- Use descriptive variable and function names.
- Avoid unnecessary dependencies.
- Do not introduce breaking changes without approval.
- Do not modify unrelated files.
- Preserve existing functionality unless changes are requested.

Before implementing any feature:

1. Understand the requirements.
2. Inspect relevant files.
3. Understand the existing architecture.
4. Identify affected frontend and backend components.
5. Check existing dependencies.
6. Implement the simplest maintainable solution.

---

# 4. Frontend and Backend Communication

The frontend communicates with the backend through HTTP APIs.

Rules:
- Keep API endpoints organized.
- Use consistent REST API conventions.
- Separate API communication from UI components.
- Use appropriate HTTP methods.
- Handle loading, success, empty, and error states.
- Validate request and response data.
- Avoid unnecessary API requests.
- Keep API response structures consistent.
- Do not expose backend implementation details unnecessarily.

Preferred HTTP methods:

- GET: Retrieve resources.
- POST: Create resources.
- PUT: Replace resources.
- PATCH: Update resources.
- DELETE: Remove resources.

Do not bypass backend authorization or business rules.

---

# 5. Database Guidelines (Supabase PostgreSQL)

Supabase PostgreSQL is the primary database.

IMPORTANT:
MongoDB is not part of this project.

Use PostgreSQL-compatible database operations.

Rules:
- Follow the existing database schema.
- Use appropriate PostgreSQL data types.
- Maintain proper table relationships.
- Use foreign keys when appropriate.
- Use indexes for frequently queried columns when justified.
- Avoid unnecessary database queries.
- Use transactions when multiple operations must succeed together.
- Use database migrations for schema changes.
- Keep database logic organized.
- Use appropriate constraints to maintain data integrity.

When modifying database structures:
1. Inspect the existing schema.
2. Understand table relationships.
3. Check dependent queries and API endpoints.
4. Create or update migrations.
5. Consider existing production data.
6. Verify affected database operations.

Never make destructive database changes without explicit approval.

---

# 6. Supabase Integration

Use Supabase as the primary backend platform for PostgreSQL and related services.

Depending on the existing architecture, Supabase may provide:

- PostgreSQL database.
- Authentication.
- File storage.
- Realtime subscriptions.
- Database APIs.

Rules:
- Reuse the existing Supabase client configuration.
- Avoid creating duplicate client instances unnecessarily.
- Keep Supabase integration organized.
- Use generated database types when available.
- Handle database errors properly.
- Respect existing Row Level Security (RLS) policies.
- Never bypass authorization policies.
- Use Supabase Storage for appropriate file operations.
- Use Realtime only when needed.

Security requirements:

- Never expose the Supabase service role key in frontend code.
- Never commit private credentials.
- Keep privileged Supabase operations on the backend.
- Use environment variables for secrets.
- Validate and authorize requests on the server.
- Never assume frontend validation provides security.
- Do not disable RLS simply to make an application feature work.

---

# 7. Backend Development Guidelines (api/)

The backend is responsible for business logic, API processing, authorization, and server-side operations.

Follow existing Express.js architecture.

Recommended separation of responsibilities:

- routes/: API route definitions.
- controllers/: Request and response handling.
- services/: Business logic.
- middleware/: Authentication, authorization, and validation.
- config/: Application configuration.
- utils/: Shared utility functions.
- types/: Shared backend types, if using TypeScript.

These are recommendations, not mandatory folder names.

Rules:
- Keep route definitions organized.
- Keep controllers focused.
- Separate business logic from request handling.
- Validate incoming requests.
- Use centralized error handling.
- Use appropriate HTTP status codes.
- Avoid exposing stack traces in production.
- Implement authentication and authorization where required.
- Avoid unnecessary database queries.
- Follow asynchronous error-handling conventions.
- Use parameterized SQL when writing raw SQL.

Do not trust incoming client data.

---

# 8. Frontend Development Guidelines (web/)

The frontend is responsible for user interfaces and client-side interactions.

Rules:
- Build reusable React components.
- Keep components focused.
- Separate UI and business logic when appropriate.
- Use appropriate state management.
- Avoid unnecessary re-renders.
- Use semantic HTML.
- Keep forms accessible.
- Handle loading and error states.
- Follow responsive design principles.
- Reuse existing UI components.

Always inspect existing frontend architecture before creating new folders, hooks, or components.

---

# 9. Styling Guidelines

Tailwind CSS is the PRIMARY styling solution.

Use Tailwind CSS for:
- Layout.
- Spacing.
- Typography.
- Colors.
- Borders.
- Shadows.
- Responsive design.
- Flexbox and Grid.
- Hover and focus states.
- Transitions and animations.

Rules:
- Prefer Tailwind utility classes over custom CSS.
- Follow mobile-first responsive design.
- Maintain consistent spacing and visual hierarchy.
- Reuse existing design tokens.
- Avoid unnecessary arbitrary values.
- Avoid duplicated styling.
- Do not introduce another CSS framework.

## DaisyUI

DaisyUI is an OPTIONAL component library.

Use DaisyUI when it provides a suitable implementation.

Preferred components:
- Buttons.
- Cards.
- Modals.
- Dropdowns.
- Alerts.
- Badges.
- Navigation bars.
- Drawers.
- Form controls.
- Tabs.
- Loading indicators.

Rules:
- Do not force DaisyUI into every component.
- Use Tailwind directly when a custom implementation is simpler.
- Customize DaisyUI components when needed.
- Follow existing DaisyUI theme configuration.
- Do not introduce another component library without approval.

Styling priority:

1. Existing project components.
2. DaisyUI when appropriate.
3. Tailwind CSS custom implementations.

---

# 10. TypeScript and JavaScript Guidelines

Follow the existing language configuration.

If TypeScript is used:
- Define proper interfaces and types.
- Avoid any unless absolutely necessary.
- Prefer unknown for genuinely unknown values.
- Type API requests and responses.
- Type component props.
- Handle nullable values correctly.
- Avoid unnecessary type assertions.

If JavaScript is used:
- Use consistent naming conventions.
- Keep functions small.
- Handle undefined and null values.
- Avoid implicit assumptions about data structures.
- Use JSDoc where it meaningfully improves clarity.

Do not migrate the project between JavaScript and TypeScript without approval.

---

# 11. Authentication and Authorization

Follow the existing authentication architecture.

If Supabase Auth is used:
- Use the existing Supabase authentication configuration.
- Handle login and logout properly.
- Handle expired sessions.
- Protect authenticated routes.
- Verify user identity on protected backend endpoints.
- Enforce authorization for protected resources.
- Respect database RLS policies.

Authentication is not the same as authorization.

Always verify that users are allowed to access the requested resource.

Never rely exclusively on frontend route protection.

---

# 12. API Security

Follow secure backend development practices.

Requirements:
- Validate all incoming requests.
- Sanitize user-generated content when necessary.
- Use appropriate authentication middleware.
- Implement authorization checks.
- Protect sensitive endpoints.
- Avoid exposing secrets.
- Use environment variables.
- Apply appropriate CORS configuration.
- Avoid SQL injection through parameterized queries.
- Avoid unsafe dynamic SQL.
- Apply rate limiting where appropriate.
- Avoid exposing sensitive error details.

Never trust data coming from the frontend.

---

# 13. Environment Variables

Keep environment-specific configuration outside source code.

Examples:

Backend:
- PORT
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY (if used by the existing implementation)
- Other private API credentials.

Frontend:
- VITE_SUPABASE_URL or the appropriate framework-specific public variable.
- VITE_SUPABASE_ANON_KEY or the appropriate framework-specific public variable.
- Public API base URL.

IMPORTANT:
- Variable prefixes depend on the frontend build tool.
- Never expose private keys through public frontend environment variables.
- Never commit actual .env files.
- Maintain .env.example files with placeholder values.
- Do not print secrets in logs.
- Do not assume frontend environment variables are private.

---

# 14. Error Handling

Handle errors consistently across the application.

Backend:
- Use centralized error-handling middleware.
- Return meaningful HTTP status codes.
- Avoid exposing internal stack traces.
- Log errors appropriately.

Frontend:
- Display understandable error messages.
- Handle network failures.
- Handle expired sessions.
- Display loading states.
- Handle empty responses.
- Provide retry options when appropriate.

Never silently ignore important errors.

---

# 15. Performance

Optimize performance without unnecessary complexity.

Frontend:
- Avoid unnecessary re-renders.
- Optimize images.
- Use lazy loading when appropriate.
- Avoid unnecessary dependencies.
- Avoid excessive API requests.
- Use pagination for large datasets.

Backend:
- Optimize database queries.
- Use appropriate indexes.
- Avoid unnecessary database operations.
- Use pagination for large result sets.
- Avoid blocking operations.
- Reuse shared service configurations.

Prioritize maintainability over premature optimization.

---

# 16. Testing and Quality Assurance

Before completing a task:

- Run relevant frontend tests.
- Run relevant backend tests.
- Run linting when configured.
- Run TypeScript checks when applicable.
- Verify API behavior.
- Verify database interactions.
- Check responsive layouts.
- Verify loading and error states.
- Check for regressions.

Do not claim tests passed unless they were actually executed.

If tests cannot be run, explain why.

---

# 17. Git Guidelines

- Do not overwrite unrelated user changes.
- Do not revert existing modifications without approval.
- Do not delete files without understanding their purpose.
- Do not commit unless requested.
- Keep changes focused.
- Follow existing branch and commit conventions.
- Review modified files before finishing.

# Git Safety Rules

The AI agent must NEVER push, publish, or upload changes to any remote Git repository.

## Allowed Operations
- Inspect Git status and history.
- Create, modify, and delete local project files when requested.
- Create local commits only when explicitly requested.
- Create local branches when explicitly requested.
- Stage changes locally when requested.
- Run Git diff to review changes.
- Run local tests and builds.

## Forbidden Operations
- NEVER run `git push`.
- NEVER push to origin or any other remote.
- NEVER publish branches or tags.
- NEVER upload project changes to GitHub, GitLab, or other remote repositories.
- NEVER configure automatic Git pushing.
- NEVER trigger remote deployment workflows.
- NEVER use commands or tools that indirectly publish local changes.

## Commit Rules
- Do not create commits unless explicitly requested.
- Always keep changes local by default.
- Do not automatically stage or commit files.
- Never amend, rewrite, or delete existing commits without permission.

## Final Verification
After completing a task:
1. Run `git status` to inspect local changes.
2. Review changes using `git diff`.
3. Run relevant tests.
4. Summarize modified and created files.
5. Confirm that all changes remain local.

## Git Configuration Protection

The AI agent MUST NOT modify Git configuration or ignore rules.

Forbidden operations:
- NEVER modify `.gitignore`.
- NEVER modify `.git/info/exclude`.
- NEVER modify `.git/config`.
- NEVER modify global Git configuration.
- NEVER add, remove, or change ignore patterns.
- NEVER rename or delete existing Git-related configuration files.
- NEVER initialize or reconfigure a Git repository without explicit permission.

If a new file needs to be ignored:
1. Do not modify any ignore file.
2. Inform the user that the file may need an ignore rule.
3. Let the user decide whether to update Git ignore settings.

These restrictions apply to both the project root and nested directories.

Git configuration and ignore rules must remain unchanged unless the user explicitly authorizes a specific modification.

IMPORTANT:
The user is responsible for deciding when and how changes are pushed to remote repositories.

When in doubt, do not perform any Git operation that publishes or transfers project changes.

---

# 18. Dependency Management

- Inspect package.json before adding dependencies.
- Prefer existing packages.
- Avoid redundant libraries.
- Do not introduce MongoDB or Mongoose.
- Do not add another styling framework.
- Do not introduce unnecessary component libraries.
- Ask before major dependency upgrades.
- Explain why new dependencies are needed.

---

# 19. AI Agent Workflow

For every task, follow this workflow.

## Before Implementation

1. Read applicable AGENTS.md files.
2. Understand the user's requirements.
3. Inspect the project structure.
4. Identify whether the task affects api, web, or both.
5. Inspect relevant files and dependencies.
6. Understand existing implementation patterns.
7. Plan the smallest maintainable change.

## During Implementation

1. Follow existing architecture.
2. Reuse existing utilities and components.
3. Keep frontend and backend responsibilities separate.
4. Use Supabase PostgreSQL instead of MongoDB.
5. Follow security and validation practices.
6. Avoid unrelated modifications.
7. Maintain backward compatibility when possible.

## After Implementation

1. Review modified files.
2. Check for TypeScript errors.
3. Run relevant tests.
4. Run linting when available.
5. Verify API and database interactions.
6. Check for regressions.
7. Summarize changes.

---

# 20. Final Response Requirements

After completing a task, provide:

- Summary of what changed.
- Files created or modified.
- Important technical decisions.
- Tests and checks performed.
- Remaining issues or limitations.

Be concise but informative.

Never claim functionality works if it has not been verified.

---

# 21. Final Development Priorities

Always prioritize:

1. Correct functionality.
2. Security and data integrity.
3. Maintainable architecture.
4. Clear separation of frontend and backend.
5. Accessibility.
6. Responsive design.
7. Performance.
8. Code simplicity.

The goal is to maintain a production-ready full-stack application using React, Node.js, Express.js, and Supabase PostgreSQL.

Do not introduce MongoDB-related technologies or patterns.

Do not overengineer simple features.

Always inspect the existing project before making assumptions.
