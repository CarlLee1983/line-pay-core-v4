import { describe, expect, test, beforeAll, afterAll } from 'bun:test'
import { LinePayBaseClient, type LinePayBaseResponse } from '../src/LinePayBaseClient'
import {
    LinePayError,
    LinePayTimeoutError,
    LinePayConfigError,
} from '../src/errors/LinePayError'
import type { LinePayConfig } from '../src/config/types'

// Test implementation of abstract LinePayBaseClient
class TestLinePayClient extends LinePayBaseClient {
    async testRequest<T extends LinePayBaseResponse>(
        method: 'GET' | 'POST',
        path: string,
        body?: unknown,
        params?: Record<string, string>
    ): Promise<T> {
        return this.sendRequest<T>(method, path, body, params)
    }

    // Expose protected properties for testing
    getChannelId(): string {
        return this.channelId
    }

    getChannelSecret(): string {
        return this.channelSecret
    }

    getBaseUrl(): string {
        return this.baseUrl
    }

    getTimeout(): number {
        return this.timeout
    }
}

// Mock server setup
const mockServer = Bun.serve({
    port: 0, // Use random available port
    async fetch(req) {
        const url = new URL(req.url)
        const path = url.pathname

        // Success response
        if (path === '/success') {
            return new Response(
                JSON.stringify({
                    returnCode: '0000',
                    returnMessage: 'Success',
                    info: { data: 'test' },
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        // API error response (business error)
        if (path === '/api-error') {
            return new Response(
                JSON.stringify({
                    returnCode: '1104',
                    returnMessage: 'Merchant not registered',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        // HTTP error with invalid JSON
        if (path === '/invalid-json') {
            return new Response('Invalid JSON', {
                status: 500,
                headers: { 'Content-Type': 'text/plain' },
            })
        }

        // Timeout simulation
        if (path === '/timeout') {
            await new Promise((resolve) => setTimeout(resolve, 5000))
            return new Response('OK')
        }

        // POST request test
        if (path === '/post-test' && req.method === 'POST') {
            const body = await req.json()
            return new Response(
                JSON.stringify({
                    returnCode: '0000',
                    returnMessage: 'Success',
                    info: body,
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        // Query parameters test
        if (path === '/query-test') {
            const params = Object.fromEntries(url.searchParams.entries())
            return new Response(
                JSON.stringify({
                    returnCode: '0000',
                    returnMessage: 'Success',
                    info: { params },
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        return new Response('Not Found', { status: 404 })
    },
})

describe('LinePayBaseClient', () => {
    let mockBaseUrl: string

    beforeAll(() => {
        mockBaseUrl = `http://localhost:${mockServer.port}`
    })

    afterAll(() => {
        mockServer.stop()
    })

    describe('Constructor', () => {
        test('should create client with valid config', () => {
            const config: LinePayConfig = {
                channelId: '1234567890',
                channelSecret: 'test-secret',
                env: 'sandbox',
            }

            const client = new TestLinePayClient(config)

            expect(client.getChannelId()).toBe('1234567890')
            expect(client.getChannelSecret()).toBe('test-secret')
            expect(client.getTimeout()).toBe(20000) // DEFAULT_TIMEOUT
        })

        test('should use production URL when env is production', () => {
            const client = new TestLinePayClient({
                channelId: '123',
                channelSecret: 'secret',
                env: 'production',
            })

            expect(client.getBaseUrl()).toBe('https://api-pay.line.me')
        })

        test('should use sandbox URL when env is sandbox', () => {
            const client = new TestLinePayClient({
                channelId: '123',
                channelSecret: 'secret',
                env: 'sandbox',
            })

            expect(client.getBaseUrl()).toBe('https://sandbox-api-pay.line.me')
        })

        test('should use sandbox URL by default', () => {
            const client = new TestLinePayClient({
                channelId: '123',
                channelSecret: 'secret',
            })

            expect(client.getBaseUrl()).toBe('https://sandbox-api-pay.line.me')
        })

        test('should trim channelId and channelSecret', () => {
            const client = new TestLinePayClient({
                channelId: '  123  ',
                channelSecret: '  secret  ',
            })

            expect(client.getChannelId()).toBe('123')
            expect(client.getChannelSecret()).toBe('secret')
        })

        test('should use custom timeout', () => {
            const client = new TestLinePayClient({
                channelId: '123',
                channelSecret: 'secret',
                timeout: 30000,
            })

            expect(client.getTimeout()).toBe(30000)
        })

        test('should throw LinePayConfigError when channelId is empty', () => {
            expect(() => {
                new TestLinePayClient({
                    channelId: '',
                    channelSecret: 'secret',
                })
            }).toThrow(LinePayConfigError)

            expect(() => {
                new TestLinePayClient({
                    channelId: '   ',
                    channelSecret: 'secret',
                })
            }).toThrow('channelId is required and cannot be empty')
        })

        test('should throw LinePayConfigError when channelSecret is empty', () => {
            expect(() => {
                new TestLinePayClient({
                    channelId: '123',
                    channelSecret: '',
                })
            }).toThrow(LinePayConfigError)

            expect(() => {
                new TestLinePayClient({
                    channelId: '123',
                    channelSecret: '   ',
                })
            }).toThrow('channelSecret is required and cannot be empty')
        })

        test('should throw LinePayConfigError when timeout is zero or negative', () => {
            expect(() => {
                new TestLinePayClient({
                    channelId: '123',
                    channelSecret: 'secret',
                    timeout: 0,
                })
            }).toThrow(LinePayConfigError)

            expect(() => {
                new TestLinePayClient({
                    channelId: '123',
                    channelSecret: 'secret',
                    timeout: -1000,
                })
            }).toThrow('timeout must be a positive number')
        })
    })

    describe('sendRequest', () => {
        let client: TestLinePayClient

        beforeAll(() => {
            // Create client with mock base URL
            const config: LinePayConfig = {
                channelId: 'test-channel-id',
                channelSecret: 'test-channel-secret',
            }
            client = new TestLinePayClient(config)
                // Override baseUrl for testing
                ; (client as any).baseUrl = mockBaseUrl
        })

        test('should send GET request successfully', async () => {
            const response = await client.testRequest('GET', '/success')

            expect(response.returnCode).toBe('0000')
            expect(response.returnMessage).toBe('Success')
            expect(response.info).toEqual({ data: 'test' })
        })

        test('should send POST request successfully', async () => {
            const requestBody = { amount: 1000, currency: 'TWD' }
            const response = await client.testRequest('POST', '/post-test', requestBody)

            expect(response.returnCode).toBe('0000')
            expect(response.info).toEqual(requestBody)
        })

        test('should send request with query parameters', async () => {
            const response = await client.testRequest<LinePayBaseResponse<{ params: Record<string, string> }>>(
                'GET',
                '/query-test',
                undefined,
                {
                    foo: 'bar',
                    baz: 'qux',
                }
            )

            expect(response.returnCode).toBe('0000')
            expect(response.info?.params).toEqual({ foo: 'bar', baz: 'qux' })
        })

        test('should throw LinePayError on API error', async () => {
            try {
                await client.testRequest('GET', '/api-error')
                expect(true).toBe(false) // Should not reach here
            } catch (error) {
                expect(error).toBeInstanceOf(LinePayError)
                if (error instanceof LinePayError) {
                    expect(error.returnCode).toBe('1104')
                    expect(error.returnMessage).toBe('Merchant not registered')
                    expect(error.httpStatus).toBe(400)
                    expect(error.isAuthError).toBe(true)
                }
            }
        })

        test('should throw LinePayError with PARSE_ERROR when response is invalid JSON', async () => {
            try {
                await client.testRequest('GET', '/invalid-json')
                expect(true).toBe(false)
            } catch (error) {
                expect(error).toBeInstanceOf(LinePayError)
                if (error instanceof LinePayError) {
                    expect(error.returnCode).toBe('PARSE_ERROR')
                    expect(error.returnMessage).toBe('Failed to parse response as JSON')
                    expect(error.rawResponse).toBe('Invalid JSON')
                }
            }
        })

        test('should throw LinePayTimeoutError on timeout', async () => {
            // Create client with short timeout
            const timeoutClient = new TestLinePayClient({
                channelId: 'test',
                channelSecret: 'secret',
                timeout: 100,
            })
                ; (timeoutClient as any).baseUrl = mockBaseUrl

            try {
                await timeoutClient.testRequest('GET', '/timeout')
                expect(true).toBe(false)
            } catch (error) {
                expect(error).toBeInstanceOf(LinePayTimeoutError)
                if (error instanceof LinePayTimeoutError) {
                    expect(error.timeout).toBe(100)
                    expect(error.url).toContain('/timeout')
                }
            }
        }, 10000) // Increase test timeout
    })

    describe('LinePayBaseResponse interface', () => {
        test('should have correct structure', () => {
            const response: LinePayBaseResponse<{ test: string }> = {
                returnCode: '0000',
                returnMessage: 'Success',
                info: { test: 'value' },
            }

            expect(response.returnCode).toBe('0000')
            expect(response.returnMessage).toBe('Success')
            expect(response.info?.test).toBe('value')
        })

        test('info field should be optional', () => {
            const response: LinePayBaseResponse = {
                returnCode: '0000',
                returnMessage: 'Success',
            }

            expect(response.info).toBeUndefined()
        })
    })
})
