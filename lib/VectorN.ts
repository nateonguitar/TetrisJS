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
		let v = this.clone();
        if (vector.values.length != this.values.length) {
            throw 'different dimensions';
        } else {
            v.values = vector.values.map((value, index) => this.values[index] + value);
        }
        return v;
    }

    public subtract(vector: VectorN): VectorN {
		let v = this.clone();
        if (vector.values.length != this.values.length) {
            throw 'different dimensions';
        } else {
            v.values = vector.values.map((value, index) => this.values[index] - value);
        }
        return v;
    }

    public scaleBy(scaleValue): VectorN {
		let v = this.clone();
        v.values = this.values.map(value => value * scaleValue);
        return v;
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
		let v = this.clone();
        const mag = this.magnitude();
        if (Math.abs(mag) < 1e-9) {
            v.values = Array(this.values.length).fill(0);
        } else {
            v.values = this.values.map(value => value /= mag);
        }
        return v;
    }
    public dotProduct(vector) {
        return this.values.map((value, index) => this.values[index] * value).reduce((total, value) => total + value);
    }

    public equals(vector) {
        return this.values.toString() == vector.values.toString();
    }
}
