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
    })

    describe('verifySignature', () => {
        test('should verify signature correctly', () => {
            const channelSecret = 'test-secret'
            const data = 'test-data'

            const signature = LinePayUtils.generateSignature(
                channelSecret,
                '/test',
                '',
                data
            )

            // Create the same data string for verification
            const verificationData = `${channelSecret}/test${data}`

            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                verificationData,
                signature
            )

            expect(isValid).toBe(true)
        })

        test('should reject invalid signature', () => {
            const channelSecret = 'test-secret'
            const data = 'test-data'

            const isValid = LinePayUtils.verifySignature(
                channelSecret,
                data,
                'invalid-signature'
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
