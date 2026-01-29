# text-align

A utility for aligning mixed English and CJK (Chinese, Japanese, Korean) text by
adding appropriate padding spaces based on character display width.

## Features

- Supports mixed English and CJK text alignment
- Handles various CJK character ranges including:
  - Chinese (Hanzi)
  - Japanese (Hiragana, Katakana)
  - Korean (Hangul)
  - Full-width characters
- Customizable character width rules
- Customizable placeholder character
- Zero dependencies
- TypeScript support

## Installation

```bash
npm install text-aligner
```

## Usage

```ts
import {alignText} from 'text-aligner'

const strings = ['Hello 你好', 'Hi 早上好', 'Good morning 晚安']

const aligned = alignText(strings)
console.log(aligned)
// [
//   'Hello 你好       ',
//   'Hi 早上好        ',
//   'Good morning 晚安',
// ]
```

## API

### alignText

```ts
function alignText(
  strings: string[],
  paddingMap?: PaddingMap,
  placeholder?: string
): string[]

type CharWidthRule = {
  test: RegExp | ((char: string) => boolean)
  width: number
}

type PaddingMap = Record<string, CharWidthRule>
```

Aligns an array of strings by adding padding spaces to make all strings have the same display width.

#### Parameters

- `strings`: Array of strings to be aligned
- `paddingMap` (optional): Custom character width rules. Will be merged with the default CJK rule (width: 2)
- `placeholder` (optional): Character used for padding. Default: `' '` (U+0020 space)

#### Returns

An array of aligned strings with appropriate padding added.

### Examples

#### Basic usage

```ts
alignText(['Hello', 'Hi', 'Hey'])
// ['Hello', 'Hi   ', 'Hey  ']
```

#### Mixed CJK and English

```ts
alignText(['名前: 田中', 'Name: John', '이름: 김철수'])
// [
//   '名前: 田中  ',
//   'Name: John  ',
//   '이름: 김철수',
// ]
```

#### Custom paddingMap

```ts
// Add custom rule while keeping default CJK rule
alignText(['ABC', 'AB', 'A'], {
  uppercase: {
    test: /^[A-Z]$/,
    width: 2,
  },
})
// ['ABC   ', 'AB    ', 'A     ']
```

#### Custom placeholder

```ts
alignText(['Hello', 'Hi'], {}, '-')
// ['Hello', 'Hi---']
```

#### Override default CJK rule

```ts
alignText(['你好', '世界'], {
  cjk: {
    test: (char) => /\p{Script=Han}/u.test(char),
    width: 3,
  },
})
```

## License

MIT
