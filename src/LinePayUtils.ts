/* eslint-disable @typescript-eslint/no-extraneous-class */
import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Regular expression for validating LINE Pay transaction IDs
 * LINE Pay transactionId must be exactly 19 digits
 * @internal
 */
const TRANSACTION_ID_REGEX = /^\d{19}$/

/**
 * Utility class for LINE Pay operations
 *
 * Provides static helper methods for:
 * - HMAC-SHA256 signature generation and verification
 * - Transaction ID validation
 * - Query string building
 * - Callback query parameter parsing
 *
 * All methods are static and the class cannot be instantiated.
 *
 * @example
 * ```typescript
 * import { LinePayUtils } from 'line-pay-core-v4'
 *
 * // Generate signature for API request
 * const signature = LinePayUtils.generateSignature(
 *   channelSecret,
 *   '/v3/payments/request',
 *   JSON.stringify(requestBody),
 *   nonce
 * )
 *
 * // Validate transaction ID format
 * if (LinePayUtils.isValidTransactionId(transactionId)) {
 *   // Process transaction
 * }
 * ```
 */
export class LinePayUtils {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Generates HMAC-SHA256 signature for LINE Pay API authentication
   *
   * Creates the X-LINE-Authorization header value required for LINE Pay API requests.
   * The signature is generated from the channel secret, URI, query string, request body, and nonce.
   *
   * @param secret - Channel Secret from LINE Pay Merchant Center
   * @param uri - Request URI path (e.g., '/v3/payments/request')
   * @param body - Request body as JSON string (empty string for GET requests)
   * @param nonce - Unique random string (typically UUID) for this request
   * @param queryString - Optional query string (without leading '?')
   * @returns Base64-encoded HMAC-SHA256 signature
   *
   * @example
   * ```typescript
   * const signature = LinePayUtils.generateSignature(
   *   'myChannelSecret',
   *   '/v3/payments/request',
   *   JSON.stringify({ amount: 1000, currency: 'TWD' }),
   *   'unique-nonce-123'
   * )
   * // Returns: "base64-encoded-signature..."
   * ```
   *
   * @see {@link https://pay.line.me/documents/online_v3_en.html#api-authentication} LINE Pay API Authentication
   */
  static generateSignature(
    secret: string,
    uri: string,
    body: string,
    nonce: string,
    queryString = ''
  ): string {
    const data = `${secret}${uri}${queryString}${body}${nonce}`
    return createHmac('sha256', secret).update(data).digest('base64')
  }

  /**
   * Verifies HMAC-SHA256 signature using timing-safe comparison
   *
   * Uses `crypto.timingSafeEqual()` to prevent timing attacks when verifying signatures.
   * This is particularly important for webhook signature verification.
   *
   * **Security Note**: This method uses constant-time comparison to prevent timing attacks
   * where an attacker could deduce information about the signature by measuring verification time.
   *
   * @param secret - Channel Secret from LINE Pay Merchant Center
   * @param data - The data string that was signed (format: `${secret}${uri}${queryString}${body}${nonce}`)
   * @param signature - The signature to verify (received from LINE Pay)
   * @returns `true` if signature is valid, `false` otherwise
   *
   * @example
   * ```typescript
   * // Verify webhook signature
   * const receivedSignature = req.headers['x-line-signature']
   * const requestBody = JSON.stringify(req.body)
   * const data = `${channelSecret}/webhooks${requestBody}${nonce}`
   *
   * const isValid = LinePayUtils.verifySignature(
   *   channelSecret,
   *   data,
   *   receivedSignature
   * )
   *
   * if (!isValid) {
   *   throw new Error('Invalid signature')
   * }
   * ```
   *
   * @see {@link https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b} crypto.timingSafeEqual
   */
  static verifySignature(secret: string, data: string, signature: string): boolean {
    const expected = createHmac('sha256', secret).update(data).digest('base64')

    // Use timingSafeEqual to prevent timing attacks
    const expectedBuffer = Buffer.from(expected, 'utf-8')
    const signatureBuffer = Buffer.from(signature, 'utf-8')

    // Execute timingSafeEqual even if lengths differ to maintain constant time
    if (expectedBuffer.length !== signatureBuffer.length) {
      // Create dummy buffer for constant-time comparison to avoid leaking length information
      const dummyBuffer = Buffer.alloc(expectedBuffer.length)
      timingSafeEqual(expectedBuffer, dummyBuffer)
      return false
    }

    return timingSafeEqual(expectedBuffer, signatureBuffer)
  }

  /**
   * Validates LINE Pay transaction ID format
   *
   * Throws an error if the transaction ID is not exactly 19 digits.
   * Use this method when you need to enforce valid format or fail fast.
   * For non-throwing validation, use {@link isValidTransactionId} instead.
   *
   * @param transactionId - The transaction ID to validate
   * @throws {Error} If transactionId is not a 19-digit number
   *
   * @example
   * ```typescript
   * try {
   *   LinePayUtils.validateTransactionId('12345') // ❌ Invalid (only 5 digits)
   * } catch (error) {
   *   console.error(error.message)
   *   // "Invalid transactionId format: expected 19-digit number, got "12345""
   * }
   *
   * LinePayUtils.validateTransactionId('1234567890123456789') // ✅ Valid (19 digits)
   * ```
   */
  static validateTransactionId(transactionId: string): void {
    if (!TRANSACTION_ID_REGEX.test(transactionId)) {
      throw new Error(
        `Invalid transactionId format: expected 19-digit number, got "${transactionId}"`
      )
    }
  }

  /**
   * Checks if a transaction ID has valid format
   *
   * Returns a boolean indicating whether the transaction ID is valid (19 digits).
   * Use this method when you need to conditionally handle invalid IDs.
   * For throwing validation, use {@link validateTransactionId} instead.
   *
   * @param transactionId - The transaction ID to check
   * @returns `true` if transactionId is a 19-digit number, `false` otherwise
   *
   * @example
   * ```typescript
   * if (LinePayUtils.isValidTransactionId('1234567890123456789')) {
   *   // Process valid transaction
   * } else {
   *   // Handle invalid transaction ID
   * }
   * ```
   */
  static isValidTransactionId(transactionId: string): boolean {
    return TRANSACTION_ID_REGEX.test(transactionId)
  }

  /**
   * Builds URL query string from parameters object
   *
   * Converts a key-value object into a URL-encoded query string.
   * Returns empty string if params is undefined or empty.
   *
   * @param params - Optional key-value pairs to convert to query string
   * @returns Query string starting with '?' or empty string
   *
   * @example
   * ```typescript
   * const query = LinePayUtils.buildQueryString({
   *   foo: 'bar',
   *   baz: 'qux'
   * })
   * // Returns: "?foo=bar&baz=qux"
   *
   * const empty = LinePayUtils.buildQueryString({})
   * // Returns: ""
   * ```
   */
  static buildQueryString(params?: Record<string, string>): string {
    if (params === undefined || Object.keys(params).length === 0) return ''
    const query = new URLSearchParams(params).toString()
    return `?${query}`
  }

  /**
   * Parses LINE Pay confirmation callback query parameters
   *
   * Extracts and validates transactionId and orderId from the callback URL query.
   * Handles both string and array query parameter formats (e.g., Express.js query parsing).
   *
   * @param query - Query parameters object from the callback URL
   * @returns Object containing transactionId and optional orderId
   * @throws {Error} If transactionId is missing or empty
   *
   * @example
   * ```typescript
   * // Express.js route handler
   * app.get('/confirm', (req, res) => {
   *   try {
   *     const { transactionId, orderId } = LinePayUtils.parseConfirmQuery(req.query)
   *     // transactionId: '1234567890123456789'
   *     // orderId: 'ORDER-123' (if provided)
   *   } catch (error) {
   *     res.status(400).send('Missing transactionId')
   *   }
   * })
   * ```
   *
   * @example
   * ```typescript
   * // Handle array values (some frameworks parse repeated params as arrays)
   * const query = {
   *   transactionId: ['1234567890123456789'], // Array format
   *   orderId: 'ORDER-123'
   * }
   * const result = LinePayUtils.parseConfirmQuery(query)
   * // result.transactionId: '1234567890123456789' (first element extracted)
   * ```
   */
  static parseConfirmQuery(query: Record<string, string | string[] | undefined>): {
    transactionId: string
    orderId?: string
  } {
    const transactionId = Array.isArray(query.transactionId)
      ? query.transactionId[0]
      : query.transactionId

    const orderId = Array.isArray(query.orderId) ? query.orderId[0] : query.orderId

    if (transactionId === undefined || transactionId === '') {
      throw new Error('Missing transactionId in callback query')
    }

    const result: { transactionId: string; orderId?: string } = {
      transactionId,
    }

    if (orderId !== undefined) {
      result.orderId = orderId
    }

    return result
  }
}
