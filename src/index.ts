type CharWidthRule = {
  test: RegExp | ((char: string) => boolean)
  width: number
  placeholder?: string
}

type PaddingMap = Record<string, CharWidthRule>

const DefaultPaddingMap: PaddingMap = {
  cjk: {
    test: isCJK,
    width: 2,
  },
}

function isCJK(char: string): boolean {
  const cjkRanges = [
    [0x4e00, 0x9fff],
    [0x3400, 0x4dbf],
    [0x20000, 0x2a6df],
    [0x2a700, 0x2b73f],
    [0x2b740, 0x2b81f],
    [0x2b820, 0x2ceaf],
    [0xf900, 0xfaff],
    [0x2f800, 0x2fa1f],
    [0x3040, 0x309f],
    [0x30a0, 0x30ff],
    [0x31f0, 0x31ff],
    [0xac00, 0xd7a3],
    [0x1100, 0x11ff],
    [0x3130, 0x318f],
    [0xff00, 0xffef],
  ]

  const charCode = char.codePointAt(0)!
  return cjkRanges.some(([start, end]) => charCode >= start && charCode <= end)
}

function getCharWidth(char: string, rules: PaddingMap): number {
  for (const rule of Object.values(rules)) {
    const matched =
      typeof rule.test === 'function' ? rule.test(char) : rule.test.test(char)
    if (matched) {
      return rule.width
    }
  }
  return 1
}

function getStringWidth(str: string, rules: PaddingMap): number {
  let width = 0
  for (const char of str) {
    width += getCharWidth(char, rules)
  }
  return width
}

export function alignText(
  strings: string[],
  paddingMap: PaddingMap = {},
  placeholder: string = ' ',
): string[] {
  const mergedPaddingMap = {...DefaultPaddingMap, ...paddingMap}
  const widths = strings.map(str => getStringWidth(str, mergedPaddingMap))
  const maxWidth = Math.max(...widths)

  return strings.map((str, index) => {
    const diff = maxWidth - widths[index]
    return str + placeholder.repeat(diff)
  })
}
