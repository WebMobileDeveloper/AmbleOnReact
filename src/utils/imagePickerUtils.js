export const getFileExtention = fileName => {
  if (fileName) {
    const extension = /\w+$/gi.exec(fileName);
    if (extension) {
      return extension[0].toLowerCase();
    }
  }
  return null;
};

export const getFileName = filePath => {
  if (filePath) {
    const fileName = /^\\(.+\\)*(.+)\.(.+)$/gi.exec(filePath) || /[\w-]+\./gi.exec(filePath);
    if (fileName) {
      return fileName[0];
    }
  }
  return null;
};
