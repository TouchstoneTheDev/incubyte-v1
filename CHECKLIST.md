# Development Checklist

Use this checklist to ensure quality and completeness for each feature.

## 📋 Feature Development Checklist

### Planning Phase
- [ ] Feature clearly defined and scoped
- [ ] Requirements documented
- [ ] Database schema changes identified (if any)
- [ ] API endpoints designed (if any)
- [ ] UI mockups created (if any)
- [ ] Edge cases considered

### TDD - Red Phase (Write Tests)
- [ ] Unit tests written and failing
- [ ] Test cases cover:
  - [ ] Happy path
  - [ ] Error cases
  - [ ] Edge cases
  - [ ] Boundary conditions
- [ ] Tests are meaningful and specific
- [ ] Test commit message follows convention

### TDD - Green Phase (Implementation)
- [ ] Code written to pass tests
- [ ] All tests now passing
- [ ] Minimal code written (no over-engineering)
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Implementation commit with AI co-author (if used)

### TDD - Refactor Phase
- [ ] Code cleaned and optimized
- [ ] DRY principle applied
- [ ] SOLID principles followed
- [ ] Comments added for complex logic
- [ ] TypeScript types properly defined
- [ ] No code smells remaining
- [ ] Tests still passing after refactor
- [ ] Refactor commit made

### Testing & Quality
- [ ] All unit tests passing
- [ ] Integration tests added (if applicable)
- [ ] Test coverage ≥ 70%
- [ ] Manual testing completed
- [ ] Error scenarios tested
- [ ] Performance acceptable

### Security Review
- [ ] No sensitive data exposed
- [ ] Input validated and sanitized
- [ ] Authentication checked (if protected route)
- [ ] Authorization verified (if role-based)
- [ ] SQL injection prevented
- [ ] XSS prevention applied
- [ ] No hardcoded secrets

### Documentation
- [ ] Code commented where necessary
- [ ] README updated (if needed)
- [ ] API documentation updated (if API changed)
- [ ] CHANGELOG updated
- [ ] Inline documentation for complex functions
- [ ] AI usage documented (if applicable)

### Git & Version Control
- [ ] Commits follow conventional format
- [ ] Commit messages are clear and descriptive
- [ ] AI co-authors attributed properly
- [ ] No sensitive data in commits
- [ ] Commits are atomic and focused
- [ ] Branch up to date with main

### Before Pull Request
- [ ] All tests passing locally
- [ ] Code linted (no errors)
- [ ] TypeScript compiles without errors
- [ ] No console.log statements left
- [ ] No commented-out code
- [ ] Dependencies up to date
- [ ] Environment variables documented

### Pull Request
- [ ] PR title is clear and descriptive
- [ ] PR description explains what and why
- [ ] Screenshots added (for UI changes)
- [ ] Related issues linked
- [ ] Reviewers assigned
- [ ] Labels added

## 🔧 Code Quality Checklist

### TypeScript
- [ ] No `any` types used (or justified)
- [ ] Proper interfaces/types defined
- [ ] Null/undefined handled properly
- [ ] Type guards used where needed
- [ ] Generic types used appropriately

### Functions
- [ ] Single responsibility principle
- [ ] Clear and descriptive names
- [ ] Maximum 20 lines (ideally)
- [ ] No more than 3 parameters
- [ ] Return type specified
- [ ] Error handling implemented

### Components (Frontend)
- [ ] Single responsibility
- [ ] Props properly typed
- [ ] State minimized
- [ ] No business logic in components
- [ ] Reusable where possible
- [ ] Accessibility considered

### API Endpoints (Backend)
- [ ] RESTful conventions followed
- [ ] Proper HTTP status codes
- [ ] Error responses consistent
- [ ] Request validation
- [ ] Response formatting consistent
- [ ] Authentication/authorization applied

### Database
- [ ] Queries optimized
- [ ] Indexes used appropriately
- [ ] No N+1 queries
- [ ] Transactions used where needed
- [ ] Proper error handling

## 🎨 UI/UX Checklist (Frontend)

### Design
- [ ] Follows design system/guidelines
- [ ] Consistent with existing pages
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Empty states designed

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels added
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Screen reader friendly

### User Experience
- [ ] Intuitive navigation
- [ ] Clear call-to-actions
- [ ] Helpful error messages
- [ ] Success feedback provided
- [ ] No unnecessary steps
- [ ] Fast and responsive

## 🚀 Pre-Deployment Checklist

### Environment
- [ ] Environment variables configured
- [ ] Secrets not in code
- [ ] Production config ready
- [ ] Database migrations ready
- [ ] CORS configured correctly

### Security
- [ ] HTTPS enforced (production)
- [ ] Security headers set
- [ ] Rate limiting configured
- [ ] Input validation everywhere
- [ ] Authentication secure
- [ ] Passwords hashed properly

### Performance
- [ ] Images optimized
- [ ] Bundle size acceptable
- [ ] Database queries optimized
- [ ] Caching strategy implemented
- [ ] CDN configured (if applicable)

### Monitoring
- [ ] Error tracking setup
- [ ] Logging implemented
- [ ] Health check endpoint
- [ ] Performance monitoring
- [ ] Alerts configured

### Documentation
- [ ] Deployment guide updated
- [ ] Environment variables documented
- [ ] API documentation complete
- [ ] Troubleshooting guide available
- [ ] Architecture documented

## 📝 Review Checklist (For Reviewers)

### Code Review
- [ ] Logic is correct
- [ ] Tests are comprehensive
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Code is readable
- [ ] Documentation is clear

### Testing
- [ ] Manual testing performed
- [ ] Edge cases verified
- [ ] Error scenarios checked
- [ ] Cross-browser tested (frontend)
- [ ] Mobile tested (frontend)

### Standards
- [ ] Follows project conventions
- [ ] Consistent with codebase
- [ ] AI usage properly attributed
- [ ] Commit messages clear
- [ ] Documentation updated

## 🐛 Bug Fix Checklist

### Investigation
- [ ] Bug reproduced locally
- [ ] Root cause identified
- [ ] Impact assessed
- [ ] Related issues checked

### Fix
- [ ] Test written to catch bug
- [ ] Fix implemented
- [ ] Test now passing
- [ ] Regression tests run
- [ ] Manual verification done

### Documentation
- [ ] Issue linked in commit
- [ ] Fix explained in PR
- [ ] CHANGELOG updated
- [ ] Known issues updated (if needed)

## 🔄 Refactoring Checklist

### Before
- [ ] Tests exist and passing
- [ ] Scope clearly defined
- [ ] Reason documented
- [ ] Approach planned

### During
- [ ] Tests still passing
- [ ] Behavior unchanged
- [ ] Code simplified
- [ ] Performance maintained or improved

### After
- [ ] All tests passing
- [ ] Documentation updated
- [ ] No functionality broken
- [ ] Code more maintainable

## Quick Daily Checklist

Start of day:
- [ ] Pull latest changes
- [ ] Review assigned issues
- [ ] Check CI/CD status
- [ ] Plan daily tasks

End of day:
- [ ] Commit all work
- [ ] Push to remote
- [ ] Update task status
- [ ] Document blockers

## Notes

- Use this checklist as a guide, not a rigid rule
- Adapt based on the feature/fix size
- Check off items as you complete them
- Add items specific to your task
- Review before submitting PR

---

Remember: Quality over speed. Taking time to check these items will save time debugging later! ✨
