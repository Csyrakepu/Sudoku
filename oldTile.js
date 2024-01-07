class Tile {
    constructor(id, value){
        this.id = id;
        this.done = value == "";
        this.final = (value == "") ? value : null;
        this.possibleValues = (this.done) ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : this.possibleValues = [value];
    }

    check() {

        if (this.done) {
            setValue(this.id, this.possibleValues[0]);
            return;
        }

        const rowIds = createRange(this.id - this.id % 9, Math.ceil(this.id/9)*9);
        const columnIds = getColumnIds(this.id);
        console.log(columnIds);

        if (this.possibleValues.length == 1) {
            this.done = true;
        }
    }
}