const debug = require('debug')('mad');

module.exports = {

    create: context => {

        const LOWER = 'const should be in lower case';
        const UPPER = 'const should be in upper case';

        let findLiterals = true;

        /**
         * Return true if objects has only literals
         */
        const getLiteralsInObject = (arr, obj) => {
            for (const elem of arr) {

                const {type} = obj ? elem.value : elem;
                debug(`elem type = ${type}`);

                if (type !== 'Literal' && type !== 'ObjectExpression' && type !== 'ArrayExpression') {
                    return false;

                } else if (type === 'ObjectExpression') {
                    if (elem.value) {
                        findLiterals = getLiteralsInObject(elem.value.properties, true);
                    }

                } else if (type === 'ArrayExpression') {
                    if (elem.value) {
                        findLiterals = getLiteralsInObject(elem.value.elements);
                    }
                }
            }

            return findLiterals;
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
