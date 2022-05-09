let capsLockCondition = false;
let language = 'english';
const itemsInTextareaString = 68;

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
comments.innerHTML = '<p>Клавиатура создана в операционной системе Windows</p><p>Комбинация для переключения языка Ctrl + Alt</p>';

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
    Delete: 'Del',
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

const [backspace, tab, dlt, capsLock, enter, shiftLeft, arrowUp, shiftRight, , ,
  space, , arrowLeft, arrowDown, arrowRight] = operationKeys;

keyboardKeys.forEach((key) => {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === key.dataset.keyCode) {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        key.dispatchEvent(customMouseDown);
        document.dispatchEvent(customKeyDown);
        document.dispatchEvent(customKeyUp);
        key.dispatchEvent(customMouseEnter);
      } else {
        key.dispatchEvent(customMouseEnter);
        key.dispatchEvent(customMouseDown);
        key.dispatchEvent(customClick);
      }
    }
  });
});

keyboardKeys.forEach((key) => {
  document.addEventListener('keyup', (event) => {
    if (event.code === key.dataset.keyCode) {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        key.dispatchEvent(customMouseUp);
        key.dispatchEvent(customMouseLeave);
      } else {
        key.dispatchEvent(customMouseLeave);
        key.dispatchEvent(customMouseUp);
      }
    }
  });
});

keyboardKeys.forEach((key) => {
  key.addEventListener('mouseover', (event) => {
    event.currentTarget.classList.add('active');
  });

  key.addEventListener('mouseleave', (event) => {
    event.currentTarget.classList.remove('active');
  });
});

const createLangLayout = (lang, arr) => {
  for (let i = 0; i < contentKeys.length; i += 1) {
    const languageNode = document.createElement('span');
    languageNode.classList.add(`${lang}`);
    if (lang === 'russian') {
      languageNode.classList.add('hidden');
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
    key.classList.add('hidden');
  });
};

const removeHiddenClass = (remove) => {
  remove.forEach((key) => {
    key.classList.remove('hidden');
  });
};

capsLock.addEventListener('click', (event) => {
  if (capsLockCondition === false) {
    addHiddenClass(defaultKeys);
    removeHiddenClass(capsLockPressKeys);
    event.target.classList.add('pressed');
    event.target.classList.add('clicked');
    capsLockCondition = true;
    return capsLockCondition;
  } if (capsLockCondition === true) {
    addHiddenClass(capsLockPressKeys);
    removeHiddenClass(defaultKeys);
    event.target.classList.remove('pressed');
    event.target.classList.remove('clicked');
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

contentKeys.forEach((key) => {
  key.addEventListener('click', (event) => {
    if (textArea.selectionStart === textArea.selectionEnd) {
      textArea.setRangeText(event.target.innerText, textArea.selectionStart, textArea.selectionEnd, 'start');
      textArea.selectionStart += 1;
      textArea.selectionStart = textArea.selectionEnd;
      textArea.focus();
    }
  });
});

space.addEventListener('click', () => {
  if (textArea.selectionStart === textArea.selectionEnd) {
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.selectionStart += 1;
    textArea.selectionStart = textArea.selectionEnd;
    textArea.focus();
  }
});

backspace.addEventListener('click', () => {
  let position;
  if (textArea.selectionStart === textArea.selectionEnd) {
    if (textArea.selectionStart > 1) {
      position = textArea.selectionStart - 1 || textArea.value.length;
      textArea.value = textArea.value.slice(0, textArea.selectionStart - 1)
  + textArea.value.slice(textArea.selectionStart, textArea.value.length);
    } if (textArea.selectionStart === 1) {
      textArea.value = textArea.value.slice(1, textArea.value.length);
      position = 0;
    }
  } if (textArea.selectionStart !== textArea.selectionEnd) {
    position = textArea.selectionStart;
    textArea.value = textArea.value.slice(0, textArea.selectionStart)
     + textArea.value.slice(textArea.selectionEnd, textArea.value.length);
  }

  textArea.selectionStart = position;
  textArea.selectionEnd = position;
  textArea.focus();
});

tab.addEventListener('click', () => {
  textArea.setRangeText('\t', textArea.selectionStart, textArea.selectionEnd, 'end');
  textArea.selectionStart += '\t';
  textArea.selectionStart = textArea.selectionEnd;
  textArea.focus();
});

textArea.focus();

enter.addEventListener('click', () => {
  textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, 'end');
  textArea.selectionStart += '\n';
  textArea.selectionStart = textArea.selectionEnd;
  textArea.focus();
});

dlt.addEventListener('click', () => {
  const position = textArea.selectionStart;
  textArea.value = textArea.value.slice(0, textArea.selectionStart)
  + textArea.value.slice(textArea.selectionStart + 1, textArea.value.length);
  textArea.selectionStart = position;
  textArea.selectionEnd = position;
  textArea.focus();
});

arrowRight.addEventListener('click', () => {
  textArea.selectionStart += 1;
  textArea.selectionEnd = textArea.selectionStart;
  textArea.focus();
});

arrowLeft.addEventListener('click', () => {
  if (textArea.selectionEnd > 0) {
    textArea.selectionEnd -= 1;
    textArea.selectionStart = textArea.selectionEnd;
  } if (textArea.selectionEnd === 0) {
    textArea.selectionEnd = 0;
    textArea.selectionStart = textArea.selectionEnd;
  }
  textArea.focus();
});

arrowUp.addEventListener('click', () => {
  if (textArea.value.length > itemsInTextareaString) {
    textArea.selectionEnd -= itemsInTextareaString;
    textArea.selectionStart = textArea.selectionEnd;
  }
  textArea.focus();
});

arrowDown.addEventListener('click', () => {
  if (textArea.value.length - textArea.selectionStart >= itemsInTextareaString) {
    textArea.selectionStart += itemsInTextareaString;
    textArea.selectionStart = textArea.selectionEnd;
    textArea.focus();
  }
});

const setLocalStorage = () => {
  localStorage.setItem('language', language);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem('language') === 'english') {
    addHiddenClass(russianKeys);
    removeHiddenClass(englishKeys);
    language = 'english';
  }
  if (localStorage.getItem('language') === 'russian') {
    addHiddenClass(englishKeys);
    removeHiddenClass(russianKeys);
    language = 'russian';
  }
  return language;
};

window.addEventListener('load', getLocalStorage);

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.code === 'AltLeft' || event.code === 'AltRight')) {
    if (language === 'english') {
      addHiddenClass(englishKeys);
      removeHiddenClass(russianKeys);
      language = 'russian';
      return language;
    } if (language === 'russian') {
      addHiddenClass(russianKeys);
      removeHiddenClass(englishKeys);
      language = 'english';
      return language;
    }
  }
  return language;
});

keyboardKeys.forEach((key) => {
  key.addEventListener('mousedown', (event) => {
    event.currentTarget.classList.add('clicked');
  });
});

keyboardKeys.forEach((key) => {
  key.addEventListener('mouseup', (event) => {
    event.currentTarget.classList.remove('clicked');
  });
});
