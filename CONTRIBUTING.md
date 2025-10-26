# Contributing to PyroSolutions Inc. WebApp

Thank you for your interest in contributing! This guide will help you get set up and understand our development process.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/namen-victor/PYRO_WEBAPP.git
   cd PYRO_WEBAPP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Start local Firebase emulators**
   ```bash
   npm run emulators
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding tests

Examples:
- `feature/add-user-profile-page`
- `fix/resolve-firestore-rules-issue`
- `docs/update-deployment-guide`

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
```
feat(auth): add Google sign-in authentication
fix(contact): prevent duplicate form submissions
docs(readme): update installation instructions
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update relevant documentation

3. **Run checks before committing**
   ```bash
   npm run typecheck
   npm run lint
   npm run test  # When tests are added
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

5. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a PR on GitHub with a clear description.

## Code Style

### TypeScript/React

- Use functional components with hooks
- Prefer TypeScript interfaces over types for object shapes
- Use meaningful variable and function names
- Keep components small and focused (< 200 lines)

### File Organization

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
├── lib/          # Utilities and helpers
├── constants/    # Static data and configurations
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: Match component/function name
- **Variables/Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is updated if needed
- [ ] Branch is up to date with `main`
- [ ] Commit messages follow conventions
- [ ] PR description explains what and why

## Security Guidelines

### Never Commit Secrets

- ❌ API keys
- ❌ Passwords
- ❌ Private tokens
- ❌ Environment files (`.env.local`)

### Always Use

- ✅ Environment variables
- ✅ Firebase Secret Manager for Cloud Functions
- ✅ `.gitignore` for sensitive files
- ✅ `.env.example` for documenting required variables

## Testing

### Running Tests

```bash
npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:e2e      # Run end-to-end tests
```

### Writing Tests

- Unit tests for utilities (`src/lib/*`)
- Integration tests for components
- E2E tests for critical user flows (onboarding, contact)

## Deployment

### Before Deploying

1. Run full test suite
2. Build production version (`npm run build`)
3. Check for console errors
4. Test on local emulators

### Deployment Process

```bash
npm run build
firebase deploy --only hosting
```

For Cloud Functions:
```bash
cd functions
firebase deploy --only functions
```

## Getting Help

- **Documentation**: Check `/docs` folder
- **Security**: See `SECURITY.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Issues**: Open an issue on GitHub

## Code Review Guidelines

### As a Contributor

- Be open to feedback
- Address all review comments
- Keep PRs focused and small (< 400 lines)
- Respond to questions promptly

### As a Reviewer

- Be respectful and constructive
- Focus on code quality and security
- Test the changes if possible
- Approve when ready

## Project Structure

Key files to know:

- `src/app/` - Next.js pages and routes
- `src/components/` - Reusable React components
- `src/lib/` - Utilities, helpers, Firebase config
- `functions/` - Cloud Functions (Node.js)
- `firestore.rules` - Database security rules
- `firebase.json` - Firebase configuration

## Questions?

Feel free to:
- Open an issue for bugs or feature requests
- Ask questions in PR comments
- Contact the maintainers

Happy coding! 🚀

