# ChatSphere Coding Standards

This document outlines the coding standards and best practices to be followed during the development of the ChatSphere platform.

## General Principles

1. **Readability**: Code should be written for humans first, machines second.
2. **Simplicity**: Simple solutions are preferred over complex ones.
3. **Consistency**: Follow established patterns and conventions throughout the codebase.
4. **Testability**: Code should be designed to be easily testable.
5. **Documentation**: Code should be self-documenting where possible, with explicit documentation as needed.

## Code Organization

### Project Structure

- Follow the established project structure
- Organize code by feature rather than by type
- Keep related files close to each other
- Use meaningful file and directory names

### File Organization

- Each file should have a single responsibility
- Files should not exceed 400 lines (soft limit)
- Classes should not exceed 200 lines (soft limit)
- Functions should not exceed 50 lines (soft limit)

## Naming Conventions

### Python (Backend)

- **Classes**: `CamelCase`
- **Functions/Methods**: `snake_case`
- **Variables**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`
- **Modules**: `snake_case`
- **Private methods/attributes**: Prefixed with underscore (`_private_method`)

### JavaScript/Vue.js (Frontend)

- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase` (depending on context)
- **Files**: 
  - Vue components: `PascalCase.vue`
  - JavaScript utilities: `camelCase.js`
- **Properties**: `camelCase`

### HTML/CSS

- **Classes**: `kebab-case`
- **IDs**: `kebab-case`
- **Custom elements**: `kebab-case`

## Code Style

### Python

- Follow [PEP 8](https://pep8.org/) standards
- Use type hints for function parameters and return values
- Use docstrings for public APIs (following [Google style](https://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html))
- Maximum line length: 100 characters

### JavaScript/Vue.js

- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ES6+ features
- Use async/await over promises where appropriate
- Maximum line length: 100 characters
- Vue.js:
  - Prefer Composition API over Options API
  - Use SFCs (Single File Components)
  - Follow Vue.js style guide priority A and B rules

### SQL

- Table names: `snake_case`, plural
- Column names: `snake_case`
- Primary keys: `id`
- Foreign keys: `{table_name_singular}_id`

## API Design

- Follow RESTful principles
- Use plural nouns for resources (e.g., `/api/users/`)
- Use nested resources for relationships (e.g., `/api/bots/{id}/conversations/`)
- Use HTTP methods appropriately
- Use consistent response formats

## Documentation

- Document all public APIs
- Document complex logic with inline comments
- Keep documentation up-to-date with code changes
- Document architectural decisions

## Testing

### Backend

- Write unit tests for all business logic
- Write integration tests for API endpoints
- Aim for >80% test coverage
- Follow the AAA pattern (Arrange, Act, Assert)

### Frontend

- Write unit tests for components
- Write integration tests for critical user flows
- Test user interactions and UI states

## Version Control

- Follow the [GitHub Flow](https://guides.github.com/introduction/flow/) branching model
- Branch naming: `feature/description`, `bugfix/description`, `hotfix/description`
- Write descriptive commit messages:
  - Use the imperative mood ("Add feature" not "Added feature")
  - Keep first line under 50 characters
  - Explain what and why, not how
- Create pull requests for all changes
- Require at least one code review before merging

## Security

- Never commit secrets or credentials
- Validate all user inputs
- Use parameterized queries for database access
- Follow the principle of least privilege
- Protect against OWASP Top 10 vulnerabilities

## Performance

- Optimize queries for database operations
- Use caching where appropriate
- Minimize API calls from the frontend
- Optimize assets for production

## Accessibility

- Follow WCAG 2.1 AA standards
- Ensure proper contrast ratios
- Provide alternative text for images
- Ensure keyboard navigability
- Use semantic HTML elements

---

These standards should evolve over time. Propose changes via pull requests to this document. 