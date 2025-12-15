# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please report security vulnerabilities by emailing the maintainers directly or using GitHub's private vulnerability reporting feature.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Target**: Within 30 days (depending on complexity)

### Disclosure Policy

- We will acknowledge receipt of your report
- We will investigate and keep you informed of progress
- We will credit you in the security advisory (unless you prefer anonymity)
- We ask that you give us reasonable time to address the issue before public disclosure

## Security Best Practices

When using this package:

1. **Keep dependencies updated**: Regularly update to the latest version
2. **Validate tenant IDs**: Always validate tenant identifiers in your resolver
3. **Use HTTPS**: Ensure tenant headers are transmitted securely
4. **Implement rate limiting**: Protect against tenant enumeration attacks
5. **Log tenant access**: Monitor for suspicious cross-tenant access attempts

## Known Security Considerations

- Tenant identification relies on request data (headers, subdomains, etc.) which can be spoofed
- Always implement additional authorization checks in your application
- Do not rely solely on tenant middleware for security-critical operations

