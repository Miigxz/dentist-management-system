1. Project Overview

This project uses:

React 19
TypeScript 7
Vite 8
React Router 8
Tailwind CSS 4
DaisyUI 5
Supabase JavaScript SDK
Lucide React
React Hot Toast

Supabase is responsible for database operations, authentication, and storage where applicable.

The frontend communicates directly with Supabase using the official Supabase JavaScript SDK.

2. Strict Package Rules

Only use packages installed in package.json, including explicitly approved dependencies.

Installed dependencies
react
react-dom
react-router
lucide-react
react-hot-toast
tailwindcss
@tailwindcss/vite
@supabase/supabase-js (must be installed before use)
Rules
NEVER use Axios for API or database communication.
Use Supabase JavaScript SDK for Supabase operations.
NEVER import packages that are not installed.
NEVER install additional packages without explicit permission.
Do not modify package.json without authorization.
Reuse existing project utilities and components.
3. Supabase Integration

Use @supabase/supabase-js as the primary frontend data-access library.

Supabase client

Create a centralized Supabase client.

Suggested location:

src/services/supabase.ts

Example:

typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

Environment variables
env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_legacy_anon_key


Never expose Supabase service-role keys or secret keys in frontend code.

Database operations

Use Supabase queries instead of MongoDB or Axios requests.

Example:

typescript
const { data, error } = await supabase
  .from("profiles")
  .select("*");

if (error) {
  throw error;
}


Rules:

Use .from() for database tables.
Use .select() to retrieve records.
Use .insert() to create records.
Use .update() to modify records.
Use .delete() to remove records.
Use .eq(), .in(), .order(), and other supported query filters when appropriate.
Handle Supabase errors explicitly.
Define TypeScript types for database records.
Avoid selecting unnecessary columns.
Use pagination for large datasets.
Authentication

Use Supabase Auth.

Examples of supported operations:

supabase.auth.signUp()
supabase.auth.signInWithPassword()
supabase.auth.signOut()
supabase.auth.getSession()
supabase.auth.getUser()
supabase.auth.onAuthStateChange()

Rules:

Centralize authentication logic.
Keep session state synchronized.
Clean up authentication subscriptions.
Protect frontend routes where necessary.
Never rely on frontend route protection as the only authorization mechanism.
Enforce authorization through Supabase Row Level Security (RLS).
Storage

Use Supabase Storage for file uploads and retrieval.

Use the SDK's storage API instead of introducing another storage package.

Security
Never expose service-role keys.
Never expose Supabase secret keys.
Enable and configure RLS for exposed database tables.
Never trust frontend authorization checks alone.
Validate sensitive operations through database policies or trusted backend services.
Do not place private credentials in Vite environment variables.
4. Data Access Architecture

Organize Supabase operations into reusable service modules.

Suggested structure:

text
src/
├── services/
│   ├── supabase.ts
│   ├── auth.service.ts
│   ├── profile.service.ts
│   └── storage.service.ts
├── hooks/
├── contexts/
├── components/
├── pages/
├── routes/
├── types/
└── utils/


Rules:

Keep database operations outside presentation components when practical.
Reuse service functions.
Avoid duplicating Supabase queries.
Use typed responses.
Handle loading, success, empty, and error states.
Do not introduce unnecessary data-fetching libraries.
5. State Management

Use React built-in state management.

Available approaches:

useState
useEffect
useContext
useReducer
useMemo
useCallback
useRef

Use React Context for shared authentication state when appropriate.

Do not introduce Redux, Zustand, React Query, or other state management and data-fetching packages unless explicitly approved.

6. Strict Prohibitions

NEVER:

Use MongoDB or Mongoose.
Use Axios.
Use REST API calls for Supabase operations when the SDK provides the required functionality.
Install additional packages without permission.
Expose Supabase service-role or secret keys.
Disable RLS to make frontend queries work.
Put database queries directly into every presentation component.
Assume database tables or columns exist without inspecting the project schema.
7. Final Priority
Existing project architecture.
Installed and approved dependencies.
Supabase JavaScript SDK for data access.
React and TypeScript best practices.
Reusable components and services.
Security, especially Supabase RLS.
Responsive and accessible UI.

Core rule: Use React + TypeScript + Supabase JS SDK. Do not use Axios or MongoDB. Do not introduce unapproved dependencies.