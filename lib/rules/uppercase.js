const debug = require('debug')('mad');

module.exports = {

    create: context => {

        const LOWER = 'const should be in lower case';
        const UPPER = 'const should be in upper case';

        let findLiteralsObject = true;
        let findLiteralsBinary = true;

        /**
         * Return false if objects has not only literals
         */
        const getLiteralsInObject = (arr, obj) => {
            for (const elem of arr) {

                const {type} = obj ? elem.value : elem;
                debug(`elem type = ${type}`);

                if (type !== 'Literal' && type !== 'ObjectExpression' && type !== 'ArrayExpression') {
                    return false;

                } else if (type === 'ObjectExpression') {
                    if (elem.value) {
                        findLiteralsObject = getLiteralsInObject(elem.value.properties, true);
                    }

                } else if (type === 'ArrayExpression') {
                    if (elem.value) {
                        findLiteralsObject = getLiteralsInObject(elem.value.elements);
                    }
                }
            }

            return findLiteralsObject;
        };

        /**
         * Return false if binary expression has not only literals
         */
        const getLiteralsInBinary = init => {
            for (const key in init.left) {
                if (key === 'type' && init.left[key] !== 'Literal' && init.left[key] !== 'BinaryExpression') {
                    return false;

                } else if (init.left[key] === 'BinaryExpression') {
                    findLiteralsBinary = getLiteralsInBinary(init.left);
                }
            }

            for (const key in init.right) {
                if (key === 'type' && init.right[key] !== 'Literal' && init.right[key] !== 'BinaryExpression') {
                    return false;

                } else if (init.right[key] === 'BinaryExpression') {
                    findLiteralsBinary = getLiteralsInBinary(init.right);
                }
            }

            return findLiteralsBinary;
        };

        /**
         * Send report after object or array walking
         */
        const sendObjectReport = (literals, nameUpper, node) => {
            if (!literals && nameUpper) {
                context.report(node, LOWER);
            } else if (literals && !nameUpper) {
                context.report(node, UPPER);
            }
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

                            const literals = getLiteralsInObject(init.properties, true);
                            sendObjectReport(literals, nameUpper, node);

                        } else if (initType === 'ArrayExpression') {

                            const literals = getLiteralsInObject(init.elements);
                            sendObjectReport(literals, nameUpper, node);

                        } else if (initType === 'BinaryExpression') {

                            const literals = getLiteralsInBinary(init);
                            sendObjectReport(literals, nameUpper, node);

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
