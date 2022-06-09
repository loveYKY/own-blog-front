/**
 * 字体加粗
 */
const setBold = () => {
  document.execCommand('bold')
}

/**
 * 字体倾斜
 */

const setItalic = () => {
  document.execCommand('italic')
}

/**
 * 下划线
 */
const setUnderline = () => {
  document.execCommand('Underline')
}

const setUl = () => {
  document.execCommand('insertUnorderedList')
}
const setOl = () => {
  document.execCommand('insertOrderedList')
}
const undo = () => {
  document.execCommand('undo')
}
const redo = () => {
  document.execCommand('redo')
}

const setCenter = () => {
  document.execCommand('JustifyCenter')
}
const setRight = () => {
  document.execCommand('JustifyRight')
}
const setLeft = () => {
  document.execCommand('JustifyLeft')
}

export {
  setBold,
  setItalic,
  setUnderline,
  setUl,
  setOl,
  undo,
  redo,
  setCenter,
  setRight,
  setLeft
}
