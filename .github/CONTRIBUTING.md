# Contributing to @pegasusheavy/nestjs-multi-tenant

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 10 or later

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nestjs-multi-tenant.git
   cd nestjs-multi-tenant
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Linting

```bash
# Run ESLint
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Fix formatting
pnpm format
```

### Building

```bash
pnpm build
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/). Each commit message should be structured as:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect the code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or correcting tests
- `chore`: Changes to the build process or auxiliary tools
- `ci`: Changes to CI configuration

### Examples

```
feat(middleware): add JWT-based tenant extraction

fix(guard): handle undefined tenant context gracefully

docs: update README with new examples
```

## Pull Request Process

1. Ensure your code passes all tests and linting
2. Update documentation if you're adding or changing features
3. Add tests for new functionality
4. Fill out the pull request template completely
5. Request review from maintainers

### PR Requirements

- [ ] Tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Code is formatted (`pnpm format:check`)
- [ ] Documentation is updated (if applicable)
- [ ] Commit messages follow conventions

## Reporting Issues

### Bug Reports

- Use the bug report template
- Include reproduction steps
- Provide version information
- Include relevant code snippets

### Feature Requests

- Use the feature request template
- Explain the use case
- Provide example usage if possible

## Questions?

Feel free to open a [discussion](https://github.com/pegasusheavy/nestjs-multi-tenant/discussions) for questions or ideas.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

