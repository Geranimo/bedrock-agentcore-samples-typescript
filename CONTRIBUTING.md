# Contributing Guidelines

Thank you for your interest in contributing to AWS Bedrock AgentCore Samples for TypeScript! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs/Feature Requests

We welcome you to use the GitHub issue tracker to report bugs or suggest features.

When filing an issue, please check existing open and closed issues to make sure somebody else hasn't already reported the issue. Please try to include as much information as you can.

### Contributing via Pull Requests

Contributions via pull requests are much appreciated. Before sending us a pull request, please ensure that:

1. You are working against the latest source on the *main* branch.
2. You check existing open, and recently merged, pull requests to make sure someone else hasn't addressed the problem already.
3. You open an issue to discuss any significant work - we would hate for your time to be wasted.

To send us a pull request, please:

1. Fork the repository.
2. Modify the source; please focus on the specific change you are contributing.
3. Ensure local tests pass (`npm test`).
4. Ensure code is properly formatted (`npm run format`).
5. Ensure linting passes (`npm run lint`).
6. Commit to your fork using clear commit messages.
7. Send us a pull request, answering any default questions in the pull request interface.
8. Pay attention to any automated CI failures reported in the pull request, and stay involved in the conversation.

GitHub provides additional documentation on [forking a repository](https://help.github.com/articles/fork-a-repo/) and [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## Adding New Examples

When contributing new examples, please follow these guidelines:

### Structure
- Place examples in the appropriate category folder (`tools/`, `integrations/`, `runtime/`, `identity/`)
- Include a `setup.ts` file if crypto polyfill is needed
- Each example should be self-contained and runnable

### Code Style
- Use TypeScript with strict mode
- Follow existing code patterns in the repository
- Use single quotes for strings
- Include JSDoc comments for functions
- Handle errors gracefully with clear messages

### Documentation
- Include a header comment explaining what the example demonstrates
- Add prerequisites and run commands
- Update the main README.md if adding a new category

### Best Practices
- Include `maxSteps` constraints to prevent runaway token usage
- Add delays between sequential API calls to avoid rate limits
- Always clean up sessions in `finally` blocks
- Provide clear error messages for common failure modes

### Example Template

```typescript
/**
 * [Example Title]
 *
 * This example demonstrates [what it does].
 *
 * Prerequisites:
 * - AWS credentials configured
 * - Access to Claude Sonnet 4 on AWS Bedrock
 *
 * Run with: npx tsx examples/[path]/[filename].ts
 */

/// <reference types="node" />

import './setup.js'

// Your example code here

async function main() {
  try {
    // Example logic
  } catch (error) {
    // Error handling
  } finally {
    // Cleanup
  }
}

main().catch(console.error)
```

## Finding Contributions to Work On

Looking at the existing issues is a great way to find something to contribute on. Issues labeled with 'good first issue' or 'help wanted' are great places to start.

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact opensource-codeofconduct@amazon.com with any additional questions or comments.

## Security Issue Notifications

If you discover a potential security issue in this project, we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public GitHub issue.

## Licensing

See the [LICENSE](LICENSE) file for our project's licensing. We will ask you to confirm the licensing of your contribution.
