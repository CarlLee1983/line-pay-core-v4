import { describe, expect, test } from 'bun:test'
import {
    LinePayError,
    LinePayTimeoutError,
    LinePayConfigError,
    LinePayValidationError,
} from '../src/errors/LinePayError'

describe('LinePayError', () => {
    test('should create error with all properties', () => {
        const error = new LinePayError(
            '1104',
            'Merchant not registered',
            400,
            '{"returnCode":"1104","returnMessage":"Merchant not registered"}'
        )

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(LinePayError)
        expect(error.name).toBe('LinePayError')
        expect(error.returnCode).toBe('1104')
        expect(error.returnMessage).toBe('Merchant not registered')
        expect(error.httpStatus).toBe(400)
        expect(error.rawResponse).toBe(
            '{"returnCode":"1104","returnMessage":"Merchant not registered"}'
        )
        expect(error.message).toBe('LINE Pay API Error [1104]: Merchant not registered')
    })

    test('should create error without rawResponse', () => {
        const error = new LinePayError('2101', 'Parameter error', 400)

        expect(error.returnCode).toBe('2101')
        expect(error.returnMessage).toBe('Parameter error')
        expect(error.httpStatus).toBe(400)
        expect(error.rawResponse).toBeUndefined()
    })

    describe('isAuthError', () => {
        test('should return true for 1xxx error codes', () => {
            const errors = [
                new LinePayError('1101', 'User is not a LINE Pay user', 400),
                new LinePayError('1104', 'Merchant not registered', 400),
                new LinePayError('1150', 'No transaction history', 404),
                new LinePayError('1999', 'Unknown auth error', 400),
            ]

            errors.forEach((error) => {
                expect(error.isAuthError).toBe(true)
                expect(error.isPaymentError).toBe(false)
                expect(error.isInternalError).toBe(false)
            })
        })

        test('should return false for non-1xxx error codes', () => {
            const errors = [
                new LinePayError('2101', 'Parameter error', 400),
                new LinePayError('9000', 'Internal error', 500),
                new LinePayError('HTTP_ERROR', 'HTTP error', 500),
            ]

            errors.forEach((error) => {
                expect(error.isAuthError).toBe(false)
            })
        })
    })

    describe('isPaymentError', () => {
        test('should return true for 2xxx error codes', () => {
            const errors = [
                new LinePayError('2042', 'Refund failed', 400),
                new LinePayError('2101', 'Parameter error', 400),
                new LinePayError('2102', 'JSON data format error', 400),
                new LinePayError('2999', 'Unknown payment error', 400),
            ]

            errors.forEach((error) => {
                expect(error.isPaymentError).toBe(true)
                expect(error.isAuthError).toBe(false)
                expect(error.isInternalError).toBe(false)
            })
        })

        test('should return false for non-2xxx error codes', () => {
            const errors = [
                new LinePayError('1104', 'Merchant not registered', 400),
                new LinePayError('9000', 'Internal error', 500),
            ]

            errors.forEach((error) => {
                expect(error.isPaymentError).toBe(false)
            })
        })
    })

    describe('isInternalError', () => {
        test('should return true for 9xxx error codes', () => {
            const errors = [
                new LinePayError('9000', 'Internal error occurred', 500),
                new LinePayError('9999', 'Unknown internal error', 500),
            ]

            errors.forEach((error) => {
                expect(error.isInternalError).toBe(true)
                expect(error.isAuthError).toBe(false)
                expect(error.isPaymentError).toBe(false)
            })
        })

        test('should return false for non-9xxx error codes', () => {
            const errors = [
                new LinePayError('1104', 'Merchant not registered', 400),
                new LinePayError('2101', 'Parameter error', 400),
            ]

            errors.forEach((error) => {
                expect(error.isInternalError).toBe(false)
            })
        })
    })

    describe('toJSON', () => {
        test('should convert error to JSON object', () => {
            const error = new LinePayError(
                '1104',
                'Merchant not registered',
                400,
                'raw response'
            )

            const json = error.toJSON()

            expect(json).toEqual({
                name: 'LinePayError',
                message: 'LINE Pay API Error [1104]: Merchant not registered',
                returnCode: '1104',
                returnMessage: 'Merchant not registered',
                httpStatus: 400,
                rawResponse: 'raw response',
            })
        })

        test('should be JSON serializable', () => {
            const error = new LinePayError('1104', 'Merchant not registered', 400)

            const jsonString = JSON.stringify(error.toJSON())
            const parsed = JSON.parse(jsonString)

            expect(parsed.returnCode).toBe('1104')
            expect(parsed.returnMessage).toBe('Merchant not registered')
        })
    })

    test('should maintain correct prototype chain', () => {
        const error = new LinePayError('1104', 'Test', 400)

        expect(error instanceof Error).toBe(true)
        expect(error instanceof LinePayError).toBe(true)
        expect(Object.getPrototypeOf(error)).toBe(LinePayError.prototype)
    })
})

describe('LinePayTimeoutError', () => {
    test('should create timeout error with timeout and URL', () => {
        const error = new LinePayTimeoutError(5000, 'https://api-pay.line.me/v3/payments')

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(LinePayTimeoutError)
        expect(error.name).toBe('LinePayTimeoutError')
        expect(error.timeout).toBe(5000)
        expect(error.url).toBe('https://api-pay.line.me/v3/payments')
        expect(error.message).toBe('Request timeout after 5000ms')
    })

    test('should create timeout error without URL', () => {
        const error = new LinePayTimeoutError(3000)

        expect(error.timeout).toBe(3000)
        expect(error.url).toBeUndefined()
        expect(error.message).toBe('Request timeout after 3000ms')
    })

    test('should maintain correct prototype chain', () => {
        const error = new LinePayTimeoutError(5000)

        expect(error instanceof Error).toBe(true)
        expect(error instanceof LinePayTimeoutError).toBe(true)
        expect(Object.getPrototypeOf(error)).toBe(LinePayTimeoutError.prototype)
    })
})

describe('LinePayConfigError', () => {
    test('should create config error with message', () => {
        const error = new LinePayConfigError('channelId is required')

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(LinePayConfigError)
        expect(error.name).toBe('LinePayConfigError')
        expect(error.message).toBe('channelId is required')
    })

    test('should maintain correct prototype chain', () => {
        const error = new LinePayConfigError('Test message')

        expect(error instanceof Error).toBe(true)
        expect(error instanceof LinePayConfigError).toBe(true)
        expect(Object.getPrototypeOf(error)).toBe(LinePayConfigError.prototype)
    })
})

describe('LinePayValidationError', () => {
    test('should create validation error with message and field', () => {
        const error = new LinePayValidationError('Amount is required', 'amount')

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(LinePayValidationError)
        expect(error.name).toBe('LinePayValidationError')
        expect(error.message).toBe('Amount is required')
        expect(error.field).toBe('amount')
    })

    test('should create validation error without field', () => {
        const error = new LinePayValidationError('Validation failed')

        expect(error.message).toBe('Validation failed')
        expect(error.field).toBeUndefined()
    })

    test('should maintain correct prototype chain', () => {
        const error = new LinePayValidationError('Test message')

        expect(error instanceof Error).toBe(true)
        expect(error instanceof LinePayValidationError).toBe(true)
        expect(Object.getPrototypeOf(error)).toBe(LinePayValidationError.prototype)
    })
})

describe('Error hierarchy', () => {
    test('should differentiate between error types', () => {
        const linePayError = new LinePayError('1104', 'Test', 400)
        const timeoutError = new LinePayTimeoutError(5000)
        const configError = new LinePayConfigError('Test')
        const validationError = new LinePayValidationError('Test')

        expect(linePayError instanceof LinePayError).toBe(true)
        expect(linePayError instanceof LinePayTimeoutError).toBe(false)

        expect(timeoutError instanceof LinePayTimeoutError).toBe(true)
        expect(timeoutError instanceof LinePayError).toBe(false)

        expect(configError instanceof LinePayConfigError).toBe(true)
        expect(configError instanceof LinePayError).toBe(false)

        expect(validationError instanceof LinePayValidationError).toBe(true)
        expect(validationError instanceof LinePayError).toBe(false)
    })

    test('all errors should be instances of Error', () => {
        const errors = [
            new LinePayError('1104', 'Test', 400),
            new LinePayTimeoutError(5000),
            new LinePayConfigError('Test'),
            new LinePayValidationError('Test'),
        ]

        errors.forEach((error) => {
            expect(error instanceof Error).toBe(true)
        })
    })
})
