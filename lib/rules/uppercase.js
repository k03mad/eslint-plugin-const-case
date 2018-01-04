const msg = require('../message');

/**
 * @function isNegativeLiteral
 * @return {bool} Whether the node is a negative literal.
 */
const isNegativeLiteral = init => init.type === 'UnaryExpression'
      && init.operator === '-'
      && init.argument.type === 'Literal';

module.exports = {
    create: context => {
        return {

            VariableDeclaration: node => {
                if (node.kind === 'const') {
                    node.declarations.forEach(variableDeclarator => {

                        const {id: {name}} = variableDeclarator;
                        const {init} = variableDeclarator;

                        // return true if const case is upper
                        const nameUpper = name ? name === name.toUpperCase() : false;
                        // return true if const type is literal
                        const initTypeLiteral = init ? init.type === 'Literal' : false;
                        // return true if const is a negative literal
                        const initTypeNegativeLiteral = init ? isNegativeLiteral(init) : false;
                        // return true if const using for require
                        const calleeRequire = init && init.callee ? init.callee.name === 'require' : false;

                        if ((initTypeLiteral || initTypeNegativeLiteral) && !nameUpper) {
                            context.report(node, msg.upper);

                        } else if (!(initTypeLiteral || initTypeNegativeLiteral) && nameUpper && !calleeRequire) {
                            context.report(node, msg.lower);
                        }

                    });
                }
            }

        };
    }
};
