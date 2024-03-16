'use strict';
// Initialize 
const defaultTargets = [
  'lobby__timeline',
  'lobby__leaderboard',
  'lobby__winners',
  'lobby__wide-winners',
  'lobby__simuls'
];

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
const hideAreasElements = document.querySelectorAll(".hide-areas > input[type=checkbox]");

if (hideAreasElements) {
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
  })
  hideAreasElements.forEach((el) => {
    addEventListener('click', function (event) {
      let checkedOnes = [];
      hideAreasElements.forEach((x) => {
        if (x.checked) {
          checkedOnes.push(x.getAttribute('id'));
        }
      });
      chrome.storage.sync.set({ "hideAreas": checkedOnes });
    });
  })
}