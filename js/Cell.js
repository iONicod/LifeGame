class Cell {
    constructor(x, y, isAlive, age = 0) {
        this._isAlive = isAlive;
        this._age = age;
        this._neighborsCount = undefined;
        this.x = x;
        this.y = y;
        this.color = this.getColor();
    }
    getNewCell(i, j, gameArray) {
        let neighborsAmount = this.countNeighbours(i, j, gameArray);
        let x = gameArray[i][j].x;
        let y = gameArray[i][j].y;
        let isAlive = gameArray[i][j].isAlive();
        let age = gameArray[i][j]._age;
        let cell = new Cell(x, y, isAlive, age);
        if (cell.isAlive() && (neighborsAmount < 2 || neighborsAmount > 3)) {
            cell.die();
        }
        else if (!cell.isAlive() && neighborsAmount === 3) {
            cell.becomeAlive();
        }
        else if (cell.isAlive()) {
            cell.getOlder();
        }
        return cell;
    }
    countNeighbours(i0, j0, gameArr) {
        let widthArray = gameArr[0].length;
        let heightArray = gameArr.length;
        let count = 0;
        for (let i = i0 - 1; i <= i0 + 1; i++) {
            for (let j = j0 - 1; j <= j0 + 1; j++) {
                if (i >= 0 && i < heightArray
                    && j >= 0 && j < widthArray
                    && gameArr[i][j].isAlive()) {
                    if (i === i0 && j === j0)
                        continue;
                    count++;
                }
            }
        }
        return count;
    }
    getOlder() {
        this._age++;
        this.color = this.getColor();
    }
    becomeAlive() {
        this._isAlive = true;
        this.color = this.getColor();
    }
    isAlive() {
        return this._isAlive;
    }
    die() {
        this._isAlive = false;
        this._age = 0;
        this.color = this.getColor();
    }
    getColor() {
        if (this._isAlive && this._age > 10)
            return "lightgrey";
        if (this._isAlive && this._age > 3)
            return "lightgreen";
        else if (this._isAlive)
            return "green";
        return "white";
    }
}
export default Cell;
