# line-pay-core-v4

[![npm version](https://img.shields.io/npm/v/line-pay-core-v4.svg)](https://www.npmjs.com/package/line-pay-core-v4)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-f9f1e1.svg)](https://bun.sh/)

Core library for LINE Pay API V4 SDK - Provides shared utilities, base client, TypeScript types, and error handling for building LINE Pay integrations.

[繁體中文](./README_ZH.md) | English

## Features

`line-pay-core-v4` is the foundational library for LINE Pay API V4 SDK, offering:

- **🔐 Security First**: Timing-safe signature verification to prevent timing attacks
- **📦 Zero Dependencies**: No runtime dependencies for minimal attack surface
- **🎯 Type Safety**: Full TypeScript support with strict type checking
- **⚡ Performance**: Built with Bun for fast development and testing
- **🛠️ Developer Experience**: Comprehensive error handling and validation

### Core Components

- **LinePayBaseClient**: Base client class for LINE Pay API integration
- **LinePayUtils**: Utility functions for signatures, validation, and parsing
  - HMAC-SHA256 signature generation
  - Timing-safe signature verification
  - Transaction ID format validation (19-digit)
  - Query string building and parsing
- **TypeScript Types**: Complete type definitions and interfaces
- **Error Classes**: Custom error types for better error handling
  - `LinePayError` - Base error class
  - `LinePayTimeoutError` - Request timeout errors
  - `LinePayConfigError` - Configuration errors
  - `LinePayValidationError` - Input validation errors
- **Environment Config**: Configuration management utilities

## Installation

### Using Bun (Recommended)

```bash
bun add line-pay-core-v4
```

### Using npm

```bash
npm install line-pay-core-v4
```

### Using pnpm

```bash
pnpm add line-pay-core-v4
```

### Using yarn

```bash
yarn add line-pay-core-v4
```

## Usage

### Basic Usage

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

// Validate transaction ID
const isValid = LinePayUtils.isValidTransactionId('1234567890123456789')

// Generate signature for API requests
const signature = LinePayUtils.generateSignature(
  channelSecret,
  '/v3/payments/request',
  JSON.stringify(body),
  nonce
)

// Verify webhook signature (timing-safe)
const verified = LinePayUtils.verifySignature(
  channelSecret,
  data,
  receivedSignature
)
```

### Creating a Custom Client

```typescript
import { LinePayBaseClient, type LinePayConfig } from 'line-pay-core-v4'

class MyLinePayClient extends LinePayBaseClient {
  constructor(config: LinePayConfig) {
    super(config)
  }

  // Implement your custom methods
  async customMethod() {
    // Your implementation
  }
}

const client = new MyLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID!,
  channelSecret: process.env.LINE_PAY_CHANNEL_SECRET!,
  env: 'sandbox' // or 'production'
})
```

### Error Handling

```typescript
import {
  LinePayError,
  LinePayValidationError,
  LinePayTimeoutError,
  LinePayConfigError
} from 'line-pay-core-v4'

try {
  // Your LINE Pay operations
} catch (error) {
  if (error instanceof LinePayValidationError) {
    console.error('Validation failed:', error.message)
  } else if (error instanceof LinePayTimeoutError) {
    console.error('Request timeout:', error.message)
  } else if (error instanceof LinePayConfigError) {
    console.error('Configuration error:', error.message)
  } else if (error instanceof LinePayError) {
    console.error('LINE Pay error:', error.message)
  }
}
```

## API Reference

### LinePayUtils

#### `isValidTransactionId(transactionId: string): boolean`

Checks if a transaction ID is valid (19-digit number).

```typescript
const isValid = LinePayUtils.isValidTransactionId('1234567890123456789')
// Returns: true
```

#### `validateTransactionId(transactionId: string): void`

Validates transaction ID format, throws error if invalid.

```typescript
LinePayUtils.validateTransactionId('1234567890123456789')
// Throws error if invalid
```

#### `generateSignature(secret: string, uri: string, body: string, nonce: string, queryString?: string): string`

Generates HMAC-SHA256 signature for LINE Pay API requests.

#### `verifySignature(secret: string, data: string, signature: string): boolean`

Verifies signature using timing-safe comparison to prevent timing attacks.

#### `buildQueryString(params?: Record<string, string>): string`

Builds URL query string from parameters object.

#### `parseConfirmQuery(query: Record<string, string | string[] | undefined>): { transactionId: string; orderId?: string }`

Parses confirmation callback query parameters.

## Development

This project uses [Bun](https://bun.com) as the JavaScript runtime and package manager.

### Install Dependencies

```bash
bun install
```

### Available Scripts

```bash
# Type checking
bun run typecheck

# Build (generate TypeScript declaration files)
bun run build

# Clean build output
bun run clean

# Run tests
bun test

# Development mode
bun run dev

# Full verification
bun run typecheck && bun run build && bun test
```

### Project Structure

```
line-pay-core-v4/
├── src/
│   ├── config/              # Configuration
│   │   ├── types.ts        # Type definitions
│   │   └── env.ts          # Environment config
│   ├── errors/             # Error classes
│   │   └── LinePayError.ts
│   ├── LinePayBaseClient.ts # Base client
│   ├── LinePayUtils.ts      # Utility functions
│   └── index.ts            # Main exports
├── dist/                   # Build output (TypeScript declarations)
├── package.json
├── tsconfig.json
└── README.md
```

## Technology Stack

- **Runtime**: Bun v1.3.4+ / Node.js v18.0.0+
- **Language**: TypeScript 5.9+
- **Build**: TypeScript Compiler (declaration only)
- **Testing**: Bun Test Runner

## Security

Security is a top priority. This library includes:

- **Timing-safe signature verification** using `crypto.timingSafeEqual()`
- **Input validation** for all user inputs
- **Zero runtime dependencies** to minimize attack surface
- **Type safety** with strict TypeScript configuration

For security concerns, please see our [Security Policy](./SECURITY.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`bun test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

[MIT](./LICENSE) © Carl Lee

## Related Projects

- [line-pay-v4-node](https://github.com/CarlLee1983/line-pay-online-v4-node) - LINE Pay Online API V4 SDK for Node.js

## Resources

- [LINE Pay API Documentation](https://pay.line.me/documents/online_v3_en.html)
- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

- 📫 Issues: [GitHub Issues](https://github.com/CarlLee1983/line-pay-core-v4/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/CarlLee1983/line-pay-core-v4/discussions)

---

Made with ❤️ by [Carl Lee](https://github.com/CarlLee1983)
