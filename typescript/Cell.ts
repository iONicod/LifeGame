class Cell {
    protected _isAlive: boolean;
    protected _age: number;
    protected _neighborsCount: number | undefined;
    color: string;
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number, isAlive: boolean, age : number = 0) {
        this._isAlive = isAlive;
        this._age = age;
        this._neighborsCount = undefined;
        this.x = x;
        this.y = y;
        this.color = this.getColor();
    }

    getNewCell(i: number, j:number, gameArray: Cell[][]) : Cell {
        let neighborsAmount = this.countNeighbours(i, j, gameArray);
        let x = gameArray[i][j].x;
        let y = gameArray[i][j].y;
        let isAlive = gameArray[i][j].isAlive();
        let age = gameArray[i][j]._age;

        let cell = new Cell(x, y, isAlive, age);
        if (cell.isAlive() && (neighborsAmount < 2 || neighborsAmount > 3)) {
            cell.die();
        } else if (!cell.isAlive() && neighborsAmount === 3){
            cell.becomeAlive();
        } else if (cell.isAlive()){
            cell.getOlder();
        }
        return cell;
    }

    private countNeighbours(i0: number, j0:number, gameArr: Cell[][]) : number {
        let widthArray = gameArr[0].length;
        let heightArray = gameArr.length;
        let count = 0;

        for (let i = i0 - 1; i <= i0 + 1; i++) {
            for (let j = j0 - 1; j <= j0 + 1; j++) {
                if (i >= 0 && i < heightArray
                    && j >= 0 && j < widthArray
                    && gameArr[i][j].isAlive()) {
                    if (i === i0 && j === j0) continue;
                        count++;
                }
            }
        }
        return count;
    }

    getOlder() : void {
        this._age++;
        this.color = this.getColor();
    }

    becomeAlive() : void {
        this._isAlive = true;
        this.color = this.getColor();
    }

    isAlive() : boolean {
        return this._isAlive;
    }

    die() : void {
        this._isAlive = false;
        this._age = 0;
        this.color = this.getColor();
    }

    private getColor() : string {
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