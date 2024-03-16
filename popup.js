'use strict';
// Initialize 


let rotationElement = document.getElementById('rotation');
let resultElement = document.getElementById('result');
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
