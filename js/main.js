let playerDiv;
let playerData = {
    status: "",
    ground: false,
    vy: -10,
};
const magicNums = {
    gravity: 0.1,
    jump: -15,
    move: 2
}


function playerAction(action) {
    let currentTop = playerDiv.offsetTop;
    let currentLeft = playerDiv.offsetLeft;

    switch (action.type) {
        case 'jump':
            if (playerData.ground == true) {
                playerData.ground = false;
                playerData.vy = magicNums.jump;
            }
        break;

        case 'move':
            if (action.value == '-1' && currentLeft > 0) {
                playerDiv.style.left = currentLeft - magicNums.move + 'px';
            } else if (action.value == '1') {
                playerDiv.style.left = currentLeft + magicNums.move + 'px';
            }
        break;
    }
}


window.addEventListener('load', () => {

    setTimeout(() => {
        
        console.log('unfair ktg5 loadededededed');

        playerDiv = document.querySelector('.course__player');
        if (!playerDiv) {
            playerDiv = document.createElement('div');
            playerDiv.classList.add('course__player');
            document.querySelector('.course').appendChild(player);
        }


        // game logic
        setInterval(() => {
            
            // gravity
            if (playerData.ground == false) {
                if (playerData.vy < 13) playerData.vy += magicNums.gravity;
                playerDiv.style.top = playerDiv.offsetTop + (playerData.vy * 0.5) + 'px';
            }

            // ground
            if (playerData.ground == false || playerData.status == 'dead') {
                // using rects to check is waaaaaay better...
                const playerRect = playerDiv.getBoundingClientRect();
                document.querySelectorAll('[data-groundable]').forEach(groundable => {
                    const groundRect = groundable.getBoundingClientRect();

                    // checks
                    const check =
                    /// top from bottom
                    playerRect.bottom >= groundRect.top
                    && playerRect.bottom <= groundRect.top + playerData.vy * 2
                    /// right from left
                    && playerRect.right > groundRect.left
                    && playerRect.left < groundRect.right
                    && playerData.vy >= 0;

                    if (check) {
                        // logic
                        // later on when enemies are added, will add more to here.

                        playerData.ground = true;
                        playerData.vy = 0;
                        playerDiv.style.top = (groundable.offsetTop - playerDiv.offsetHeight) + 'px';

                    }
                });
            }
            // check if the player vy is 0 & not on any groundable
            if (playerData.ground == true) {
                const playerRect = playerDiv.getBoundingClientRect();
                let isGrounded = false;

                // check each groundable
                document.querySelectorAll('[data-groundable]').forEach(groundable => {
                    const groundRect = groundable.getBoundingClientRect();

                    const standingOn = Math.abs(playerRect.bottom - groundRect.top) < 1 // check if player is on the ground even if the dumbass browser says it's one decimal off
                    && playerRect.right > groundRect.left // check the player's right from the groundable's left
                    && groundRect.right > playerRect.left; // check the groundable's right from the player's left

                    if (standingOn) {
                        isGrounded = true;
                    }
                });

                if (!isGrounded && playerData.vy === 0) {
                    // logic
                    playerData.ground = false;
                }
            }

        });

    }, 1000);

});