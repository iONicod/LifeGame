import Game from "./Game.js";
import {DrawFigure, Figure1, Figure2, Spray} from "./DrawFigure.js";

class DrawButtons {
    protected _btnSpray: HTMLInputElement;
    protected _btnFigure1: HTMLInputElement;
    protected _btnFigure2: HTMLInputElement;
    protected _btnClear: HTMLInputElement;
    protected _game: Game;

    constructor(game: Game) {
        this._btnSpray = document.querySelector(".button-spray");
        this._btnFigure1 = document.querySelector(".button-figure1");
        this._btnFigure2 =  document.querySelector(".button-figure2");
        this._btnClear = document.querySelector(".button-clear");
        this._game = game;
        this._init();
    }

    private _init() : void {
        this._btnSpray.addEventListener("click", () => {
            this.setFigure(new Spray());
            this.changeButtonStyle(this._btnSpray);
        });
        this._btnFigure1.addEventListener("click", () => {
            this.setFigure(new Figure1());
            this.changeButtonStyle(this._btnFigure1);
        });
        this._btnFigure2.addEventListener("click", () => {
            this.setFigure(new Figure2());
            this.changeButtonStyle(this._btnFigure2);
        });
        this._btnClear.addEventListener("click", () => {
            this._clearField();
            this.changeTemporaryButtonStyle(this._btnClear);
        });
    }

    protected changeButtonStyle(chosenBtn : HTMLInputElement) : void {
        let drawButtons = document.querySelectorAll(".control-panel--draw > .control-button");
        drawButtons.forEach((btn : HTMLInputElement) => {
            if (btn != chosenBtn)
                btn.classList.add("inactiveDrawButton");
        });
        chosenBtn.classList.toggle("inactiveDrawButton");
    }

    protected changeTemporaryButtonStyle(chosenBtn : HTMLInputElement) : void {
        chosenBtn.classList.remove("inactiveDrawButton");
        setTimeout(() => {
            chosenBtn.classList.add("inactiveDrawButton");
        }, 200);
    }

    protected setFigure(figure: DrawFigure) : void {
        let currentFigure = this._game.getCurrentFigure();

        if (currentFigure && figure && currentFigure.name == figure.name) {
            this.resetDrawButton();
            return;
        }

        this._game.setCurrentFigure(figure);
    }

    protected _clearField() :void {
        this._game.killAllLives();
    }

    resetDrawButton() : void {
        this.setFigure(undefined);
    }

    show() :void {
        this.resetDrawButton();
        let drawButtons = document.querySelectorAll(".control-panel--draw > .control-button");
        drawButtons.forEach((btn : HTMLInputElement) => {
            btn.classList.add("inactiveDrawButton");
            btn.classList.remove("hidden");
        });
    }

    hide() :void {
        let drawButtons = document.querySelectorAll(".control-panel--draw > .control-button");
        drawButtons.forEach((btn : HTMLInputElement) => {
            btn.classList.add("hidden");
        });
    }
}

export default DrawButtons;