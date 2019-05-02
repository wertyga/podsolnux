const images = ['jpg', 'jpeg', 'ttf', 'png', 'bmp', 'gif', 'jpe', 'tiff'];
// const archives = ['rar', 'zip'];
const imageMaxSize = 10 ** 9 / 3 // 300 MB;


const TEXT = {
  wrongExt: (fileName) => `Недопустимое расширение для файла: ${fileName}`,
  maxSize: (fileName) => `Недопустимый размер для файла: ${fileName}`,
}

export function checkFileType(file) {
  const { type, size, name } = file
  const [fileType, ext] = type.split('/')
  const errors = []

  const isAvailableExt = images.find(item => new RegExp(item).test(ext))
  if (!isAvailableExt || !fileType || fileType !== 'image') errors.push(TEXT.wrongExt(name))

  if (size > imageMaxSize) errors.push(TEXT.maxSize(name))

  return errors;
}