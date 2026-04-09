// Nested template literals
const nested = `outer ${`inner ${value}`} end`;
const deepNested = `a ${`b ${`c ${d}`}`}`;

// Tagged templates with long expressions
const tagged = html`<div class="${longClassName}" data-value="${someVeryLongFunctionName(argument1, argument2)}"></div>`;
const css1 = css`
  .very-long-class-name-that-approaches-print-width {
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
  }
`;

// Template literals in ternaries
const result1 = condition ? `true: ${value}` : `false: ${value}`;
const result2 = condition
  ? `first template with ${longExpression1} and ${longExpression2}`
  : `second template with ${longExpression3} and ${longExpression4}`;

// Multi-line template expressions near print-width boundary
const atBoundary = `This is a string that is exactly at the boundary ${someExpression}`;
const overBoundary = `This is a string that goes well over the print width boundary with ${aVeryLongExpressionThatPushesItOver}`;

// Template with complex expressions
const complex = `${a ? b : c} and ${fn(x, y, z)} and ${obj.method().chain().call()}`;
const withArray = `items: ${[1, 2, 3].map(x => x * 2).join(", ")}`;
const withObject = `data: ${JSON.stringify({ key: "value", nested: { deep: true } })}`;

// Empty and minimal templates
const empty = ``;
const justExpr = `${x}`;
const noExpr = `just a plain string`;

// Template literals with newlines in expressions
const multilineExpr = `result: ${
  someFunction(
    arg1,
    arg2,
    arg3,
  )
}`;

// Sequences of template literals
const a1 = `first`;
const a2 = `second ${x}`;
const a3 = `third ${x} ${y} ${z}`;

// Template in assignment
obj.property = `value ${computed}`;
arr[0] = `value ${computed}`;
