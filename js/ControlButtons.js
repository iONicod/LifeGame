class ControlButtons {
    constructor(game, controlPopulation) {
        this.btnPause = document.querySelector(".button-pause");
        this.btnReset = document.querySelector(".button-reset");
        this.btnStart = document.querySelector(".button-start");
        this.btnAddLives = document.querySelector(".button-add");
        this.btnSpeedUp = document.querySelector(".button-speed-up");
        this.btnSpeedDown = document.querySelector(".button-speed-down");
        this._game = game;
        this._controlPopulation = controlPopulation;
        this.init();
    }
    init() {
        this.btnPause.disabled = true;
        this.btnReset.disabled = true;
        this.btnSpeedUp.disabled = true;
        this.btnSpeedDown.disabled = true;
        this.btnStart.addEventListener("click", () => {
            this._game.start();
        });
        this.btnPause.addEventListener("click", () => {
            this._game.pause();
        });
        this.btnReset.addEventListener("click", () => {
            this._game.reset();
        });
        this.btnAddLives.addEventListener("click", () => {
            this._game.addLives(100);
        });
        this.btnSpeedUp.addEventListener("click", () => {
            this._controlPopulation.increaseSpeed();
        });
        this.btnSpeedDown.addEventListener("click", () => {
            this._controlPopulation.lowerSpeed();
        });
    }
    turnStartStage() {
        this.btnStart.disabled = true;
        this.btnSpeedUp.disabled = false;
        this.btnSpeedDown.disabled = false;
        this.btnPause.disabled = false;
        this.btnReset.disabled = false;
    }
    turnPauseStage() {
        this.btnStart.disabled = false;
        this.btnPause.disabled = true;
    }
    turnResetStage() {
        this.btnStart.disabled = false;
        this.btnPause.disabled = true;
        this.btnReset.disabled = true;
        this.btnSpeedUp.disabled = true;
        this.btnSpeedDown.disabled = true;
    }
}
export default ControlButtons;
