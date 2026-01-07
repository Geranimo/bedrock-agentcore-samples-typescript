# Security Policy

## Reporting a Vulnerability

If you discover a potential security issue in this project, we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/).

Please do **not** create a public GitHub issue for security vulnerabilities.

## Security Best Practices

When using these examples, please follow these security best practices:

### AWS Credentials

- Never commit AWS credentials to source control
- Use IAM roles with least-privilege permissions
- Rotate credentials regularly
- Use environment variables or AWS credential providers

### Code Execution

- The Code Interpreter runs in isolated environments, but review any code before execution
- Be cautious when executing code from untrusted sources
- Monitor AWS CloudWatch for unusual activity

### Browser Automation

- Be mindful of the websites you automate against
- Respect robots.txt and terms of service
- Avoid storing sensitive data extracted from web pages

### Dependencies

- Keep dependencies up to date
- Review security advisories for dependencies
- Use `npm audit` to check for known vulnerabilities

## Supported Versions

We release patches for security vulnerabilities for the latest version only.

| Version  | Supported          |
| -------- | ------------------ |
| Latest   | :white_check_mark: |
| < Latest | :x:                |
