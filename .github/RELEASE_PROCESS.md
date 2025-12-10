# Release Workflows 說明

本專案提供兩種 release 方式，您可以根據需求選擇使用。

## 方式一：自動化 Release (release-please) ✨ 推薦

### 📝 工作流程

1. **提交代碼時使用 Conventional Commits**
   ```bash
   git commit -m "feat: add new payment method"
   git commit -m "fix: resolve timeout issue"
   git commit -m "docs: update API documentation"
   ```

2. **推送到 main/master 分支**
   ```bash
   git push origin master
   ```

3. **release-please 自動創建 Release PR**
   - 自動分析 commits
   - 自動決定版本號（major/minor/patch）
   - 自動更新 `CHANGELOG.md`
   - 自動更新 `package.json` 版本
   - 創建 Release PR

4. **審核並合併 Release PR**
   - 檢查 CHANGELOG 和版本號
   - 合併 PR 後自動：
     - 創建 Git tag
     - 創建 GitHub Release
     - 發布到 npm

### ✨ 優點

- ✅ 完全自動化，減少人為錯誤
- ✅ 自動管理版本號（語義化版本）
- ✅ 自動生成和維護 CHANGELOG
- ✅ 支持 Conventional Commits
- ✅ 可以在 PR 中預覽 changelog

### 📋 Conventional Commits 規範

| Type | 說明 | 版本影響 | Emoji |
|------|------|----------|-------|
| `feat` | 新功能 | minor | ✨ |
| `fix` | Bug 修復 | patch | 🐛 |
| `perf` | 性能改進 | patch | ⚡ |
| `refactor` | 重構 | patch | ♻️ |
| `docs` | 文檔變更 | patch | 📝 |
| `test` | 測試相關 | - | ✅ |
| `build` | 構建系統| - | 🏗️ |
| `ci` | CI/CD 變更 | - | 👷 |
| `chore` | 其他雜項 | - | 🔧 |
| `style` | 代碼格式 | - | 💄 |
| `revert` | 回退變更 | - | ⏪ |

**Breaking Changes:**
```bash
git commit -m "feat!: redesign API interface

BREAKING CHANGE: API interface has been redesigned"
```
這將觸發 major 版本升級（例如 1.0.0 → 2.0.0）

### 🔄 Release Please 流程圖

```
提交代碼 (Conventional Commits)
    ↓
推送到 master
    ↓
release-please 分析 commits
    ↓
創建/更新 Release PR
    ↓
審核 PR (查看 CHANGELOG 和版本)
    ↓
合併 PR
    ↓
自動創建 tag & GitHub Release
    ↓
自動發布到 npm
```

---

## 方式二：手動 Release (原有方式)

### 📝 工作流程

1. **手動更新版本號**
   ```bash
   # 編輯 package.json，更新 version
   # 編輯 CHANGELOG.md，添加新版本說明
   ```

2. **提交變更**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release v1.1.0"
   git push origin master
   ```

3. **手動創建 tag**
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

4. **自動觸發 release workflow**
   - 驗證代碼
   - 發布到 npm
   - 創建 GitHub Release

### 缺點

- ❌ 需要手動管理版本號
- ❌ 需要手動維護 CHANGELOG
- ❌ 容易出現版本不一致
- ❌ 人為錯誤風險較高

---

## 🎯 推薦使用方式

### 選擇 release-please 的理由：

1. **自動化**: 減少手動操作，避免錯誤
2. **語義化版本**: 自動根據 commit 類型決定版本號
3. **CHANGELOG 管理**: 自動生成美觀的 changelog
4. **可追溯性**: 每個 release 都有對應的 PR 記錄
5. **團隊協作**: PR 審核機制，團隊可以一起確認 release 內容

### 使用步驟：

#### 1. 確保使用 Conventional Commits

安裝 commitizen (可選，幫助生成規範的 commit)：
```bash
bun add -d commitizen cz-conventional-changelog
```

在 `package.json` 添加：
```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

使用：
```bash
git add .
bun run commit  # 交互式生成 commit message
```

#### 2. 正常開發和提交

```bash
git commit -m "feat: add new signature verification method"
git commit -m "fix: resolve timeout handling issue"
git commit -m "docs: improve JSDoc for LinePayUtils"
git push origin master
```

#### 3. 等待 release-please 創建 PR

- 每次推送後，release-please 會分析 commits
- 如果有需要發布的變更，會自動創建/更新 Release PR
- PR 標題：`chore: release 1.1.0`

#### 4. 審核並合併 Release PR

- 檢查 CHANGELOG.md 的變更
- 確認版本號正確
- 合併 PR

#### 5. 自動發布

- 合併後自動創建 tag
- 自動創建 GitHub Release
- 自動發布到 npm

---

## 🔧 配置文件

### `.release-please-config.json`
定義 release-please 的行為和 changelog 格式。

### `.release-please-manifest.json`
追蹤當前版本，release-please 使用此文件管理版本狀態。

### `.github/workflows/release-please.yml`
定義自動化 release 流程。

### `.github/workflows/release.yml`
保留用於手動 tag 觸發的發布（向後兼容）。

---

## 🚀 立即開始使用 release-please

1. **確保配置文件已添加到 git**
   ```bash
   git add .release-please-config.json
   git add .release-please-manifest.json
   git add .github/workflows/release-please.yml
   git commit -m "ci: add release-please workflow"
   git push origin master
   ```

2. **開始使用 Conventional Commits**
   ```bash
   git commit -m "feat: your new feature"
   git push origin master
   ```

3. **等待 Release PR 出現**
   - 查看 GitHub Pull Requests
   - 會看到自動創建的 Release PR

4. **審核並合併**
   - 檢查 changelog
   - 合併 PR
   - 自動發布！

---

## 📊 兩種方式對比

| 特性 | release-please | 手動 tag |
|------|----------------|----------|
| 版本管理 | 自動 | 手動 |
| CHANGELOG | 自動生成 | 手動編寫 |
| PR 審核 | 有 | 無 |
| 錯誤風險 | 低 | 中 |
| 學習曲線 | 需要了解 Conventional Commits | 簡單 |
| 適用場景 | 持續開發、團隊協作 | 快速發布、單人項目 |

---

## ❓ FAQ

### Q: release-please 何時創建 Release PR？
A: 當推送包含以下類型的 commit 時：
- `feat`: 新功能（會增加 minor 版本）
- `fix`: Bug 修復（會增加 patch 版本）
- `feat!` 或 `BREAKING CHANGE`: 破壞性變更（會增加 major 版本）

### Q: 如果我不想發布怎麼辦？
A: 不要合併 Release PR，它會持續更新，累積所有未發布的變更。

### Q: 可以手動調整版本號嗎？
A: 可以，在 Release PR 中編輯 `package.json` 和 `.release-please-manifest.json`。

### Q: 兩種方式可以共存嗎？
A: 可以，但建議只使用一種。如果使用 release-please，建議移除或禁用手動 tag 的 workflow。

### Q: 如何跳過某些 commit？
A: 使用不觸發版本升級的類型（如 `docs`, `test`, `chore`），或在 commit message 中使用 `[skip ci]`。

---

## 📚 更多資源

- [release-please 文檔](https://github.com/googleapis/release-please)
- [Conventional Commits 規範](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
