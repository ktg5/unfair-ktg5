var latency, lastKeyPress;
var currentKeys = {};
// Handle keys
async function handleKeys(keys) {
    let currentTop = playerDiv.offsetTop;
    let currentLeft = playerDiv.offsetLeft;

    for (let key in keys) {
        switch (key.toLowerCase()) {
            case 'arrowup':
            case 'w':
                playerAction('jump');
            break;
            case 'arrowdown':
            case 's':
                
            break;
            case 'arrowleft':
            case 'a':
                if (currentLeft > 0) {
                    playerDiv.style.left = currentLeft - 1 + 'px';
                }
            break;
            case 'arrowright':
            case 'd':
                playerDiv.style.left = currentLeft + 1 + 'px';
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