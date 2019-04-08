class VectorN {
    private values: any[];
    private dimensions: number = 0;

    constructor(dimensions: number, ...values: any[]) {
        console.warn('Experimental class: better know what you\'re doing');
        if (dimensions > 0 && dimensions == values.length) {
            this.dimensions = dimensions;
            this.values = values;
        } else if (dimensions > 0 && values.length == 0) {
            this.values = Array(dimensions).fill(0);
        } else if (dimensions == 0 || dimensions != values.length && values.length > 0) {
            throw 'Failed: message from VectorN';
        } else {
            throw 'Failed: message from VectorN';
        }

    }

    public clone() {
        return new VectorN(this.dimensions, ...this.values);
    }

    public add(vector: VectorN): VectorN {
        if (vector.dimensions != this.dimensions) {
            throw 'different dimensions';
        } else {
            this.values = vector.values.map((value, index) => this.values[index] + value);
        }
        return this;
    }

    public subtract(vector: VectorN): VectorN {
        if (vector.dimensions != this.dimensions) {
            throw 'different dimensions';
        } else {
            this.values = vector.values.map((value, index) => this.values[index] - value);
        }
        return this;
    }

    public scaleBy(scaleValue): VectorN {
        this.values = this.values.map(value => value * scaleValue);
        return this;
    }

    public moveTowards(vector, t) {
        t = Math.min(t, 1);
        var diff = vector.subtract(this);
        return this.add(diff.scale(t));
    }

    private magSqr() {
        return this.values.map(value => value ** 2).reduce((total, value) => total + value);
    }

    public magnitude() {
        return Math.sqrt(this.magSqr());
    }

    private distanceSqr(vector) {
        return vector.values.map((value, index) => (this.values[index] - value) ** 2).reduce((total, value) => total + value);
    }
    public distance(vector) {
        return Math.sqrt(this.distanceSqr(vector));
    }
    public normalize(): VectorN {
        const mag = this.magnitude();
        if (Math.abs(mag) < 1e-9) {
            this.values = Array(this.dimensions).fill(0);
        } else {
            this.values = this.values.map(value => value /= mag);
        }
        return this;
    }
    public dotProduct(vector) {
        return this.values.map((value, index) => this.values[index] * value).reduce((total, value) => total + value);
    }

    public equals(vector) {
        return this.dimensions == vector.dimensions && this.values.toString() == vector.values.toString();
    }
}
