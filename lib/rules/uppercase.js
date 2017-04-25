const debug = require('debug')('mad');

module.exports = {

    create: context => {

        const EXCEPTIONS = [
            'ArrowFunctionExpression',
            'AwaitExpression',
            'BinaryExpression',
            'CallExpression',
            'ConditionalExpression',
            'MemberExpression',
            'NewExpression',
            'TemplateLiteral'
        ];

        const SKIPPING = ['ObjectPattern'];

        return {

            VariableDeclaration: node => {
                if (node.kind === 'const') {

                    node.declarations.forEach(variableDeclarator => {
                        const {id: {name}} = variableDeclarator;
                        const {id: {type}} = variableDeclarator;
                        const {init} = variableDeclarator;

                        debug(`id name = ${name}`);
                        debug(`id type = ${type}`);

                        const nameUpper = name ? name === name.toUpperCase() : null;
                        const initType = init ? init.type : null;

                        debug(`init type = ${initType}`);

                        const exception = EXCEPTIONS.includes(initType);
                        const skip = SKIPPING.includes(type);

                        if (!skip && init) {

                            if (!exception && !nameUpper) {
                                context.report(node, 'const should be in upper case');
                            }

                            if (exception && nameUpper) {
                                context.report(node, 'const should be in lower case');
                            }

                        }

                        if (!init && nameUpper) {
                            context.report(node, 'const should be in lower case');
                        }

                    });

                }
            }

        };
    }

};
