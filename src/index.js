const textArea = document.createElement('textarea');
textArea.className = 'textarea';
document.body.prepend(textArea);

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
textArea.after(keyboard);

const comments = document.createElement('div');
comments.className = 'comments';
keyboard.after(comments);

const keyboardItems = {
  Backquote: [],
  Digit1: [],
  Digit2: [],
  Digit3: [],
  Digit4: [],
  Digit5: [],
  Digit6: [],
  Digit7: [],
  Digit8: [],
  Digit9: [],
  Digit0: [],
  Minus: [],
  Equal: [],
  Backspace: [],
  Tab: [],
  KeyQ: [],
  KeyW: [],
  KeyE: [],
  KeyR: [],
  KeyT: [],
  KeyY: [],
  KeyU: [],
  KeyI: [],
  KeyO: [],
  KeyP: [],
  BracketLeft: [],
  BracketRight: [],
  Backslash: [],
  Delete: [],
  CapsLock: [],
  KeyA: [],
  KeyS: [],
  KeyD: [],
  KeyF: [],
  KeyG: [],
  KeyH: [],
  KeyJ: [],
  KeyK: [],
  KeyL: [],
  Semicolon: [],
  Quote: [],
  Enter: [],
  ShiftLeft: [],
  KeyZ: [],
  KeyX: [],
  KeyC: [],
  KeyV: [],
  KeyB: [],
  KeyN: [],
  KeyM: [],
  NumpadDecimal: [],
  Period: [],
  Slash: [],
  ArrowUp: [],
  ShiftRight: [],
  ControlLeft: [],
  AltLeft: [],
  Space: [],
  AltRight: [],
  ArrowLeft: [],
  ArrowDown: [],
  ArrowRight: [],
  ControlRight: [],

};
