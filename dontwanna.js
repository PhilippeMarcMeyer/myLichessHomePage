
// Color tools
//https://blog.logrocket.com/how-to-manipulate-css-colors-with-javascript-fb547113a1b8/

const rgbToLightness = (r, g, b) => {
    return (Math.max(r, g, b) + Math.min(r, g, b)) * 0.5;
}

const rgbToSaturation = (r, g, b) => {
    const L = rgbToLightness(r, g, b);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (L === 0 || L === 1)
        ? 0
        : (max - min) / (1 - Math.abs(2 * L - 1));
}

const rgbToHue = (r, g, b) => {
    let x = Math.sqrt(3) * (g - b);
    let y = 2 * r - g - b;
    return Math.round(Math.atan2(x, y,) * (180 / Math.PI));
}

const rgbToHsl = (r, g, b) => {
    const lightness = rgbToLightness(r, g, b);
    const saturation = rgbToSaturation(r, g, b);
    const hue = rgbToHue(r, g, b);
    return [hue, saturation, lightness];
}

const hslToRgb = (h, s, l) => {
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const hPrime = h / 60;
    const X = C * (1 - Math.abs(hPrime % 2 - 1));
    const m = l - C / 2;
    const withLight = (r, g, b) => `rgb(${Math.round(r + m)},${Math.round(g + m)},${Math.round(b + m)})`;
    if (hPrime <= 1) { return withLight(C, X, 0); } else
        if (hPrime <= 2) { return withLight(X, C, 0); } else
            if (hPrime <= 3) { return withLight(0, C, X); } else
                if (hPrime <= 4) { return withLight(0, X, C); } else
                    if (hPrime <= 5) { return withLight(X, 0, C); } else
                        if (hPrime <= 6) { return withLight(C, 0, X); }
}

const hex2rgb = c => {
    let result = `${c.match(/\w\w/g).map(x => +`0x${x}`)}`.split(',');
    return {
        r: result[0],
        g: result[1],
        b: result[2]
    }
};

const rgb2hex = c => '#' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``;

const rgbToObject = (red, green, blue) => {
    const [hue, saturation, lightness] = rgbToHsl(red, green, blue);
    return { red, green, blue, hue, saturation, lightness };
}

const hslToObject = (hue, saturation, lightness) => {
    const [red, green, blue] = hslToRgb(hue, saturation, lightness);
    return { red, green, blue, hue, saturation, lightness };
}

const rotateHue = (rotation, obj) => {
    let hue = obj.hue;
    const modulo = (x, n) => (x % n + n) % n;
    const newHue = modulo(hue + rotation, 360);
    obj.hue = newHue
    return obj;
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


const setModel = (rot) => {
const rotation = rot;

if (rotation > 0) {
    for (const [key, value] of Object.entries(colors)) {
        if (value.startsWith('#')) {
            let rgb = hex2rgb(value);
            let colorObj = rgbToObject(rgb.r, rgb.g, rgb.b);
            let rotatedObj = rotateHue(rotation, colorObj);
            rgb = hslToRgb(rotatedObj.hue, rotatedObj.saturation, rotatedObj.lightness);
            let hex = rgb2hex(rgb);
            colors[key] = hex;
        }
    }
}


const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css

const styleCss = `
body {
    background: linear-gradient(${colors.linearBgStart}, ${colors.linearBgEnd});
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
    background: ${colors.secondaryColor};
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

.study-search__results, .study__members, .study__chapters {
    background: ${colors.secondaryColor} !important;
}

dialog {
    background: ${colors.primaryColor} !important;
}

input, textarea, select {
    background: ${colors.formColor1};
    border: 1px solid ${colors.formColor2};
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
`;

Add_Custom_Style(styleCss);

}

const runOnce = (rot) => {

    // page elements to hide
    const targets = [
        'lobby__timeline',
        'lobby__leaderboard',
        'lobby__winners',
        'lobby__wide-winners',
        'lobby__simuls'
    ];

    targets.forEach((x) => {
        let target = document.querySelector('.' + x);
        if (target) {
            target.style.display = 'none';
        }
    });

    const logo = `<img id='logoLichess' src="data:image/svg+xml,%3Csvg viewBox='-2 -2 54 54' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='${colors.logo}' stroke='${colors.logo}' stroke-linejoin='round'%0Ad='M38.956.5c-3.53.418-6.452.902-9.286 2.984C5.534 1.786-.692 18.533.68 29.364 3.493 50.214 31.918 55.785 41.329 41.7c-7.444 7.696-19.276 8.752-28.323 3.084C3.959 39.116-.506 27.392 4.683 17.567 9.873 7.742 18.996 4.535 29.03 6.405c2.43-1.418 5.225-3.22 7.655-3.187l-1.694 4.86 12.752 21.37c-.439 5.654-5.459 6.112-5.459 6.112-.574-1.47-1.634-2.942-4.842-6.036-3.207-3.094-17.465-10.177-15.788-16.207-2.001 6.967 10.311 14.152 14.04 17.663 3.73 3.51 5.426 6.04 5.795 6.756 0 0 9.392-2.504 7.838-8.927L37.4 7.171z'/%3E%3C/svg%3E%0A"></img>`;

    let target = document.querySelectorAll('.button');
    if (target) {
        target.forEach((x) => {
            x.style.border = '1px solid rgba(255,255,255,0.1)';
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

const init = (rot) => {
    setModel(rot)
    runOnce();
    launchObserver();
};

chrome.storage.sync.get('rotation', (result) => {
    if (result.rotation === undefined) {
        rot = 0;
      chrome.storage.sync.set({ rotation: 0 });
    } else {
        rot = parseInt(result.rotation);
    }
    init(rot);
})
