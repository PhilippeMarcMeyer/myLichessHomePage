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
    background: #37614d;
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
    background: #37614d;
}

.rclock {
    background: transparent;
}

.mchat__tab-active {
    background: #37614d;
}

.rclock.running .time {
    background: #37614d;
}

.mchat__tab.discussion.mchat__tab-active, .mchat__tab-active, .mchat__tab-active{
    background: #37614d;
}

.round .time {
    background: #37614d;
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
    background: #37614d;
}

.puzzle__tools {
    background: rgba(0, 0, 0, 0.1);
}

.game-row:nth-child(odd) {
    background: rgba(0, 0, 0, 0.1);
}

.mchat__tab-active {
    color: #bababa;
    background:#37614d !important; 
}

.mchat__tab:hover {
    background:#5c9f7f !important; 
}

.game__meta, .mchat__content,.mchat__say, .mchat__tabs,.crosstable > povs,
 .crosstable__users, .crosstable__users > a, .round__underboard > .crosstable > fill {
    background : rgba(255,255,255,0.1);
}

.ricons {
    margin-top: 8px;
}

.round__underboard:empty {
    display: none;
}

.mchat__tab{
    background: #2c4f6f;
}

.mchat__tab.mchat__tab-active{
    background: #37614d;
}

.mchat__tab.discussion.mchat__tab-active{
    background: #37614d;
}

.mchat__tab.note.mchat__tab-active{
    background: #37614d;
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
    background: #37614d;
}

.analyse__tools interrupt {
    background: #2c4f6f;
}

.analyse__tools .ceval {
    background: #2c4f6f;
}

.lobby__support a {
    background : #395875;
}

.analyse__tools index,.analyse__tools .result,.analyse__tools .status {
    background : #2c4f6f !important;
}

.lpools > div{
    border: 1px solid rgba(255,255,255,0.1);;
    background: rgba(186, 186, 186, .05);
}

.lpools > div:hover{
    background: #37614d;
}

.button:hover{
    background: #37614d;
}

.button.active{
    background: #37614d;
}

button.fbt.rematch.white{
    background: #37614d;
}

#powerTip .forecast-info .title, 
.rcontrols .rematch.fbt, 
.cmn-toggle:hover:not(:disabled)+label::after, 
.cmn-toggle+label::after, 
.crosstable povs:hover, 
.crosstable__users, 
.crosstable__score {
    background: #37614d !important;
}

.team-show__desc{
    background: #37614d;
}

.team-permissions table .cmn-toggle:not(:checked)+label {
    background-color: #37614d
}

.slist tbody tr:nth-child(even) {
    background: #37614d;
}

.tour__actor-info .stats h2,.tour__controls,.slist thead {
    background: #37614d;
}

.tour__meta {
    background: transparent !important;
}

.tour__stats {
    background: transparent !important;
}

.tour__actor-info {
    background: transparent !important;
}

.tour__player-info .pairings tr:nth-child(odd) {
    background: #37614d;
}

.study__metadata, .study__metadata h2 {
    background : #2c4f6f;
}

.study__metadata h2 {
   border-bottom: none;
}

.study-search__results, .study__members, .study__chapters {
    background: #37614d !important;
}

dialog {
    background: #2c4f6f !important;
}

input, textarea, select {
    background: #406074;
    border: 1px solid #204054;
}

option, optgroup {
    background: #37614d !important;
}

.game-setup .optional-config {
    border-bottom: 1px solid #243243;
}

.game-setup .optional-config, .game-setup .ratings {
    background: #243e57 !important;
    border-top: 1px solid #243243 !important;
}

.btn-rack__btn, .btn-rack form, #friend_box .friend_box_title, .button.button-metal, .button.button-empty:not(.disabled):hover, .button.button-empty.button-green:not(.disabled):hover, .button.button-empty.button-red:not(.disabled):hover {
    background: transparent !important;
}

group.radio label, group.radio .label {
    background: transparent !important;
}

.game-setup group.radio input:checked+label {
    background: #629924 !important;
}

.user-show .angles, .cmn-toggle:hover:not(:disabled)+label::after, .cmn-toggle+label::after, .crosstable povs:hover, .crosstable__users, .crosstable__score {
    background: #2c4f6f !important;
}
.user-show .number-menu .to-games.active, .user-show #games.number-menu {
    background: #2c4f6f !important;
}

.number-menu--tabs .nm-item.active {
    background: #37614d !important;
}

#insight .insight__main {
    background: transparent;
}

#insight header {
    background: #2c4f6f;
}

#insight .box .top, .slist thead {
    background: rgba(255,255,255,0.1);
}

#insight header .ms-choice {
    background: #37614d;
}

.ms-drop {
    background: #37614d;
}
`;