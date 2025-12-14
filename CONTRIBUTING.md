# Contributing to Sweet Shop Management System

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## Development Workflow

### 1. Setting Up Development Environment

```bash
# Clone the repository
git clone https://github.com/TouchstoneTheDev/incubyte-v1.git
cd incubyte-v1

# Run setup script
./setup.sh

# Or manually install
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Test-Driven Development (TDD)

This project follows TDD principles. Always:

1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Clean up the code while keeping tests green

Example workflow:
```bash
# Backend TDD
cd backend
npm run test:watch

# Write test in src/tests/
# Write implementation
# Ensure test passes
# Refactor if needed
```

### 4. Code Standards

- **TypeScript**: Use strict typing
- **Naming**: Use descriptive, meaningful names
- **Comments**: Document complex logic
- **Formatting**: Follow existing code style

### 5. Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Build/config changes

### 6. AI Co-Authorship

When using AI tools (GitHub Copilot, ChatGPT, etc.), add co-author:

```bash
git commit -m "feat: Add sweet search functionality

Implemented search with filters for name, category, and price.
Used GitHub Copilot to generate initial query builder logic.

Co-authored-by: GitHub Copilot <copilot@github.com>"
```

### 7. Pull Request Process

1. Ensure all tests pass: `npm test`
2. Update documentation if needed
3. Add screenshots for UI changes
4. Create PR with clear description
5. Link related issues

### 8. Code Review Checklist

- [ ] Tests written and passing
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] No console.log or debugging code
- [ ] Error handling implemented
- [ ] TypeScript types properly defined
- [ ] AI usage documented if applicable

## Testing Guidelines

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch   # Watch mode
```

### Frontend Tests
```bash
cd frontend
npm test            # Run all tests
npm run test:ui     # UI mode
```

### Test Coverage
Maintain minimum 70% coverage:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Project Structure

```
backend/
  src/
    controllers/   # Request handlers
    entities/      # Database models
    services/      # Business logic
    middleware/    # Auth, validation, etc.
    routes/        # API routes
    tests/         # Test files

frontend/
  src/
    components/    # Reusable UI components
    pages/         # Route pages
    services/      # API services
    store/         # State management
```

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

Thank you for contributing! 🍬
