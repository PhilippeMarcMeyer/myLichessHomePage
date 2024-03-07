'use strict';

let isRunning = false;

const runOnce = () => {

    // page elements to hide
    const targets = [
        'lobby__timeline',
        'lobby__tv',
        'lobby__feed',
        'lobby__support',
        'lobby__leaderboard',
        'lobby__winners',
        'lobby__blog',
        'lobby__about',
        'lobby__wide-winners'
    ];

    targets.forEach((x) => {
        let target = document.querySelector('.' + x);
        if (target) {
            target.style.display = 'none';
        }
    });

    // Moving the tournament table
    let target = document.querySelector('.lobby__tournaments-simuls');
    if (target) {
        target.style.width = '50%';
        target.style.position = 'absolute';
        target.style.top = '700px';
        target.style.marginBottom = '50px;'
    }

    // Make the game buttons more apparent with a backgroung photo
    target = document.querySelectorAll('.button');
    if (target) {
        target.forEach((x) => {
            x.style.border = '1px solid rgba(255,255,255,0.5)';
            x.borderRadius = '10px';
        });
    }

    // Give more height to the main page because the tournament zone is floating over the DOM tree
    target = document.querySelector('#main-wrap');
    if (target) {
        target.style.minHeight = '1200px';
    }

    run(); // Will also run once at startup and then when the MutationObserver reports changes in the zone
};

const run = () => {
    // Hide bullets and 3 minutes blitz
    isRunning = true;
    let target = document.querySelector('.lobby__app__content.lpools');
    if (target) {
        target.style.gridTemplateRows = 'none';
        ['1+0', '2+1', '3+0', '3+2'].forEach((x) => {
            let subTarget = target.querySelector(`[data-id='${x}']`);
            if (subTarget) {
                subTarget.style.display = 'none';
            }
        });
    }
    target = document.querySelectorAll('.lobby__app__content.lpools > div');
    if (target) {
        target.forEach((x) => {
            x.style.border = '1px solid rgba(255,255,255,0.5)';
        });
    }
    isRunning = false;
};

const launchObserver = () => {
        // check if the the lobby zone encounters changes to re-run run()
    let target = document.querySelector('.lobby__app__content.lpools');
    if (target) {
        const observer = new MutationObserver((mutations) => {
            if (!isRunning) run();
        });
        observer.observe(document, { childList: true, subtree: true });
    }
};

const init = () => {
    runOnce();
    launchObserver();
};

init();