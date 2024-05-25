'use strict';

const version = 'v 1.3';
const versionElement = document.getElementById('ext-version');
const colorizedZone = document.getElementById('colorized-zone');
const rotationElement = document.getElementById('rotation');
const resultElement = document.getElementById('result');
const saturationElement = document.getElementById('saturation');
const saturationResult = document.getElementById('result-sat');
const logoElement = document.getElementById('logoLichess');
const ptrToPseudo = document.getElementById('pseudo');
const ptrToNote = document.getElementById('note');
const ptrToImage= document.getElementById('image');

const menuZones = document.querySelectorAll('.menu-zones span');
const zones = document.querySelectorAll('.zone');
menuZones
  .forEach((x) => {
    x.addEventListener('click', function () {
      menuZones
        .forEach((x) => {
          x.classList = '';
        });

      zones
        .forEach((x) => {
          x.classList = 'zone';
        });

      this.classList = 'chosen';
      let dataId = this.getAttribute('data-id');
      document.getElementById(dataId).classList = 'zone chosen';
    })
  });

// lichessFriends
let lichessFriends = {};
let friendsPhotos = {};

let friendsTable = document.querySelector('#friends-liste table');
chrome.storage.sync.get('lichessFriends', (result) => {
  if (result && result.lichessFriends !== undefined) {
    lichessFriends = JSON.parse(result.lichessFriends);
    chrome.storage.sync.get('friendsPhotos', (result) => {
      if (result && result.friendsPhotos !== undefined) {
        friendsPhotos = JSON.parse(result.friendsPhotos);
      }
      setFriendsTable();
      addNewNoteListener();
      friendsTable.addEventListener('click', (e) => {
        if (e.target.matches('div')) {
          let mayBePseudo = e.target.innerHTML;
          if (lichessFriends[mayBePseudo]) {
            ptrToPseudo.value = mayBePseudo;
            ptrToNote.value = lichessFriends[mayBePseudo];
            if (friendsPhotos[mayBePseudo]) {
              ptrToImage.value = friendsPhotos[mayBePseudo];
            }
          }
        }else if (e.target.matches('label')) {
          if(e.target.classList.value === 'pseudoLichess'){
            ptrToPseudo.value = '';
            ptrToNote.value = '';
            ptrToImage.value = '';
          }
        }
      });
    });
  }
});

// Set the lichessFriends form

function setFriendsTable() {
  for (const property in lichessFriends) {
    let newRow = friendsTable.insertRow(-1);

    let newCell = newRow.insertCell(0);
    let newDiv = document.createElement('div');
    newDiv.classList = 'pseudoLichess';

    let newText = document.createTextNode(property);
    if(friendsPhotos[property]){
      newCell.style=`background-image: url("${friendsPhotos[property]}");`
      newCell.classList = 'tdWithImage';
    }

    newCell.appendChild(newDiv);
    newDiv.appendChild(newText);

    newCell = newRow.insertCell(1);

    newDiv = document.createElement('div');
    newText = document.createTextNode(lichessFriends[property]);

    newCell.appendChild(newDiv);
    newDiv.appendChild(newText);

    let newCell2 = newRow.insertCell(2);
    newDiv = document.createElement('div');
    newCell2.classList = 'litterbin';
    newText = document.createTextNode('🗑');
    newCell2.appendChild(newDiv);
    newDiv.appendChild(newText);

    newCell2.addEventListener('click',function(){
        let clickedRow = this.closest('tr');
        let toDeletePseudo = clickedRow.cells[0].querySelector('div').innerHTML;
        for (let i = friendsTable.tBodies[0].rows.length-1; i > 0 ; i--) {
          let ptr = friendsTable.tBodies[0].rows[i].cells[0].querySelector('div');
          let currentPseudo = ptr.innerHTML;
          if(currentPseudo === toDeletePseudo){
            delete lichessFriends[toDeletePseudo];
            if(friendsPhotos[toDeletePseudo]) delete friendsPhotos[toDeletePseudo];;
          }
        }
        clickedRow.remove();
    });
  }
}

function addNewNoteListener() {
  document.getElementById('action').addEventListener('click', function () {
    let doRefresh = false;
    if (ptrToPseudo.value.trim() !== '' && ptrToNote !== '') {
      let newPseudo = ptrToPseudo.value.trim();
      let newNote = ptrToNote.value.replace('"', "'");
      let newImage = ptrToImage.value.trim();

      if (lichessFriends[newPseudo]) {
        // If already in table replace it
        for (let i = 1; i <= friendsTable.tBodies[0].rows.length-1; i++) {
          let ptrToTd = friendsTable.tBodies[0].rows[i].cells[0];
          let ptr = ptrToTd.querySelector('div');
          let currentPseudo = ptr.innerHTML;
          if(currentPseudo === newPseudo){
            friendsTable.tBodies[0].rows[i].remove();
            delete lichessFriends[newPseudo];
            if(newImage === '' && friendsPhotos[newPseudo]){
              newImage = friendsPhotos[newPseudo];
            }
            if(friendsPhotos[newPseudo]) delete friendsPhotos[newPseudo];
          }
        }
      } 
      //add it at the bottom
      let newRow = friendsTable.insertRow(-1);
      let newCell = newRow.insertCell(0);
      let newDiv = document.createElement('div');
      let newText = document.createTextNode(newPseudo);
      newCell.appendChild(newDiv);
      newDiv.appendChild(newText);
      newDiv.classList = 'pseudoLichess';
      if(newImage!==''){
        newCell.style=`background-image: url("${newImage}");`
        newCell.classList = 'tdWithImage';
      }

      newCell = newRow.insertCell(1);
      newDiv = document.createElement('div');
      newText = document.createTextNode(newNote);
      newCell.appendChild(newDiv);
      newDiv.appendChild(newText);

      let newCell2 = newRow.insertCell(2);
      newCell2.classList = 'litterbin supprBtn';
      newDiv = document.createElement('div');
      newText = document.createTextNode('🗑');
      newCell2.appendChild(newDiv);
      newDiv.appendChild(newText);
      newCell2.addEventListener('click',function(){
        let clickedRow = this.closest('tr');
        let toDeletePseudo = clickedRow.cells[0].innerHTML;
        for (let i = friendsTable.tBodies[0].rows.length-1; i > 0 ; i--) {
          let currentPseudo = friendsTable.tBodies[0].rows[i].cells[0].innerHTML;
          if(currentPseudo === toDeletePseudo){
              delete lichessFriends[toDeletePseudo];
          }
        }
        clickedRow.remove();
      });
    
  
      lichessFriends[newPseudo] = newNote;
      if(newImage!==''){
        friendsPhotos[newPseudo] = newImage;
      }
      ptrToPseudo.value = '';
      ptrToNote.value = '';
      ptrToImage.value = '';
      if(doRefresh){

      }
    }
  });
}

// filterBotsParams form
let filterBotsParams = {
  doFilter: false,
  filterFrom: null,
  filterTo: null
}

const doFilterElement = document.getElementById('doFilter');
const fromFilterElement = document.getElementById('fromRating');
const toFilterElement = document.getElementById('toRating');

if (doFilterElement && fromFilterElement && toFilterElement) {
  chrome.storage.sync.get('mlhpFilterBots', (result) => {
    if (result && result.mlhpFilterBots !== undefined) {
      filterBotsParams = JSON.parse(result.mlhpFilterBots);
    }
    // Set the filterBotsParams form
    if (filterBotsParams.doFilter) {
      doFilterElement.checked = true;
      fromFilterElement.disabled = false;
      toFilterElement.disabled = false;
      fromFilterElement.value = filterBotsParams.filterFrom;
      toFilterElement.value = filterBotsParams.filterTo;
    } else {
      doFilterElement.checked = false;
      fromFilterElement.disabled = true;
      toFilterElement.disabled = true;
      fromFilterElement.value = null;
      toFilterElement.value = null;
    }
  });

  // Listen to interactions in the filterBotsParams form
  doFilterElement.addEventListener('change', function () {
    if (this.checked) {
      fromFilterElement.disabled = false;
      toFilterElement.disabled = false;
      fromFilterElement.value = filterBotsParams.filterFrom || 1000;
      toFilterElement.value = filterBotsParams.filterTo || 2700;
    } else {
      fromFilterElement.disabled = true;
      toFilterElement.disabled = true;
      fromFilterElement.value = null;
      toFilterElement.value = null;
    }
  });
} 

if(versionElement){
  versionElement.innerHTML = version;
}

if (rotationElement && resultElement && saturationElement && saturationResult) {
  chrome.storage.sync.get('rotation', function (rotation) {
    rotationElement.value = rotation.rotation;
    resultElement.innerHTML = rotation.rotation;
    let rot = parseInt(rotation.rotation);
    rot = !isNaN(rot) ? rot : 0;
    chrome.storage.sync.get('saturation', function (saturation) {
      saturationElement.value = saturation.saturation;
      saturationResult.innerHTML = saturation.saturation;
      let sat = parseInt(saturation.saturation);
      sat = !isNaN(sat) ? sat : 0;
      setColors(rot,sat);
    })
  })

  rotationElement.addEventListener('change', function (event) {
    let rot = event.target.value;
    resultElement.innerHTML = rot;
    let sat = parseInt(saturationElement.value);
    rot = parseInt(rot);
   setColors(rot,sat);
  });

  saturationElement.addEventListener('change', function (event) {
    let sat = event.target.value;
    saturationResult.innerHTML = sat;
    let rot = parseInt(rotationElement.value);
    sat = parseInt(sat);
   setColors(rot,sat);
  });
 
  logoElement.addEventListener('click', function (event) {
    saturationElement.value = 0;
    rotationElement.value = 0;
    saturationResult.innerHTML = '0';
    resultElement.innerHTML = '0';
    setColors(0,0);
  });
}

function setColors(rot,sat){

  let rgbColor1 = {r : 37, g : 55 , b : 77};
  let rgbColor2 = {r : 20, g : 35 , b : 49};
  
  let hslColor1 = RGBToHSL(rgbColor1);
  let hslColor2 = RGBToHSL(rgbColor2);

  hslColor1.h = (hslColor1.h + rot) % 360;
  hslColor2.h = (hslColor2.h + rot) % 360;

  hslColor1.s = (hslColor1.s + sat);
  hslColor2.s = (hslColor2.s + sat);

  let rgb1 = HSLToRGB(hslColor1);
  let rgb2 = HSLToRGB(hslColor2);

  let rgbString1 = `rgb(${rgb1.r},${rgb1.g},${rgb1.b})`;
  let rgbString2 = `rgb(${rgb2.r},${rgb2.g},${rgb2.b})`;

  colorizedZone.style.background = `linear-gradient(${rgbString1},${rgbString2})`;
}

const hideAreasElements = document.querySelectorAll(".hide-areas > input[type=checkbox]");

if (hideAreasElements) {
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
      chrome.storage.sync.set({ hideAreas: targets });
    } else {
      result.hideAreas.forEach((x) => {
        targets.push(x);
      });
    }
    hideAreasElements.forEach((x) => {
      x.checked = targets.includes(x.getAttribute('id'));
    });
  });
}

const hideChallengesElements = document.querySelectorAll(".hide-challenges > input[type=checkbox]");

if (hideChallengesElements) {

  const defaultChallenges = ['1+0', '2+1', '3+0', '3+2'];

  let challenges = [];
  chrome.storage.sync.get('hideChallenges', (result) => {
    if (!result || result.hideChallenges === undefined) {
      defaultChallenges.forEach((x) => {
        challenges.push(x);
      });
      chrome.storage.sync.set({ hideChallenges: challenges });
    } else {
      result.hideChallenges.forEach((x) => {
        challenges.push(x);
      });
    }
    hideChallengesElements.forEach((x) => {
      x.checked = challenges.includes(x.getAttribute('data-target'));
    });
  });
}

document.querySelector('#cancelPopUp').addEventListener('click',() => {
  window.close();
});

const closeElement = document.querySelector("#closePopUp");
if(closeElement){
  closeElement.disabled = false;
  closeElement.addEventListener('click', function () {
    //----------------------
    // saving rotation
    //----------------------
    let rot = rotationElement.value;
    chrome.storage.sync.set({ "rotation": rot });
    //----------------------
    // saving saturation
    //----------------------
    let sat = saturationElement.value;
    chrome.storage.sync.set({ "saturation": sat });
    //----------------------
    // saving areas to hide 
    //----------------------
    hideAreasElements.forEach((el) => {
        let checkedOnes = [];
        hideAreasElements.forEach((x) => {
          if (x.checked) {
            checkedOnes.push(x.getAttribute('id'));
          }
        });
        chrome.storage.sync.set({ 'hideAreas': checkedOnes });
    })
    //--------------------------
    // saving challenges to hide 
    //--------------------------
    hideChallengesElements.forEach((el) => {
        let checkedOnes = [];
        hideChallengesElements.forEach((x) => {
          if (x.checked) {
            checkedOnes.push(x.getAttribute('data-target'));
          }
        });
        chrome.storage.sync.set({ "hideChallenges": checkedOnes });
    });
    //--------------------------
    // saving bots filtering params 
    //--------------------------
      let lichessFilterBots = {
        doFilter : doFilterElement.checked,
        filterFrom : fromFilterElement.value,
        filterTo : toFilterElement.value
      }
      chrome.storage.sync.set({ "mlhpFilterBots": JSON.stringify(lichessFilterBots) });
    //--------------------------
    // saving friends notes
    //--------------------------
    chrome.storage.sync.set({ "lichessFriends": JSON.stringify(lichessFriends) });
    chrome.storage.sync.set({ "friendsPhotos": JSON.stringify(friendsPhotos) });
    //--------------------------
    // closing the window
    //--------------------------

    setTimeout(function () {
      window.close();
    }, 300)

  });
}

