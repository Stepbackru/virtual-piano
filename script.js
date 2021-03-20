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

  if (item.classList.contains('piano-key')) {
    item.classList.add(`${PIANO_KEY_ACTIVE}`);
    item.classList.add(`${PIANO_PSEUDO_KEY_ACTIVE}`);
    playSound(item);
    
    document.addEventListener('mouseover', aboveKeyHandler);
    document.addEventListener('mouseout', leaveFromKey);
  }
}

const leaveFromKeyHandler = (e) => {
  const item = e.target;

  if(e.repeat) return;

  if (item.classList.contains('piano-key')) {
    item.classList.remove(`${PIANO_KEY_ACTIVE}`);
    item.classList.remove(`${PIANO_PSEUDO_KEY_ACTIVE}`);
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

document.addEventListener('mousedown', pressKeyHandler);
document.addEventListener('mouseup', leaveFromKeyHandler);
