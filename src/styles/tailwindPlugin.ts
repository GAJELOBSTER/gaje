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
  "3": { lineHeight: pxToRem(20) },
  "4": { lineHeight: pxToRem(24) },
  "5": { lineHeight: pxToRem(28) },
  "6": { lineHeight: pxToRem(32) },
  "7": { lineHeight: pxToRem(36) },
  "8": { lineHeight: pxToRem(40) },
  "9": { lineHeight: pxToRem(48) },
  "10": { lineHeight: pxToRem(56) },
  "11": { lineHeight: pxToRem(64) },
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
  "10": { fontSize: pxToRem(40) },
  "11": { fontSize: pxToRem(48) },
  "12": { fontSize: pxToRem(52) },
  "13": { fontSize: pxToRem(56) },
};

const typo = {
  h1: apply("font-semibold font-size-6"),
  h2: apply("font-medium font-size-4"),
  title1: apply("font-semibold font-size-3 line-height-3"),
  title2: apply("font-regular font-size-2"),
};

const cn = {
  center: apply("flex items-center justify-center"),
  "modal-header": apply("px-7 py-6 typo-h1 h-12 text-navy-800"),
  "modal-body": apply("px-7 py-5"),
  "modal-footer": apply("p-7 py-6 typo-title1 h-[96px]"),
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
