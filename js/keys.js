var latency, lastKeyPress;
var currentKeys = {};
// Handle keys
async function handleKeys(keys) {
    for (let key in keys) {
        switch (key.toLowerCase()) {
            case 'arrowup':
            case 'w':
            case ' ':
                playerAction({ type: 'jump' });
            break;
            case 'arrowdown':
            case 's':
                
            break;
            case 'arrowleft':
            case 'a':
                playerAction({ type: 'move', value: '-1' });
            break;
            case 'arrowright':
            case 'd':
                playerAction({ type: 'move', value: '1' });
            break;
        }
    }
}

let forceKeysOn = false;
// On key press
document.addEventListener('keydown', async function (event) {
    if (forceKeysOn != true) {
        currentKeys[event.key] = event;
    }
});
// On key release & on window unfocus
function resetKeys(key) {
    if (!key) currentKeys = {};
    else delete currentKeys[key];
    latency = null;
}
document.addEventListener('keyup', async function (event) {
    resetKeys(event.key);
});
window.addEventListener('blur', async function (event) {
    resetKeys();
});

// currentKeys[key].isTrusted == false ; Most likely a controller
setInterval(async () => {
    if (currentKeys && document.hasFocus()) {
        lastKeyPress = Date.now();
        await handleKeys(currentKeys);
    }
});