'use strict';

const {isUpperCase, isSpecialChars, isCalleeRequire, isLiteral} = require('../lib/checks');
const {upper, lower} = require('../lib/message');

module.exports = {
    create: ({report}) => ({

        VariableDeclaration: node => {
            node.kind === 'const'
                && node.declarations.forEach(({init, id: {name}}) => {

                    !isUpperCase(name)
                        && isLiteral(init)
                        && report(node, upper);

                    isUpperCase(name)
                        && !isLiteral(init)
                        && !isCalleeRequire(init)
                        && !isSpecialChars(name)
                        && report(node, lower);

                });

            node.kind === 'let'
                && node.declarations.forEach(({init, id: {name}}) => {

                    isUpperCase(name)
                        && !isCalleeRequire(init)
                        && !isSpecialChars(name)
                        && report(node, lower);

                });
        },

    }),
};
