

const hex2rgb = c => {
    let result = `${c.match(/\w\w/g).map(x => +`0x${x}`)}`.split(',');
    return {
        r: result[0],
        g: result[1],
        b: result[2]
    }
};

const rgb2hex = c => '#' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``;

function setColors(hexColor, rot, sat) {

    let rgb = hex2rgb(hexColor);

    let hslColor = RGBToHSL(rgb);

    hslColor.h = (hslColor.h + rot) % 360;
    hslColor.s = (hslColor.s + sat);

    rgb = HSLToRGB(hslColor);

    rgb = `rgb(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)})`;

    return rgb2hex(rgb);

}

let isRunning = false;

// First model, other could follow
const modelColors = [
    {
        name: 'blueGreen',
        colors: {
            linearBgStart: '#25374d',
            linearBgEnd: '#142331',
            neutral: 'transparent',
            rgbaSoftWhite: 'rgba(255,255,255,0.1)',
            rgbaSoftBlack: 'rgba(0, 0, 0, 0.1)',
            rgbaSoftBlack2: 'rgba(0, 0, 0, 0.2)',
            rgbaPool: 'rgba(186, 186, 186, .05)',
            dasher: '#1F3042',
            primaryColor: '#2c4f6f',
            secondaryColor: '#37614d',
            chatHover: '#5c9f7f',
            crossTable: '#a1420a',
            puzzleDiv: '#395066',
            puzzleDiff: '#396650',
            lobbySupportA: '#395875',
            formColor1: '#406074',
            formColor2: '#204054',
            setUp: '#243e57',
            radio: '#629924',
            logo: 'silver'
        }
    }
]

const modelName = 'blueGreen';

const colors = modelColors.filter((x) => {
    return x.name === modelName;
})[0].colors;


const setModel = (rot, sat, challenges) => {

const rotation = rot;
const saturation = sat;

    if (rotation > 0 || saturation != 0) {
        for (const [key, value] of Object.entries(colors)) {
            if (value.startsWith('#')) {
                colors[key] = setColors(value, rotation, saturation);
            }
        }
    }

const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

let styleCss = `
body {
    background: linear-gradient(${colors.linearBgStart}, ${colors.linearBgEnd});
}

body>header {
    background : ${colors.linearBgStart} !important;
    border-bottom: 1px solid ${colors.linearBgStart} !important;
}

.mselect__list {
    background: ${colors.primaryColor} !important;
}

.mselect__list .current {
    background: ${colors.secondaryColor};
}

.rcontrols .suggestion, .rcontrols .pending, .rcontrols .question {
    background: ${colors.secondaryColor};
}

.mselect__list>*:hover {
   background : ${colors.rgbaSoftWhite};
}

.analyse__clock, #analyse-cm .title, .explorer__config .choices button, .mselect__label, .cmn-toggle:hover:not(:disabled)+label::after, .cmn-toggle+label::after, .crosstable povs:hover, .crosstable__users, .crosstable__score {
    background: ${colors.primaryColor} !important;
}

.lobby__app__content.lreal_time, .lobby__app__content.lseeks, .lobby__app__content.lnow_playing, .lobby__spotlights > a{
    background : ${colors.neutral};
}

.tour-spotlight.invert, .tour-spotlight.event-spotlight, .tour-spotlight:hover, .enterable_list.lobby__box__content {
    background : ${colors.neutral};  
}

.lobby__tournaments.lobby__box > a, .lobby__box tr:nth-child(even) {
    background : ${colors.rgbaSoftWhite};
}

.lobby__feed{
    background : ${colors.rgbaSoftWhite};
}

.lobby__blog.ublog-post-cards {
    margin-top: 18px;
}

.lobby__blog.ublog-post-cards > a,.box {
    background : ${colors.rgbaSoftWhite};
}

.perf-stat .counter tr.full td:last-child, .sub-ratings a.active, .rating-history-container .time-selector-buttons button  {
    background : ${colors.rgbaSoftWhite};
}

.box, .box__top user-show__header, .user-show__social{
    background: ${colors.rgbaSoftBlack};
}

#user_tag, .box__top.user-show__header,.site-buttons .dropdown,.dasher {
    background : ${colors.dasher};
}

.msg-app__convo__reply{
    background: ${colors.rgbaSoftBlack};
}

.msg-app__convo__reply textarea{
    background: ${colors.neutral};
}

.round__app__table {
    background: ${colors.primaryColor};
}

 .msg-app__convo__msgs their {
    background: ${colors.secondaryColor};
}

.msg-app__convo__msgs mine {
    background: ${colors.primaryColor};
}

.round__app .buttons {
    background: ${colors.primaryColor};
}

#powerTip, #miniGame, #miniBoard {
    background:  ${colors.primaryColor};
}

.round__app rm6 {
    background: ${colors.primaryColor};
}

.round__app l4x {
    background: ${colors.primaryColor};
}

.round__app i5z {
    background: ${colors.secondaryColor};
}

.rclock {
    background: ${colors.neutral};
}

.mchat__tab-active {
    background: ${colors.secondaryColor};
}

.rclock.running .time {
    background: ${colors.secondaryColor};
}h

.mchat__tab.discussion.mchat__tab-active, .mchat__tab-active, .mchat__tab-active{
    background: ${colors.secondaryColor};
}

.round .time {
    background: ${colors.secondaryColor};
}

.msg-app__side, .msg-app__side__search{
   background: ${colors.rgbaSoftBlack};
}

.msg-app__side input{
    background: ${colors.neutral};
}

.msg-app__convo__head{
    background: ${colors.rgbaSoftBlack2};
}

.msg-app__side__contact.active{
    background: ${colors.secondaryColor};
}

.puzzle__tools {
    background: ${colors.rgbaSoftBlack};
}

.game-row:nth-child(odd) {
    background: ${colors.rgbaSoftBlack};
}

.mchat__tab-active {
    color: #bababa;
    background:${colors.secondaryColor} !important; 
}

.mchat__tab:hover {
    background:${colors.chatHover} !important; 
}

.game__meta, .mchat__content,.mchat__say, .mchat__tabs,.crosstable > povs,
 .crosstable__users, .crosstable__users > a, .round__underboard > .crosstable > fill {
    background : ${colors.rgbaSoftWhite};
}

.ricons {
    margin-top: 8px;
}

.round__underboard:empty {
    display: none;
}

.mchat__tab{
    background: ${colors.primaryColor};
}

.mchat__tab.mchat__tab-active{
    background: ${colors.secondaryColor};
}

.mchat__tab.discussion.mchat__tab-active{
    background: ${colors.secondaryColor};
}

.mchat__tab.note.mchat__tab-active{
    background: ${colors.secondaryColor};
}

.crosstable__score {
    background : ${colors.crossTable};
}

.puzzle.puzzle-play index {
    background : ${colors.linearBgStart} !important;
}

#friend_box {
    background: ${colors.secondaryColor};
    border: 1px solid ${colors.secondaryColor};
}

.puzzle.puzzle-play div{
    background : ${colors.puzzleDiv} !important;
}

#puzzle-difficulty{
    background : ${colors.puzzleDiff} !important;
}

#topnav div[role='group'] {
    background : ${colors.linearBgStart};
}

#topnav.hover section:hover>a, #topnav section:active>a {
    background: ${colors.linearBgStart};
}

.site-buttons.dropdown{
    background: ${colors.linearBgStart};
}

.site-buttons .shown .toggle {
    background: ${colors.linearBgStart};
}

.analyse__tools {
    background: ${colors.secondaryColor};
}

.analyse__tools interrupt {
    background: ${colors.primaryColor};
}

.analyse__tools .ceval {
    background: ${colors.primaryColor};
}

.lobby__support a {
    background : ${colors.lobbySupportA};
}

.analyse__tools index,.analyse__tools .result,.analyse__tools .status {
    background : ${colors.primaryColor} !important;
}

.lpools > div{
    border: 1px solid ${colors.rgbaSoftWhite};;
    background: ${colors.rgbaPool};
}

.lpools > div:hover{
    background: ${colors.secondaryColor} !important;
}

.button:hover{
    background: ${colors.secondaryColor};
}

.button.active{
    background: ${colors.secondaryColor};
}

button.fbt.rematch.white{
    background: ${colors.secondaryColor};
}

#powerTip .forecast-info .title, 
.rcontrols .rematch.fbt, 
.cmn-toggle:hover:not(:disabled)+label::after, 
.cmn-toggle+label::after, 
.crosstable povs:hover, 
.crosstable__users, 
.crosstable__score {
    background: ${colors.secondaryColor} !important;
}

.team-show__desc{
    background: ${colors.secondaryColor};
}

.team-permissions table .cmn-toggle:not(:checked)+label {
    background-color: ${colors.secondaryColor}
}

.slist tbody tr:nth-child(even) {
    background: ${colors.secondaryColor};
}

.tour__actor-info .stats h2,.tour__controls,.slist thead {
    background: ${colors.secondaryColor};
}

.tour__meta {
    background: ${colors.neutral} !important;
}

.tour__stats {
    background: ${colors.neutral} !important;
}

.tour__actor-info {
    background: ${colors.neutral} !important;
}

.tour__player-info .pairings tr:nth-child(odd) {
    background: ${colors.secondaryColor};
}

.study__metadata, .study__metadata h2 {
    background : ${colors.primaryColor};
}

.study__metadata h2 {
   border-bottom: none;
}

.coach-list__main .coach-widget:nth-child(even) {
    background: ${colors.secondaryColor};
}

.coach-list__main .coach-widget:hover {
    background: ${colors.rgbaSoftWhite};
}

.study-search__results, .study__members, .study__chapters {
    background: ${colors.secondaryColor} !important;
}

dialog {
    background: ${colors.primaryColor} !important;
}

input:not(.regular-checkbox), textarea, select {
    background: ${colors.formColor1}  !important;;
    border: 1px solid ${colors.formColor2}  !important;;
}

.ublog-post-card {
    background:  ${colors.primaryColor} !important;
}
option, optgroup {
    background: ${colors.secondaryColor} !important;
}

.game-setup .optional-config {
    border-bottom: 1px solid ${colors.linearBgStart};
}

.game-setup .optional-config, .game-setup .ratings {
    background: ${colors.setUp} !important;
    border-top: 1px solid ${colors.linearBgStart} !important;
}

.btn-rack__btn, .btn-rack form, #friend_box .friend_box_title, .button.button-metal, .button.button-empty:not(.disabled):hover, .button.button-empty.button-green:not(.disabled):hover, .button.button-empty.button-red:not(.disabled):hover {
    background: ${colors.neutral} !important;
}

group.radio label, group.radio .label {
    background: ${colors.neutral} !important;
}

.game-setup group.radio input:checked+label {
    background: ${colors.radio} !important;
}

.user-show .angles, .cmn-toggle:hover:not(:disabled)+label::after, .cmn-toggle+label::after, .crosstable povs:hover, .crosstable__users, .crosstable__score {
    background: ${colors.primaryColor} !important;
}
.user-show .number-menu .to-games.active, .user-show #games.number-menu {
    background: ${colors.primaryColor} !important;
}

.number-menu--tabs .nm-item.active {
    background: ${colors.secondaryColor} !important;
}

#insight .insight__main {
    background: ${colors.neutral};
}

#insight header {
    background: ${colors.primaryColor};
}

#insight .box .top, .slist thead {
    background: ${colors.rgbaSoftWhite};
}

#insight header .ms-choice {
    background: ${colors.secondaryColor};
}

.ms-drop {
    background: ${colors.secondaryColor};
}

#challenge-app .empty {
    background: ${colors.linearBgStart} !important;
}

#logoLichess{
    opacity: 0.6;
}

.swiss__player-info .stats h2, .swiss__controls, .slist thead {
    background: ${colors.secondaryColor}
}
.swiss__meta {
    background: ${colors.secondaryColor}
}

.community__leaders .leaderboards li:nth-child(even) {
    background: ${colors.linearBgStart};
}

.bots__list__entry:nth-child(odd) {
    background: ${colors.linearBgStart};
}

.explorer-box tr:nth-child(even) {
    background: ${colors.linearBgStart};
}

.study-search__results>div:hover, .study__members>div:hover, .study__chapters>div:hover, .study-search__results>div.active, .study__members>div.active, .study__chapters>div.active {
    background: ${colors.primaryColor};
}

.study__metadata h2, .study__player, .analyse__clock, #analyse-cm .title, .explorer__config .choices button, .slist thead, .cmn-toggle:hover:not(:disabled)+label::after, .cmn-toggle+label::after, .crosstable povs:hover, .crosstable__users, .crosstable__score {
    background: ${colors.primaryColor};
}

.lobby__box__top, #hook .opponent {
    background: ${colors.rgbaSoftWhite};
}

.lobby__box__content {
    background: ${colors.neutral};  
}

.site_notification.privateMessage {
    border-bottom: 1px : ${colors.secondaryColor} !important;
}

.site_notification.privateMessage:hover {
    background: ${colors.rgbaSoftWhite} !important;
}

.slist tbody tr:nth-child(even) {
    background: ${colors.secondaryColor} !important;
}

.opening__config {
    background: ${colors.primaryColor};
}

.opening__config:hover {
    background: ${colors.secondaryColor}
}

.streamer-list .streamer:nth-child(even) {
    background: ${colors.linearBgStart};
}

.analyse__moves button.next {
    background: ${colors.primaryColor};
}

.button {
    background: rgba(186, 186, 186, .05) !important;
    border:1px solid rgba(255,255,255,0.1);
    border-radius:5px;
}

.button.button-metal{
    background: rgba(186, 186, 186, .05) !important;
}

.button:hover{
    background: ${colors.secondaryColor} !important;
}

.analyse__tools index, .analyse__tools .result, .analyse__tools .status {
    background: ${colors.secondaryColor} !important;
}

.team-show__forum__post:nth-child(odd) {
    background: ${colors.secondaryColor};
}

.video .card .reveal, .video .card .info {
    background: ${colors.secondaryColor};
}

.slist-invert tbody tr:nth-child(odd) {
    background: transparent;
}

`;

if (challenges.length >= 9) {
    styleCss += `
    .lobby__app__content > div {
        max-height: 50%;
    }

    `;
}

if (challenges.length < 11) {
    styleCss += `
    .lobby__app__content > div.custom {
        display : none;
    }

    `;
}

Add_Custom_Style(styleCss);
}

const runOnce = (targets, challenges) => {

    targets.forEach((x) => {
        let target = document.querySelector('.' + x);
        if (target) {
            target.style.display = 'none';
        }
    });

    const logo = `<img id='logoLichess' src="data:image/svg+xml,%3Csvg viewBox='-2 -2 54 54' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='${colors.logo}' stroke='${colors.logo}' stroke-linejoin='round'%0Ad='M38.956.5c-3.53.418-6.452.902-9.286 2.984C5.534 1.786-.692 18.533.68 29.364 3.493 50.214 31.918 55.785 41.329 41.7c-7.444 7.696-19.276 8.752-28.323 3.084C3.959 39.116-.506 27.392 4.683 17.567 9.873 7.742 18.996 4.535 29.03 6.405c2.43-1.418 5.225-3.22 7.655-3.187l-1.694 4.86 12.752 21.37c-.439 5.654-5.459 6.112-5.459 6.112-.574-1.47-1.634-2.942-4.842-6.036-3.207-3.094-17.465-10.177-15.788-16.207-2.001 6.967 10.311 14.152 14.04 17.663 3.73 3.51 5.426 6.04 5.795 6.756 0 0 9.392-2.504 7.838-8.927L37.4 7.171z'/%3E%3C/svg%3E%0A"></img>`;

    if (targets.includes('lobby__timeline')) {
        target = document.querySelector('.lobby__timeline');
        if (target) {
            target.style.display = 'flex';
            target.style.borderRadius = '50%';
            target.innerHTML = logo;
        }
    }

    run(challenges); // Will also run once at startup and then when the MutationObserver reports changes in the zone
};

const run = (challenges) => {
    // Hide bullets and 3 minutes blitz
    isRunning = true;
    let target = document.querySelector('.lobby__app__content.lpools');
    if (target) {
        if (target.style.gridTemplateRows !== 'none') target.style.gridTemplateRows = 'none';
        if (target.style.background !== 'transparent') target.style.background = 'transparent';
        challenges.forEach((x) => {
            let subTarget = target.querySelector(`[data-id='${x}']`);
            if (subTarget) {
                if (subTarget.style.display !== 'none') subTarget.style.display = 'none';
            }
        });
    }

    isRunning = false;
};

const launchObserver = (challenges) => {
    const observer = new MutationObserver((mutations) => {
        let target = document.querySelector('.lobby__app');

        if (!isRunning && target) run(challenges);
    });
    observer.observe(document, { childList: true, subtree: true });
};

const init = (rot, sat, targets, challenges) => {
    setModel(rot, sat, challenges)
    runOnce(targets, challenges);
    launchObserver(challenges);
};

chrome.storage.sync.get('rotation', (result) => {
    let rot = 0;
    let sat = 0;
    if (!result || result.rotation === undefined) {
        rot = 0;
        chrome.storage.sync.set({ rotation: 0 });
    } else {
        rot = parseInt(result.rotation);
    }
    // page elements to hide
    const defaultTargets = [
        'lobby__timeline',
        'lobby__leaderboard',
        'lobby__winners',
        'lobby__wide-winners',
        'lobby__simuls'
    ];

    let targets = [];

    chrome.storage.sync.get('hideAreas', (result) => {
        if (!result || result.hideAreas === undefined) {
          defaultTargets.forEach((x) => {
            targets.push(x);
          });
          chrome.storage.sync.set({ 'hideAreas': targets });
        } else {
          result.hideAreas.forEach((x) => {
            targets.push(x);
          });
        }

        const defaultChallenges = [];

        let challenges = [];

        chrome.storage.sync.get('hideChallenges', (result) => {
            if (!result || result.hideChallenges === undefined) {
                defaultChallenges.forEach((x) => {
                    challenges.push(x);
                });
                chrome.storage.sync.set({ 'hideChallenges': challenges });
            } else {
                result.hideChallenges.forEach((x) => {
                    challenges.push(x);
                });
            }
            chrome.storage.sync.get('saturation', (result) => {
                if (!result || result.saturation === undefined) {
                    sat = 0;
                    chrome.storage.sync.set({ saturation: 0 });
                } else {
                    sat = parseInt(result.saturation);
                }
                 init(rot, sat, targets, challenges);
            });
        });
      });
})


function RGBToHSL(rgb) {
    // Make r, g, and b fractions of 1
   let r = rgb.r / 255;
   let g = rgb.g / 255;
   let b = rgb.b / 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {h : h, s : s, l : l}
}

function HSLToRGB(hsl) {
    // Must be fractions of 1
   let s = hsl.s / 100;
   let l = hsl.l / 100;
   let h = hsl.h;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {r : r, g : g , b : b};
}