module.exports = {

    create: context => {
        const EXCEPTIONS = [
            'ArrowFunctionExpression',
            'AwaitExpression',
            'CallExpression',
            'ConditionalExpression',
            'CallExpression',
            'TemplateLiteral'
        ];

        const SKIPS = ['ObjectPattern'];

        return {

            VariableDeclaration: node => {
                if (node.kind === 'const') {

                    node.declarations.forEach(variableDeclarator => {
                        const {id: {name}} = variableDeclarator;
                        const {id: {type}} = variableDeclarator;
                        const {init} = variableDeclarator;

                        const nameUpper = name ? name === name.toUpperCase() : null;
                        const initType = init ? init.type : null;

                        const exception = EXCEPTIONS.includes(initType);
                        const skip = SKIPS.includes(type);

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
