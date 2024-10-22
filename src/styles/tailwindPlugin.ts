const pxToRem = (px: number) => {
  return `${px / 16}rem`;
};

// tailwind @apply 사용하는 문법으로 변환하는 util 함수
const apply = (className: string, styles?: object) => {
  return { [`@apply ${className}`]: {}, ...styles };
};

const addPrefix = (data: any, prefix: string) => {
  for (const property in data) {
    delete Object.assign(data, { [`.${prefix}-${property}`]: data[property] })[property];
  }
};

const lineHeight = {
  "1": { lineHeight: pxToRem(14) },
  "2": { lineHeight: pxToRem(16) },
  "3": { lineHeight: pxToRem(18) },
  "4": { lineHeight: pxToRem(20) },
  "5": { lineHeight: pxToRem(22) },
  "6": { lineHeight: pxToRem(24) },
  "7": { lineHeight: pxToRem(26) },
  "8": { lineHeight: pxToRem(28) },
  "9": { lineHeight: pxToRem(32) },
  "10": { lineHeight: pxToRem(36) },
  "11": { lineHeight: pxToRem(40) },
  "12": { lineHeight: pxToRem(48) },
  "13": { lineHeight: pxToRem(52) },
  "14": { lineHeight: pxToRem(56) },
  "15": { lineHeight: pxToRem(64) },
  "16": { lineHeight: pxToRem(72) },
};

const fontSize = {
  "1": { fontSize: pxToRem(10) },
  "2": { fontSize: pxToRem(12) },
  "3": { fontSize: pxToRem(14) },
  "4": { fontSize: pxToRem(16) },
  "5": { fontSize: pxToRem(18) },
  "6": { fontSize: pxToRem(20) },
  "7": { fontSize: pxToRem(24) },
  "8": { fontSize: pxToRem(28) },
  "9": { fontSize: pxToRem(32) },
  "10": { fontSize: pxToRem(36) },
  "11": { fontSize: pxToRem(40) },
  "12": { fontSize: pxToRem(48) },
  "13": { fontSize: pxToRem(52) },
  "14": { fontSize: pxToRem(56) },
};

const typo = {
  "title1-sb": apply("font-semibold line-height-4 font-size-6"),
  "title2-sb": apply("font-semibold line-height-4 font-size-5"),
  "title2-m": apply("font-medium line-height-4 font-size-5"),
  "body1-sb": apply("font-semibold line-height-4 font-size-4"),
  "body1-m": apply("font-medium line-height-4 font-size-4"),
  "body2-sb": apply("font-semibold line-height-3 font-size-3"),
  "body2-m": apply("font-medium line-height-3 font-size-3"),
  "body2-r": apply("font-regular line-height-3 font-size-3"),
  "body3-sb": apply("font-semibold line-height-2 font-size-2"),
  "body3-m": apply("font-medium line-height-2 font-size-2"),
  "body3-r": apply("font-regular line-height-2 font-size-2"),
  "detail-sb": apply("font-semibold line-height-2 font-size-1"),
  "detail-m": apply("font-medium line-height-2 font-size-1"),

  "display-1": apply("font-size-14 line-height-16"),
  "display-2": apply("font-size-11 line-height-13"),
  "title-1": apply("font-size-10 line-height-12"),
  "title-2": apply("font-size-8 line-height-11"),
  "title-3": apply("font-size-7 line-height-9"),
  "heading-1": apply("font-size-6 line-height-8"),
  "heading-2": apply("font-size-5 line-height-7"),
  "body-1-normal": apply("font-size-4 line-height-6"),
  "body-1-reading": apply("font-size-4 line-height-7"),
  "body-2-normal": apply("font-size-3 line-height-4"),
  "body-2-reading": apply("font-size-3 line-height-5"),
  "caption-1": apply("font-size-2 line-height-2"),
  "caption-2": apply("font-size-1 line-height-1"),
};

const cn = {
  center: apply("flex items-center justify-center"),
  between: apply("flex items-center justify-between"),
  "modal-header": apply("px-7 py-6 typo-title1-sb h-12"),
  "modal-body": apply("px-7 py-5 break-words"),
  "modal-footer": apply("p-7 typo-body2-m h-[96px]"),
};

addPrefix(typo, "typo");
addPrefix(cn, "cn");
addPrefix(lineHeight, "line-height");
addPrefix(fontSize, "font-size");

const customComponents = {
  ...typo,
  ...cn,
  ...lineHeight,
  ...fontSize,
};

export { customComponents };
