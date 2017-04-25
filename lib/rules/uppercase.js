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

        const LOWER = 'const should be in lower case';
        const UPPER = 'const should be in upper case';

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

                        const objExpression = initType === 'ObjectExpression';

                        if (objExpression) {
                            let exceptionInObject;

                            init.properties.forEach(elem => {
                                if (EXCEPTIONS.includes(elem.value.type)) {
                                    exceptionInObject = true;
                                }
                            });

                            if (exceptionInObject && nameUpper) {
                                context.report(node, LOWER);
                            } else if (!exceptionInObject && !nameUpper) {
                                context.report(node, UPPER);
                            }

                        } else if (!skip && init) {

                            if (!exception && !nameUpper) {
                                context.report(node, UPPER);
                            } else if (exception && nameUpper) {
                                context.report(node, LOWER);
                            }

                        }

                        if (!init && nameUpper) {
                            context.report(node, LOWER);
                        }

                    });

                }
            }

        };
    }

};
