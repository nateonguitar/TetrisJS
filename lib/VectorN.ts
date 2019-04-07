class VectorN {
    private values: any[];
    private directions: number = 0;

    constructor(directions: number, ...values: any[]) {
        console.warn('Experimental class: better know what you\'re doing');
        if (directions > 0 && directions == values.length) {
            this.directions = directions;
            this.values = values;
        } else if (directions > 0 && values.length == 0) {
            this.values = Array(directions).fill(0);
        } else if (directions == 0 || directions != values.length && values.length > 0) {
            throw 'Failed: message from VectorN';
        } else {
            throw 'Failed: message from VectorN';
        }

    }

    public clone() {
        return new VectorN(this.directions, ...this.values);
    }

    public add(vector: VectorN): VectorN {
        if (vector.directions != this.directions) {
            throw 'different directions';
        } else {
            this.values = vector.values.map((value, index) => this.values[index] + value);
        }
        return this;
    }

    public subtract(vector: VectorN): VectorN {
        if (vector.directions != this.directions) {
            throw 'different directions';
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
            this.values = Array(this.directions).fill(0);
        } else {
            this.values = this.values.map(value => value /= mag);
        }
        return this;
    }
    public dotProduct(vector) {
        return this.values.map((value, index) => this.values[index] * value);
    }

    public equals(vector) {
        return this.directions == vector.directions && this.values.toString() == vector.values.toString()
    }
}
