'use strict';

/**
 * Node kind name case is upper
 * @param {string} name
 * @returns {boolean}
 */
const isUpperCase = name => name
    && name === name.toUpperCase();

/**
 * Node kind name contains only special chars
 * @param {string} name
 * @returns {boolean}
 */
const isSpecialChars = name => name
    && /^[$_]$/.test(name);

/**
 * Node kind is using for require
 * @param {object} init
 * @returns {boolean}
 */
const isCalleeRequire = init => init
    && init.callee
    && init.callee.name === 'require';

/**
 * Node kind type is a literal
 * @param {object} init
 * @returns {boolean}
 */
const isInitTypeLiteral = init => init
    && init.type === 'Literal';

/**
 * Node kind type is a negative literal
 * @param {object} init
 * @returns {boolean}
 */
const isInitTypeNegativeLiteral = init => init
    && init.type === 'UnaryExpression'
    && init.operator === '-'
    && init.argument.type === 'Literal';

/**
 * Node kind type is is an any literal
 * @param {object} init
 * @returns {boolean}
 */
const isLiteral = init => isInitTypeLiteral(init) || isInitTypeNegativeLiteral(init);

module.exports = {
    isUpperCase,
    isSpecialChars,
    isCalleeRequire,
    isLiteral,
};
