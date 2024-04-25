/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const formatXlsx = (xlsx) => {
  const result = {};

  xlsx.forEach((item) => {
    const keys = item.key.split(".");
    let currentObj = result;

    keys.forEach((key, index) => {
      if (!currentObj[key]) currentObj[key] = {};
      if (index === keys.length - 1) currentObj[key] = item.value;

      currentObj = currentObj[key];
    });
  });
  return result;
};

const workbook = XLSX.readFile(__dirname + "/language.xlsx");
workbook.SheetNames.forEach((sheet) => {
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  const [locale, fileName] = sheet.split("_");
  const folderPath = path.join(__dirname, `../locales/${locale}`);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

  fs.writeFile(path.join(folderPath, `/${fileName}.json`), JSON.stringify(formatXlsx(data), null, 2), function (err) {
    if (err) console.log("Error: ", err);
  });
});
