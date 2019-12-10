/*
   @input: string of expression
   @function: separate each term
   @return : object with variable as a property name and coefficient as a property value;
   @example:
    const terms = newEquationObject('3x+5y-6t7+8');

    let variables = Object.getOwnPropertyNames(s_terms);

    for (const itr of variables) {
        console.log(itr + ': ' + s_terms[itr]);
    }
    console.log('====================');
*/
let newEquationObject = (equation) => {
    let eqnObject = {};
    let createObject = (variable, numValue, gotEqual) => {
        if (gotEqual) { numValue *= -1; }
        if (eqnObject.hasOwnProperty(variable)) {
            eqnObject[variable] += numValue;
        } else {
            Object.defineProperty(eqnObject, variable, {
                value: numValue,
                writable: true,
                configurable: true,
                enumerable: true
            });
        }
        return null;
    };

    let stackDigit = '';
    let number = 1;
    let gotEqual = false;
    let stackVariable = '';
    equation = equation.replace(/ /g, '');

    for (let index = 0; index < equation.length; index++) {
        const element = equation[index];
        if (/^[0-9\.]$/.test(element)) {
            stackDigit += element;
        } else if (/^[a-zA-Z]$/.test(element)) {
            stackVariable += element;
            if (/([1-9][0-9]*)/.test(stackDigit)) {
                number *= parseFloat(stackDigit);
                stackDigit = '';
            }
        }
        if (/^[=\-\+]$/.test(element) || index === equation.length - 1) {
            if (stackVariable) {
                if (stackDigit) { number *= parseFloat(stackDigit) };
                //    console.log(`${stackVariable} : ${number}`);
                createObject(stackVariable, number, gotEqual);
                number = 1;
            } else if (stackDigit) {
                number *= parseFloat(stackDigit);
                //    console.log(`constant : ${number}`);
                createObject('constant', number, gotEqual);
                number = 1;
            }
            stackDigit = '';
            stackVariable = '';
            if (element === '-') {
                number *= -1;
            } else if (element === '=') {
                gotEqual = true;
            }
        }
    }
    return eqnObject;
};

//    let eqn1 = newEquationObject("x+2y+3z=3");
//    let eqn2 = newEquationObject("2x+4y+5z=5");
//    let eqn3 = newEquationObject("3x+5y+6z=7");

