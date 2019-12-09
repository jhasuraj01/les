let add_input_bar = () => {
    let element = `<input type="text" class="equationInputBox equation_in">`;
    inputContainer.insertAdjacentHTML('beforeend', element);
    let inputs = document.getElementsByClassName('equation_in');
    console.log(inputs[inputs.length-1]);
    inputs[inputs.length-1].addEventListener('input', coOperateWithUser);
}
let coOperateWithUser = () => {
    output.innerHTML = '';
    let inputBox = document.querySelectorAll('.equation_in');
    variables_arr = [];
    inputBox.forEach(input => {
        variables_arr = Object.getOwnPropertyNames(newEquationObject(input.value))
                                .filter(variable => variables_arr.indexOf(variable) === -1)
                                .concat(variables_arr);
    })
    console.log(variables_arr)
    noOfVariable = variables_arr.indexOf('constant') === -1 ? variables_arr.length : variables_arr.length-1;
    if (noOfVariable > inputBox.length) {
        add_input_bar();
    } else if (noOfVariable < inputBox.length) {
        for (let index = inputBox.length - 1; index > 0; index--) {
            const input = inputBox[index];
            if(input.value === '') {
                input.remove();
                console.log(input)
                break;
            }
        }
    }
}

let evaluate = () => {
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
        let var_ = matrixWithVariableSeperated[1].value[row][col];

        let val = product.value[row][col].string();

        output.insertAdjacentHTML('beforeend', `<output>${var_} = ${val}</output>`);
        firstInputContainer.innerHTML += `<output>${var_} = ${val}</output>`;
    }
    return true;
}

/*
function: createMatrix(array);
accept: an array of equation's object;
return: array[coeffiecient matrix, variable's matrix, constant's matrix], here each matrix is an instance of Matrix Class
*/
let createMatrix = (equationsArr) => {
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
    for (const itr of variables_arr) {
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

menuSymbol.addEventListener('click', () => {
    historyContainer.classList.toggle('translate0');
});

document.querySelectorAll('.equation_in').forEach(input => {
    input.addEventListener('input', coOperateWithUser);
});
