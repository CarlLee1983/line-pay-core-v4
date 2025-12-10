# NPM 發佈檢查清單

## ✅ package.json 必要欄位已完成

### 基本資訊
- ✅ **name**: `line-pay-core-v4`
- ✅ **version**: `0.1.0` (遵循 Semantic Versioning)
- ✅ **description**: 清楚描述套件用途
- ✅ **license**: `MIT`
- ✅ **keywords**: 包含相關搜尋關鍵字

### 作者資訊
- ✅ **author**: 
  - name: Carl Lee
  - url: https://github.com/CarlLee1983

### 專案連結
- ✅ **repository**: 
  - type: git
  - url: git+https://github.com/CarlLee1983/line-pay-core-v4.git
- ✅ **bugs**: https://github.com/CarlLee1983/line-pay-core-v4/issues
- ✅ **homepage**: https://github.com/CarlLee1983/line-pay-core-v4#readme

### 環境需求
- ✅ **engines**:
  - node: >=18.0.0
  - bun: >=1.3.0

### 入口點
- ✅ **main**: `./dist/index.js`
- ✅ **module**: `src/index.ts`
- ✅ **types**: `./dist/index.d.ts`
- ✅ **exports**: 完整的 ESM exports 配置

### 發佈內容
- ✅ **files**: 
  - dist/ (構建輸出)
  - src/ (源碼)
  - README.md
  - LICENSE

### 腳本
- ✅ **prepublishOnly**: 發佈前自動執行 build

## 📋 發佈前檢查步驟

### 1. 確保構建成功
```bash
bun run build
```

### 2. 執行所有測試
```bash
bun test
```

### 3. 類型檢查
```bash
bun run typecheck
```

### 4. 預覽將要發佈的內容
```bash
npm pack --dry-run
```

### 5. 登入 npm (首次發佈)
```bash
npm login
```

### 6. 發佈到 npm
```bash
# 首次發佈或 public scope
npm publish --access public

# 後續發佈
npm publish
```

### 7. 驗證發佈成功
```bash
npm info line-pay-core-v4
```

## 🔄 版本更新流程

### Patch 版本 (0.1.0 → 0.1.1)
修復 bug、小改進
```bash
npm version patch
npm publish
```

### Minor 版本 (0.1.0 → 0.2.0)
新增功能、向下相容
```bash
npm version minor
npm publish
```

### Major 版本 (0.1.0 → 1.0.0)
重大變更、不向下相容
```bash
npm version major
npm publish
```

## 📦 套件資訊總結

- **套件名稱**: line-pay-core-v4
- **當前版本**: 0.1.0
- **套件大小**: ~8.4 KB (打包後)
- **解壓大小**: ~34.8 KB
- **文件數量**: 17 個文件
- **Registry**: https://www.npmjs.com/package/line-pay-core-v4

## 🔗 相關連結

- GitHub Repository: https://github.com/CarlLee1983/line-pay-core-v4
- Issues: https://github.com/CarlLee1983/line-pay-core-v4/issues
- npm Page: https://www.npmjs.com/package/line-pay-core-v4 (發佈後可用)

## ⚠️ 注意事項

1. 發佈前請確保已提交所有更改到 Git
2. 確保版本號遵循 Semantic Versioning
3. 更新 CHANGELOG.md 記錄變更
4. 確保 README.md 內容正確且完整
5. 測試套件在實際專案中的使用情況
6. 考慮使用 `npm publish --dry-run` 預覽發佈
