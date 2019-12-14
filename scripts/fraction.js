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

        this.simplest();
        frac.simplest();

        const gcd1 = gcd([this.numerator, frac.denominator]);
        if (gcd1 > 1) {
            this.numerator /= gcd1;
            frac.denominator /= gcd1;
        }
        const gcd2 = gcd([this.denominator, frac.numerator]);
        if (gcd2 > 1) {
            this.denominator /= gcd2;
            frac.numerator /= gcd2;
        }

        const numerator = this.numerator * frac.numerator;
        const denominator = this.denominator * frac.denominator;
        return (new Fraction(numerator, denominator));
    }
    divide(frac) {
        if (typeof frac === 'number') frac = new Fraction(frac);
        this.simplest();
        frac.simplest();

        const gcd_numerator = gcd([this.numerator, frac.numerator]);
        if (gcd_numerator > 1) {
            this.numerator /= gcd_numerator;
            frac.numerator /= gcd_numerator;
        }
        const gcd_denominator = gcd([this.denominator, this.denominator]);
        if (gcd_denominator > 1) {
            this.denominator /= gcd_denominator;
            frac.denominator /= gcd_denominator;
        }

        const numerator = this.numerator * frac.denominator;
        const denominator = this.denominator * frac.numerator;
        return (new Fraction(numerator, denominator));
    }
    simplest() {
        const divisor = gcd([this.numerator, this.denominator]);
        this.numerator /= divisor;
        this.denominator /= divisor;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        if (this.numerator === 0) {
            this.denominator = 1;
        }
        return this;
    }
    value() {
        return this.numerator / this.denominator;
    }
    isEqual(frac) {
        this.simplest();
        frac.simplest();
        return (this.numerator === frac.numerator && this.denominator === frac.denominator)
    }
    string() {
        return this.value() % 1 !== 0 ? this.numerator.toString() + "/" + this.denominator.toString() : this.value().toString();
    }
}