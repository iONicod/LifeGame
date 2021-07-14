class GameField {
    constructor(width, height) {
        this.lifeSize = 10;
        this._canvas = document.querySelector(".gameField");
        this._canvas.setAttribute("width", `${width}px`);
        this._canvas.setAttribute("height", `${height}px`);
        this._ctx = this._canvas.getContext('2d');
        this.widthPx = width;
        this.heightPx = height;
    }
    draw(fieldArray) {
        let columnsAmount = fieldArray[0].length;
        let rowsAmount = fieldArray.length;
        for (let i = 0; i < rowsAmount; i++) {
            for (let j = 0; j < columnsAmount; j++) {
                this.drawCell(fieldArray[i][j]);
            }
        }
    }
    drawCell(cell) {
        this._ctx.fillStyle = cell.color;
        this._ctx.fillRect(cell.x, cell.y, this.lifeSize, this.lifeSize);
    }
    clear() {
        this._ctx.clearRect(0, 0, 500, 300);
    }
}
export default GameField;
