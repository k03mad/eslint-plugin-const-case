const debug = require('debug')('mad');

module.exports = {

    create: context => {

        const LOWER = 'const should be in lower case';
        const UPPER = 'const should be in upper case';

        /**
         * Return true if objects has only literals
         */
        const getLiteralsInObject = (arr, obj) => {

            let literalInObject = true;
            for (const elem of arr) {

                const type = obj ? elem.value.type : elem.type;

                debug(`elem type = ${type}`);

                if (type === 'ObjectExpression') {
                    if (elem.value) {
                        literalInObject = getLiteralsInObject(elem.value.properties, true);
                    }

                } else if (type === 'ArrayExpression') {
                    if (elem.value) {
                        literalInObject = getLiteralsInObject(elem.value.elements);
                    }

                } else if (type !== 'Literal') {
                    return false;
                }
            }

            return literalInObject;
        };

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

                        // skip checks for require
                        const calleeRequire = init && init.callee
                            ? init.callee.name === 'require'
                            : false;

                        if (initType === 'ObjectExpression') {

                            const literalInObject = getLiteralsInObject(init.properties, true);

                            if (!literalInObject && nameUpper) {
                                context.report(node, LOWER);
                            } else if (literalInObject && !nameUpper) {
                                context.report(node, UPPER);
                            }

                        } else if (initType === 'ArrayExpression') {

                            const literalInArray = getLiteralsInObject(init.elements);

                            if (!literalInArray && nameUpper) {
                                context.report(node, LOWER);
                            } else if (literalInArray && !nameUpper) {
                                context.report(node, UPPER);
                            }

                        } else if (initType === 'CallExpression' && nameUpper && !calleeRequire) {
                            context.report(node, LOWER);

                        } else if (initType === 'Literal' && !nameUpper) {
                            context.report(node, UPPER);

                        } else if (initType !== 'Literal' && nameUpper && !calleeRequire) {
                            context.report(node, LOWER);
                        }

                    });

                }
            }

        };
    }

};
