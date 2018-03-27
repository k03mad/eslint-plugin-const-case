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
                        // return true if const is $ or _
                        const specChar = /[$_]/.test(name);
                        // return true if const using for require
                        const calleeRequire = init && init.callee ? init.callee.name === 'require' : false;

                        if (initTypeLiteral && !nameUpper) {
                            context.report(node, msg.upper);

                        } else if (!initTypeLiteral && nameUpper && !calleeRequire && !specChar) {
                            context.report(node, msg.lower);
                        }

                    });
                }
            }

        };
    }
};
