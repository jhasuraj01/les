let convertToDigonalMatrix = ([coefficientMatrix, variableMatrix, constantMatrix] = []) => {

    let col_with_zero_in_diagonal = [];

    let setColumnElementsToZero = (col) => {
        let diagonal_row = coefficientMatrix.value[col];
        let diagonal_element = coefficientMatrix.value[col][col];
        let constant_element_in_diagonal_row = constantMatrix.value[col][0];
        if (diagonal_element.value() === 0) {
            // console.log(`diagonal is 0 at (${col},${col}): `, coefficientMatrix.value.map(row => row.map(elm => elm.value())), variableMatrix.value, constantMatrix.value.map(row => row.map(elm => elm.value())))
            return false;
        } else {
            for (let row = 0; row < coefficientMatrix.height; row++) {

                let target_row = coefficientMatrix.value[row];
                let target_element = coefficientMatrix.value[row][col];
                let constant_element_in_target_row = constantMatrix.value[row][0];

                if (target_element.value() !== 0 && row !== col) {
                    // console.log(`operation report Before: `, coefficientMatrix.value.map(row => row.map(elm => elm.value())), variableMatrix.value, constantMatrix.value.map(row => row.map(elm => elm.value())))
                    for (let c = 0; c < coefficientMatrix.width; c++) {
                        target_row[c] = target_row[c].divide(target_element).multiply(diagonal_element).subtract(diagonal_row[c])
                    }
                    constant_element_in_target_row = constant_element_in_target_row.divide(target_element).multiply(diagonal_element).subtract(constant_element_in_diagonal_row);
                    
                    // reassigning modified rows
                    coefficientMatrix.value[row] = target_row;
                    constantMatrix.value[row][0] = constant_element_in_target_row;
                    // console.log(`operation report After: `, coefficientMatrix.value.map(row => row.map(elm => elm.value())), variableMatrix.value, constantMatrix.value.map(row => row.map(elm => elm.value())))

                }

            }
            return true;
        }
    }

    for (let col = 0; col < coefficientMatrix.width; col++) {
        if (setColumnElementsToZero(col) === false) col_with_zero_in_diagonal.push(col);
    }

    if (col_with_zero_in_diagonal.length) {

        let lastLength;

        do {
            lastLength = col_with_zero_in_diagonal.length;

            let temp_col_with_zero_in_diagonal = [];
            col_with_zero_in_diagonal.forEach(col => {
                if (setColumnElementsToZero(col) === false) temp_col_with_zero_in_diagonal.push(col);
            })
            col_with_zero_in_diagonal = temp_col_with_zero_in_diagonal;
            console.log(col_with_zero_in_diagonal);
        } while (col_with_zero_in_diagonal.length < lastLength)

        if (col_with_zero_in_diagonal.length) {
            console.warn('Determinant may be zero');
            return false;
        }
    }
    console.log('Success: ', coefficientMatrix.value.map(row => row.map(elm => elm.value())), variableMatrix.value, constantMatrix.value.map(row => row.map(elm => elm.value())))
    return [coefficientMatrix, constantMatrix]
}