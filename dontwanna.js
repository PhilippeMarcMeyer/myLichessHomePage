'use strict';

let isRunning = false;

const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css

const styleCss = `
body {
    background: linear-gradient(#243243, #22517c);
}

.lobby__app__content.lreal_time, .lobby__app__content.lseeks, .lobby__app__content.lnow_playing, .lobby__spotlights > a{
    background : transparent;
}

.tour-spotlight.invert, .tour-spotlight.event-spotlight, .tour-spotlight:hover, .enterable_list.lobby__box__content {
    background : transparent;  
}

.lobby__tournaments.lobby__box > a, .lobby__box tr:nth-child(even) {
    background : rgba(255,255,255,0.1);
}

.lobby__feed{
    background : rgba(255,255,255,0.1);
}

.lobby__blog.ublog-post-cards {
    margin-top: 18px;
}

.lobby__blog.ublog-post-cards > a,.box {
    background : rgba(255,255,255,0.1);
}

.perf-stat .counter tr.full td:last-child, .sub-ratings a.active, .rating-history-container .time-selector-buttons button  {
    background : rgba(255,255,255,0.1);
}

.box, .box__top user-show__header, .user-show__social{
    background: rgba(0, 0, 0, 0.1);
}

#user_tag, .box__top.user-show__header,.site-buttons .dropdown,.dasher {
    background : #1F3042;
}

.msg-app__convo__reply{
    background: rgba(0, 0, 0, 0.1);
}

.msg-app__convo__reply textarea{
    background: transparent;
}

.round__app__table {
    background: #2c4f6f;
}

 .msg-app__convo__msgs their {
    background: #2c6f4f;
}

.msg-app__convo__msgs mine {
    background: #2c4f6f;
}

.round__app .buttons {
    background: #2c4f6f;
}

.round__app rm6 {
    background: #2c4f6f;
}

.round__app l4x {
    background: #2c4f6f;
}

.round__app i5z {
    background: #2c6f4f;
}

.rclock {
    background: transparent;
}

.mchat__tab-active {
    background: #2c6f4f;
}

.rclock.running .time {
    background: #2c6f4f;
}

.mchat__tab.discussion.mchat__tab-active, .mchat__tab-active, .mchat__tab-active{
    background: #2c6f4f;
}

.round .time {
    background: #2c6f4f;
}

.msg-app__side, .msg-app__side__search{
   background: rgba(0, 0, 0, 0.1);
}

.msg-app__side input{
    background: transparent;
}

.msg-app__convo__head{
    background: rgba(0, 0, 0, 0.2);
}

.msg-app__side__contact.active{
    background: #2c6f4f;
}

.puzzle__tools {
    background: rgba(0, 0, 0, 0.1);
}

.game-row:nth-child(odd) {
    background: rgba(0, 0, 0, 0.1);
}

.mchat__tab-active {
    color: #bababa;
    background:#2c6f4f !important; 
}

.mchat__tab:hover {
    background:#5c9f7f !important; 
}

.game__meta, .mchat__content,.mchat__say, .mchat__tabs,.crosstable > povs,
 .crosstable__users, .crosstable__users > a, .round__underboard > .crosstable > fill {
    background : rgba(255,255,255,0.1);
}

.mchat__tab{
    background: #2c4f6f;
}

.mchat__tab.mchat__tab-active{
    background: #2c6f4f;
}

.mchat__tab.discussion.mchat__tab-active{
    background: #2c6f4f;
}

.mchat__tab.note.mchat__tab-active{
    background: #2c6f4f;
}

.crosstable__score {
    background : #a1420a;
}

.puzzle.puzzle-play index {
    background : #243243 !important;
}


.puzzle.puzzle-play div{
    background : #395066 !important;
}

#puzzle-difficulty{
    background : #396650 !important;
}

#topnav div[role='group'] {
    background : #243243;
}

#topnav.hover section:hover>a, #topnav section:active>a {
    height: var(--nav-section-hover);
    background: #243243;
    color: #ccc;
    border-color: #142233;
}

.lobby__start button{
    margin : 0;
    border : 1px solid rgba(255,255,255,0.5);
    border-radius : 10px;
    background : rgba(255,255,255,0.1);
}
.analyse__tools {
    background: #2c6f4f;
}

.analyse__tools interrupt {
    background: #193c2b;
}

.analyse__tools .ceval {
    background: #2c4f6f;
}

.analyse__tools index,.analyse__tools .result,.analyse__tools .status {
    background : #2c4f6f !important;
}

`;

const runOnce = () => {

    // page elements to hide
    const targets = [
        'lobby__timeline',
        'lobby__support',
        'lobby__leaderboard',
        'lobby__winners',
        'lobby__about',
        'lobby__wide-winners',
        'lobby__simuls'
    ];

    targets.forEach((x) => {
        let target = document.querySelector('.' + x);
        if (target) {
            target.style.display = 'none';
        }
    });

    const logo = `<img id='logoLichess' src="data:image/svg+xml,%3Csvg viewBox='-2 -2 54 54' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23383633' stroke='%23383633' stroke-linejoin='round'%0Ad='M38.956.5c-3.53.418-6.452.902-9.286 2.984C5.534 1.786-.692 18.533.68 29.364 3.493 50.214 31.918 55.785 41.329 41.7c-7.444 7.696-19.276 8.752-28.323 3.084C3.959 39.116-.506 27.392 4.683 17.567 9.873 7.742 18.996 4.535 29.03 6.405c2.43-1.418 5.225-3.22 7.655-3.187l-1.694 4.86 12.752 21.37c-.439 5.654-5.459 6.112-5.459 6.112-.574-1.47-1.634-2.942-4.842-6.036-3.207-3.094-17.465-10.177-15.788-16.207-2.001 6.967 10.311 14.152 14.04 17.663 3.73 3.51 5.426 6.04 5.795 6.756 0 0 9.392-2.504 7.838-8.927L37.4 7.171z'/%3E%3C/svg%3E%0A"></img>`;

    // Make the game buttons more apparent with a backgroung photo

    let target = document.querySelectorAll('.button');
    if (target) {
        target.forEach((x) => {
            x.style.border = '1px solid rgba(255,255,255,0.5)';
            x.borderRadius = '10px';
            x.style.background = 'rgba(255,255,255,0.1)'
        });
    }

    if (targets.includes('lobby__timeline')) {
        target = document.querySelector('.lobby__timeline');
        if (target) {
            target.style.display = 'flex';
            target.style.borderRadius = '50%';
            target.innerHTML = logo;
        }
    }

    Add_Custom_Style(styleCss);

    run(); // Will also run once at startup and then when the MutationObserver reports changes in the zone
};

const run = () => {
    // Hide bullets and 3 minutes blitz
    isRunning = true;
    let target = document.querySelector('.lobby__app__content.lpools');
    if (target) {
        if (target.style.gridTemplateRows !== 'none') target.style.gridTemplateRows = 'none';
        if (target.style.background !== 'transparent') target.style.background = 'transparent';
        ['1+0', '2+1', '3+0', '3+2'].forEach((x) => {
            let subTarget = target.querySelector(`[data-id='${x}']`);
            if (subTarget) {
                if (subTarget.style.display !== 'none') subTarget.style.display = 'none';
            }
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