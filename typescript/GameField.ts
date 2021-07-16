import Cell from "./Cell.js";
import Game from "./Game";
import {DrawFigure} from "./DrawFigure";

class GameField {
    protected _canvas : HTMLCanvasElement;
    protected _ctx: CanvasRenderingContext2D;
    protected _game: Game;
    readonly lifeSize : number = 10;
    readonly widthPx : number;
    readonly heightPx : number;

    constructor(width: number, height: number, game: Game) {
        this._canvas = document.querySelector(".gameField") as HTMLCanvasElement;
        this._canvas.setAttribute("width", `${width}px`);
        this._canvas.setAttribute("height", `${height}px`);
        this._ctx = this._canvas.getContext('2d');
        this.widthPx = width;
        this.heightPx = height;
        this._game = game;

        this._canvas.addEventListener("mousedown", function(e){
            if (this._game.isPlaying()) return;

            let figure : DrawFigure = this._game.getCurrentFigure();
            if (!figure)
                this.mouseDraw(e);
            else if (figure.name === "Spray")
                this.mouseSprayDraw(e, figure);
            else
                figure.draw(e.offsetX, e.offsetY, this._game.getGameArray(), this);

        }.bind(this));

        this._canvas.addEventListener("mouseup", function(e){
            this.onmousemove = null;
        });
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

    mouseDraw(e: MouseEvent) {
        this.createAndDrawCell(e.offsetX, e.offsetY);

        this._canvas.onmousemove = function(e) {
            this.createAndDrawCell(e.offsetX, e.offsetY);
        }.bind(this);
    }

    mouseSprayDraw(e: MouseEvent, figure: DrawFigure) {
        figure.draw(e.offsetX, e.offsetY, this._game.getGameArray(), this);

        this._canvas.onmousemove = function(e) {
            figure.draw(e.offsetX, e.offsetY, this._game.getGameArray(), this);
        }.bind(this);
    }

    createAndDrawCell(x: number, y: number) : void {
        let arrX = Math.floor(x/10);
        let arrY = Math.floor(y/10);
        let gameArr = this._game.getGameArray();

        if (arrX>=0 && arrY >=0 && arrY < gameArr.length && arrX < gameArr[0].length) {
            let cell = new Cell(arrX*10, arrY*10, true, 1);
            this._game.getGameArray()[arrY][arrX] = cell;
            this.drawCell(cell);
        }
    }

    private drawCell(cell: Cell) : void {
        this._ctx.fillStyle = cell.color;
        this._ctx.fillRect(cell.x, cell.y, this.lifeSize, this.lifeSize);
    }

    clear() : void {
        this._ctx.clearRect(0, 0, this.widthPx, this.heightPx);
    }
}

export default GameField;