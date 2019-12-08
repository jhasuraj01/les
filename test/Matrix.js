class Matrix {
    constructor(equationsArr) {
        this.value = equationsArr.map(row => {
            row = row.map(elm => new Fraction(elm))
            return row;
        })
    }
}