AGENTS.md
Project Overview

This project follows a separated frontend/backend architecture using a MERN-inspired stack, with Supabase replacing MongoDB.

The project is divided into two main applications:

/api - Backend application responsible for API endpoints, request handling, middleware, business logic, and database interactions.
/web - Frontend application responsible for the user interface, client-side routing, and user interactions.
Technology Stack
Backend (/api)
Node.js
TypeScript
Supabase PostgreSQL
Supabase JavaScript Client (@supabase/supabase-js)
REST API architecture
Routes, Controllers, and Middleware pattern
Frontend (/web)
React 19
TypeScript 7
Vite 8
React Router 8
Tailwind CSS 4
DaisyUI 5
Lucide React
React Hot Toast
Supabase JavaScript Client (when direct client-side Supabase access is appropriate)
Development Tools
Oxlint
Vite
TypeScript
1. General Development Rules
Write clean, maintainable, readable, and reusable code.
Use TypeScript throughout the project.
Follow the separation of concerns principle.
Keep frontend and backend responsibilities separate.
Avoid unnecessary dependencies and abstractions.
Avoid using any unless absolutely necessary.
Prefer explicit types and interfaces.
Follow the existing project structure and naming conventions.
Reuse existing utilities, services, and components.
Do not introduce unnecessary architectural changes.
Inspect existing implementations before modifying files.
2. Project Architecture

The project follows a client-server architecture.

Backend Responsibilities (/api)

The backend is responsible for:

Handling HTTP requests.
Defining REST API endpoints.
Validating incoming requests.
Enforcing authorization and permissions.
Processing business logic.
Interacting with Supabase.
Returning standardized API responses.
Handling application errors.
Protecting sensitive operations and credentials.
Frontend Responsibilities (/web)

The frontend is responsible for:

Rendering the user interface.
Managing client-side state.
Handling user interactions.
Communicating with the backend API.
Managing client-side routing.
Displaying loading, success, and error states.
Providing responsive and accessible UI.
Important Rules
Never place backend business logic inside frontend components.
Never expose privileged Supabase credentials to the frontend.
Never trust frontend validation as the only form of validation.
Keep API communication centralized and reusable.
Use the backend for operations requiring trusted server-side execution.
Use Supabase RLS even when requests are processed through the backend.
3. Backend Architecture (/api)

The backend follows a Routes → Middleware → Controllers architecture.

Recommended Directory Structure
text
api/
├── src/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── services/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   ├── config/
│   └── app.ts
├── .env
├── .env.example
└── package.json


Additional directories may be introduced when necessary, but avoid unnecessary folder creation.

3.1 Routes (src/routes/)

Routes define the API endpoints and map HTTP methods and URLs to the appropriate middleware and controller functions.

Responsibilities:

Define GET, POST, PUT, PATCH, and DELETE endpoints.
Connect endpoints to their corresponding controllers.
Apply appropriate middleware.
Group related endpoints by resource or feature.
Keep route files focused on endpoint definitions.

Rules:

Do not implement business logic inside route files.
Do not perform direct database queries inside routes.
Do not duplicate route definitions.
Use meaningful and consistent endpoint naming.
Apply authentication and authorization middleware where required.

Example:

ts
import { Router } from "express";
import {
  getUsers,
  createUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;

3.2 Middleware (src/middleware/)

Middleware executes between the incoming request and the controller.

Responsibilities:

Authenticate incoming requests.
Authorize user permissions.
Validate request parameters, body, and query strings.
Handle request-level logging.
Handle centralized error processing.
Perform other cross-cutting request checks.

Rules:

Keep middleware reusable.
Do not place feature-specific business logic in generic middleware.
Do not trust user IDs supplied by the client for authorization.
Stop request processing when validation or authorization fails.
Pass errors to the centralized error handler.
Avoid unnecessary database queries inside middleware.

Example:

ts
import type { Request, Response, NextFunction } from "express";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Invalid request body.",
    });
  }

  next();
}

3.3 Controllers (src/controllers/)

Controllers handle incoming requests after the required middleware has executed.

Responsibilities:

Read validated request data.
Call the appropriate service functions.
Coordinate application operations.
Handle expected application errors.
Return standardized HTTP responses.

Rules:

Keep controllers focused on HTTP request and response handling.
Avoid placing complex business logic inside controllers.
Do not duplicate database operations.
Delegate reusable business logic to services.
Always handle asynchronous errors.
Return appropriate HTTP status codes.
Never expose internal stack traces or sensitive database information.

Example:

ts
import type { Request, Response, NextFunction } from "express";
import { getAllUsers } from "../services/user.service";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

3.4 Services (src/services/)

Services contain reusable business logic and database operations.

Responsibilities:

Interact with Supabase.
Execute database queries.
Handle feature-specific business logic.
Coordinate multiple database operations.
Provide reusable functions for controllers.

Rules:

Keep database operations out of route files.
Avoid duplicating business logic across controllers.
Keep services independent of Express request and response objects whenever practical.
Return predictable results.
Handle database errors appropriately.

Example:

ts
import { supabase } from "../lib/supabase";

export async function getAllUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, created_at");

  if (error) {
    throw error;
  }

  return data;
}

3.5 Supabase Client (src/lib/)

Maintain one centralized Supabase client configuration.

Example:

ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);


Important:

Use environment variables for Supabase credentials.
Never expose the service role key to the frontend.
Use the service role key only in trusted backend environments when elevated privileges are genuinely required.
Prefer user-scoped Supabase clients when operations should respect the authenticated user's RLS permissions.
Never bypass RLS without a legitimate security-reviewed reason.
3.6 Types (src/types/)

Store shared backend TypeScript definitions.

Responsibilities:

Request and response types.
Application-specific types.
Shared interfaces.
Supabase database types.

Prefer generated Supabase database types rather than manually duplicating database definitions.

4. Supabase Guidelines

Supabase replaces MongoDB as the primary database.

The database uses PostgreSQL.

Rules:

Use Supabase PostgreSQL for persistent application data.
Use relational database design.
Define appropriate primary and foreign keys.
Use database constraints.
Add indexes when appropriate.
Use migrations for schema changes.
Generate TypeScript database types after schema changes.
Avoid fetching unnecessary columns.
Use pagination for large datasets.
Always handle Supabase errors.
Row Level Security (RLS)

RLS must be enabled for exposed tables containing application data that requires access restrictions.

Enforce user ownership at the database level.
Use auth.uid() in appropriate policies.
Create explicit access policies.
Do not rely solely on backend or frontend authorization.
Test access using different authenticated users.
5. API Design Guidelines

Follow REST API conventions.

Example endpoints:

text
GET     /api/users
GET     /api/users/:id
POST    /api/users
PATCH   /api/users/:id
DELETE  /api/users/:id


Rules:

Use nouns for resource names.
Use appropriate HTTP methods.
Return meaningful HTTP status codes.
Keep response structures consistent.
Validate all incoming data.
Handle missing resources with 404.
Handle invalid requests with 400.
Handle unauthorized requests with 401.
Handle forbidden requests with 403.
Handle unexpected server errors with 500.
Standard API Response

Success:

json
{
  "success": true,
  "message": "Operation successful.",
  "data": {}
}


Error:

json
{
  "success": false,
  "message": "Something went wrong."
}


Never expose database credentials, stack traces, or sensitive internal information in API responses.

6. Frontend Architecture (/web)

The frontend uses React 19, TypeScript, and Vite.

Recommended structure:

text
web/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .env.example
└── package.json

React Guidelines
Use functional components.
Use React Hooks appropriately.
Keep components focused on one responsibility.
Extract reusable components.
Use TypeScript interfaces or types for component props.
Avoid unnecessary component re-renders.
Avoid unnecessary useEffect usage.
Follow React's Rules of Hooks.
API Communication
Communicate with the backend through HTTP requests.
Centralize API configuration and request handling.
Avoid repeating API base URLs.
Handle loading, success, and error states.
Do not place complex API communication logic directly inside UI components when it can be extracted into services.

Example API configuration:

ts
const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "API request failed.");
  }

  return result;
}


Authentication tokens must be attached appropriately when accessing protected endpoints.

Styling
Use Tailwind CSS 4 as the primary styling solution.
Use DaisyUI for reusable UI patterns.
Use Lucide React for icons.
Use React Hot Toast for notifications.
Maintain responsive layouts.
Follow accessibility best practices.
7. Security Guidelines

Security is mandatory across both applications.

Backend:

Validate incoming requests.
Authenticate protected API requests.
Authorize access to protected resources.
Never trust client-provided user IDs.
Protect sensitive environment variables.
Avoid exposing internal errors.
Apply appropriate CORS restrictions.
Use rate limiting where appropriate.
Verify webhook signatures where applicable.

Frontend:

Never expose service role keys.
Never store privileged credentials in browser storage.
Do not rely on hidden UI elements for authorization.
Avoid rendering untrusted HTML.
Handle authentication sessions securely.

Database:

Enable appropriate RLS policies.
Use database constraints.
Restrict privileged access.
Validate ownership and permissions.
8. Error Handling
Use centralized backend error handling.
Handle asynchronous errors.
Return consistent API error responses.
Log useful debugging information on the backend.
Avoid exposing internal error details.
Display user-friendly messages on the frontend.
Never silently swallow unexpected errors.
9. AI Coding Agent Rules

Before making changes:

Inspect the existing project structure.
Determine whether the task belongs to /api or /web.
Read existing implementations before creating new ones.
Follow existing naming conventions.
Reuse existing components, services, middleware, and utilities.
Check actual Supabase tables and generated types before writing queries.
Do not invent database columns, tables, or relationships.
Keep frontend and backend responsibilities separate.
Avoid unnecessary dependencies.
Preserve existing functionality.

When implementing backend features:

Define the route.
Add necessary middleware.
Implement the controller.
Create or reuse a service.
Perform database operations through Supabase.
Handle errors appropriately.
Ensure authorization and RLS requirements are respected.

When implementing frontend features:

Create or reuse components.
Implement API communication through frontend services.
Use appropriate TypeScript types.
Handle loading, success, and error states.
Maintain responsive design.
Follow existing routing conventions.
10. Before Completing Any Task

Verify when applicable:

Correct application directory modified.
TypeScript types are accurate.
No unnecessary dependencies added.
No hardcoded credentials.
No exposed service role keys.
API input validation is implemented.
Authentication and authorization are handled.
Supabase errors are handled.
RLS requirements are respected.
Loading and error states are implemented.
Existing functionality is preserved.
No unrelated files were modified.
Available lint and build checks pass.
Final Rule

Always maintain a clear separation between the frontend, backend, and database.

The backend is responsible for trusted server-side operations, API handling, and business logic.

The frontend is responsible for presentation, user interactions, and communicating with the backend.

Supabase PostgreSQL is the primary database.

Never introduce MongoDB, Mongoose, or Express alternatives that conflict with the existing architecture unless explicitly requested.