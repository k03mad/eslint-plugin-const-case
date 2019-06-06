'use strict';
/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable node/no-unpublished-require */

const msg = require('../lib/message');
const rule = require('../lib/rules/uppercase');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2017}});

/**
 * Check code for const case
 * @param {string} constCase
 * @param {string} code
 * @returns {object}
 */
const checkCode = (constCase, code) => ({
    errors: [
        {
            TYPE: 'VariableDeclaration',
            message: msg[constCase],
        },
    ],
    code,
});

ruleTester.run('const-uppercase', rule, {

    invalid: [
        checkCode('upper', "const foo = 'bar'"),
        checkCode('upper', "const foo = 42"),
        checkCode('upper', "const foo = -42"),

        checkCode('lower', "async function foo() {const BAR = await baz()}"),
        checkCode('lower', "const FOO = ['bar', 42]"),
        checkCode('lower', "const FOO = []"),
        checkCode('lower', "const FOO = [bar, baz]"),
        checkCode('lower', "const FOO = {}"),
        checkCode('lower', "const FOO = {bar: [''], quux: [`${baz} quz`]}"),
        checkCode('lower', "const FOO = {bar: [`${baz} qux`], quux: ['']}"),
        checkCode('lower', "const FOO = {bar: {asd: '123'}, quux: [`${baz} quz`]}"),
        checkCode('lower', "const FOO = {bar: `${baz} qux`, quux: ['']}"),
        checkCode('lower', "const FOO = {bar: 42, baz: 'qux'}"),
        checkCode('lower', "const FOO = {bar: 42, baz: ['qux', 'quux']}"),
        checkCode('lower', "const FOO = {bar: 42, baz: []}"),
        checkCode('lower', "const FOO = {bar: 42, baz: [`${qux} quux`]}"),
        checkCode('lower', "const FOO = {bar: 42, baz: {}}"),
        checkCode('lower', "const FOO = {bar: 42, baz: {qux: 'quux'}}"),
        checkCode('lower', "const FOO = {bar: baz => qux}"),
        checkCode('lower', "const FOO = `42 ${bar}`"),
        checkCode('lower', "const FOO = 2 * 2 * 10"),
        checkCode('lower', "const FOO = 2 * 2"),
        checkCode('lower', "const FOO = 2 * bar"),
        checkCode('lower', "const FOO = bar ? 'baz' : qux"),
        checkCode('lower', "const FOO = bar * baz"),
        checkCode('lower', "const FOO = bar => baz"),
        checkCode('lower', "const FOO = bar.baz"),
        checkCode('lower', "const FOO = bar.baz('qux')"),
        checkCode('lower', "const FOO = bar.baz()"),
        checkCode('lower', "const FOO = bar()"),
        checkCode('lower', "const FOO = baz || qux"),
        checkCode('lower', "const FOO = new bar()"),
        checkCode('lower', "const FOO_BAR = document.querySelectorAll('qux')"),
        checkCode('lower', "for (const FOO of bar) {}"),
    ],

    valid: [
        "const {FOO} = bar",
        "const FOO = -42",
        "const FOO = 'bar'",
        "const FOO = 42",
        "const FOO = require('bar')",
        "const FOO = require(bar)",

        "async function foo() {const bar = await baz()}",
        "const _ = 'foo'",
        "const $ = 'bar'",
        "const {foo} = bar",
        "const foo = ['bar', 42]",
        "const foo = []",
        "const foo = [bar, baz]",
        "const foo = {}",
        "const foo = {bar: [''], quux: [`${baz} quz`]}",
        "const foo = {bar: [`${baz} qux`], quux: ['']}",
        "const foo = {bar: {asd: '123'}, quux: [`${baz} quz`]}",
        "const foo = {bar: `${baz} qux`, quux: ['']}",
        "const foo = {bar: 42, baz: 'qux'}",
        "const foo = {bar: 42, baz: ['qux', 'quux']}",
        "const foo = {bar: 42, baz: []}",
        "const foo = {bar: 42, baz: [`${qux} quux`]}",
        "const foo = {bar: 42, baz: {}}",
        "const foo = {bar: 42, baz: {qux: 'quux'}}",
        "const foo = {bar: baz => qux}",
        "const foo = `bar ${baz} qbar`",
        "const foo = 2 * 2 * 10",
        "const foo = 2 * 2",
        "const foo = 2 * bar",
        "const foo = bar ? 'baz' : qux",
        "const foo = bar * baz",
        "const foo = bar => baz",
        "const foo = bar.baz",
        "const foo = bar.baz()",
        "const foo = bar()",
        "const foo = baz || qux",
        "const foo = new bar()",
        "const foo = require('bar')",
        "const foo = require(bar)",
        "const fooBar = document.querySelectorAll('qux')",
        "for (const foo of bar) {}",
    ],
});
