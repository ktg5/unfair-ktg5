// init
console.log('looking for gamepads...')


// connected notice
window.addEventListener('gamepadconnected', async (event) => {
    const gamepad = event.gamepad;
    console.log(`gamepad ${gamepad.index} connected`, gamepad);
});

// disconnected notice
window.addEventListener('gamepaddisconnected', async (event) => {
    const gamepad = event.gamepad;
    console.log(`gamepad ${gamepad.index} disconnected`, gamepad);
});


// button detection
function handleButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.value > 0) {
            switch (i) {
                // Face buttons
                case 0:
                    keyPress = new KeyboardEvent('keydown', { key: 'J', controller: true });
                    document.dispatchEvent(keyPress);
                break;

                case 1:
                    keyPress = new KeyboardEvent('keydown', { key: 'K' });
                    document.dispatchEvent(keyPress);
                break;

                case 2:
                    keyPress = new KeyboardEvent('keydown', { key: 'U' });
                    document.dispatchEvent(keyPress);
                break;

                case 3:
                    keyPress = new KeyboardEvent('keydown', { key: 'I' });
                    document.dispatchEvent(keyPress);
                break;

                // Dpad
                case 12:
                    keyPress = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    document.dispatchEvent(keyPress);
                break;

                case 13:
                    keyPress = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    document.dispatchEvent(keyPress);
                break;

                case 14:
                    keyPress = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    document.dispatchEvent(keyPress);
                break;

                case 15:
                    keyPress = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    document.dispatchEvent(keyPress);
                break;
            
                // we don't know
                default:
                    console.log(i, button);
                break;
            }
        }
    }
}

// axis detection
function handleAxes(axes) {
    for (let i = 0; i < axes.length; i++) {
        let axis = axes[i];
        // if axis is greater than 0.49999 or less than -0.49999
        if (axis > 0.49999 || axis < -0.49999) {
            // send the event
            switch (i) {
                // x axis
                case 0:
                    if (axis < 0) {
                        keyPress = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                        document.dispatchEvent(keyPress);
                    } else if (axis > 0) {
                        keyPress = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                        document.dispatchEvent(keyPress);
                    }
                break;

                // y axis
                case 1:
                    if (axis < 0) {
                        keyPress = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                        document.dispatchEvent(keyPress);
                    } else if (axis > 0) {
                        keyPress = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                        document.dispatchEvent(keyPress);
                    }
                break;
            
                default:
                    console.log(i, axis);
                break;
            }
        }
    }
}

// loop for button detection
function controllerLoop() {
    let gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        for (let i = 0; i < gamepads.length; i++) {
            const gamepad = navigator.getGamepads()[i];
            if (gamepad !== null) {            
                handleButtons(gamepad.buttons);
                handleAxes(gamepad.axes);
            }
        }
    }
    requestAnimationFrame(controllerLoop);
}
controllerLoop();
