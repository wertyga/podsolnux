import fs from 'fs'
import path from 'path'

import { config } from '../config'

const TEXT = {
  unknownPaperType: 'Неуказана',
}

export const rmDir = (dir, rmSelf) => {
  let files;
  rmSelf = (rmSelf === undefined) ? true : rmSelf;
  dir = dir + "/";
  try { files = fs.readdirSync(dir); } catch (e) { console.log("!Oops, directory not exist."); return; }
  if (files.length > 0) {
    files.forEach(function(x, i) {
      if (fs.statSync(dir + x).isDirectory()) {
        rmDir(dir + x);
      } else {
        fs.unlinkSync(dir + x);
      }
    });
  }
  if (rmSelf) {
    // check if user want to delete the directory ir just the files in this directory
    fs.rmdirSync(dir);
  }
}

export const uploadPath = (jsonString, orderNumber) => {
  const { format, paperType, id: fileId, amount = 1, price, isArchiveFile } = JSON.parse(jsonString)
  const { uploads: { orderPath } } = config
  const date = new Date();
  const datePart = `${date.getDate()}-${date.getMonth() + 1}`
  const formatsAmountPath = path.join(`${format}-${paperType || TEXT.unknownPaperType}`, String(amount))

  return {
    format,
    paperType,
    amount,
    price,
    datePath: datePart,
    formatsAmountPath,
    isArchiveFile,
    fullDirectoryPath: path.join(orderPath, datePart, orderNumber, formatsAmountPath),
    fileId,
    orderPath: path.join(orderPath, datePart, orderNumber),
  }
};