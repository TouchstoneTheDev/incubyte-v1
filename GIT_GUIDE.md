# Git Configuration Guide

This guide helps you set up Git for this project with proper commit message templates and AI co-authorship.

## Setup Commit Message Template

To use the provided commit message template:

```bash
# Set the template for this repository
git config commit.template .gitmessage

# Or set it globally for all repositories
git config --global commit.template ~/.gitmessage
cp .gitmessage ~/.gitmessage
```

## Making Commits with AI Co-Authorship

### Using the Template

When you commit, Git will open your editor with the template:

```bash
git add .
git commit
```

Your editor will show the template. Follow the format and remember to add AI co-authors if applicable.

### Quick Commits with AI Attribution

For simple commits:

```bash
# With GitHub Copilot
git commit -m "feat: Add sweet search endpoint

Implemented search with name and category filters.

Co-authored-by: GitHub Copilot <copilot@github.com>"

# With ChatGPT
git commit -m "fix: Resolve authentication middleware bug

Fixed token validation logic.

Co-authored-by: ChatGPT <chatgpt@openai.com>"
```

## AI Co-Author Formats

Use these exact formats for consistency:

```
Co-authored-by: GitHub Copilot <copilot@github.com>
Co-authored-by: ChatGPT <chatgpt@openai.com>
Co-authored-by: Claude <claude@anthropic.com>
Co-authored-by: GPT-4 <gpt4@openai.com>
```

## Commit Message Examples for This Project

### Feature Development

```bash
git commit -m "feat(auth): Implement JWT authentication

- Added JWT token generation
- Implemented token verification middleware
- Added role-based access control

Used GitHub Copilot for boilerplate code generation.

Co-authored-by: GitHub Copilot <copilot@github.com>"
```

### Test Creation (TDD)

```bash
git commit -m "test(sweet): Add CRUD operation tests

Red phase - Created failing tests for:
- Creating sweets
- Updating sweets
- Deleting sweets

Co-authored-by: GitHub Copilot <copilot@github.com>"

# Then after implementation:
git commit -m "feat(sweet): Implement CRUD operations

Green phase - Implemented functionality to pass tests:
- POST /api/sweets
- PUT /api/sweets/:id
- DELETE /api/sweets/:id

Co-authored-by: GitHub Copilot <copilot@github.com>"

# Then after cleanup:
git commit -m "refactor(sweet): Clean up controller code

Refactor phase - Improved code quality:
- Extracted validation logic
- Added better error messages
- Improved code organization"
```

### Bug Fixes

```bash
git commit -m "fix(purchase): Validate quantity before purchase

Fixed issue where users could purchase more than available stock.

Added validation:
- Check if quantity > 0
- Check if quantity <= sweet.quantity
- Return 400 error with clear message

Fixes #42

Co-authored-by: ChatGPT <chatgpt@openai.com>"
```

### Documentation

```bash
git commit -m "docs: Add API documentation and examples

- Documented all API endpoints
- Added request/response examples
- Updated README with setup instructions

Co-authored-by: ChatGPT <chatgpt@openai.com>"
```

### Refactoring

```bash
git commit -m "refactor: Extract authentication logic to service

Moved password hashing and JWT generation from controller
to AuthService for better separation of concerns.

Discussed architecture with ChatGPT.

Co-authored-by: ChatGPT <chatgpt@openai.com>"
```

## Viewing Commits with Co-Authors

```bash
# View commit history with co-authors
git log --pretty=full

# Or use a custom format
git log --pretty=format:"%h - %an, %cn: %s" --graph

# Search for AI-assisted commits
git log --all --grep="Co-authored-by: GitHub Copilot"
```

## Best Practices

### When to Add AI Co-Author

Add AI co-author when:
- ✅ AI generated significant code
- ✅ AI suggested the approach/solution
- ✅ AI helped debug an issue
- ✅ AI generated tests
- ✅ AI created documentation

Don't add AI co-author when:
- ❌ You only used it for simple autocomplete
- ❌ You completely rewrote AI suggestions
- ❌ AI's contribution was minimal

### Commit Frequency

For TDD workflow:
1. Commit after writing failing test (Red)
2. Commit after making test pass (Green)
3. Commit after refactoring (Refactor)

```bash
git commit -m "test: Add user registration validation test (Red)"
git commit -m "feat: Implement user registration (Green)"
git commit -m "refactor: Extract validation to middleware (Refactor)"
```

### Multiple Co-Authors

If you used multiple AI tools:

```bash
git commit -m "feat: Complete authentication system

Implemented full auth flow with registration, login, and JWT.

Used GitHub Copilot for code generation and ChatGPT
for architectural decisions.

Co-authored-by: GitHub Copilot <copilot@github.com>
Co-authored-by: ChatGPT <chatgpt@openai.com>"
```

## Git Aliases for Common Operations

Add these to your `.gitconfig` for faster commits:

```bash
# Add aliases
git config alias.cai 'commit -v'  # Commit with template (AI)
git config alias.cam 'commit -am' # Commit all modified
git config alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

Usage:
```bash
git cai  # Opens editor with template
git cam "fix: Quick bug fix"
git lg   # Pretty log view
```

## Amending Commits

If you forgot to add AI co-author:

```bash
# Amend the last commit
git commit --amend

# Add co-author line in the editor and save
```

## Checking AI Attribution

Review your commits for proper AI attribution:

```bash
# Count commits with AI attribution
git log --all --oneline | grep -i "co-authored" | wc -l

# List all AI-assisted commits
git log --all --grep="Co-authored-by" --oneline

# Detailed view
git log --all --grep="Co-authored-by" --pretty=full
```

## GitHub Integration

On GitHub, co-authors will:
- ✅ Appear in commit details
- ✅ Be counted in contributor stats
- ✅ Show proper attribution
- ✅ Maintain transparency

## Questions?

- Check the [CONTRIBUTING.md](CONTRIBUTING.md)
- Review commit history for examples
- See `.gitmessage` template

---

Remember: Transparency in AI usage is not just ethical—it's a professional practice that helps everyone understand the development process better. 🤖🤝👨‍💻
