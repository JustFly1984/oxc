// Dangling comments in empty blocks
function empty() { /* dangling */ }
function emptyMultiline() {
  /* dangling in empty body */
}

// Dangling comments in empty objects and arrays
const emptyObj = { /* dangling */ };
const emptyArr = [ /* dangling */ ];
const emptyObjMultiline = {
  /* dangling in empty object */
};
const emptyArrMultiline = [
  /* dangling in empty array */
];

// Comments between if/else
if (a) {
  foo();
} /* between if and else */ else {
  bar();
}

if (a) {
  foo();
}
// line comment between if and else
else {
  bar();
}

if (a) {
  foo();
} /* c1 */ /* c2 */ else if (b) {
  bar();
} /* c3 */ else {
  baz();
}

// Comments in destructuring patterns
const { /* before */ x, /* between */ y /* after */ } = obj;
const [/* before */ a, /* between */ b /* after */] = arr;
const { x: /* rename comment */ renamed } = obj;
const { .../* rest comment */ rest } = obj;

// Comments inside arrow function bodies
const f1 = () => /* comment before expr */ expr;
const f2 = (x) => /* comment */ x + 1;
const f3 = () => /* c1 */ /* c2 */ value;

// Multiple consecutive comments with different spacing
foo();
// comment 1
// comment 2
// comment 3
bar();

foo();
/* block 1 */
/* block 2 */
/* block 3 */
bar();

foo(); // trailing 1
bar(); // trailing 2

// Trailing comments after return with expressions
function ret1() {
  return /* comment */ value;
}
function ret2() {
  return (
    /* comment inside parens */
    value
  );
}
function ret3() {
  return; // void return with comment
}

// Comments in switch
switch (x) {
  // before first case
  case 1:
    break;
  /* between cases */
  case 2:
    break;
  // before default
  default:
    break;
}

// Comments in for loops
for (/* init */ let i = 0; /* cond */ i < 10; /* update */ i++) {}
for (const /* item comment */ item of /* iterable comment */ items) {}

// Comments around spread
const merged = { ...a, /* between spreads */ ...b };
const arr2 = [...a, /* between spreads */ ...b];
