importScripts(
    self.location.href.substring(0, self.location.href.lastIndexOf('/')) + '/scripts/matrix.js',
    self.location.href.substring(0, self.location.href.lastIndexOf('/')) + '/scripts/fraction.js',
    self.location.href.substring(0, self.location.href.lastIndexOf('/')) + '/scripts/gcd.js',
    self.location.href.substring(0, self.location.href.lastIndexOf('/')) + '/scripts/zeroDetErr.js'
);

onmessage = (msg) => {
    const response = solve(msg.data);
    postMessage(response);
}
const solve = (data) => {
    let response = {
        iserror: false,
        output: [],
        error: []
    }

    // createMatrix() returns: array[coeffiecient matxix, variable's matrix, constant's matrix];
    let matrixWithVariableSeperated = createMatrix(data);
    if (!matrixWithVariableSeperated) {
        response.iserror = true;
        response.error = [
            "Error detected",
            "matrixWithVariableSeperated is undefined, This is unexpected error from mSW.js, Please notify to Suraj",
            "Enter another Equations to get the Unique Solution"
        ];
        console.log(response);
        return response;
    }

    if ((matrixWithVariableSeperated[0]).det().value() === 0) {
        response.iserror = true;
        response.error = detectDeterminantZeroError(matrixWithVariableSeperated);
        return response;
    }

    let inverseOfCoefficientMatrix = matrixWithVariableSeperated[0].inverse();

    let product = inverseOfCoefficientMatrix.multiply(matrixWithVariableSeperated[2]);
    if (product === undefined) {
        //this may be undefined if matrixProduct() returns undefined;
        console.error('product is undefined');
        response.iserror = true;
        response.error = [
            "Error detected",
            "product is undefined, This is unexpected error from mSW.js, Please notify to Suraj",
            "Enter another Equations to get the Unique Solution"
        ];
        return response;
    } else {
        for (let row = 0, col = 0; row < product.value.length; row++) {
            let var_ = matrixWithVariableSeperated[1].value[row][col];

            let val = product.value[row][col].string();

            response.output.push(`${var_} = ${val}`);
        }
        return response;
    }
}

let createMatrix = ({ equationsArr, variables_arr } = {}) => {
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