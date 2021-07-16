import GameField from "./GameField.js";
import Cell from "./Cell.js";
import Game from "./Game.js";

interface DrawFigure {
    name: string;
    draw(x: number, y: number, gameArr: Cell[][], gameField: GameField) : void;
}

class arrCell {
    arrX:number;
    arrY:number;
    constructor(arrX: number, arrY:number) {
        this.arrX = arrX;
        this.arrY = arrY;
    }
}

class Spray implements DrawFigure{
    readonly name: string;
    constructor() {
        this.name = "Spray";
    }
    draw(x: number, y: number, gameArr: Cell[][], gameField: GameField) {
        let arrX = Math.floor(x/10);
        let arrY = Math.floor(y/10);
        let i : number = 0;
        let j : number = 0;
        let amount = 5;

        for (let count = 0; count < amount; count++) {
            i = Game.getRandomNumberInRange(arrY - 5, arrY + 5);
            j = Game.getRandomNumberInRange(arrX - 5, arrX + 5);
            if (i>=0 && j >=0 && i < gameArr.length && j < gameArr[0].length) {
                gameField.createAndDrawCell(j*10, i*10);
            }
        }
    }
}

class Figure1 implements DrawFigure{
    readonly name: string;
    constructor() {
        this.name = "Figure1";
    }
    draw(x: number, y: number, gameArr: Cell[][], gameField: GameField) {
        let arrX = Math.floor(x/10) - 20;
        let arrY = Math.floor(y/10) - 4;
        let points : arrCell[] = [];
        points.push(new arrCell(arrX, arrY+4));
        points.push(new arrCell(arrX+1, arrY+4));
        points.push(new arrCell(arrX+1, arrY+5));
        points.push(new arrCell(arrX, arrY+5));


        points.push(new arrCell(arrX+10, arrY+4));
        points.push(new arrCell(arrX+10, arrY+5));
        points.push(new arrCell(arrX+10, arrY+6));

        points.push(new arrCell(arrX+11, arrY+7));

        points.push(new arrCell(arrX+12, arrY+8));
        points.push(new arrCell(arrX+13, arrY+8));

        points.push(new arrCell(arrX+15, arrY+7));

        points.push(new arrCell(arrX+16, arrY+6));
        points.push(new arrCell(arrX+16, arrY+5));
        points.push(new arrCell(arrX+17, arrY+5));
        points.push(new arrCell(arrX+16, arrY+4));

        points.push(new arrCell(arrX+15, arrY+3));

        points.push(new arrCell(arrX+13, arrY+2));
        points.push(new arrCell(arrX+12, arrY+2));

        points.push(new arrCell(arrX+11, arrY+3));

        points.push(new arrCell(arrX+14, arrY+5));

        points.push(new arrCell(arrX+20, arrY+4));
        points.push(new arrCell(arrX+20, arrY+3));
        points.push(new arrCell(arrX+20, arrY+2));
        points.push(new arrCell(arrX+21, arrY+4));
        points.push(new arrCell(arrX+21, arrY+3));
        points.push(new arrCell(arrX+21, arrY+2));

        points.push(new arrCell(arrX+22, arrY+1));

        points.push(new arrCell(arrX+24, arrY+1));
        points.push(new arrCell(arrX+24, arrY));

        points.push(new arrCell(arrX+24, arrY+5));
        points.push(new arrCell(arrX+24, arrY+6));

        points.push(new arrCell(arrX+22, arrY+5));

        points.push(new arrCell(arrX+34, arrY+3));
        points.push(new arrCell(arrX+34, arrY+2));
        points.push(new arrCell(arrX+35, arrY+3));
        points.push(new arrCell(arrX+35, arrY+2));


        points.forEach((point) => {
            if (point.arrX > 0 && point.arrX < gameArr[0].length
            && point.arrY> 0 && point.arrY < gameArr.length)
                gameField.createAndDrawCell(point.arrX*10, point.arrY*10);
        });
    }
}

class Figure2 implements DrawFigure{
    readonly name: string;
    constructor() {
        this.name = "Figure2";
    }
    draw(x: number, y: number, gameArr: Cell[][], gameField: GameField) {
        let arrX = Math.floor(x/10);
        let arrY = Math.floor(y/10);
        for (let i = 0; i < gameArr.length; i++) {
            gameField.createAndDrawCell(0, i*10);
            gameField.createAndDrawCell((gameArr[0].length-1)*10, i*10);
        }

        for (let j = 0; j < gameArr[0].length; j++) {
            gameField.createAndDrawCell(j*10, 0);
            gameField.createAndDrawCell(j*10, (gameArr.length-1)*10);
        }

    }
}

export {DrawFigure, Figure1, Figure2, Spray};