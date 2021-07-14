import Cell from "./Cell.js";
import Game from "./Game";

class GameField {
    protected _canvas : HTMLCanvasElement;
    protected _ctx: CanvasRenderingContext2D;
    readonly lifeSize : number = 10;
    readonly widthPx : number;
    readonly heightPx : number;

    constructor(width: number, height: number) {
        this._canvas = document.querySelector(".gameField") as HTMLCanvasElement;
        this._canvas.setAttribute("width", `${width}px`);
        this._canvas.setAttribute("height", `${height}px`);
        this._ctx = this._canvas.getContext('2d');
        this.widthPx = width;
        this.heightPx = height;
    }

    draw(fieldArray: Cell[][]) : void {
        let columnsAmount = fieldArray[0].length;
        let rowsAmount = fieldArray.length;

        for (let i = 0; i < rowsAmount; i++) {
            for (let j = 0; j < columnsAmount; j++) {
                this.drawCell(fieldArray[i][j]);
            }
        }
    }

    private drawCell(cell: Cell) : void {
        this._ctx.fillStyle = cell.color;
        this._ctx.fillRect(cell.x, cell.y, this.lifeSize, this.lifeSize);
    }

    clear() : void {
        this._ctx.clearRect(0, 0, 500, 300);
    }
}

export default GameField;