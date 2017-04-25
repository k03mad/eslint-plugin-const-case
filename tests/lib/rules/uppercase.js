/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */

const rule = require('../../../lib/rules/uppercase');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2015}});
ruleTester.run('const-uppercase', rule, {

    invalid: [
        {
            code: "const foo = 'bar'",
            errors: [
                {
                    message: "real const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = 123",
            errors: [
                {
                    message: "real const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = []",
            errors: [
                {
                    message: "real const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {}",
            errors: [
                {
                    message: "real const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = ['123', 123]",
            errors: [
                {
                    message: "real const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {a: 1, b: 2}",
            errors: [
                {
                    message: "real const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = `bar ${sbar} qbar`",
            errors: [
                {
                    message: "dependable const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = myFunc()",
            errors: [
                {
                    message: "dependable const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = test ? 'qwe' : 'ewq'",
            errors: [
                {
                    message: "dependable const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = require('me')",
            errors: [
                {
                    message: "dependable const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bro.hello()",
            errors: [
                {
                    message: "dependable const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        }
    ],

    valid: [
        "const foo = `bar ${sbar} qbar`",
        "const foo = myFunc()",
        "const foo = test ? 'qwe' : 'ewq'",
        "const foo = require('me')",
        "const FOO = 'qqq'",
        "const FOO = 123",
        "const FOO = []",
        "const FOO = ['123', 123]",
        "const FOO = {}",
        "const FOO = {a: 1, b: 2}",
        "const {length} = arr",
        "const foo = bro.hello()"
    ]
});
