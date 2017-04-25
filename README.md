[![NPM](https://nodei.co/npm/eslint-plugin-const-case.png?downloads=true&stars=true)](https://nodei.co/npm/eslint-plugin-const-case/)

[![dependencies Status](https://david-dm.org/k03mad/eslint-plugin-const-case/status.svg)](https://david-dm.org/k03mad/eslint-plugin-const-case)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-const-case`:

```
$ npm install eslint-plugin-const-case --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-const-case` globally.

## Usage

Add `const-case` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```js
{
    'plugins': [
        'const-case'
    ]
}
```


Then configure the rules you want to use under the rules section.

```js
{
    'rules': {
        'const-case/uppercase': 'error'
    }
}
```

## Rule Details

Examples of **correct** code for this rule:

```js

const FOO = 'bar',
const FOO = 42,
const FOO = ['bar', 42],
const FOO = {bar: 42}

const foo = `42 ${bar}`,
const foo = bar(),
const foo = bar ? bar : 42,
const foo = require('bar'),
const foo = bar.hello()

```





