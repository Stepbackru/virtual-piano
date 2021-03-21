const PIANO = document.querySelector('.piano');
const PIANO_KEYS = [...document.querySelectorAll('.piano-key')];
const FULLSCREEN_BUTTON = document.querySelector('.openfullscreen');
const PIANO_KEY_ACTIVE = 'piano-key-active';
const PIANO_PSEUDO_KEY_ACTIVE = 'piano-key-active-pseudo';

const playSound = (e) => {
  const audio = new Audio(`./assets/audio/${e.dataset.note}.mp3`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

const pressKeyHandler = (e) => {
  const item = e.target;

  if(e.repeat) return;

  if (item) {
    classAndMusicToggle(item, 'add');
  } else if (e) {
    classAndMusicToggle(e, 'add');
  }
  document.addEventListener('mouseover', aboveKeyHandler);
  document.addEventListener('mouseout', leaveFromKey);
}

const leaveFromKeyHandler = (e) => {
  const item = e.target;

  if(e.repeat) return;

  if (item) {
    classAndMusicToggle(item, 'remove');
  } else if (e) {
    classAndMusicToggle(e, 'remove');
  }
  
  document.removeEventListener('mouseover', aboveKeyHandler);
  document.removeEventListener('mouseout', leaveFromKey);
}

const aboveKeyHandler = (e) => {
  const item = e.target;
  classAndMusicToggle(item, 'add');
}

const leaveFromKey = (e) => {
  const item = e.target;
  classAndMusicToggle(item, 'remove');
}

const keyPressed = (e) => {
  if(e.repeat) return;

  const pianoKey = PIANO_KEYS
    .find((el) => el.dataset.letter === e.code.replace(/Key/g, ''));
  
  if (pianoKey) {
    pressKeyHandler(pianoKey);
  }
}

const classAndMusicToggle = (elem, act) => {
  if (elem) {
    if (elem.classList.contains('piano-key')) {
      if (act === 'add') {
        elem.classList.add(`${PIANO_KEY_ACTIVE}`);
        elem.classList.add(`${PIANO_PSEUDO_KEY_ACTIVE}`);
        playSound(elem);
      } else if (act === 'remove') {
        elem.classList.remove(`${PIANO_KEY_ACTIVE}`);
        elem.classList.remove(`${PIANO_PSEUDO_KEY_ACTIVE}`);
      }
    }
  }
}

const keyUnPressed = (e) => {
  if(e.repeat) return;

  const pianoKey = PIANO_KEYS
    .find((el) => el.dataset.letter === e.code.replace(/Key/g, ''));
  
  if (pianoKey) {
    leaveFromKeyHandler(pianoKey);
  }
}

const activateFullScreen = () => {
  if(document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
  }
  else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
  }
  else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
  }
  else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
  }
};

const deactivateFullScreen = () => {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  }
};

document.addEventListener('mousedown', pressKeyHandler);
document.addEventListener('mouseup', leaveFromKeyHandler);
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyUnPressed);
FULLSCREEN_BUTTON.addEventListener('click', () => {
  document.fullscreenElement ? deactivateFullScreen(): activateFullScreen();
})
