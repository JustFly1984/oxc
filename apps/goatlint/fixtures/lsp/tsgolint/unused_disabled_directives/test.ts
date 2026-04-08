// Test file for disable directives with type-aware rules
const myPromise = new Promise(() => {})

// Test goatlint-disable-next-line
// goatlint-disable-next-line typescript/no-floating-promises
myPromise

// Test eslint-disable-next-line with @typescript-eslint prefix
// eslint-disable-next-line @typescript-eslint/no-floating-promises
myPromise

// Test goatlint-disable/enable block
/* goatlint-disable typescript/no-floating-promises */
myPromise
myPromise
/* goatlint-enable typescript/no-floating-promises */

// This should still report an error (no disable directive)
myPromise

// Test with different rule name formats
// goatlint-disable-next-line no-floating-promises
myPromise

// eslint-disable-next-line typescript-eslint/no-floating-promises
myPromise

// Test disable-line variant
myPromise // goatlint-disable-line typescript/no-floating-promises

// Multiple promises in one block
/* eslint-disable @typescript-eslint/no-floating-promises */
Promise.resolve(1)
Promise.resolve(2)
Promise.resolve(3)
/* eslint-enable @typescript-eslint/no-floating-promises */

// Should report error
Promise.resolve(4)
