class VectorN {
    private values: any[];

    constructor(...values: any[]) {
        console.warn('Experimental class: better know what you\'re doing');
        if (values.length) {
            this.values = values;
        } else {
            throw 'Failed: message from VectorN';
        }

    }

    public clone() {
        return new VectorN(...this.values);
    }

    public add(vector: VectorN): VectorN {
        if (vector.values.length != this.values.length) {
            throw 'different dimensions';
        } else {
            this.values = vector.values.map((value, index) => this.values[index] + value);
        }
        return this;
    }

    public subtract(vector: VectorN): VectorN {
        if (vector.values.length != this.values.length) {
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
            this.values = Array(this.values.length).fill(0);
        } else {
            this.values = this.values.map(value => value /= mag);
        }
        return this;
    }
    public dotProduct(vector) {
        return this.values.map((value, index) => this.values[index] * value).reduce((total, value) => total + value);
    }

    public equals(vector) {
        return this.values.toString() == vector.values.toString();
    }
}
