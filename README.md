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

```json
{
    'plugins': [
        'const-case'
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    'rules': {
        'const-case/uppercase': 'error'
    }
}
```

## Rule Details

Examples of **correct** code for this rule:

```js

const FOO = 'qqq',
const FOO = 123,
const FOO = ['123', 123],
const FOO = {a: 1, b: 2}

const foo = `bar ${abr} arb`,
const foo = myFunc(),
const foo = test ? 'qwe' : 'ewq',
const foo = require('me'),
const foo = bro.hello()

```





