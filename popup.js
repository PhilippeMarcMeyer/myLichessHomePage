'use strict';

const rotationElement = document.getElementById('rotation');
const resultElement = document.getElementById('result');
if (rotationElement && resultElement) {
  chrome.storage.sync.get('rotation', function (rotation) {
    rotationElement.value = rotation.rotation;
    resultElement.innerHTML = rotation.rotation;
  })
  rotationElement.addEventListener('change', function (event) {
    let rot = event.target.value;
    resultElement.innerHTML = rot;
    chrome.storage.sync.set({ "rotation": rot });
  })
}

const closeElement = document.querySelector("#closePopUp");
if(closeElement){
  closeElement.disabled = false;
  closeElement.addEventListener('click', function () {
    window.close();
  });
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

  hideAreasElements.forEach((el) => {
    addEventListener('change', function (event) {
      closeElement.disabled = true;
      let checkedOnes = [];
      hideAreasElements.forEach((x) => {
        if (x.checked) {
          checkedOnes.push(x.getAttribute('id'));
        }
      });
      chrome.storage.sync.set({ 'hideAreas': checkedOnes });
      closeElement.disabled = false;
    });
  })
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

  hideChallengesElements.forEach((el) => {
    addEventListener('change', function (event) {
      closeElement.disabled = true;
      let checkedOnes = [];
      hideChallengesElements.forEach((x) => {
        if (x.checked) {
          checkedOnes.push(x.getAttribute('data-target'));
        }
      });
      chrome.storage.sync.set({ "hideChallenges": checkedOnes });
      closeElement.disabled = false;
    });
  })
}

