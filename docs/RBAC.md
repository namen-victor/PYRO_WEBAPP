# Role-Based Access Control (RBAC)

| Role   | Collection              | Read | Write | Notes |
|--------|-------------------------|------|-------|-------|
| Client | users/{self}            | ✓    | ✓     | Own document only |
| Client | applications/{self}     | ✓    | ✓     | Own applications |
| Client | messages/{involving}    | ✓    | ✓     | Send/receive only |
| Staff  | users/*                 | ✓    | ✗     | Read-only user data |
| Staff  | applications/{assigned} | ✓    | ✓     | Assigned only |
| Staff  | messages/{involving}    | ✓    | ✓     | Where sender or recipient |
| Admin  | users/*                 | ✓    | ✓     | Full access |
| Admin  | applications/*          | ✓    | ✓     | Full access |
| Admin  | notifications/*         | ✓    | ✓     | Full access |

- Server-side enforcement via Firestore rules.
- Client-side guard via `src/middleware.ts` and UI checks.
