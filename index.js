class Tile {
    constructor(id, value) {
        this.id = id;
        this.done = (value !== "");
        this.possibles = (this.done) ? new Set([value]) : new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        this.rowIds = getRowIds(id);
        this.columnIds = getColumnIds(this.id);
        this.groupIds = getGroupIds(this.id);
    }

    check() {


        if (this.done) {
            return;
        }

        const row = getValues(this.rowIds);
        const column = getValues(this.columnIds);
        const group = getValues(this.groupIds);


        row.forEach(element => {
            this.possibles.delete(element);
        });
        column.forEach(element => {
            this.possibles.delete(element);
        });
        group.forEach(element => {
            this.possibles.delete(element);
        });

        if (this.possibles.size == 1) {
            setValue(this.id, [...this.possibles][0]);
            this.done = true;
        }
    }
}
const inputs = [...document.getElementsByClassName("input")];
for (let i = 0; i < inputs.length; i++) {
    inputs[i].id = i;
}
const tiles = inputs.map(input => new Tile(input.id, input.value));

function run() {
    
    for (let i = 0; i < 81; i++) {
        if ([...tiles[i].possibles].length == 1) {
            setValue(i, [...tiles[i].possibles][0]);
        }
    }

    for (let i = 0; i < 9; i++) {
        tiles.forEach(tile => tile.check());
    }
}

function clear() {
    console.log("asd");
    for (let i = 0; i < 81; i++) {
        setValue(i, "a");
    }
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function createRange(start, count) {
    const output = [];
    for (let i = start; output.length < count; i++) {
        output.push(i);
    }
    return output;
}

function getRowIds(id) {

    return createRange(id - id % 9, 9)
        .filter(outputId => id != outputId);
}

function getColumnIds(id) {
    const start = id % 9;
    const output = [];
    for (let i = start; i < 81; i += 9) {
        output.push(i);
    }
    return output.filter(outputId => id != outputId);
}

function getGroupIds(id) {
    const rowNumber = Math.floor(id / 9);
    const columnNumber = id % 9;
    const groupNumber = Math.floor(rowNumber / 3) * 3 + Math.floor(columnNumber / 3);
    const startingPoint = Math.floor(rowNumber / 3) * 27 + (groupNumber % 3) * 3;

    const output = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            output.push(startingPoint + j + i*9);
        }
    }
    return output.filter(outputId => id != outputId);
}

const getValues = (ids) => ids.map(id => document.getElementById(id).value);