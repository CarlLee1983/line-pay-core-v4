# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.5.5...v1.6.0) (2026-03-03)


### ✨ Features

* Add OIDC permissions and replace `NPM_TOKEN` with `CI: true` for npm publish. ([d2d19c4](https://github.com/CarlLee1983/line-pay-core-v4/commit/d2d19c46dbfeea0f327088ec1cc2fa41b13bdd82))
* Allow passing additional HTTP headers to `sendRequest` method. ([b82bf90](https://github.com/CarlLee1983/line-pay-core-v4/commit/b82bf9069ff29603aebb60b7549887932ee5e943))
* Configure npm registry URL for node setup and remove `_authToken` from `.npmrc` before publishing. ([d51ba9c](https://github.com/CarlLee1983/line-pay-core-v4/commit/d51ba9c086cdea48423d0178ad11923ac0689d2b))
* initial release v1.0.0 ([07ff6e7](https://github.com/CarlLee1983/line-pay-core-v4/commit/07ff6e7c550bba419d47bb2bcce2ed3e2915f40e))


### 🐛 Bug Fixes

* resolve critical security and resource management issues ([8f0f8fa](https://github.com/CarlLee1983/line-pay-core-v4/commit/8f0f8fa25299d2197c42c177a8336ab6b491048f))
* Target global ~/.npmrc instead of local for _authToken removal during npm publish. ([990c6e9](https://github.com/CarlLee1983/line-pay-core-v4/commit/990c6e97c66528be4decd27dffbb925c87247559))
* update `module` entry point to compiled JavaScript output ([65d9398](https://github.com/CarlLee1983/line-pay-core-v4/commit/65d9398081c51655eeebe8193421a6783ca08713))
* update npm registry configuration for publishing in release workflow ([197ff93](https://github.com/CarlLee1983/line-pay-core-v4/commit/197ff93d653dbee09a43dfed8f962072c0a493cb))


### ♻️ Code Refactoring

* improve code quality and maintainability ([fba81fd](https://github.com/CarlLee1983/line-pay-core-v4/commit/fba81fd16c6225fbf4725b9dd9d6658d78de35a1))


### 🏗️ Build System

* Remove `allowImportingTsExtensions` and set `emitDeclarationOnly` to `false` in tsconfig. ([ec948b6](https://github.com/CarlLee1983/line-pay-core-v4/commit/ec948b6415692755da08931f02ed1201a02009c2))


### 👷 CI/CD

* Add permissions for npm publish job in release workflow. ([c40834f](https://github.com/CarlLee1983/line-pay-core-v4/commit/c40834fa43dffba5e0658f3d146e0a071603a76e))
* Explicitly configure npm registry for publishing in release workflow. ([59bd8a6](https://github.com/CarlLee1983/line-pay-core-v4/commit/59bd8a66829f8b41f6c1776a3337a1a33bcff857))
* Implement automated release and npm publishing with release-please configuration and workflow. ([8722340](https://github.com/CarlLee1983/line-pay-core-v4/commit/8722340f870f1935db9607c89fd10e662969a0b7))
* Remove `NPM_TOKEN` from npm publish and enhance package verification steps. ([34cad53](https://github.com/CarlLee1983/line-pay-core-v4/commit/34cad5318ae095097472ff4f5fea418ac47ba8c3))
* Remove registry-url configuration from setup-node action. ([a52a751](https://github.com/CarlLee1983/line-pay-core-v4/commit/a52a75141d00acccd5846c9aef96c47537bc3203))


### 🔧 Chores

* add Biome for linting/formatting and configure Release Please for automated releases. ([9970e51](https://github.com/CarlLee1983/line-pay-core-v4/commit/9970e513c9b6abc458c031d8a8aee94f7befa6a2))
* add npm publish configuration for public access and registry. ([c28bad4](https://github.com/CarlLee1983/line-pay-core-v4/commit/c28bad4622a07d80c022a40e2dc90f94fcb09b91))
* bump version to 1.5.5 ([88acd61](https://github.com/CarlLee1983/line-pay-core-v4/commit/88acd616e738f5320aa5785b84140a3cf636ee14))
* Configure npm registry in setup-node and remove explicit npmrc token setup before publishing. ([f3db97a](https://github.com/CarlLee1983/line-pay-core-v4/commit/f3db97ac4c4e2bdc57e1acedbe33bd7e8d7adf52))
* configure release-please to include 'v' in tags and exclude component name.chore: configure release-please to include 'v' in tags and exclude component name. ([8765366](https://github.com/CarlLee1983/line-pay-core-v4/commit/87653666cbdbd64fa8d1aeac8fb94547490fa0bc))
* **master:** release 1.2.0 ([dbedfe5](https://github.com/CarlLee1983/line-pay-core-v4/commit/dbedfe5ed2b09099b52bf64a01f4e6ab8cd24459))
* **master:** release 1.2.0 ([549d339](https://github.com/CarlLee1983/line-pay-core-v4/commit/549d339d2d8c7f68e8b0237aad100b86b7c65d61))
* **master:** release 1.2.1 ([67df604](https://github.com/CarlLee1983/line-pay-core-v4/commit/67df6049face9d9bd2759299f924e0d187c0738b))
* **master:** release 1.2.1 ([ee2657b](https://github.com/CarlLee1983/line-pay-core-v4/commit/ee2657b1a62c024132fb4fa0bffbce7ecdb69b9d))
* **master:** release 1.2.2 ([38a0fa6](https://github.com/CarlLee1983/line-pay-core-v4/commit/38a0fa6e71296172024c7ebd789bded4582017e5))
* **master:** release 1.2.2 ([6c261d6](https://github.com/CarlLee1983/line-pay-core-v4/commit/6c261d6d9e3dd87194c142ad3c132832fb401868))
* **master:** release 1.3.0 ([b0a50e9](https://github.com/CarlLee1983/line-pay-core-v4/commit/b0a50e9174c56f6c3953c68447c74c188176af93))
* **master:** release 1.3.0 ([9a1c728](https://github.com/CarlLee1983/line-pay-core-v4/commit/9a1c72830210738d431b780b0ff274243c8342a3))
* **master:** release 1.4.0 ([f21b593](https://github.com/CarlLee1983/line-pay-core-v4/commit/f21b5936856fd00e55384ea8eb47db1bbafa3a4b))
* **master:** release 1.4.0 ([6ce409f](https://github.com/CarlLee1983/line-pay-core-v4/commit/6ce409fb10f46c96b7c1130f422ae07d201cb790))
* **master:** release 1.4.1 ([7fc7ce9](https://github.com/CarlLee1983/line-pay-core-v4/commit/7fc7ce99a6d565cf8466926e3c890ba85702203a))
* **master:** release 1.4.1 ([dc2178a](https://github.com/CarlLee1983/line-pay-core-v4/commit/dc2178a952a6e4bea6cada7928d2119a281e16e3))
* **master:** release 1.4.2 ([daff943](https://github.com/CarlLee1983/line-pay-core-v4/commit/daff943cb63bb1b4eb46bea2c258c36ea0128368))
* **master:** release 1.4.2 ([1355f3d](https://github.com/CarlLee1983/line-pay-core-v4/commit/1355f3d4c1d04df8de85cc19b85861515a0886bf))
* **master:** release 1.4.3 ([3090b86](https://github.com/CarlLee1983/line-pay-core-v4/commit/3090b8693ad3f1b25feb67239efe85eedf857681))
* **master:** release 1.4.3 ([4e530f5](https://github.com/CarlLee1983/line-pay-core-v4/commit/4e530f530a079ba83f28cdc6225dcc1a7a5ae809))
* **master:** release 1.5.0 ([39c8ab4](https://github.com/CarlLee1983/line-pay-core-v4/commit/39c8ab4aad1eb9586e54855d6d67be3d96eb7542))
* **master:** release 1.5.0 ([bba8a56](https://github.com/CarlLee1983/line-pay-core-v4/commit/bba8a5693a6614fe72e8b967dfac92433f2cd405))
* **master:** release 1.5.1 ([f076043](https://github.com/CarlLee1983/line-pay-core-v4/commit/f07604309a0fa886dcc4093b5c0562308d21b616))
* **master:** release 1.5.1 ([a489f1c](https://github.com/CarlLee1983/line-pay-core-v4/commit/a489f1c02a8273857e1e594e22f6502d5b4ed0d5))
* **master:** release 1.5.2 ([0165936](https://github.com/CarlLee1983/line-pay-core-v4/commit/01659362ff3f74ca39cab81f53b1fcc5f24d381c))
* **master:** release 1.5.2 ([47c54bb](https://github.com/CarlLee1983/line-pay-core-v4/commit/47c54bbd8db3cc6a1164da14f416b3431e1fe985))
* **master:** release 1.5.3 ([03c6c56](https://github.com/CarlLee1983/line-pay-core-v4/commit/03c6c56924957f887d5b4fd828623eed43aaef85))
* **master:** release 1.5.3 ([d47357f](https://github.com/CarlLee1983/line-pay-core-v4/commit/d47357f7d0306d57f6f34de3954b5c685aee5294))
* **master:** release 1.5.4 ([0f84b8b](https://github.com/CarlLee1983/line-pay-core-v4/commit/0f84b8beebe615a44a2b88ac9219bdfcc4789236))
* **master:** release 1.5.4 ([b0a093d](https://github.com/CarlLee1983/line-pay-core-v4/commit/b0a093db6eed8ff7c2a0e5d8def261e92a6a4f6e))
* **master:** release line-pay-core-v4 1.1.0 ([45eed8c](https://github.com/CarlLee1983/line-pay-core-v4/commit/45eed8cc0d6fdcd6987e79a2b72984968f5d821b))
* **master:** release line-pay-core-v4 1.1.0 ([88a0fd5](https://github.com/CarlLee1983/line-pay-core-v4/commit/88a0fd5f66219393f796240e1e1024a4caecc7ef))

## [1.5.4](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.5.3...v1.5.4) (2025-12-11)


### 🔧 Chores

* Configure npm registry in setup-node and remove explicit npmrc token setup before publishing. ([f3db97a](https://github.com/CarlLee1983/line-pay-core-v4/commit/f3db97ac4c4e2bdc57e1acedbe33bd7e8d7adf52))

## [1.5.3](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.5.2...v1.5.3) (2025-12-11)


### 🐛 Bug Fixes

* update npm registry configuration for publishing in release workflow ([197ff93](https://github.com/CarlLee1983/line-pay-core-v4/commit/197ff93d653dbee09a43dfed8f962072c0a493cb))

## [1.5.2](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.5.1...v1.5.2) (2025-12-11)


### 👷 CI/CD

* Explicitly configure npm registry for publishing in release workflow. ([59bd8a6](https://github.com/CarlLee1983/line-pay-core-v4/commit/59bd8a66829f8b41f6c1776a3337a1a33bcff857))

## [1.5.1](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.5.0...v1.5.1) (2025-12-11)


### 🐛 Bug Fixes

* Target global ~/.npmrc instead of local for _authToken removal during npm publish. ([990c6e9](https://github.com/CarlLee1983/line-pay-core-v4/commit/990c6e97c66528be4decd27dffbb925c87247559))

## [1.5.0](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.4.3...v1.5.0) (2025-12-11)


### ✨ Features

* Configure npm registry URL for node setup and remove `_authToken` from `.npmrc` before publishing. ([d51ba9c](https://github.com/CarlLee1983/line-pay-core-v4/commit/d51ba9c086cdea48423d0178ad11923ac0689d2b))

## [1.4.3](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.4.2...v1.4.3) (2025-12-11)


### 👷 CI/CD

* Remove registry-url configuration from setup-node action. ([a52a751](https://github.com/CarlLee1983/line-pay-core-v4/commit/a52a75141d00acccd5846c9aef96c47537bc3203))

## [1.4.2](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.4.1...v1.4.2) (2025-12-11)


### 🐛 Bug Fixes

* update `module` entry point to compiled JavaScript output ([65d9398](https://github.com/CarlLee1983/line-pay-core-v4/commit/65d9398081c51655eeebe8193421a6783ca08713))


### 🔧 Chores

* add npm publish configuration for public access and registry. ([c28bad4](https://github.com/CarlLee1983/line-pay-core-v4/commit/c28bad4622a07d80c022a40e2dc90f94fcb09b91))

## [1.4.1](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.4.0...v1.4.1) (2025-12-11)


### 👷 CI/CD

* Remove `NPM_TOKEN` from npm publish and enhance package verification steps. ([34cad53](https://github.com/CarlLee1983/line-pay-core-v4/commit/34cad5318ae095097472ff4f5fea418ac47ba8c3))

## [1.4.0](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.3.0...v1.4.0) (2025-12-11)


### ✨ Features

* Add OIDC permissions and replace `NPM_TOKEN` with `CI: true` for npm publish. ([d2d19c4](https://github.com/CarlLee1983/line-pay-core-v4/commit/d2d19c46dbfeea0f327088ec1cc2fa41b13bdd82))

## [1.3.0](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.2.2...v1.3.0) (2025-12-11)


### ✨ Features

* Allow passing additional HTTP headers to `sendRequest` method. ([b82bf90](https://github.com/CarlLee1983/line-pay-core-v4/commit/b82bf9069ff29603aebb60b7549887932ee5e943))

## [1.2.2](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.2.1...v1.2.2) (2025-12-10)


### 🏗️ Build System

* Remove `allowImportingTsExtensions` and set `emitDeclarationOnly` to `false` in tsconfig. ([ec948b6](https://github.com/CarlLee1983/line-pay-core-v4/commit/ec948b6415692755da08931f02ed1201a02009c2))

## [1.2.1](https://github.com/CarlLee1983/line-pay-core-v4/compare/v1.2.0...v1.2.1) (2025-12-10)


### 👷 CI/CD

* Add permissions for npm publish job in release workflow. ([c40834f](https://github.com/CarlLee1983/line-pay-core-v4/commit/c40834fa43dffba5e0658f3d146e0a071603a76e))

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
