class Matrix {
    constructor(equationsArr) {
        this.value = equationsArr.map(row => {
            row = row.map(elm => {
                if (typeof elm === 'number') return new Fraction(elm)
                else return elm;
            })
            return row;
        })
        this.height = this.value.length;
        this.width = this.value[0].length;
    }
    multiply(matrix) {
        if (matrix === undefined) return undefined;

        if (this.width === matrix.height) {
            let newMatrix_arr = [];
            for (let i = 0; i < this.height; i++) {
                let tempRow = [];
                for (let k = 0; k < matrix.width; k++) {
                    let tempElem = new Fraction(0);
                    for (let j = 0; j < this.width; j++) {
                        tempElem = tempElem.add(this.value[i][j].multiply(matrix.value[j][k]));
                    }
                    tempRow.push(tempElem);
                }
                newMatrix_arr.push(tempRow);
            }
            return new Matrix(newMatrix_arr);
        } else {
            return undefined;
        }
    }

    // to create a matrix leaving 1 row and 1 col which is been passed
    cofactor(row, col) {
        if (this.height === 1 || this.width === 1) { return this; }
        let newMatrix_arr = [];
        for (let row_num = 0; row_num < this.height; row_num++) {
            if (row === row_num) {
                continue;
            } else {
                let tempRow = [];
                for (let col_num = 0; col_num < this.width; col_num++) {
                    if (col === col_num) {
                        continue;
                    } else {
                        tempRow.push(this.value[row_num][col_num]);
                    }
                }
                newMatrix_arr.push(tempRow);
            }
        }
        return (new Matrix(newMatrix_arr).det().multiply(Math.pow(-1, col + row)));
    }

    transpose() {
        let newMatrix_arr = [];
        for (let row = 0; row < this.width; row++) {
            let tempRow = [];
            for (let col = 0; col < this.height; col++) {
                tempRow.push(this.value[col][row]);
            }
            newMatrix_arr.push(tempRow);
        }
        return new Matrix(newMatrix_arr);
    }
    
    adjoint() {
        // if the matrix has only one element than its adjoint is always unity matrix;
        if (this.height === 1 && this.width === 1) {
            return new Matrix([[1]]);
        }
        let newMatrix = [];
        for (let row = 0; row < this.height; row++) {
            let tempRow = [];
            for (let col = 0; col < this.width; col++) {
                tempRow.push(this.cofactor(row, col));
            }
            newMatrix.push(tempRow);
        }
        return (new Matrix(newMatrix)).transpose();
    }

    inverse() {
        // for (let index = 0; index < matrixArr.length; index++) {
        //     if (!this.value[index].length) return undefined;
        // }

        const determinant = this.det();
        if (determinant.value() === 0) return null;

        let newMatrix = this.adjoint();
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                newMatrix.value[row][col] = newMatrix.value[row][col].divide(determinant);
            }
        }
        return newMatrix;
    }

    // @return fraction object
    // @input matrix object
    det = () => {
        if (this.value.length === this.value[0].length) {
            const order = this.value.length;
            if (order > 1) {
                let row = 0;
                let value = new Fraction(0);
                for (let col = 0; col < order; col++) {
                    value = value.add(this.value[row][col].multiply(this.cofactor(row, col)));
                }
                return value;
            } else if (order == 1) {
                return this.value[0][0];
            } else if (order < 1) {
                return null;
            }
        } else {
            return undefined;
        }
    }
}