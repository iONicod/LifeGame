import { Figure1, Figure2, Spray } from "./DrawFigure.js";
class DrawButtons {
    constructor(game) {
        this._btnSpray = document.querySelector(".button-spray");
        this._btnFigure1 = document.querySelector(".button-figure1");
        this._btnFigure2 = document.querySelector(".button-figure2");
        this._btnClear = document.querySelector(".button-clear");
        this._game = game;
        this._init();
    }
    _init() {
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
    changeButtonStyle(chosenBtn) {
        let drawButtons = document.querySelectorAll(".control-panel--draw > .control-button");
        drawButtons.forEach((btn) => {
            if (btn != chosenBtn)
                btn.classList.add("inactiveDrawButton");
        });
        chosenBtn.classList.toggle("inactiveDrawButton");
    }
    changeTemporaryButtonStyle(chosenBtn) {
        chosenBtn.classList.remove("inactiveDrawButton");
        setTimeout(() => {
            chosenBtn.classList.add("inactiveDrawButton");
        }, 200);
    }
    setFigure(figure) {
        let currentFigure = this._game.getCurrentFigure();
        if (currentFigure && figure && currentFigure.name == figure.name) {
            this.resetDrawButton();
            return;
        }
        this._game.setCurrentFigure(figure);
    }
    _clearField() {
        this._game.killAllLives();
    }
    resetDrawButton() {
        this.setFigure(undefined);
    }
    show() {
        this.resetDrawButton();
        let drawButtons = document.querySelectorAll(".control-panel--draw > .control-button");
        drawButtons.forEach((btn) => {
            btn.classList.add("inactiveDrawButton");
            btn.classList.remove("hidden");
        });
    }
    hide() {
        let drawButtons = document.querySelectorAll(".control-panel--draw > .control-button");
        drawButtons.forEach((btn) => {
            btn.classList.add("hidden");
        });
    }
}
export default DrawButtons;
