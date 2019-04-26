var skipAmount = {
  SKIP_5: 5,
  SKIP_10: 10,
  SKIP_30: 30
};

(document.body || document.documentElement).addEventListener('transitionend', handleTransitionEvent, true);

function handleTransitionEvent(event) {
  event.stopPropagation();
  if (event.propertyName === 'transform' && event.target.id === 'progress') {
      afterNavigate();
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    afterNavigate();
  }
}

function afterNavigate() {
  console.log(location.pathname);
  if (location.pathname === '/watch') {
    disableNumberKeys();

    let videoContainer = document.getElementsByClassName('html5-video-container')[0];
    let player = document.getElementsByTagName('video')[0];
    let playerControls = document.getElementsByClassName('ytp-left-controls')[0];
    if (videoContainer != null && player != null && playerControls != null) {
      removePlayerControlsDivElement(playerControls);
      addPlayerControlsDivElement(playerControls);
      console.log(videoIsLive());
      if (videoIsLive()) {
        getBlurAndMuteSetting().then((opt) => {
          if (opt) {
            player.className = 'yt-vid';
            setTimeout(() => {
              player.muted = true;
            }, 2000);
            addSpoilerButton(player);
          }
        });
        removeProgressBarPreviewImage();
      } else {
        fillProgressBar();
        removeProgressBarControls();
        addSkipButtons(player);
        addSkipByInput(player);
      }
    }
  }
}

function getBlurAndMuteSetting() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['blurAndMute'], function(result) {
      resolve(result.blurAndMute);
    });
  })
}

function removeProgressBarPreviewImage() {
  let previewBackground = document.getElementsByClassName('ytp-tooltip-bg')[0];
  if (previewBackground !=  null) {
    previewBackground.style['display'] = 'none';
  }
}

function removeProgressBarControls() {
  let progressBarContainer = document.getElementsByClassName('ytp-progress-bar-container')[0];
  if (progressBarContainer != null) {
    progressBarContainer.style['pointer-events'] = 'none';
  }
}

function fillProgressBar() {
  let progressList = document.getElementsByClassName('ytp-progress-list')[0];
  if (progressList != null) {
    progressList.style['background'] = "red";
  }
  let progressBarLoadProgress = document.getElementsByClassName('ytp-load-progress')[0];
  if (progressBarLoadProgress != null) {
    progressBarLoadProgress.style['background'] = "red";
  }
}

function addPlayerControlsDivElement(playerControls) {
  let div = document.createElement('div');
  div.className = 'vod-controls';
  div.id = 'vodControls';
  playerControls.appendChild(div);
}

function removePlayerControlsDivElement(playerControls) {
  let vodControls = document.getElementById('vodControls');
  if (vodControls) {
    playerControls.removeChild(vodControls);
  }
}

function addSkipButtons(player) {
  let div = document.createElement('div');
  let controls = document.getElementById('vodControls');
  div.innerHTML = '<button id="forward-5-button" class="ytp-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-2 -2 28 28" class="test"><defs><path id="a" d="M24 24H0V0h24v24z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.7.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.5.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.6z" clip-path="url(#b)" fill="#fff"/></svg></button><button id="forward-10-button" class="ytp-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-2 -2 28 28"><defs><path id="a" d="M24 24H0V0h24v24z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.8 3H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z" clip-path="url(#b)" fill="#fff"/></svg></button><button id="forward-30-button" class="ytp-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-2 -2 28 28"><defs><path id="a" d="M24 24H0V0h24v24z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path d="M9.6 13.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5zM4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8z" clip-path="url(#b)" fill="#fff" /></svg></button><button id="replay-5-button" class="ytp-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-2 -2 28 28"><defs><path id="a" d="M0 0h24v24H0V0z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.3 8.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.4.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.7z" clip-path="url(#b)" fill="#fff" /></svg></button><button id="replay-10-button" class="ytp-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-2 -2 28 28"><defs><path id="a" d="M0 0h24v24H0V0z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1c.2.1.3.2.5.3s.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z" clip-path="url(#b)" fill="#fff" /></svg></button><button id="replay-30-button" class="ytp-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-2 -2 28 28"><defs><path id="a" d="M0 0h24v24H0V0z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-2.4 8.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5c0-.1-.1-.2-.1-.3s-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z" clip-path="url(#b)" fill="#fff" /></svg></button>';
  controls.appendChild(div);
  addSkipButtonsFunctionality(player);
}

function addSkipByInput(player) {
  let controls = document.getElementById('vodControls');
  let skipBy = document.createElement('input');
  skipBy.className = 'skip-by';
  skipBy.placeholder = '0:00';
  skipBy.onkeydown = (event) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      let minAndSec = skipBy.value.split(':');
      if (minAndSec.length == 1) {
        if (minAndSec[0].includes('-')) {
          let amount = parseInt(minAndSec[0].substr(1));
          skip(player, amount, -1);
        } else {
          let amount = parseInt(minAndSec[0]);
          skip(player, amount, 1);
        }
      } else {
        if (minAndSec[0].includes('-')) {
          let amount = parseInt(minAndSec[0].substr(1))*60 + parseInt(minAndSec[1]);
          skip(player, amount, -1);
        } else {
          let amount = parseInt(minAndSec[0])*60 + parseInt(minAndSec[1]);
          skip(player, amount, 1);
        }
      }
      skipBy.value = '';
    }
  }
  if (controls != null) {
    controls.appendChild(skipBy);
  }
}

function addSpoilerButton(player) {
  let controls = document.getElementById('vodControls');
  let spoilerButton = document.createElement('button');
  spoilerButton.className = 'spoiler-button';
  spoilerButton.innerHTML = 'UN-SPOILER';
  if (controls != null) {
    controls.appendChild(spoilerButton);
  }
  spoilerButton.onclick = (event) => {
    if (player != null) {
      player.style.filter = 'none';
      player.muted = false;
      controls.removeChild(spoilerButton);
    }
  };
}

function addSkipButtonsFunctionality(player) {
  let forward5Button = document.getElementById('forward-5-button');
  forward5Button.onclick = () => { skip(player, skipAmount.SKIP_5, 1) };
  let forward10Button = document.getElementById('forward-10-button');
  forward10Button.onclick = () => { skip(player, skipAmount.SKIP_10, 1) };
  let forward30Button = document.getElementById('forward-30-button');
  forward30Button.onclick = () => { skip(player, skipAmount.SKIP_30, 1) };

  let replay5Button = document.getElementById('replay-5-button');
  replay5Button.onclick = () => { skip(player, skipAmount.SKIP_5, -1) };
  let replay10Button = document.getElementById('replay-10-button');
  replay10Button.onclick = () => { skip(player, skipAmount.SKIP_10, -1) };
  let replay30Button = document.getElementById('replay-30-button');
  replay30Button.onclick = () => { skip(player, skipAmount.SKIP_30, -1) };
}

function skip(player, amount, direction) {
  if (player != null) {
    let currTime = player.currentTime;
    if (direction == 1) {
      player.currentTime = currTime + amount;
    } else if (direction == -1) {
      player.currentTime = currTime - amount;
    }
  }
}

function disableNumberKeys() {
  let keyCodesToDisable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  document.onkeydown = (e) => {
    if (!(document.activeElement.tagName === "INPUT")) {
      if (keyCodesToDisable.includes(e.key)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}

function videoIsLive() {
  return document.getElementsByClassName('ytp-live').length != 0;
}
