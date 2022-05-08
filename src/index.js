let capsLockCondition = false;
let shiftPressCondition = false;
let capsAndShiftcondition = false;
let language = 'english';

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

const english = ['`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./', '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM,./',
  '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?', '~!@#$%^&*()_+qwertyuiop{}|asdfghjkl:"zxcvbnm<>?'];

const russian = ['ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.', 'Ё1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.',
  'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,', 'ё!"№;%:?*()_+йцукенгшщзхъ/фывапролджэячсмитьбю,'];

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
      if (keyboardItems[index][`${keyboardItem.dataset.keyCode}`].length > 1
      || keyboardItems[index][`${keyboardItem.dataset.keyCode}`].charCodeAt() > 1000) {
        keyboardItem.textContent = keyboardItems[index][`${keyboardItem.dataset.keyCode}`];
      }

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
const customMouseDown = new Event('mousedown');
const customMouseUp = new Event('mouseup');
const customKeyDown = new Event('keydown', { keyCode: '50' });
const customKeyUp = new Event('keyup', { keyCode: '50' });

const addClassforDiffrentKeys = () => {
  keyboardKeys.forEach((key) => {
    if (key.textContent.length > 1 || key.textContent.charCodeAt() > 1000) {
      key.classList.add('operation-key');
    } else {
      key.classList.add('content-key');
    }
  });
};

addClassforDiffrentKeys();

const operationKeys = document.querySelectorAll('.operation-key');
const contentKeys = document.querySelectorAll('.content-key');

const [backspace, tab, dlt, capsLock, enter, shiftLeft, arrowUp, shiftRight, controlLeft, altLeft, 
  space, altRight, arrowLeft, arrowDown, arrowRight, controlRight] = operationKeys;

keyboardKeys.forEach((key) => {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === key.dataset.keyCode) {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        key.dispatchEvent(customMouseDown);
        document.dispatchEvent(customKeyDown);
        document.dispatchEvent(customKeyUp);
      } else {
        key.dispatchEvent(customClick);
        key.dispatchEvent(customMouseEnter);
      }
    }
});
});

keyboardKeys.forEach((key) => {
  document.addEventListener('keyup', (event) => {
    if (event.code === key.dataset.keyCode) {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        key.dispatchEvent(customMouseUp);
      } else {
      key.dispatchEvent(customMouseLeave);
    }
  }
})
})


keyboardKeys.forEach((key) => {
  key.addEventListener('mouseover', (event) => {
    event.target.classList.add('active');
  });

  key.addEventListener('mouseleave', (event) => {
    event.target.classList.remove('active');
  });
});


const createLangLayout = (lang, arr) => {
  for (let i = 0; i < contentKeys.length; i += 1) {
    const languageNode = document.createElement('span');
    languageNode.classList.add(`${lang}`);
    if (lang === 'russian') {
      languageNode.classList.add('hidden')
    }
    contentKeys[i].append(languageNode);

    const normalLayout = document.createElement('span');
    normalLayout.classList.add('normal');
    normalLayout.textContent = `${arr[0][i]}`;
    languageNode.append(normalLayout);

    const capsLockLayout = document.createElement('span');
    capsLockLayout.classList.add('capslock-press');
    capsLockLayout.classList.add('hidden');
    capsLockLayout.textContent = `${arr[1][i]}`;
    languageNode.append(capsLockLayout);

    const shiftLayout = document.createElement('span');
    shiftLayout.classList.add('shift-press');
    shiftLayout.classList.add('hidden');
    shiftLayout.textContent = `${arr[2][i]}`;
    languageNode.append(shiftLayout);

    const capsLockAndShiftLayout = document.createElement('span');
    capsLockAndShiftLayout.classList.add('caps-shift-press');
    capsLockAndShiftLayout.classList.add('hidden');
    capsLockAndShiftLayout.textContent = `${arr[3][i]}`;
    languageNode.append(capsLockAndShiftLayout);
  }
};


createLangLayout('english', english);
createLangLayout('russian', russian);

const englishKeys = document.querySelectorAll('.english');
const russianKeys = document.querySelectorAll('.russian');
const defaultKeys = document.querySelectorAll('.normal');
const capsLockPressKeys = document.querySelectorAll('.capslock-press');
const shiftPressKeys = document.querySelectorAll('.shift-press');
const capsAndShiftPressKeys = document.querySelectorAll('.caps-shift-press');

const shiftKeys = [shiftLeft, shiftRight];

const addHiddenClass = (add) => {
  add.forEach((key) => {
    key.classList.toggle('hidden');
  });
};

const removeHiddenClass = (remove) => {
  remove.forEach((key) => {
    key.classList.toggle('hidden');
  });
};



document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.code === 'AltLeft' || event.code === 'AltRight')) {
    if (language === 'english') {
      language = 'russian';
      addHiddenClass(englishKeys);
      removeHiddenClass(russianKeys);
      return language;
    } if (language === 'russian') {
      language = 'english';
      addHiddenClass(russianKeys);
      removeHiddenClass(englishKeys);
      return language;
    }
  }
  return language;
});


capsLock.addEventListener('click', (event) => {
  if (capsLockCondition === false) {
    addHiddenClass(defaultKeys);
    removeHiddenClass(capsLockPressKeys);
    event.target.classList.add('pressed');
    capsLockCondition = true;
    return capsLockCondition;
  } if (capsLockCondition === true) {
    addHiddenClass(capsLockPressKeys);
    removeHiddenClass(defaultKeys);
    event.target.classList.remove('pressed');
    capsLockCondition = false;
    return capsLockCondition;
}
  return capsLockCondition;
});

shiftKeys.forEach((key) => {
  key.addEventListener('mousedown', () => {
    if (!capsLock.classList.contains('pressed')) {
      addHiddenClass(defaultKeys);
      removeHiddenClass(shiftPressKeys);
    } if (capsLock.classList.contains('pressed')) {
      addHiddenClass(capsLockPressKeys);
      removeHiddenClass(capsAndShiftPressKeys);
    }
  });
});


shiftKeys.forEach((key) => {
  key.addEventListener('mouseup', () => {
    if (!capsLock.classList.contains('pressed')) {
      addHiddenClass(shiftPressKeys);
      removeHiddenClass(defaultKeys);
    } if (capsLock.classList.contains('pressed')) {
      addHiddenClass(capsAndShiftPressKeys);
      removeHiddenClass(capsLockPressKeys);
    }
  });
});
;

contentKeys.forEach((key) => {
  key.addEventListener('click', (event) => {
    textArea.setRangeText(event.target.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
  });
});

space.addEventListener('click', () => {
  textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
});

backspace.addEventListener('click', () => {
  textArea.value = textArea.value.slice(0, textArea.value.length - 1);
});




