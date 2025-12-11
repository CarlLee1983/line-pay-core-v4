import { randomUUID } from 'node:crypto'
import { DEFAULT_TIMEOUT, LINE_PAY_API_BASE_URL } from './config/env'
import type { LinePayConfig } from './config/types'
import { LinePayConfigError, LinePayError, LinePayTimeoutError } from './errors/LinePayError'
import { LinePayUtils } from './LinePayUtils'

/**
 * Base Response Format for all LINE Pay APIs
 *
 * All LINE Pay API responses follow this structure, with generic type `T` for the info field.
 *
 * @template T - Type of the info field containing API-specific response data
 *
 * @example
 * ```typescript
 * interface PaymentInfo {
 *   transactionId: string
 *   orderId: string
 * }
 *
 * type PaymentResponse = LinePayBaseResponse<PaymentInfo>
 * // {
 * //   returnCode: '0000',
 * //   returnMessage: 'Success',
 * //   info: { transactionId: '...', orderId: '...' }
 * // }
 * ```
 */
export interface LinePayBaseResponse<T = unknown> {
  /**
   * Return Code from LINE Pay API
   *
   * - `'0000'`: Success
   * - `'1xxx'`: Authentication/Authorization errors
   * -  `'2xxx'`: Payment/Request errors
   * - `'9xxx'`: Internal server errors
   *
   * @see {@link https://pay.line.me/documents/online_v3_en.html#return-code} LINE Pay Return Codes
   */
  returnCode: string

  /**
   * Return Message description
   *
   * Human-readable error or success message in English.
   */
  returnMessage: string

  /**
   * Result Information
   *
   * Contains API-specific response data. Only present when `returnCode` is `'0000'`.
   * The structure varies depending on the API endpoint called.
   */
  info?: T
}

/**
 * LINE Pay Base Client
 *
 * Abstract base class for LINE Pay API integration (Online and Offline).
 * Provides core functionality for:
 * - API authentication with HMAC-SHA256 signatures
 * - HTTP request handling with timeout support
 * - Response parsing and error handling
 * - Configuration validation
 *
 * This class should be extended by specific API clients (e.g., `LinePayOnlineClient`).
 *
 * **Features:**
 * - ✅ Automatic signature generation for each request
 * - ✅ Timeout protection with AbortController
 * - ✅ Comprehensive error handling
 * - ✅ Type-safe response parsing
 *
 * @example
 * ```typescript
 * import { LinePayBaseClient } from 'line-pay-core-v4'
 *
 * class MyLinePayClient extends LinePayBaseClient {
 *   async requestPayment(body: PaymentRequest) {
 *     return this.sendRequest('POST', '/v3/payments/request', body)
 *   }
 * }
 *
 * const client = new MyLinePayClient({
 *   channelId: process.env.LINE_PAY_CHANNEL_ID!,
 *   channelSecret: process.env.LINE_PAY_CHANNEL_SECRET!,
 *   env: 'sandbox',
 *   timeout: 30000
 * })
 * ```
 *
 * @see {@link https://pay.line.me/documents/online_v3_en.html} LINE Pay API Documentation
 */
export abstract class LinePayBaseClient {
  /**
   * LINE Pay Channel ID
   * @protected
   */
  protected readonly channelId: string

  /**
   * LINE Pay Channel Secret (encrypted/hashed in memory)
   * @protected
   */
  protected readonly channelSecret: string

  /**
   * BASE URL for LINE Pay API
   * @protected
   */
  protected readonly baseUrl: string

  /**
   * Request timeout in milliseconds
   * @protected
   */
  protected readonly timeout: number

  /**
   * Creates a new LinePayBaseClient instance
   *
   * Validates the configuration and sets up the client with the appropriate API base URL.
   *
   * @param config - LINE Pay configuration object
   * @throws {LinePayConfigError} If channelId or channelSecret is empty
   * @throws {LinePayConfigError} If timeout is not a positive number
   *
   * @example
   * ```typescript
   * const client = new MyLinePayClient({
   *   channelId: '1234567890',
   *   channelSecret: 'abc123...',
   *   env: 'sandbox',
   *   timeout: 20000
   * })
   * ```
   *
   * @example
   * ```typescript
   * // Using environment variables (recommended)
   * const client = new MyLinePayClient({
   *   channelId: process.env.LINE_PAY_CHANNEL_ID!,
   *   channelSecret: process.env.LINE_PAY_CHANNEL_SECRET!,
   *   env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
   * })
   * ```
   */
  constructor(config: LinePayConfig) {
    const channelId = config.channelId.trim()
    const channelSecret = config.channelSecret.trim()

    if (channelId === '') {
      throw new LinePayConfigError('channelId is required and cannot be empty')
    }
    if (channelSecret === '') {
      throw new LinePayConfigError('channelSecret is required and cannot be empty')
    }

    this.channelId = channelId
    this.channelSecret = channelSecret
    this.baseUrl =
      config.env === 'production' ? LINE_PAY_API_BASE_URL.production : LINE_PAY_API_BASE_URL.sandbox
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT

    if (this.timeout <= 0) {
      throw new LinePayConfigError('timeout must be a positive number')
    }
  }

  /**
   * Sends an HTTP request to LINE Pay API with authentication
   *
   * Handles the complete request lifecycle:
   * 1. Generates HMAC-SHA256 signature
   * 2. Sets authentication headers
   * 3. Sends HTTP request with timeout
   * 4. Parses and validates response
   * 5. Throws appropriate errors on failure
   *
   * **Authentication Flow:**
   * - Generates unique nonce (UUID)
   * - Creates signature from: `secret + URI + queryString + body + nonce`
   * - Sets headers: `X-LINE-ChannelId`, `X-LINE-Authorization`, `X-LINE-Authorization-Nonce`
   *
   * **Error Handling:**
   * - Network errors → Propagated as-is
   * - Timeout → {@link LinePayTimeoutError}
   * - JSON parse error → {@link LinePayError} with code `PARSE_ERROR`
   * - HTTP error → {@link LinePayError} with LINE Pay error code
   * - Business error (returnCode !== '0000') → {@link LinePayError}
   *
   * @template T - Expected response type extending {@link LinePayBaseResponse}
   * @param method - HTTP method ('GET' or 'POST')
   * @param path - API endpoint path (e.g., '/v3/payments/request')
   * @param body - Optional request body (will be JSON stringified)
   * @param params - Optional query parameters
   * @param additionalHeaders - Optional additional HTTP headers to include in the request
   * @returns Promise resolving to typed LINE Pay response
   * @throws {LinePayTimeoutError} If request exceeds configured timeout
   * @throws {LinePayError} If API returns an error or response is invalid
   * @protected
   *
   * @example
   * ```typescript
   * // In a derived class
   * async requestPayment(requestBody: PaymentRequest) {
   *   return this.sendRequest<PaymentResponse>(
   *     'POST',
   *     '/v3/payments/request',
   *     requestBody
   *   )
   * }
   * ```
   *
   * @example
   * ```typescript
   * // GET request with query parameters
   * async getPaymentStatus(transactionId: string) {
   *   return this.sendRequest<StatusResponse>(
   *     'GET',
   *     `/v3/payments/${transactionId}`,
   *     undefined,
   *     { someParam: 'value' }
   *   )
   * }
   * ```
   *
   * @example
   * ```typescript
   * // POST request with additional headers (e.g., for Offline API)
   * async makeOfflinePayment(body: PaymentRequest, deviceId: string) {
   *   return this.sendRequest<PaymentResponse>(
   *     'POST',
   *     '/v4/payments/oneTimeKeys/pay',
   *     body,
   *     undefined,
   *     {
   *       'X-LINE-MerchantDeviceProfileId': deviceId,
   *       'X-LINE-MerchantDeviceType': 'POS'
   *     }
   *   )
   * }
   * ```
   */
  protected async sendRequest<T extends LinePayBaseResponse>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown,
    params?: Record<string, string>,
    additionalHeaders?: Record<string, string>
  ): Promise<T> {
    const nonce = randomUUID()
    const queryString = LinePayUtils.buildQueryString(params)
    const url = `${this.baseUrl}${path}${queryString}`
    const bodyString = body !== undefined ? JSON.stringify(body) : ''

    const signature = LinePayUtils.generateSignature(
      this.channelSecret,
      path,
      bodyString,
      nonce,
      queryString
    )

    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelId': this.channelId,
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature,
      ...additionalHeaders,
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, this.timeout)

      const response = await fetch(url, {
        method,
        headers,
        body: method === 'POST' ? bodyString : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const responseText = await response.text()

      let jsonResponse: T
      try {
        jsonResponse = JSON.parse(responseText) as T
      } catch {
        throw new LinePayError(
          'PARSE_ERROR',
          'Failed to parse response as JSON',
          response.status,
          responseText
        )
      }

      if (!response.ok) {
        throw new LinePayError(
          jsonResponse.returnCode || 'HTTP_ERROR',
          jsonResponse.returnMessage || response.statusText,
          response.status,
          responseText
        )
      }

      if (jsonResponse.returnCode !== '0000') {
        throw new LinePayError(
          jsonResponse.returnCode,
          jsonResponse.returnMessage,
          response.status,
          responseText
        )
      }

      return jsonResponse
    } catch (error) {
      if (error instanceof LinePayError) {
        throw error
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new LinePayTimeoutError(this.timeout, url)
      }

      throw error
    }
  }
}
