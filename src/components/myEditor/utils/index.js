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
 * 字体样式
 */
 const setFont = (val) => {
  document.execCommand('FontName', false, val)
}

/**
 * 字体大小
 */

const setFontWeight = (val) => {
  document.execCommand('FontSize', false, val)
}

/**
 * 字体颜色
 */

const setFontColor = (val)=> {
  document.execCommand('ForeColor', false, val)
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

//data:base64图片格式字符串
//filename：文件名称
const base64toFile = (data, fileName) => {
  const dataArr = data.split(',')
  const byteString = atob(dataArr[1])
  const options = {
    type: 'image/jpeg',
    endings: 'native'
  }
  const u8Arr = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    u8Arr[i] = byteString.charCodeAt(i)
  }
  return new File([u8Arr], fileName + '.jpg', options) //返回文件流
}

//筛选出html字符串中的base64并将其转成文件流
const onContentChange = val => {
  let content = val
  let imgReg = /<img.*?(?:>|\/>)/gi // 匹配图片中的img标签
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
  let arr = content.match(imgReg) // 筛选出所有的img
  let srcArr = []

  if (arr != null) {
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg)
      // 获取图片地址判断是否是base64格式
      if (src[1].indexOf('base64') == -1) {
        continue
      } else {
        srcArr.push(src[1])
      }
    }
  }

  if (srcArr.length != 0) {
    //将base64转化成文件流
    let formData = new FormData()

    srcArr.forEach((item, index) => {
      formData.append('fileList', base64toFile(item, index))
    })
    return {
      formData: formData,
      base64Arr: srcArr,
      imgArr: arr
    }
  } else {
    return {}
  }
}

export {
  setBold,
  setFont,
  setFontWeight,
  setFontColor,
  setItalic,
  setUnderline,
  setUl,
  setOl,
  undo,
  redo,
  setCenter,
  setRight,
  setLeft,
  base64toFile,
  onContentChange
}
