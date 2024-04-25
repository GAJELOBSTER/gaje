/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const XLSX = require("xlsx");
const en_common = require("../locales/en/common.json");
const en_page = require("../locales/en/page.json");
const ko_common = require("../locales/ko/common.json");
const ko_page = require("../locales/ko/page.json");

const formatJson = (json, prefix = "") => {
  const result = [];
  for (const key in json) {
    const hasChild = typeof json[key] === "object";
    if (hasChild) {
      result.push(...formatJson(json[key], `${prefix}${key}.`));
    } else {
      result.push({ key: `${prefix}${key}`, value: json[key] });
    }
  }
  return result;
};

const getMaxColsWidth = (json) => {
  let objectMaxLength = [];
  for (let i = 0; i < json.length; i++) {
    let value = Object.values(json[i]);
    for (let j = 0; j < value.length; j++) {
      if (typeof value[j] == "number") {
        objectMaxLength[j] = 10;
      } else {
        objectMaxLength[j] = objectMaxLength[j] >= value[j].length ? objectMaxLength[j] : value[j].length;
      }
    }
  }
  return objectMaxLength.map((d) => ({ width: d }));
};

const data = [
  { sheet: "en_common", json: formatJson(en_common) },
  { sheet: "en_page", json: formatJson(en_page) },
  { sheet: "ko_common", json: formatJson(ko_common) },
  { sheet: "ko_page", json: formatJson(ko_page) },
];

let workbook = XLSX.utils.book_new();
data.forEach((d) => {
  const worksheet = XLSX.utils.json_to_sheet(d.json);
  const colsWidthList = getMaxColsWidth(d.json);
  worksheet["!cols"] = colsWidthList;
  XLSX.utils.book_append_sheet(workbook, worksheet, `${d.sheet}`);
});
XLSX.writeFile(workbook, path.join(__dirname, "language.xlsx"));
