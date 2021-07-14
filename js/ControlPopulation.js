let speedToDelay = {
    1: 1000,
    2: 900,
    3: 800,
    4: 700,
    5: 600,
    6: 500,
    7: 400,
    8: 300,
    9: 200,
    10: 100
};
class ControlPopulation {
    constructor(game) {
        this._game = game;
        this._speed = 1;
        this._isPlaying = false;
    }
    start() {
        this._isPlaying = true;
        let control = this;
        setTimeout(function tick() {
            if (control._isPlaying) {
                control._game.createNewGeneration();
                setTimeout(tick, speedToDelay[control._speed]);
            }
        }, speedToDelay[control._speed]);
    }
    pause() {
        this._isPlaying = false;
    }
    reset() {
        this._speed = 1;
        this._game.updateSpeedInfo(this._speed);
        this._isPlaying = false;
    }
    increaseSpeed() {
        if (this._speed < 10) {
            this._speed++;
            this._game.updateSpeedInfo(this._speed);
        }
    }
    lowerSpeed() {
        if (this._speed > 1) {
            this._speed--;
            this._game.updateSpeedInfo(this._speed);
        }
    }
}
export default ControlPopulation;
