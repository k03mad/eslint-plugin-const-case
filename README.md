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

Examples of correct code for this rule:

```js

const FOO = 'bar';
const FOO = 42;
const FOO = -42;
// else with lowercase
```
