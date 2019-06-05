[![Dependencies](https://david-dm.org/k03mad/eslint-plugin-const-case.svg)](https://github.com/k03mad/eslint-plugin-const-case/blob/master/package.json) [![LCommit](https://img.shields.io/github/last-commit/k03mad/eslint-plugin-const-case.svg)](https://github.com/k03mad/eslint-plugin-const-case/commits/master)

[![Downloads](https://img.shields.io/npm/dt/eslint-plugin-const-case.svg)](https://www.npmjs.com/package/eslint-plugin-const-case) [![NPM](https://img.shields.io/npm/v/eslint-plugin-const-case.svg)](https://www.npmjs.com/package/eslint-plugin-const-case)

![Size](https://img.shields.io/github/repo-size/k03mad/eslint-plugin-const-case.svg) [![install size](https://packagephobia.now.sh/badge?p=eslint-plugin-const-case)](https://packagephobia.now.sh/result?p=eslint-plugin-const-case)

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
const FOO = -42;

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
