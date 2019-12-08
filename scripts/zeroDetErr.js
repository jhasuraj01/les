let detectDeterminantZeroError = (matrixWithVariableSeperated) => {
    let coeffiecientMatrix = matrixWithVariableSeperated[0];
    let constantMatrix = matrixWithVariableSeperated[2];
    for (let i = 0; i < coeffiecientMatrix.length; i++) {
        let rowArr = coeffiecientMatrix[i];
        rowArr.push(constantMatrix[i][0]);
        let gcdOfNum = gcd(rowArr);
        for (let ii = 0; ii < rowArr.length; ii++) {
            let elm = rowArr[ii];
            let tempElm = `${elm}`.match(/(?:[.]).*/g);
            if (tempElm) {
                let noOfTensToMultiply = Math.pow(10, tempElm.length);
                rowArr[ii] = (elm * noOfTensToMultiply) / (gcdOfNum * noOfTensToMultiply);
            } else {
                rowArr[ii] = elm / gcdOfNum;
            }
        }
        coeffiecientMatrix[i] = rowArr;
    }
    for (let i = coeffiecientMatrix[0].length - 1; i >= 0; i--) {
        let parallel = false;
        let coincident = false;
        for (let ii = 0; ii < coeffiecientMatrix.length - 1; ii++) {
            if (coeffiecientMatrix[ii][i] === coeffiecientMatrix[ii + 1][i] || (!coeffiecientMatrix[ii][i] && !coeffiecientMatrix[ii + 1][i])) {
                // infinite solution
                coincident = true;
            } else {
                // same slope no solution
                parallel = true;
            }
        }
        if (parallel && coincident) {
            Showpopup([
                "NO SOLUTION EXIST",
                "Parallel curves are detected",
                "Coincident curves are detected",
                "System of Equation is INCONSISTENT",
                "Enter another Equations to get the Unique Solution"
            ]);
        } else if (parallel) {
            Showpopup([
                "NO SOLUTION EXIST",
                "Parallel curves are detected",
                "System of Equation is INCONSISTENT",
                "Enter another Equations to get the Unique Solution"
            ]);
        } else if (coincident) {
            Showpopup([
                "INFINITE SOLUTION EXIST",
                "Coincident curves are detected",
                "Enter another Equations to get the Unique Solution"
            ]);
        } else {
            Showpopup([
                "ERROR",
                "Some Unexpected Error has occured!",
                "Please Report this to me",
                "Enter another Equations to get the Unique Solution"
            ]);
        }
        break;
    }
    return null;
};
