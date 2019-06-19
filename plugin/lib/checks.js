'use strict';

// return true if node kind name case is upper
const isUpperCase = name => name
    && name === name.toUpperCase();

// return true if node kind name conatins only special chars
const isSpecialChars = name => name
    && /^[$_]$/.test(name);

// return true if node kind using for require
const isCalleeRequire = init => init
    && init.callee
    && init.callee.name === 'require';

// return true if node kind type is a literal
const isInitTypeLiteral = init => init
    && init.type === 'Literal';

// return true if node kind type is a negative literal
const isInitTypeNegativeLiteral = init => init
    && init.type === 'UnaryExpression'
    && init.operator === '-'
    && init.argument.type === 'Literal';

// return true if node kind type is a any literal
const isLiteral = init => isInitTypeLiteral(init) || isInitTypeNegativeLiteral(init);

module.exports = {
    isUpperCase,
    isSpecialChars,
    isCalleeRequire,
    isLiteral,
};
