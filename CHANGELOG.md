# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.1.0...v1.2.0) (2025-12-10)


### ✨ Features

* initial release v1.0.0 ([07ff6e7](https://github.com/CarlLee1983/line-pay-core-v4/commit/07ff6e7c550bba419d47bb2bcce2ed3e2915f40e))


### 👷 CI/CD

* Implement automated release and npm publishing with release-please configuration and workflow. ([8722340](https://github.com/CarlLee1983/line-pay-core-v4/commit/8722340f870f1935db9607c89fd10e662969a0b7))


### 🔧 Chores

* add Biome for linting/formatting and configure Release Please for automated releases. ([9970e51](https://github.com/CarlLee1983/line-pay-core-v4/commit/9970e513c9b6abc458c031d8a8aee94f7befa6a2))
* configure release-please to include 'v' in tags and exclude component name.chore: configure release-please to include 'v' in tags and exclude component name. ([8765366](https://github.com/CarlLee1983/line-pay-core-v4/commit/87653666cbdbd64fa8d1aeac8fb94547490fa0bc))
* **master:** release line-pay-core-v4 1.1.0 ([45eed8c](https://github.com/CarlLee1983/line-pay-core-v4/commit/45eed8cc0d6fdcd6987e79a2b72984968f5d821b))
* **master:** release line-pay-core-v4 1.1.0 ([88a0fd5](https://github.com/CarlLee1983/line-pay-core-v4/commit/88a0fd5f66219393f796240e1e1024a4caecc7ef))

## [1.1.0](https://github.com/CarlLee1983/line-pay-core-v4/compare/line-pay-core-v4-v1.0.0...line-pay-core-v4-v1.1.0) (2025-12-10)


### ✨ Features

* initial release v1.0.0 ([07ff6e7](https://github.com/CarlLee1983/line-pay-core-v4/commit/07ff6e7c550bba419d47bb2bcce2ed3e2915f40e))


### 👷 CI/CD

* Implement automated release and npm publishing with release-please configuration and workflow. ([8722340](https://github.com/CarlLee1983/line-pay-core-v4/commit/8722340f870f1935db9607c89fd10e662969a0b7))


### 🔧 Chores

* add Biome for linting/formatting and configure Release Please for automated releases. ([9970e51](https://github.com/CarlLee1983/line-pay-core-v4/commit/9970e513c9b6abc458c031d8a8aee94f7befa6a2))

## [Unreleased]

## [1.0.0] - 2025-12-10

### Added

#### Core Libraries
- `LinePayBaseClient` - Abstract base client class for LINE Pay API V4 integration
  - Automatic HMAC-SHA256 signature generation for API authentication
  - HTTP request handling with timeout support (configurable, default 20s)
  - Comprehensive error handling and response parsing
  - Support for both Production and Sandbox environments
- `LinePayUtils` - Utility functions for LINE Pay operations
  - `generateSignature()` - Generate HMAC-SHA256 signature for API requests
  - `verifySignature()` - Verify signatures with timing-safe comparison
  - `validateTransactionId()` - Validate 19-digit transaction ID format (throws on invalid)
  - `isValidTransactionId()` - Check transaction ID format (returns boolean)
  - `buildQueryString()` - Build URL query string from params object
  - `parseConfirmQuery()` - Parse confirmation callback query parameters

#### Type Definitions
- `LinePayConfig` - Client configuration interface
- `LinePayBaseResponse<T>` - Generic response interface for all LINE Pay APIs
- Complete TypeScript type definitions with JSDoc documentation

#### Error Handling
- `LinePayError` - LINE Pay API error with helper properties
  - `isAuthError` - Check for authentication errors (1xxx codes)
  - `isPaymentError` - Check for payment errors (2xxx codes)
  - `isInternalError` - Check for internal errors (9xxx codes)
  - `toJSON()` - Serialize error to JSON
- `LinePayTimeoutError` - Request timeout errors
- `LinePayConfigError` - Configuration validation errors
- `LinePayValidationError` - Request parameter validation errors

#### Testing
- Comprehensive test suite with 52 tests and 155 assertions
- 96.43% function coverage, 100% line coverage
- Test suites for:
  - LinePayUtils (14 tests)
  - LinePayBaseClient (17 tests)
  - Error classes (21 tests)
- Mock HTTP server for integration testing
- Tests reorganized in dedicated `tests/` directory

#### Documentation
- Complete JSDoc documentation for all public APIs
  - Detailed parameter descriptions
  - Return value documentation
  - Usage examples for each method
  - Cross-references and external links
- **README.md** (English) - Comprehensive project documentation
- **README_ZH.md** (Traditional Chinese) - 完整的繁體中文文檔
- **CONTRIBUTING.md** (English) - Development guidelines and workflow
- **CONTRIBUTING_ZH.md** (Traditional Chinese) - 貢獻指南（繁體中文）
- **SECURITY.md** - Security policy and vulnerability reporting
- **LICENSE** - MIT License

#### GitHub Community
- Issue templates (Bug Report, Feature Request)
- Pull Request template
- Dependabot configuration for automated dependency updates
- Auto-labeling system for PRs based on file changes and titles

#### CI/CD
- **GitHub Actions Workflows:**
  - `ci.yml` - Multi-OS testing (Ubuntu, macOS, Windows) with Bun 1.3.4 and latest
  - `release.yml` - Automated npm publishing with provenance
  - `pr-labeler.yml` - Automatic PR labeling
  - `codeql.yml` - Security vulnerability scanning
- **Git Hooks:**
  - Pre-commit hooks with `simple-git-hooks` and `lint-staged`
  - Automatic type checking before commits
  - Test execution for modified test files

#### Development Tools
- TypeScript 5.9+ with strict configuration
- Bun v1.3.4 as primary runtime and package manager
- Zero runtime dependencies for production
- Development dependencies:
  - `@types/bun` - Type definitions
  - `simple-git-hooks` - Git hooks management
  - `lint-staged` - Run checks on staged files

### Technical Details

#### Security
- Timing-safe signature verification using `crypto.timingSafeEqual()`
- Prevents timing attacks on signature validation
- Input validation for all configuration parameters
- Transaction ID format validation (19-digit requirement)

#### Architecture
- Abstract base client design for extensibility
- Type-safe API with generics support
- Clean separation of concerns:
  - Configuration (`src/config/`)
  - Error handling (`src/errors/`)
  - Utilities (`src/`)
  - Base client (`src/`)

#### Quality Assurance
- 100% line coverage for critical code paths
- Comprehensive edge case testing
- Integration tests with mock HTTP server
- Type checking with strict TypeScript
- Pre-commit validation hooks

### Package Information
- **Package Name:** `line-pay-core-v4`
- **Version:** 1.0.0
- **Build System:** TypeScript Compiler (tsc)
- **Test Framework:** Bun Test
- **License:** MIT
- **Engines:** Node.js >=18.0.0, Bun >=1.3.0
