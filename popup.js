'use strict';

const colorizedZone = document.getElementById('colorized-zone');
const rotationElement = document.getElementById('rotation');
const resultElement = document.getElementById('result');

if (rotationElement && resultElement) {
  chrome.storage.sync.get('rotation', function (rotation) {
    rotationElement.value = rotation.rotation;
    resultElement.innerHTML = rotation.rotation;
    let rot = parseInt(rotation.rotation);
    rot = !isNaN(rot) ? rot : 0;
    setColors(rot);
  })

  rotationElement.addEventListener('change', function (event) {
    let rot = event.target.value;
    resultElement.innerHTML = rot;
    rot = parseInt(rot);
   // debounce(function () { setColors(rot) }, 5000);
   setColors(rot);
  })
 
}

function debounce(method, delay) {
  clearTimeout(method._tId);
  method._tId= setTimeout(function(){
      method();
  }, delay);
}

function setColors(rot){

  let rgbColor1 = {r : 37, g : 55 , b : 77};
  let rgbColor2 = {r : 20, g : 35 , b : 49};
  
  let hslColor1 = RGBToHSL(rgbColor1);
  let hslColor2 = RGBToHSL(rgbColor2);

  hslColor1.h = (hslColor1.h + rot) % 360;
  hslColor2.h = (hslColor2.h + rot) % 360;

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
    // closing the window
    //--------------------------
    setTimeout(function(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
      window.close();
    },300)
   
  });
}
