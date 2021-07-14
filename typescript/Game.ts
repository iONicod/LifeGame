import GameField from "./GameField.js";
import Cell from "./Cell.js";
import ControlPopulation from "./ControlPopulation.js";
import ControlButtons from "./ControlButtons.js";

class Game {
    protected _gameField : GameField;
    protected _gameArray : Cell[][];
    protected _gameNewGenerationArray : Cell[][];
    protected _generationNumber: number;
    protected _controlPopulation : ControlPopulation;
    protected _controlButtons : ControlButtons;

    run(width: number, height: number) : void {
        this._gameField = new GameField(width, height);
        this.initArray();
        let cellsCount = this._gameArray.length * this._gameArray[0].length;
        this.addLives(Math.round(cellsCount * 0.2));
        this._generationNumber = 1;
        this._controlPopulation = new ControlPopulation(this);
        this._controlButtons = new ControlButtons(this, this._controlPopulation);
    }

    private initArray() : void {
        let columnsAmount : number = this._gameField.widthPx / this._gameField.lifeSize;
        let rowsAmount : number = this._gameField.heightPx / this._gameField.lifeSize;
        this._gameArray = [];

        for (let i=0; i < rowsAmount; i++) {
            this._gameArray[i] = [];
            for (let j=0; j < columnsAmount; j++) {
                this._gameArray[i][j] = new Cell(j * 10, i * 10, false);
            }
        }
    }

    addLives(amount: number) : void {
        let widthRange = this._gameArray[0].length - 1;
        let heightRange = this._gameArray.length - 1;
        let i : number = 0;
        let j : number = 0;

        for (let count = 0; count < amount; count++) {
            i = Game.getRandomNumberInRange(0, heightRange);
            j = Game.getRandomNumberInRange(0, widthRange);

            let cell = this._gameArray[i][j];
            cell.becomeAlive();
        }
        this._gameField.draw(this._gameArray);
    }

    static getRandomNumberInRange(min, max) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createNewGeneration() : void {
        let columnsAmount = this._gameArray[0].length;
        let rowsAmount = this._gameArray.length;
        this._gameNewGenerationArray = [];

        for (let i=0; i < rowsAmount; i++) {
            this._gameNewGenerationArray[i] = [];
            for (let j=0; j < columnsAmount; j++) {
                let newCell = this._gameArray[i][j].getNewCell(i, j, this._gameArray);
                this._gameNewGenerationArray[i][j] = newCell;
            }
        }
        this._gameField.draw(this._gameNewGenerationArray);
        this.increaseGenerationCount();
        this.updateGenerationInfo();
        this._gameArray = this._gameNewGenerationArray;
    }

    private updateGenerationInfo() : void {
        let counter = document.querySelector(".count");
        counter.textContent = String(this._generationNumber);
    }

    updateSpeedInfo(speedValue: number) : void {
        let speed = document.querySelector(".speed");
        speed.textContent = String(speedValue);
    }

    private increaseGenerationCount() : void {
        this._generationNumber++;
    }

    start() : void {
        this._controlPopulation.start();
        this._controlButtons.turnStartStage();
    }

    pause() : void {
        this._controlPopulation.pause();
        this._controlButtons.turnPauseStage();
    }

    reset() : void {
        this._controlPopulation.reset();
        this._controlButtons.turnResetStage();
        this._generationNumber = 1;
        this.initArray();
        this._gameField.clear();
        let cellsCount = this._gameArray.length * this._gameArray[0].length;
        this.addLives(Math.round(cellsCount * 0.2));
        this.updateGenerationInfo();
    }
}

export default Game;