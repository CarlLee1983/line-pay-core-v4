import { describe, expect, test } from 'bun:test'
import { LinePayUtils } from '../src/LinePayUtils'

describe('LinePayUtils', () => {
    describe('isValidTransactionId', () => {
        test('should return true for valid 19-digit transaction ID', () => {
            const validId = '1234567890123456789'
            expect(LinePayUtils.isValidTransactionId(validId)).toBe(true)
        })

        test('should return false for invalid transaction ID (too short)', () => {
            const invalidId = '123456789012345678'
            expect(LinePayUtils.isValidTransactionId(invalidId)).toBe(false)
        })

        test('should return false for invalid transaction ID (too long)', () => {
            const invalidId = '12345678901234567890'
            expect(LinePayUtils.isValidTransactionId(invalidId)).toBe(false)
        })

        test('should return false for non-numeric transaction ID', () => {
            const invalidId = '123456789012345678a'
            expect(LinePayUtils.isValidTransactionId(invalidId)).toBe(false)
        })
    })

    describe('validateTransactionId', () => {
        test('should not throw for valid 19-digit transaction ID', () => {
            const validId = '1234567890123456789'
            expect(() => LinePayUtils.validateTransactionId(validId)).not.toThrow()
        })

        test('should throw for invalid transaction ID', () => {
            const invalidId = '123456789012345678'
            expect(() => LinePayUtils.validateTransactionId(invalidId)).toThrow(
                'Invalid transactionId format: expected 19-digit number'
            )
        })
    })

    describe('generateSignature', () => {
        test('should generate correct signature', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments/request'
            const body = JSON.stringify({ amount: 100 })
            const nonce = 'test-nonce'

            const signature = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce
            )

            expect(signature).toBeDefined()
            expect(typeof signature).toBe('string')
            expect(signature.length).toBeGreaterThan(0)
        })

        test('should generate signature with query string', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments'
            const body = ''
            const nonce = 'test-nonce'
            const queryString = '?transactionId=123'

            const signature = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce,
                queryString
            )

            expect(signature).toBeDefined()
            expect(typeof signature).toBe('string')
            expect(signature.length).toBeGreaterThan(0)
        })

        test('should generate consistent signature for identical inputs', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments/request'
            const body = JSON.stringify({ amount: 100 })
            const nonce = 'test-nonce'

            const signature1 = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce
            )
            const signature2 = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce
            )

            expect(signature1).toBe(signature2)
        })
    })

    describe('verifySignature', () => {
        test('should verify signature correctly', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments/request'
            const body = JSON.stringify({ amount: 100 })
            const nonce = 'test-nonce-123'

            // Generate a valid signature
            const signature = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce
            )

            // Verify it with the same parameters
            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                uri,
                body,
                nonce,
                signature
            )

            expect(isValid).toBe(true)
        })

        test('should verify signature with query string', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments'
            const body = ''
            const nonce = 'test-nonce-456'
            const queryString = '?transactionId=123'

            // Generate signature with query string
            const signature = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce,
                queryString
            )

            // Verify with matching query string
            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                uri,
                body,
                nonce,
                signature,
                queryString
            )

            expect(isValid).toBe(true)
        })

        test('should reject invalid signature', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments/request'
            const body = JSON.stringify({ amount: 100 })
            const nonce = 'test-nonce-789'

            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                uri,
                body,
                nonce,
                'invalid-signature-string'
            )

            expect(isValid).toBe(false)
        })

        test('should reject signature with mismatched URI', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments/request'
            const body = JSON.stringify({ amount: 100 })
            const nonce = 'test-nonce-abc'

            const signature = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce
            )

            // Try to verify with different URI
            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                '/v3/payments/confirm',  // Different URI
                body,
                nonce,
                signature
            )

            expect(isValid).toBe(false)
        })

        test('should reject signature with mismatched body', () => {
            const channelSecret = 'test-secret'
            const uri = '/v3/payments/request'
            const body = JSON.stringify({ amount: 100 })
            const nonce = 'test-nonce-def'

            const signature = LinePayUtils.generateSignature(
                channelSecret,
                uri,
                body,
                nonce
            )

            // Try to verify with different body
            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                uri,
                JSON.stringify({ amount: 200 }),  // Different body
                nonce,
                signature
            )

            expect(isValid).toBe(false)
        })
    })

    describe('buildQueryString', () => {
        test('should build query string from params', () => {
            const params = { foo: 'bar', baz: 'qux' }
            const queryString = LinePayUtils.buildQueryString(params)

            expect(queryString).toContain('foo=bar')
            expect(queryString).toContain('baz=qux')
            expect(queryString).toStartWith('?')
        })

        test('should return empty string for empty params', () => {
            expect(LinePayUtils.buildQueryString({})).toBe('')
            expect(LinePayUtils.buildQueryString(undefined)).toBe('')
        })
    })

    describe('parseConfirmQuery', () => {
        test('should parse transactionId and orderId', () => {
            const query = {
                transactionId: '1234567890123456789',
                orderId: 'order123',
            }

            const result = LinePayUtils.parseConfirmQuery(query)

            expect(result.transactionId).toBe('1234567890123456789')
            expect(result.orderId).toBe('order123')
        })

        test('should handle array values', () => {
            const query = {
                transactionId: ['1234567890123456789'],
                orderId: ['order123'],
            }

            const result = LinePayUtils.parseConfirmQuery(query)

            expect(result.transactionId).toBe('1234567890123456789')
            expect(result.orderId).toBe('order123')
        })

        test('should throw when transactionId is missing', () => {
            expect(() => LinePayUtils.parseConfirmQuery({})).toThrow(
                'Missing transactionId in callback query'
            )
        })
    })
})
