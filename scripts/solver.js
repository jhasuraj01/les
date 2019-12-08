
let setInputBox = () => {
    output.innerHTML = '';
    let inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = '<legend class="inputContainer-header">EQUATION</legend>';
    for (let index = 0; index < noOfEqnInputBox.value; index++) {
        let element = `<input type="text" class="${index} equationInputBox">`;
        inputContainer.insertAdjacentHTML('afterbegin', element);
    }
};
let evaluate = () => {
    output.innerHTML = '';
    let equationsArr = [];
    let stop = false;
    let inputBox = document.querySelectorAll('#inputContainer input');
    historyContainerHeader.insertAdjacentHTML('afterend', '<section class="aside-inputContainer"></section>');
    let firstInputContainer = document.querySelector('#historyContainer .aside-inputContainer');
    let emptyInputBox = false;
    let invalidCharacterPresent = false;
    let improperEquation = false;
    let ErrorMessage = ["ERROR IN TAKING INPUT"];
    inputBox.forEach(element => {
        if (/([a-zA-Z0-9-+ ])+(=)([a-zA-Z0-9-+ ])+/.test(element.value)) {
            equationsArr.push(newEquationObject(element.value));
            firstInputContainer.innerHTML += `<input type="text" class="equationInputBox" value="${element.value}" disabled>`
        } else if (element.value === '') {
            // empty input box is set true after if statement to avoid displaying same error more than once if multiple empty input box will be there.
            if (emptyInputBox === false) {
                ErrorMessage.push("Empty Input box is invalid");
            }
            emptyInputBox = true;
            stop = true;
        } else {
            if (improperEquation === false) {
                ErrorMessage.push("You may have not written proper equation");
            }
            improperEquation = true;
            stop = true;
        }
        if (/[^a-zA-Z0-9-+\s=.]+/.test(element.value)) {
            if (invalidCharacterPresent === false) {
                ErrorMessage.push("Any non-english character is not accepted as a variable name");
                ErrorMessage.push("special characters except '<b>+</b>', '<b>-</b>', '<b>=</b>' or '<b>.</b>' are not accepted");
            }
            invalidCharacterPresent = true;
            stop = true;
        }
    });

    if (stop) {
        ErrorMessage.push("Enter VALID system of equation to get the Unique Solution");
        Showpopup(ErrorMessage);
        firstInputContainer.parentNode.removeChild(firstInputContainer);
        return false;
    }

    // createMatrix() returns: array[coeffiecient matxix, variable's matrix, constant's matrix];
    let matrixWithVariableSeperated = createMatrix(equationsArr);

    if (!matrixWithVariableSeperated) return false;
    // if (matrixWithVariableSeperated[0].value.length > matrixWithVariableSeperated[0].value[0].length) {
    //     Showpopup([
    //         "ERROR Detected",
    //         "No. of Equation is more than no. of variable",
    //         "Enter another system of equation to get the Unique Solution"
    //     ]);
    //     return false;
    // }

    if ((matrixWithVariableSeperated[0]).det().value() === 0) {
        detectDeterminantZeroError(matrixWithVariableSeperated);
        return false;
    }
    let inverseOfCoefficientMatrix = matrixWithVariableSeperated[0].inverse();
    
    let product = inverseOfCoefficientMatrix.multiply(matrixWithVariableSeperated[2]);
    if (product === undefined) {
        //this may be undefined if matrixProduct() returns undefined;
        console.error('product is undefined');
        return false;
    }
    output.innerHTML = '';
    for (let row = 0, col = 0; row < product.value.length; row++) {
        output.insertAdjacentHTML('beforeend', `<output>${matrixWithVariableSeperated[1].value[row][col]} = ${product.value[row][col].value()}</output>`);
        firstInputContainer.innerHTML += `<output>${matrixWithVariableSeperated[1].value[row][col]} = ${product.value[row][col].value()}</output>`;
    }
    return true;
}

/*
function: createMatrix(array);
accept: an array of equation's object;
return: array[coeffiecient matrix, variable's matrix, constant's matrix], here each matrix is an instance of Matrix Class
*/
let createMatrix = (equationsArr) => {
    let referenceObjArr = [];
    equationsArr.forEach(eqn_obj => {
        // condition no. of variables should be less than or equal to the number of Equations;
        // if equation is homogeneous then the below function will permit if equation has 1 variable more than no of equation.
        // therefore homogeneous equation will targeted while creating new constant.

        // Object.getOwnPropertyNames(eqn_obj).filter(variable => referenceObjArr.indexOf(variable) === -1) --> it will return all the new variable which is not present in reference variable;
        referenceObjArr = Object.getOwnPropertyNames(eqn_obj).filter(variable => referenceObjArr.indexOf(variable) === -1).concat(referenceObjArr);
    });
    let noOfVariable = referenceObjArr.indexOf('constant') === -1 ? referenceObjArr.length : referenceObjArr.length-1;
    if (noOfVariable > equationsArr.length) {
        Showpopup([
            "ERROR Detected",
            "No. of Equation is less than no. of variable",
            "Your Input contains " + (noOfVariable - equationsArr.length) + " extra variable than expected",
            "Enter " + (noOfVariable - equationsArr.length) + " more equation to get the Unique Solution"
        ]);
        return false;
    }

    let matrix_arr_A = [];
    let matrix_arr_C = [];
    let matrix_arr_X = [];
    for (const itr of referenceObjArr) {
        if (itr !== 'constant') {
            matrix_arr_X.push([`${itr}`]);
        }
    }

    for (let i = 0; i < equationsArr.length; i++) {
        let tempRow = [];
        for (let ii = 0; ii < matrix_arr_X.length; ii++) {
            let elm = equationsArr[i][`${matrix_arr_X[ii][0]}`] || 0;
            // elm will be undefined if one equation will have a constant term and other will not.
            tempRow.push(elm);
        }
        matrix_arr_A.push(tempRow);

        let constant = -equationsArr[i][`constant`] || 0;
        if (isNaN(constant)) {
            console.error('Constant is still not a number');
        }
        matrix_arr_C.push([constant]);
    }

    return [new Matrix(matrix_arr_A), new Matrix(matrix_arr_X), new Matrix(matrix_arr_C)];
};


goToEvaluateBtn.addEventListener('click', evaluate);
noOfEqnInputBox.addEventListener('input', setInputBox);

menuSymbol.addEventListener('click', () => {
    // menuSymbol.classList.toggle('cross-symbol');
    historyContainer.classList.toggle('translate0');
});
