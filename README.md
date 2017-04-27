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

Examples of **correct** code for this rule:

```js

const FOO = 'bar';
const FOO = 42;
const FOO = ['bar', 42];
const FOO = {bar: 42, baz: 'qux'};

const foo = `42 ${bar}`;
const foo = bar();
const foo = bar ? baz : 42;
const foo = bar.baz();
const foo = bar => baz;
const foo = {bar: baz};
const foo = [bar, baz, 42];
```
