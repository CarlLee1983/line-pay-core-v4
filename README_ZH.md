# line-pay-core-v4

[![npm version](https://img.shields.io/npm/v/line-pay-core-v4.svg)](https://www.npmjs.com/package/line-pay-core-v4)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-f9f1e1.svg)](https://bun.sh/)

LINE Pay API V4 SDK 核心函式庫 - 提供共用工具、基礎客戶端、TypeScript 類型定義和錯誤處理，用於建構 LINE Pay 整合服務。

繁體中文 | [English](./README.md)

## 功能特色

`line-pay-core-v4` 是 LINE Pay API V4 SDK 的基礎函式庫，提供：

- **🔐 安全優先**: 使用時間安全的簽名驗證防止時序攻擊
- **📦 零依賴**: 無執行時期依賴，最小化攻擊面
- **🎯 型別安全**: 完整的 TypeScript 支援與嚴格型別檢查
- **⚡ 高效能**: 使用 Bun 構建，提供快速的開發與測試體驗
- **🛠️ 開發者體驗**: 完善的錯誤處理與驗證機制

### 核心元件

- **LinePayBaseClient**: LINE Pay API 整合的基礎客戶端類別
- **LinePayUtils**: 簽名、驗證和解析的工具函數
  - HMAC-SHA256 簽名生成
  - 時間安全的簽名驗證
  - 交易 ID 格式驗證（19 位數字）
  - Query string 建構與解析
- **TypeScript 類型**: 完整的類型定義和介面
- **錯誤類別**: 自定義錯誤類型，提供更好的錯誤處理
  - `LinePayError` - 基礎錯誤類別
  - `LinePayTimeoutError` - 請求逾時錯誤
  - `LinePayConfigError` - 配置錯誤
  - `LinePayValidationError` - 輸入驗證錯誤
- **環境配置**: 配置管理工具

## 安裝

### 使用 Bun（推薦）

```bash
bun add line-pay-core-v4
```

### 使用 npm

```bash
npm install line-pay-core-v4
```

### 使用 pnpm

```bash
pnpm add line-pay-core-v4
```

### 使用 yarn

```bash
yarn add line-pay-core-v4
```

## 使用方式

### 基本使用

```typescript
import {
  LinePayBaseClient,
  LinePayUtils,
  type LinePayConfig,
  LinePayError,
  LinePayConfigError,
  LinePayValidationError,
  LinePayTimeoutError
} from 'line-pay-core-v4'

// 驗證交易 ID
const isValid = LinePayUtils.isValidTransactionId('1234567890123456789')

// 生成 API 請求的簽名
const signature = LinePayUtils.generateSignature(
  channelSecret,
  '/v3/payments/request',
  JSON.stringify(body),
  nonce
)

// 驗證 webhook 簽名（時間安全）
const verified = LinePayUtils.verifySignature(
  channelSecret,
  data,
  receivedSignature
)
```

### 創建自定義客戶端

```typescript
import { LinePayBaseClient, type LinePayConfig } from 'line-pay-core-v4'

class MyLinePayClient extends LinePayBaseClient {
  constructor(config: LinePayConfig) {
    super(config)
  }

  // 實作您的自定義方法
  async customMethod() {
    // 您的實作
  }
}

const client = new MyLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID!,
  channelSecret: process.env.LINE_PAY_CHANNEL_SECRET!,
  env: 'sandbox' // 或 'production'
})
```

### 錯誤處理

```typescript
import {
  LinePayError,
  LinePayValidationError,
  LinePayTimeoutError,
  LinePayConfigError
} from 'line-pay-core-v4'

try {
  // 您的 LINE Pay 操作
} catch (error) {
  if (error instanceof LinePayValidationError) {
    console.error('驗證失敗:', error.message)
  } else if (error instanceof LinePayTimeoutError) {
    console.error('請求逾時:', error.message)
  } else if (error instanceof LinePayConfigError) {
    console.error('配置錯誤:', error.message)
  } else if (error instanceof LinePayError) {
    console.error('LINE Pay 錯誤:', error.message)
  }
}
```

## API 參考

### LinePayUtils

#### `isValidTransactionId(transactionId: string): boolean`

檢查交易 ID 是否有效（19 位數字）。

```typescript
const isValid = LinePayUtils.isValidTransactionId('1234567890123456789')
// 回傳: true
```

#### `validateTransactionId(transactionId: string): void`

驗證交易 ID 格式，格式無效時拋出錯誤。

```typescript
LinePayUtils.validateTransactionId('1234567890123456789')
// 格式無效時拋出錯誤
```

#### `generateSignature(secret: string, uri: string, body: string, nonce: string, queryString?: string): string`

為 LINE Pay API 請求生成 HMAC-SHA256 簽名。

#### `verifySignature(secret: string, data: string, signature: string): boolean`

使用時間安全比較驗證簽名，防止時序攻擊。

#### `buildQueryString(params?: Record<string, string>): string`

從參數物件建構 URL query string。

#### `parseConfirmQuery(query: Record<string, string | string[] | undefined>): { transactionId: string; orderId?: string }`

解析確認回調的 query 參數。

## 開發

本專案使用 [Bun](https://bun.com) 作為 JavaScript 執行環境和套件管理器。

### 安裝依賴

```bash
bun install
```

### 可用腳本

```bash
# 類型檢查
bun run typecheck

# 構建（生成 TypeScript 宣告文件）
bun run build

# 清理構建輸出
bun run clean

# 執行測試
bun test

# 開發模式
bun run dev

# 完整驗證
bun run typecheck && bun run build && bun test
```

### 專案結構

```
line-pay-core-v4/
├── src/
│   ├── config/              # 配置相關
│   │   ├── types.ts        # 類型定義
│   │   └── env.ts          # 環境配置
│   ├── errors/             # 錯誤類別
│   │   └── LinePayError.ts
│   ├── LinePayBaseClient.ts # 基礎客戶端
│   ├── LinePayUtils.ts      # 工具函數
│   └── index.ts            # 主要導出
├── dist/                   # 構建輸出（TypeScript 宣告文件）
├── package.json
├── tsconfig.json
└── README.md
```

## 技術棧

- **執行環境**: Bun v1.3.4+ / Node.js v18.0.0+
- **程式語言**: TypeScript 5.9+
- **構建工具**: TypeScript Compiler（僅宣告文件）
- **測試工具**: Bun Test Runner

## 安全性

安全性是最高優先級。本函式庫包含：

- **時間安全的簽名驗證**，使用 `crypto.timingSafeEqual()`
- **輸入驗證**，對所有使用者輸入進行驗證
- **零執行時期依賴**，最小化攻擊面
- **型別安全**，使用嚴格的 TypeScript 配置

有關安全性問題，請參閱我們的[安全政策](./SECURITY.md)。

## 貢獻

歡迎貢獻！請隨時提交 Pull Request。對於重大變更，請先開啟 issue 討論您想要變更的內容。

### 開發工作流程

1. Fork 本專案
2. 創建您的功能分支（`git checkout -b feature/amazing-feature`）
3. 進行您的變更
4. 執行測試（`bun test`）
5. 提交您的變更（`git commit -m 'Add some amazing feature'`）
6. 推送到分支（`git push origin feature/amazing-feature`）
7. 開啟 Pull Request

## 授權條款

[MIT](./LICENSE) © Carl Lee

## 相關專案

- [line-pay-v4-node](https://github.com/CarlLee1983/line-pay-online-v4-node) - LINE Pay Online API V4 SDK for Node.js

## 資源

- [LINE Pay API 文件](https://pay.line.me/documents/online_v3_en.html)
- [Bun 文件](https://bun.sh/docs)
- [TypeScript 文件](https://www.typescriptlang.org/docs/)

## 支援

- 📫 問題回報：[GitHub Issues](https://github.com/CarlLee1983/line-pay-core-v4/issues)
- 💬 討論區：[GitHub Discussions](https://github.com/CarlLee1983/line-pay-core-v4/discussions)

---

由 [Carl Lee](https://github.com/CarlLee1983) 用 ❤️ 製作
