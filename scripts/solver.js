
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
    if (matrixWithVariableSeperated[0].length > matrixWithVariableSeperated[0][0].length) {
        Showpopup([
            "ERROR Detected",
            "No. of Equation is more than no. of variable",
            "Enter another system of equation to get the Unique Solution"
        ]);
        return false;
    }
    let inverseOfCoefficientMatrix = inverse(matrixWithVariableSeperated[0]);
    if (!inverseOfCoefficientMatrix) {
        detectDeterminantZeroError(matrixWithVariableSeperated);
        return false;
    }
    let product = matrixProduct(inverseOfCoefficientMatrix, matrixWithVariableSeperated[2]);
    if (product === undefined) return false; //this may be undefined if matrixProduct() returns undefined;
    output.innerHTML = '';
    for (let row = 0, col = 0; row < product.length; row++) {
        output.insertAdjacentHTML('beforeend', `<output>${matrixWithVariableSeperated[1][row][col]} = ${product[row][col]}</output>`);
        firstInputContainer.innerHTML += `<output>${matrixWithVariableSeperated[1][row][col]} = ${product[row][col]}</output>`;
    }
    return true;
}

/*
function: createMatrix(array);
accept: an array of equation's object;
return: array[coeffiecient matxix, variable's matrix, constant's matrix]
*/
let createMatrix = (equationsArr) => {
    let referenceObjArr = [];
    equationsArr.forEach(element => {
        // condition no. of variables should be less than or equal to the number of Equations;
        // if equation is homogeneous then the below function will permit if equation has 1 variable more than no of equation.
        // therefore homogeneous equation will targeted while creating new constant.
        if (Object.getOwnPropertyNames(element).length <= equationsArr.length + 1) {
            referenceObjArr = Object.getOwnPropertyNames(element);
            return null;
        }
    });

    if (referenceObjArr.length === 0) {
        Showpopup([
            "ERROR Detected",
            "No. of Equation is less than no. of variable",
            "Enter another system of equation to get the Unique Solution"
        ]);
        return false;
    }

    let matrixA = [];
    let matrixC = [];
    let matrixX = [];
    for (const itr of referenceObjArr) {
        if (itr !== 'constant') {
            matrixX.push([`${itr}`]);
        }
    }
    let ExcessVariableInHomogeneousError = false;
    for (let i = 0; i < equationsArr.length; i++) {
        let tempRow = [];
        for (let ii = 0; ii < matrixX.length; ii++) {
            let elm = equationsArr[i][`${matrixX[ii][0]}`];
            if (elm == undefined) {
                tempRow.push(0);
            } else {
                tempRow.push(elm);
            }
        }
        let con = -equationsArr[i][`constant`];
        if (isNaN(con)) {
            if (referenceObjArr.length === equationsArr.length + 1) {
                ExcessVariableInHomogeneousError = true;
            } else {
                ExcessVariableInHomogeneousError = false;
            }
            matrixC.push([0]);
        } else {
            ExcessVariableInHomogeneousError = false;
            matrixC.push([con]);
        }
        matrixA.push(tempRow);
    }
    if (ExcessVariableInHomogeneousError) {
        Showpopup([
            "ERROR Detected",
            "Your Input contains one extra variable than expected",
            "Origin is the solution of homogeneous system of Equation",
            "Enter One more equation to get the Unique Solution"
        ]);
        return false;
    }

    return [matrixA, matrixX, matrixC];
};


goToEvaluateBtn.addEventListener('click', evaluate);
noOfEqnInputBox.addEventListener('input', setInputBox);

menuSymbol.addEventListener('click', () => {
    // menuSymbol.classList.toggle('cross-symbol');
    historyContainer.classList.toggle('translate0');
});
