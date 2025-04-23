let playerDiv;
let playerData = {
    status: "",
    ground: false,
    vy: -10,
    gravity: 0.1
};


function playerAction(action) {
    switch (action) {
        case 'jump':
            playerData.ground = false;
            playerData.vy = -5;
        break;
    }
}


window.addEventListener('load', () => {

    setTimeout(() => {
        
        console.log('unfair ktg5 loadededededed');

        playerDiv = document.querySelector('.course__player');
        if (!playerDiv) {
            let playerDiv = document.createElement('div');
            playerDiv.classList.add('course__player');
            document.querySelector('.course').appendChild(player);
        }


        // game logic
        setInterval(() => {

            // console.log("vy: ", playerData.vy);
            
            // gravity
            if (playerData.ground == false) {
                if (playerData.vy < 13) playerData.vy += playerData.gravity;
                playerDiv.style.top = playerDiv.offsetTop + (playerData.vy * 0.5) + 'px';
            }

            // ground
            if (playerData.ground == false || playerData.status == 'dead') {
                document.querySelectorAll('[data-groundable]').forEach(groundable => {
                    // checks
                    if (
                        playerDiv.offsetTop >= (groundable.offsetTop - playerDiv.offsetHeight)
                        && playerDiv.offsetTop < (groundable.offsetTop - (playerDiv.offsetHeight / 1.1))
    
                        && playerDiv.offsetLeft < groundable.offsetLeft + groundable.offsetWidth
                        && playerDiv.offsetLeft + playerDiv.offsetWidth > groundable.offsetLeft
                    ) {
                    // logic
                        playerData.ground = true;
                        playerData.vy = 0;
                        playerDiv.style.top = (groundable.offsetTop - playerDiv.offsetHeight) + 'px';
                    }
                });
            }
            // check if the player vy is 0 & not on any groundable
            if (playerData.ground == true) {
                document.querySelectorAll('[data-groundable]').forEach(groundable => {
                    if (
                        playerDiv.offsetTop == (groundable.offsetTop - playerDiv.offsetHeight)
                        && playerDiv.offsetLeft < groundable.offsetLeft + groundable.offsetWidth
                        && playerDiv.offsetLeft + playerDiv.offsetWidth > groundable.offsetLeft
                    ) {
                        playerData.ground = false;
                    }
                });
            }

        });

    }, 1000);

});