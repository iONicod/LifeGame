import Game from "./Game.js";
import ControlPopulation from "./ControlPopulation.js";

class ControlButtons {
    btnStart: HTMLInputElement;
    btnAddLives: HTMLInputElement;
    btnPause: HTMLInputElement;
    btnReset: HTMLInputElement;
    btnSpeedUp: HTMLInputElement;
    btnSpeedDown: HTMLInputElement;
    protected game: Game;
    protected controlPopulation: ControlPopulation;

    constructor(game: Game, controlPopulation : ControlPopulation) {
        this.btnPause =  document.querySelector(".button-pause");
        this.btnReset =  document.querySelector(".button-reset");
        this.btnStart = document.querySelector(".button-start");
        this.btnAddLives = document.querySelector(".button-add");
        this.btnSpeedUp = document.querySelector(".button-speed-up");
        this.btnSpeedDown = document.querySelector(".button-speed-down");
        this.game = game;
        this.controlPopulation = controlPopulation;
        this.init();
    }

    init() {
        this.btnPause.disabled = true;
        this.btnReset.disabled = true;
        this.btnSpeedUp.disabled = true;
        this.btnSpeedDown.disabled = true;

        this.btnStart.addEventListener("click", () => {
            this.game.start();
        });
        this.btnPause.addEventListener("click", () => {
            this.game.pause();
        });
        this.btnReset.addEventListener("click", () => {
            this.game.reset();
        });
        this.btnAddLives.addEventListener("click", () => {
            this.game.addLives(100);
        });
        this.btnSpeedUp.addEventListener("click", () => {
            this.controlPopulation.increaseSpeed();
        });
        this.btnSpeedDown.addEventListener("click", () => {
            this.controlPopulation.lowerSpeed();
        });
    }

    turnStartStage() : void {
        this.btnStart.disabled = true;
        this.btnSpeedUp.disabled = false;
        this.btnSpeedDown.disabled = false;
        this.btnPause.disabled = false;
        this.btnReset.disabled = false;
    }

    turnPauseStage() : void {
        this.btnStart.disabled = false;
        this.btnPause.disabled = true;
    }

    turnResetStage() : void {
        this.btnStart.disabled = false;
        this.btnPause.disabled = true;
        this.btnReset.disabled = true;
        this.btnSpeedUp.disabled = true;
        this.btnSpeedDown.disabled = true;
    }
}

export default ControlButtons;