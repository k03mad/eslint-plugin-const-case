'use strict';

/* eslint-disable no-template-curly-in-string */
/* eslint-disable node/no-unpublished-require */

const msg = require('../lib/message');
const rule = require('../lib/rules/uppercase');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2017}});

const invalid = [
    ['upper', 'const foo = "bar"'],
    ['upper', 'const foo = \'bar\''],
    ['upper', 'const foo = 42'],
    ['upper', 'const foo = -42'],

    ['lower', 'async function foo() {const BAR = await baz()}'],
    ['lower', 'const FOO = ["bar", 42]'],
    ['lower', 'const FOO = []'],
    ['lower', 'const FOO = [bar, baz]'],
    ['lower', 'const FOO = {}'],
    ['lower', 'const FOO = {bar: [""], quux: [`${baz} quz`]}'],
    ['lower', 'const FOO = {bar: [`${baz} qux`], quux: [""]}'],
    ['lower', 'const FOO = {bar: {asd: "123"}, quux: [`${baz} quz`]}'],
    ['lower', 'const FOO = {bar: `${baz} qux`, quux: [""]}'],
    ['lower', 'const FOO = {bar: 42, baz: "qux"}'],
    ['lower', 'const FOO = {bar: 42, baz: ["qux", "quux"]}'],
    ['lower', 'const FOO = {bar: 42, baz: []}'],
    ['lower', 'const FOO = {bar: 42, baz: [`${qux} quux`]}'],
    ['lower', 'const FOO = {bar: 42, baz: {}}'],
    ['lower', 'const FOO = {bar: 42, baz: {qux: "quux"}}'],
    ['lower', 'const FOO = {bar: baz => qux}'],
    ['lower', 'const FOO = `42 ${bar}`'],
    ['lower', 'const FOO = 2 * 2 * 10'],
    ['lower', 'const FOO = 2 * 2'],
    ['lower', 'const FOO = 2 * bar'],
    ['lower', 'const FOO = bar ? "baz" : qux'],
    ['lower', 'const FOO = bar * baz'],
    ['lower', 'const FOO = bar => baz'],
    ['lower', 'const FOO = bar.baz'],
    ['lower', 'const FOO = bar.baz("qux")'],
    ['lower', 'const FOO = bar.baz()'],
    ['lower', 'const FOO = bar()'],
    ['lower', 'const FOO = baz || qux'],
    ['lower', 'const FOO = new bar()'],
    ['lower', 'const FOO_BAR = document.querySelectorAll("qux")'],
    ['lower', 'for (const FOO of bar) {}'],
];

const valid = [
    'const {FOO} = bar',
    'const FOO = -42',
    'const FOO = "bar"',
    'const FOO = \'bar\'',
    'const FOO = 42',
    'const FOO = require("bar")',
    'const FOO = require(bar)',

    'async function foo() {const bar = await baz()}',
    'const _ = "foo"',
    'const $ = "bar"',
    'const {foo} = bar',
    'const foo = ["bar", 42]',
    'const foo = []',
    'const foo = [bar, baz]',
    'const foo = {}',
    'const foo = {bar: [""], quux: [`${baz} quz`]}',
    'const foo = {bar: [`${baz} qux`], quux: [""]}',
    'const foo = {bar: {asd: "123"}, quux: [`${baz} quz`]}',
    'const foo = {bar: `${baz} qux`, quux: [""]}',
    'const foo = {bar: 42, baz: "qux"}',
    'const foo = {bar: 42, baz: ["qux", "quux"]}',
    'const foo = {bar: 42, baz: []}',
    'const foo = {bar: 42, baz: [`${qux} quux`]}',
    'const foo = {bar: 42, baz: {}}',
    'const foo = {bar: 42, baz: {qux: "quux"}}',
    'const foo = {bar: baz => qux}',
    'const foo = `bar ${baz} qbar`',
    'const foo = 2 * 2 * 10',
    'const foo = 2 * 2',
    'const foo = 2 * bar',
    'const foo = bar ? "baz" : qux',
    'const foo = bar * baz',
    'const foo = bar => baz',
    'const foo = bar.baz',
    'const foo = bar.baz()',
    'const foo = bar()',
    'const foo = baz || qux',
    'const foo = new bar()',
    'const foo = require("bar")',
    'const foo = require(bar)',
    'const fooBar = document.querySelectorAll("qux")',
    'for (const foo of bar) {}',
];

ruleTester.run('const-uppercase', rule, {
    invalid: invalid.map(([constCase, code]) => ({
        errors: [
            {
                TYPE: 'VariableDeclaration',
                message: msg[constCase],
            },
        ],
        code,
    })),
    valid,
});
