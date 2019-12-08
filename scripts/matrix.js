// calculate determinant
let det = (matrixArr) => {
    let order = matrixArr.length;
    if (order > 1) {
        let row = 0;
        let value = 0;
        for (let col = 0; col < order; col++) {
            value += matrixArr[row][col] * Math.pow(-1, col + row) * det(cofactor(matrixArr, row, col));
        }
        return value;
    } else if (order == 1) {
        return matrixArr[0][0];
    } else if (order < 1) {
        return null;
    }
};

// to create a matrix leaving 1 row and 1 col which is been passed
let cofactor = (smallMatrixArr, row, col) => {
    let order = smallMatrixArr.length;
    if (order === 1) { return smallMatrixArr; }
    let newMatrix = [];
    for (let sRow = 0; sRow < order; sRow++) {
        if (row === sRow) {
            continue;
        } else {
            let tempRow = [];
            for (let sCol = 0; sCol < order; sCol++) {
                if (col === sCol) {
                    continue;
                } else {
                    tempRow.push(smallMatrixArr[sRow][sCol]);
                }
            }
            newMatrix.push(tempRow);
        }
    }
    return newMatrix;
};

let transpose = (matrixArr) => {
    const height = matrixArr.length;
    const width = matrixArr[0].length;
    let newMatrix = [];
    for (let row = 0; row < width; row++) {
        let tempRow = [];
        for (let col = 0; col < height; col++) {
            tempRow.push(matrixArr[col][row]);
        }
        newMatrix.push(tempRow);
    }
    return newMatrix;
};

let adjoint = (matrixArr) => {
    const height = matrixArr.length;
    const width = matrixArr[0].length;
    // if the matrix has only one element than its adjoint is always unity matrix;
    if (height === 1 && width === 1) {
        return [[1]];
    }
    let newMatrix = [];
    for (let row = 0; row < height; row++) {
        let tempRow = [];
        for (let col = 0; col < width; col++) {
            tempRow.push(det(cofactor(matrixArr, row, col)) * Math.pow(-1, col + row));
        }
        newMatrix.push(tempRow);
    }

    return transpose(newMatrix);
};

let inverse = (matrixArr) => {
    for (let index = 0; index < matrixArr.length; index++) {
        if (!matrixArr[index].length) return undefined;
    }
    let determinantValue = det(matrixArr);
    if (determinantValue === 0) {
        return null;
    }
    let newMatrix = [];
    newMatrix = adjoint(matrixArr);
    const height = newMatrix.length;
    const width = newMatrix[0].length;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            newMatrix[row][col] = newMatrix[row][col] / determinantValue;
        }
    }
    return newMatrix;
};

let matrixProduct = (matrix1, matrix2) => {
    if (matrix1 === undefined || matrix2 === undefined) return undefined;
    const matrix1Height = matrix1.length;
    const matrix1Width = matrix1[0].length;
    const matrix2Height = matrix2.length;
    const matrix2Width = matrix2[0].length;

    if (matrix1Width === matrix2Height) {
        let newMatrix = [];
        for (let i = 0; i < matrix1Height; i++) {
            let tempRow = [];
            for (let k = 0; k < matrix2Width; k++) {
                let tempElem = 0;
                for (let j = 0; j < matrix1Width; j++) {
                    tempElem += matrix1[i][j] * matrix2[j][k];
                }
                tempRow.push(tempElem);
            }
            newMatrix.push(tempRow);
        }
        return newMatrix;
    } else {
        return undefined;
    }

};
