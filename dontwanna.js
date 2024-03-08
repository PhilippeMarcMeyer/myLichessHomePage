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
            x.style.background = 'transparent'
        });
    }

    // Give more height to the main page because the tournament zone is floating over the DOM tree
    target = document.querySelector('#main-wrap');
    if (target) {
        target.style.minHeight = '1200px';

    }

    target = document.querySelector('body');
    if (target) {
        target.style.background = '#142233';
    }

    target = document.querySelector('.enterable_list.lobby__box__content');
    if (target) {
        target.style.background = 'transparent';
    }

    target = document.querySelector('.lobby__tournaments.lobby__box > a');
    if (target) {
        target.style.background = 'rgba(255,255,255,0.1)';
    }

    target = document.querySelectorAll('.lobby__app__content.lpools > div');
    if (target) {
        target.forEach((x) => {
            x.style.border = '1px solid rgba(255,255,255,0.5)';
        });
    }

    target = document.querySelectorAll('.lobby__box tr:nth-child(even)');
    if (target) {
        target.forEach((x) => {
            x.style.background = 'rgba(255,255,255,0.1)';
        });
    }

 

    run(); // Will also run once at startup and then when the MutationObserver reports changes in the zone
};

const run = () => {
    // Hide bullets and 3 minutes blitz
    isRunning = true;
    let target = document.querySelector('.lobby__app__content.lpools');
    if (target) {
        if(target.style.gridTemplateRows !== 'none') target.style.gridTemplateRows = 'none';
        if(target.style.background !== 'transparent') target.style.background = 'transparent';
        ['1+0', '2+1', '3+0', '3+2'].forEach((x) => {
            let subTarget = target.querySelector(`[data-id='${x}']`);
            if (subTarget) {
                if(subTarget.style.display !== 'none') subTarget.style.display = 'none';
            }
        });
    }
    target = document.querySelector('.lobby__app__content.lreal_time');
    if (target) {
       if(target.style.background !== 'transparent') target.style.background = 'transparent';
    }
    target = document.querySelector('.lobby__app__content.lseeks');
    if (target) {
        if(target.style.background !== 'transparent')  target.style.background = 'transparent';
    }    
    target = document.querySelector('.lobby__app__content.lnow_playing');
    if (target) {
        if(target.style.background !== 'transparent')  target.style.background = 'transparent';
    }
    target = document.querySelectorAll('.lobby__spotlights > a');
    if (target) {
        target.forEach((x) => {
            if(x.style.background !== 'transparent')   x.style.background = 'transparent';
        });
    }
    
    isRunning = false;
};

const launchObserver = () => {
    const observer = new MutationObserver((mutations) => {
        let target = document.querySelector('.lobby__app');

        if (!isRunning && target) run();
    });
    observer.observe(document, { childList: true, subtree: true });
};

const init = () => {
    runOnce();
    launchObserver();
};

init();