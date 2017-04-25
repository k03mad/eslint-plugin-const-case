module.exports = {

    create: context => {

        const EXCEPTIONS = [
            'ArrowFunctionExpression',
            'AwaitExpression',
            'CallExpression',
            'ConditionalExpression',
            'MemberExpression',
            'TemplateLiteral',
            'BinaryExpression'
        ];

        const SKIPPING = ['ObjectPattern'];

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
                        const skip = SKIPPING.includes(type);

                        console.log(initType + '\n');

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
