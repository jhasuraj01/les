class Fraction {
    constructor(num = 1, den = 1) {
        this.numerator = num;
        this.denominator = den;
        // console.log(this.numerator);
        if (this.numerator % 1 !== 0) {
            // numerator is floating number
            // console.log(this.numerator);
            const decimalValue = `${this.numerator}`.match(/(?:[.]).*/g); // select every thing after decimal including decimal
            const tensToMultiply = Math.pow(10, decimalValue.length);
            this.numerator *= tensToMultiply;
            this.denominator *= tensToMultiply;
        }
        if (this.denominator % 1 !== 0) {
            // denominator is floating number
            const decimalValue = `${this.denominator}`.match(/(?:[.]).*/g); // select every thing after decimal including decimal
            const tensToMultiply = Math.pow(10, decimalValue.length);
            this.numerator *= tensToMultiply;
            this.denominator *= tensToMultiply;
        }
        this.simplest();
    }
    add(frac) {
        if (typeof frac === 'number') frac = new Fraction(frac);
        const numerator = this.numerator * frac.denominator + frac.numerator * this.denominator;
        const denominator = this.denominator * frac.denominator;
        return (new Fraction(numerator, denominator)).simplest();
    }
    subtract(frac) {
        if (typeof frac === 'number') frac = new Fraction(frac);
        const numerator = this.numerator * frac.denominator - frac.numerator * this.denominator;
        const denominator = this.denominator * frac.denominator;
        return (new Fraction(numerator, denominator)).simplest();
    }
    multiply(frac) {
        if (typeof frac === 'number') frac = new Fraction(frac);
        const numerator = this.numerator * frac.numerator;
        const denominator = this.denominator * frac.denominator;
        return (new Fraction(numerator, denominator)).simplest();
    }
    divide(frac) {
        if (typeof frac === 'number') frac = new Fraction(frac);
        const numerator = this.numerator * frac.denominator;
        const denominator = this.denominator * frac.numerator;
        return (new Fraction(numerator, denominator)).simplest();
    }
    simplest() {
        const divisor = gcd([this.numerator, this.denominator]);
        this.numerator /= divisor;
        this.denominator /= divisor;
        return this;
    }
    value() {
        return this.numerator/this.denominator;
    }
    isEqual(frac) {
        this.simplest();
        frac.simplest();
        return (this.numerator === frac.numerator && this.denominator === frac.denominator)
    }
}