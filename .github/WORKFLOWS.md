# GitHub Workflows Documentation

This document describes the GitHub Actions workflows configured for this project.

[繁體中文](#github-工作流程文件) | [English](#github-workflows-documentation)

## Workflows Overview

### 1. CI (Continuous Integration) - `ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
- **Test**: Runs on multiple OS (Ubuntu, macOS, Windows) with Bun 1.3.4 and latest
  - Type checking
  - Unit tests
  - Build verification
- **Lint**: Code linting and formatting checks
- **Coverage**: Test coverage reporting to Codecov
- **Security**: Security audit
- **Package**: Test npm package installation
- **All Checks**: Ensures all jobs passed

**Badge:**
```markdown
[![CI](https://github.com/CarlLee1983/line-pay-core-v4/actions/workflows/ci.yml/badge.svg)](https://github.com/CarlLee1983/line-pay-core-v4/actions/workflows/ci.yml)
```

### 2. Release - `release.yml`

**Triggers:**
- Push tags matching `v*.*.*` (e.g., `v1.0.0`)

**Jobs:**
- **Validate**: Type check, test, and build
- **Publish to npm**: 
  - Verifies version matches tag
  - Publishes to npm with provenance
- **Create GitHub Release**:
  - Extracts changelog
  - Creates GitHub release with notes
- **Notify**: Reports release status

**Required Secrets:**
- `NPM_TOKEN`: npm authentication token

**Badge:**
```markdown
[![Release](https://github.com/CarlLee1983/line-pay-core-v4/actions/workflows/release.yml/badge.svg)](https://github.com/CarlLee1983/line-pay-core-v4/actions/workflows/release.yml)
```

### 3. PR Labeler - `pr-labeler.yml`

**Triggers:**
- Pull request opened, edited, synchronized, or reopened

**Features:**
- Auto-labels based on file changes (via `labeler.yml`)
- Auto-labels based on PR title (conventional commits)
- Auto-labels PR size (XS, S, M, L, XL)

**Labels Created:**
- Type: `enhancement`, `bug`, `documentation`, `test`, `refactoring`, `performance`, `maintenance`
- Size: `size/XS`, `size/S`, `size/M`, `size/L`, `size/XL`
- Category: `core`, `errors`, `types`, `dependencies`, `ci/cd`, etc.

### 4. CodeQL Security Scan - `codeql.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Schedule: Every Monday at 00:00 UTC

**Features:**
- Analyzes TypeScript code for security vulnerabilities
- Uses security-extended and security-and-quality queries
- Reports findings to GitHub Security tab

**Badge:**
```markdown
[![CodeQL](https://github.com/CarlLee1983/line-pay-core-v4/actions/workflows/codeql.yml/badge.svg)](https://github.com/CarlLee1983/line-pay-core-v4/actions/workflows/codeql.yml)
```

## Dependabot Configuration

Located in `.github/dependabot.yml`

**Features:**
- Weekly dependency updates (Mondays at 09:00 Asia/Taipei)
- npm package updates
- GitHub Actions updates
- Auto-assigns to maintainer
- Auto-labels with `dependencies` and `automated`

## Issue Templates

### Bug Report (`bug_report.yml`)
Structured form for reporting bugs with:
- Description
- Reproduction steps
- Expected vs actual behavior
- Code samples
- Environment details

### Feature Request (`feature_request.yml`)
Structured form for suggesting features with:
- Problem statement
- Proposed solution
- Alternatives considered
- Example usage
- Priority and breaking change assessment

### Configuration (`config.yml`)
- Disables blank issues
- Provides links to Discussions, Documentation, and Security reporting

## Pull Request Template

Located in `.github/PULL_REQUEST_TEMPLATE.md`

**Sections:**
- Description
- Type of change
- Related issues
- Changes made
- Testing checklist
- Code review checklist
- Breaking changes documentation

## Setting Up Secrets

### Required Secrets

1. **NPM_TOKEN** (for releases)
   - Go to [npmjs.com](https://www.npmjs.com/) → Access Tokens
   - Create an Automation token
   - Add to GitHub: Settings → Secrets and variables → Actions → New repository secret

2. **CODECOV_TOKEN** (optional, for coverage)
   - Go to [codecov.io](https://codecov.io/)
   - Add your repository
   - Copy the token
   - Add to GitHub secrets

## Manual Workflow Triggers

### Triggering a Release

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit changes
4. Create and push tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

The release workflow will automatically:
- Run all tests
- Publish to npm
- Create GitHub release

## Monitoring

- **Actions Tab**: View all workflow runs
- **Security Tab**: View CodeQL findings
- **Pull Requests**: Auto-labeled for easy filtering
- **Dependabot**: Automatic dependency updates

## Troubleshooting

### CI Fails on Windows
- Check line endings (CRLF vs LF)
- Verify path separators

### Release Fails
- Verify `NPM_TOKEN` is set
- Check version in `package.json` matches tag
- Ensure tests pass

### Dependabot PRs Not Auto-Merging
- This requires repository settings
- Can be configured with auto-merge rules

## Best Practices

1. **Always create PRs** - Don't push directly to main
2. **Wait for CI** - Ensure all checks pass before merging
3. **Use conventional commits** - Enables auto-labeling
4. **Update CHANGELOG** - Before releasing
5. **Test locally** - Run `bun run typecheck && bun test && bun run build`

---

# GitHub 工作流程文件

本文件說明本專案配置的 GitHub Actions 工作流程。

## 工作流程概覽

### 1. CI（持續整合）- `ci.yml`

**觸發條件：**
- 推送到 `main` 或 `develop` 分支
- 對 `main` 或 `develop` 分支的 Pull Request

**工作：**
- **測試**：在多個作業系統（Ubuntu、macOS、Windows）上執行，使用 Bun 1.3.4 和最新版本
  - 類型檢查
  - 單元測試
  - 構建驗證
- **Lint**：程式碼檢查和格式驗證
- **覆蓋率**：測試覆蓋率報告到 Codecov
- **安全性**：安全性稽核
- **套件**：測試 npm 套件安裝
- **所有檢查**：確保所有工作通過

### 2. 發布 - `release.yml`

**觸發條件：**
- 推送符合 `v*.*.*` 的標籤（例如 `v1.0.0`）

**工作：**
- **驗證**：類型檢查、測試和構建
- **發布到 npm**：
  - 驗證版本與標籤匹配
  - 使用 provenance 發布到 npm
- **建立 GitHub Release**：
  - 提取 changelog
  - 建立 GitHub release 和說明
- **通知**：報告發布狀態

**需要的 Secrets：**
- `NPM_TOKEN`：npm 認證令牌

### 3. PR 自動標籤 - `pr-labeler.yml`

**觸發條件：**
- Pull request 開啟、編輯、同步或重新開啟

**功能：**
- 根據文件變更自動標籤（通過 `labeler.yml`）
- 根據 PR 標題自動標籤（conventional commits）
- 自動標記 PR 大小（XS、S、M、L、XL）

### 4. CodeQL 安全掃描 - `codeql.yml`

**觸發條件：**
- 推送到 `main` 或 `develop` 分支
- 對 `main` 或 `develop` 分支的 Pull Request
- 排程：每週一 00:00 UTC

**功能：**
- 分析 TypeScript 程式碼的安全漏洞
- 使用 security-extended 和 security-and-quality 查詢
- 將發現報告到 GitHub Security 分頁

## 設置 Secrets

### 必需的 Secrets

1. **NPM_TOKEN**（用於發布）
   - 前往 [npmjs.com](https://www.npmjs.com/) → Access Tokens
   - 建立 Automation token
   - 新增到 GitHub：Settings → Secrets and variables → Actions → New repository secret

2. **CODECOV_TOKEN**（可選，用於覆蓋率）
   - 前往 [codecov.io](https://codecov.io/)
   - 新增您的專案
   - 複製令牌
   - 新增到 GitHub secrets

## 手動觸發發布

1. 更新 `package.json` 中的版本
2. 更新 `CHANGELOG.md`
3. 提交變更
4. 建立並推送標籤：
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 最佳實踐

1. **始終建立 PR** - 不要直接推送到 main
2. **等待 CI** - 確保所有檢查通過後再合併
3. **使用 conventional commits** - 啟用自動標籤
4. **更新 CHANGELOG** - 發布前
5. **本地測試** - 執行 `bun run typecheck && bun test && bun run build`
