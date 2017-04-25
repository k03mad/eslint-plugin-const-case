module.exports = {

    create: context => {
        const EXCEPTIONS = [
            'CallExpression',
            'ConditionalExpression',
            'CallExpression',
            'TemplateLiteral'
        ];

        return {

            VariableDeclaration: node => {
                if (node.kind === 'const') {

                    node.declarations.forEach(variableDeclarator => {
                        const ID_NAME = variableDeclarator.id.name;
                        const ID_TYPE = variableDeclarator.id.type;
                        const INIT_TYPE = variableDeclarator.init.type;

                        const exception = EXCEPTIONS.includes(INIT_TYPE);

                        if (ID_TYPE !== 'ObjectPattern') {

                            if (!exception && ID_NAME !== ID_NAME.toUpperCase()) {
                                context.report(node, 'real const should be in upper case');

                            } else if (exception && ID_NAME === ID_NAME.toUpperCase()) {
                                context.report(node, 'dependable const should be in lower case');
                            }

                        }
                    });

                }
            }

        };
    }

};
