let language = 'eng';

const textArea = document.createElement('textarea');
textArea.className = 'textarea';
document.body.prepend(textArea);
textArea.value = '';

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
textArea.after(keyboard);

const comments = document.createElement('div');
comments.className = 'comments';
keyboard.after(comments);

const keyboardItems = [
  {
    Backquote: '`',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    Backspace: 'Backspace',
  },
  {
    Tab: 'Tab',
    KeyQ: 'q',
    KeyW: 'w',
    KeyE: 'e',
    KeyR: 'r',
    KeyT: 't',
    KeyY: 'y',
    KeyU: 'u',
    KeyI: 'i',
    KeyO: 'o',
    KeyP: 'p',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    Delete: 'Delete',
  },
  {
    CapsLock: 'CapsLk',
    KeyA: 'a',
    KeyS: 's',
    KeyD: 'd',
    KeyF: 'f',
    KeyG: 'g',
    KeyH: 'h',
    KeyJ: 'j',
    KeyK: 'k',
    KeyL: 'l',
    Semicolon: ';',
    Quote: "'",
    Enter: 'Enter',
  },
  {
    ShiftLeft: 'Shift',
    KeyZ: 'z',
    KeyX: 'x',
    KeyC: 'c',
    KeyV: 'v',
    KeyB: 'b',
    KeyN: 'n',
    KeyM: 'm',
    Comma: ',',
    Period: '.',
    Slash: '/',
    ArrowUp: '↑',
    ShiftRight: 'Shift',
  },
  {
    ControlLeft: 'Ctrl',
    AltLeft: 'Alt',
    Space: 'Space',
    AltRight: 'Alt',
    ArrowLeft: '←',
    ArrowDown: '↓',
    ArrowRight: '→',
    ControlRight: 'Ctrl',
  },
];

const createRepeatElems = () => {
  let index = 0;

  while (index < 5) {
    const elem = document.createElement('div');
    elem.classList.add('keyboard-row');
    keyboard.append(elem);

    const rowItemsObjValues = Object.entries(keyboardItems[index]);

    for (let i = 0; i < rowItemsObjValues.length; i += 1) {
      const keyboardItem = document.createElement('div');
      keyboardItem.classList.add('key');
      keyboardItem.setAttribute('data-key-code', `${rowItemsObjValues[i][0]}`);
      keyboardItem.textContent = keyboardItems[index][`${keyboardItem.dataset.keyCode}`];
      elem.append(keyboardItem);
    }

    index += 1;
  }
};

createRepeatElems();

const keyboardKeys = document.querySelectorAll('.key');
const customClick = new Event('click');
const customMouseEnter = new Event('mouseover');
const customMouseLeave = new Event('mouseleave');

keyboardKeys.forEach((key) => {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === key.dataset.keyCode) {
      key.dispatchEvent(customClick);
      key.dispatchEvent(customMouseEnter);
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === key.dataset.keyCode) {
      key.dispatchEvent(customMouseLeave);
    }
  });
});

keyboardKeys.forEach((key) => {
  key.addEventListener('mouseover', (event) => {
    event.target.classList.add('active');
  });

  key.addEventListener('mouseleave', (event) => {
    event.target.classList.remove('active');
  });
});

const addClassforOperationKeys = () => {
  keyboardKeys.forEach((key) => {
    if (key.textContent.length > 1) {
      key.classList.add('operation-key');
    } if (key.textContent.charCodeAt() > 8591 || key.textContent.charCodeAt() < 8596) {
      key.classList.add('operation-key');
    }
  });
};

addClassforOperationKeys();

keyboardKeys.forEach((key) => {
  key.addEventListener('click', (event) => {
    textArea.value += event.target.textContent;
  });
});
