const debug = require('debug')('eslint-plugin-const-case');
const msg = require('../message');

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
                        // return true if const using for require
                        const calleeRequire = init && init.callee ? init.callee.name === 'require' : false;

                        debug(`id name = ${name}`);
                        debug(`name in uppercase = ${nameUpper}`);
                        debug(`init type literal = ${initTypeLiteral}`);
                        debug(`is require = ${calleeRequire}`);

                        if (initTypeLiteral && !nameUpper) {
                            debug(msg.upper);
                            context.report(node, msg.upper);

                        } else if (!initTypeLiteral && nameUpper && !calleeRequire) {
                            debug(msg.lower);
                            context.report(node, msg.lower);
                        }

                    });
                }
            }

        };
    }
};
