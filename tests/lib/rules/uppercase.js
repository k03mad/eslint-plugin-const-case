/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */

const rule = require('../../../lib/rules/uppercase');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2017}});
ruleTester.run('const-uppercase', rule, {

    invalid: [
        {
            code: "const foo = 'bar'",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = 42",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = []",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {}",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = ['bar', 42]",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {bar: 42, baz: 'qux'}",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = `42 ${bar}`",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bar()",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bar => baz",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bar ? 'baz' : qux",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bar.baz()",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "async function foo() {const BAR = await baz()}",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "for (const FOO of bar) {}",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bar.baz",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = bar * baz",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = new bar()",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = {bar: baz => qux}",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = baz || qux",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = [bar, baz]",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {bar: 42, baz: {qux: 'quux'}}",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {bar: 42, baz: ['qux', 'quux']}",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {bar: 42, baz: {}}",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const foo = {bar: 42, baz: []}",
            errors: [
                {
                    message: "const should be in upper case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = {bar: 42, baz: [`${qux} quux`]}",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = {bar: `${baz} qux`, quux: ['']}",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        },
        {
            code: "const FOO = {bar: [`${baz} qux`], quux: ['']}",
            errors: [
                {
                    message: "const should be in lower case",
                    type: "VariableDeclaration"
                }
            ]
        }
    ],

    valid: [
        "const foo = `bar ${baz} qbar`",
        "const foo = bar()",
        "const foo = bar ? 'baz' : qux",
        "const foo = require('bar')",
        "const FOO = require('bar')",
        "const FOO = 'bar'",
        "const FOO = 42",
        "const FOO = []",
        "const FOO = ['bar', 42]",
        "const FOO = {}",
        "const FOO = {bar: 42, baz: 'qux'}",
        "const {FOO} = bar",
        "const {foo} = bar",
        "const foo = bar.baz()",
        "const foo = bar => baz",
        "async function foo() {const bar = await baz()}",
        "for (const foo of bar) {}",
        "const foo = bar.baz",
        "const foo = bar * baz",
        "const foo = new bar()",
        "const foo = {bar: baz => qux}",
        "const foo = baz || qux",
        "const foo = [bar, baz]",
        "const FOO = {bar: 42, baz: {}}",
        "const FOO = {bar: 42, baz: []}",
        "const FOO = {bar: 42, baz: {qux: 'quux'}}",
        "const FOO = {bar: 42, baz: ['qux', 'quux']}",
        "const foo = {bar: 42, baz: [`${qux} quux`]}",
        "const foo = {bar: `${baz} qux`, quux: ['']}",
        "const foo = {bar: [`${baz} qux`], quux: ['']}",
        "const foo = {bar: [`${baz} qux`], quux: ['']}; const FOO = []"
    ]
});
