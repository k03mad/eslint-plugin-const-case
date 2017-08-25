[![NPM](https://nodei.co/npm/eslint-plugin-const-case.png?downloads=true&stars=true)](https://nodei.co/npm/eslint-plugin-const-case/)

[![dependencies Status](https://david-dm.org/k03mad/eslint-plugin-const-case/status.svg)](https://david-dm.org/k03mad/eslint-plugin-const-case)

## Installation

```
$ npm i eslint eslint-plugin-const-case --save-dev
```

## Usage

Add `const-case` to the `.eslintrc` configuration file.

```js
{
    'plugins': [
        'const-case'
    ],
    'rules': {
        'const-case/uppercase': 'error'
    }
}
```

## Rule Details

**WARNING! From 1.0.0 only literals should be in UPPER_CASE.**
Examples of correct code for this rule:

```js

const FOO = 'bar';
const FOO = 42;

const foo = ['bar', 42];
const foo = {bar: 42, baz: 'qux'};
const foo = 1000 * 60 * 10;
const foo = `42 ${bar}`;
const foo = bar();
const foo = bar ? baz : 42;
const foo = bar.baz();
const foo = bar => baz;
const foo = {bar: baz};
const foo = [bar, baz, 42];
```

[Correct code for 0.5.2 version.](https://github.com/k03mad/eslint-plugin-const-case/blob/be8654452ba0c636f152f2091cc4f09fdd4da65b/README.md)
