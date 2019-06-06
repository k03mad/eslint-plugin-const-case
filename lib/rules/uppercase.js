'use strict';

const msg = require('../message');

module.exports = {
    create: ({report}) => ({

        VariableDeclaration: node => {
            if (node.kind === 'const') {
                node.declarations.forEach(({init, id: {name}}) => {

                    // return true if const case is upper
                    const nameUpperCase = name
                        && name === name.toUpperCase();

                    // return true if const is $ or _
                    const specialChars = name
                        && /^[$_]$/.test(name);

                    // return true if const using for require
                    const calleeRequire = init
                        && init.callee
                        && init.callee.name === 'require';

                    // return true if const type is literal
                    const initTypeLiteral = init
                        && init.type === 'Literal';

                    // return true if const is a negative literal
                    const initTypeNegativeLiteral = init
                        && init.type === 'UnaryExpression'
                        && init.operator === '-'
                        && init.argument.type === 'Literal';

                    const literal = initTypeLiteral || initTypeNegativeLiteral;

                    if (

                        !nameUpperCase
                        && literal

                    ) {
                        report(node, msg.upper);

                    } else if (

                        nameUpperCase
                        && !literal
                        && !calleeRequire
                        && !specialChars

                    ) {
                        report(node, msg.lower);

                    }

                });
            }
        },

    }),
};
