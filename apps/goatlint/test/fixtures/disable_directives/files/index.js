var shouldError = 1;

// goatlint-disable-next-line test-plugin/no-var
var shouldBeDisabled = 2;

// eslint-disable-next-line no-debugger
debugger;

// should trigger an error
debugger;

/* goatlint-disable-next-line test-plugin/no-var */
var anotherDisabled = 4;

/* goatlint-disable-next-line test-plugin */ // `test-plugin` should be `test-plugin/no-var`
var incorrectlyDisabled = 4;

/* goatlint-disable-next-line no-var */ // `no-var` should be `test-plugin/no-var`
var anotherIncorrectlyDisabled = 4;

// This var should trigger an error again
var shouldErrorAgain = 3;
