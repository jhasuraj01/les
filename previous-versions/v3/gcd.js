// gcd of n numbers
let gcd = (array = []) => {
    let noOfTensToMultiply = 1;
    array.forEach(elm => {
        let tempElm = `${elm}`.match(/(?:[.]).*/g);
        if (tempElm && tempElm < noOfTensToMultiply) {
            noOfTensToMultiply = Math.pow(10, tempElm.length);
        }
    });
    array = array.map(x => x * noOfTensToMultiply);

    let gcdOfTwoNumber = (n1, n2) => {
        if (n2 > n1) {
            n2 = n1 + n2;
            n1 = n2 - n1;
            n2 = n2 - n1;
        }
        let quotent = n1;
        let divisor = n2;
        let remainder;
        do {
            remainder = quotent % divisor;
            if (remainder) {
                quotent = divisor;
                divisor = remainder;
            }
        } while (remainder);
        return divisor;
    };

    let result = array[0];
    if (array.length === 1) return result;
    for (let index = 1; index < array.length; index++) {
        result = gcdOfTwoNumber(result, array[index]);
    }
    return result / noOfTensToMultiply;
};