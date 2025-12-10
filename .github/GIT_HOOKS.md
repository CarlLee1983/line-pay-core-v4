# Git Hooks Configuration

This project uses Git hooks to ensure code quality before commits.

## Tools

- **simple-git-hooks**: Lightweight Git hooks manager
- **lint-staged**: Run linters on staged files only

## Pre-commit Checks

When you run `git commit`, the following checks will automatically run on staged files:

### For TypeScript files (`*.ts`, `*.tsx`)
- ✅ **Type checking**: `bun run typecheck`

### For Test files (`*.test.ts`, `*.test.tsx`)
- ✅ **Type checking**: `bun run typecheck`
- ✅ **Run tests**: `bun test --bail`

## Setup

Git hooks are automatically installed when you run:

```bash
bun install
```

This triggers the `prepare` script which runs `simple-git-hooks`.

## Manual Installation

If hooks are not installed, run:

```bash
bun run prepare
```

## Skipping Hooks (Emergency Only)

If you need to skip hooks in an emergency (NOT recommended):

```bash
# Skip all hooks for one commit
SKIP_SIMPLE_GIT_HOOKS=1 git commit -m "emergency fix"

# Or use git's native flag
git commit --no-verify -m "emergency fix"
```

⚠️ **Warning**: Only skip hooks when absolutely necessary. CI will still run all checks.

## Configuration Files

### `package.json`

```json
{
  "simple-git-hooks": {
    "pre-commit": "bunx lint-staged"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "bun run typecheck"
    ],
    "*.test.{ts,tsx}": [
      "bun test --bail"
    ]
  }
}
```

### Adding More Checks

To add more checks, edit the `lint-staged` section in `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "bun run typecheck",
      "prettier --check"  // Example: add prettier check
    ],
    "*.{ts,tsx}": [
      "eslint"  // Example: add eslint
    ]
  }
}
```

Then reinstall hooks:

```bash
bun run prepare
```

## How It Works

1. You stage files: `git add .`
2. You commit: `git commit -m "feat: add feature"`
3. Pre-commit hook runs automatically
4. **lint-staged** identifies staged files
5. Runs configured commands only on staged files
6. If all checks pass ✅ → commit succeeds
7. If any check fails ❌ → commit is blocked

## Benefits

✅ **Catch errors early** - Before they reach CI/CD
✅ **Fast feedback** - Only checks staged files
✅ **Consistent quality** - Enforces standards automatically
✅ **Team alignment** - Everyone runs the same checks

## Troubleshooting

### Hooks not running?

```bash
# Reinstall hooks
bun run prepare

# Check if hook exists
ls -la .git/hooks/pre-commit
```

### Type check fails?

```bash
# Run type check manually
bun run typecheck

# Fix type errors before committing
```

### Tests fail?

```bash
# Run tests manually
bun test

# Fix failing tests before committing
```

## Examples

### Successful commit
```bash
$ git add src/LinePayUtils.ts
$ git commit -m "feat: add new utility function"

✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

[main abc1234] feat: add new utility function
 1 file changed, 10 insertions(+)
```

### Failed commit (type error)
```bash
$ git add src/LinePayUtils.ts
$ git commit -m "feat: add new utility function"

✔ Preparing lint-staged...
❯ Running tasks for staged files...
  ❯ *.{ts,tsx} — 1 file
    ✖ bun run typecheck
      src/LinePayUtils.ts:10:5 - error TS2322: Type 'string' is not assignable to type 'number'.
✖ lint-staged failed

# Commit blocked - fix errors first!
```

## Best Practices

1. **Commit frequently** - Small commits are easier to check
2. **Run checks locally** - Don't rely only on pre-commit hooks
3. **Keep hooks fast** - Only essential checks in pre-commit
4. **Full checks in CI** - Pre-commit is first line of defense

## Related

- See [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines
- See [.github/workflows/](./workflows/) for CI/CD configurations
