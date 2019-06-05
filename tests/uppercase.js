/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */

const rule = require('../lib/rules/uppercase');
const msg = require('../lib/message');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2017}});

const TYPE = 'VariableDeclaration';

ruleTester.run('const-uppercase', rule, {

    invalid: [
        {
            code: "const foo = 'bar'",
            errors: [{TYPE, message: msg.upper}]
        },
        {
            code: "const foo = 42",
            errors: [{TYPE, message: msg.upper}]
        },
        {
            code: "const foo = -42",
            errors: [{TYPE, message: msg.upper}]
        },
        {
            code: "const FOO = []",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = ['bar', 42]",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: 42, baz: 'qux'}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = `42 ${bar}`",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = bar()",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = bar => baz",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = bar ? 'baz' : qux",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = bar.baz()",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "async function foo() {const BAR = await baz()}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "for (const FOO of bar) {}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = bar.baz",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = bar * baz",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = new bar()",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: baz => qux}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = baz || qux",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = [bar, baz]",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: 42, baz: {qux: 'quux'}}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: 42, baz: ['qux', 'quux']}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: 42, baz: {}}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: 42, baz: []}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: 42, baz: [`${qux} quux`]}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: `${baz} qux`, quux: ['']}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: [`${baz} qux`], quux: ['']}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: {asd: '123'}, quux: [`${baz} quz`]}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = {bar: [''], quux: [`${baz} quz`]}",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = 2 * 2",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = 2 * 2 * 10",
            errors: [{TYPE, message: msg.lower}]
        },
        {
            code: "const FOO = 2 * bar",
            errors: [{TYPE, message: msg.lower}]
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
        "const FOO = -42",
        "const foo = []",
        "const foo = ['bar', 42]",
        "const foo = {}",
        "const foo = {bar: 42, baz: 'qux'}",
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
        "const foo = {bar: 42, baz: {}}",
        "const foo = {bar: 42, baz: []}",
        "const foo = {bar: 42, baz: {qux: 'quux'}}",
        "const foo = {bar: 42, baz: ['qux', 'quux']}",
        "const foo = {bar: 42, baz: [`${qux} quux`]}",
        "const foo = {bar: `${baz} qux`, quux: ['']}",
        "const foo = {bar: [`${baz} qux`], quux: ['']}",
        "const foo = {bar: {asd: '123'}, quux: [`${baz} quz`]}",
        "const foo = {bar: [''], quux: [`${baz} quz`]}",
        "const foo = 2 * 2",
        "const foo = 2 * 2 * 10",
        "const foo = 2 * bar",
        "const foo = require(bar)",
        "const FOO = require(bar)",
        "const _ = 'foo'",
        "const $ = 'bar'"
    ]
});
