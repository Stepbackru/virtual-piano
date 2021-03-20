const PIANO = document.querySelector('.piano');
const PIANO_KEYS = [...document.querySelectorAll('.piano-key')];
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

  if (item.classList.contains('piano-key')) {
    item.classList.add(`${PIANO_KEY_ACTIVE}`);
    item.classList.add(`${PIANO_PSEUDO_KEY_ACTIVE}`);
    playSound(item);
  }
}

const leaveFromKey = (e) => {
  const item = e.target;

  if (item.classList.contains('piano-key')) {
    item.classList.remove(`${PIANO_KEY_ACTIVE}`);
    item.classList.remove(`${PIANO_PSEUDO_KEY_ACTIVE}`);
  }
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

document.addEventListener('mousedown', pressKeyHandler);
document.addEventListener('mouseup', leaveFromKeyHandler);
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyUnPressed);
