'use strict';

const msg = require('../message');

/**
 * @function isNegativeLiteral
 * @param {object} init
 * @returns {boolean} Whether the node is a negative literal.
 */
const isNegativeLiteral = init => init.type === 'UnaryExpression'
      && init.operator === '-'
      && init.argument.type === 'Literal';

module.exports = {
    create: context => ({

        VariableDeclaration: node => {
            if (node.kind === 'const') {
                node.declarations.forEach(variableDeclarator => {

                    const {init, id: {name}} = variableDeclarator;

                    // return true if const case is upper
                    const nameUpper = name && name === name.toUpperCase();

                    // return true if const type is literal
                    const initTypeLiteral = init && init.type === 'Literal';

                    // return true if const is a negative literal
                    const initTypeNegativeLiteral = init && isNegativeLiteral(init);

                    // return true if const is $ or _
                    const specChar = /^[$_]$/.test(name);

                    // return true if const using for require
                    const calleeRequire = init && init.callee && init.callee.name === 'require';

                    if (

                        (initTypeLiteral || initTypeNegativeLiteral)
                        && !nameUpper

                    ) {
                        context.report(node, msg.upper);

                    } else if (

                        !(initTypeLiteral || initTypeNegativeLiteral)
                        && nameUpper
                        && !calleeRequire
                        && !specChar

                    ) {
                        context.report(node, msg.lower);

                    }

                });
            }
        },

    }),
};
