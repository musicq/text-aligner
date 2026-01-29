import {describe, it, expect} from 'vitest'
import {alignText} from '../src'

function printAligned(label: string, result: string[]) {
  console.log(`\n=== ${label} ===`)
  result.forEach((line, i) => {
    console.log(`${i + 1}. |${line}|`)
  })
}

describe('alignText', () => {
  it('should align mixed Chinese and English text', () => {
    const input = ['Hello 你好', 'Hi 早上好', 'Good morning 晚安']
    const result = alignText(input)
    printAligned('Mixed Chinese and English', result)

    expect(result).toEqual([
      'Hello 你好       ',
      'Hi 早上好        ',
      'Good morning 晚安',
    ])
  })

  it('should handle empty strings', () => {
    const input = ['', 'Hello', '世界']
    const result = alignText(input)
    printAligned('Empty strings', result)

    expect(result).toEqual(['     ', 'Hello', '世界 '])
  })

  it('should handle pure English text', () => {
    const input = ['Hello', 'Hi', 'Hello World']
    const result = alignText(input)
    printAligned('Pure English', result)

    expect(result).toEqual(['Hello      ', 'Hi         ', 'Hello World'])
  })

  it('should handle pure Chinese text', () => {
    const input = ['世界', '你好', '世界你好']
    const result = alignText(input)
    printAligned('Pure Chinese', result)

    expect(result).toEqual(['世界    ', '你好    ', '世界你好'])
  })

  it('should handle Japanese text', () => {
    const input = ['こんにちは', 'ありがとう', 'さようなら世界']
    const result = alignText(input)
    printAligned('Japanese', result)

    expect(result).toEqual([
      'こんにちは    ',
      'ありがとう    ',
      'さようなら世界',
    ])
  })

  it('should handle Korean text', () => {
    const input = ['안녕하세요', '감사합니다', '안녕히 가세요']
    const result = alignText(input)
    printAligned('Korean', result)

    expect(result).toEqual([
      '안녕하세요   ',
      '감사합니다   ',
      '안녕히 가세요',
    ])
  })

  it('should handle mixed language text', () => {
    const input = ['Hello 世界', 'こんにちは', '안녕하세요 World']
    const result = alignText(input)
    printAligned('Mixed languages', result)

    expect(result).toEqual([
      'Hello 世界      ',
      'こんにちは      ',
      '안녕하세요 World',
    ])
  })

  it('should align table-like data', () => {
    const input = ['名前: 田中', 'Name: John', '이름: 김철수']
    const result = alignText(input)
    printAligned('Table-like data', result)

    expect(result).toEqual([
      '名前: 田中  ',
      'Name: John  ',
      '이름: 김철수',
    ])
  })

  it('should support custom paddingMap', () => {
    const input = ['ABC', 'ABCD', 'AB']
    const customPaddingMap = {
      uppercase: {
        test: /^[A-Z]$/,
        width: 2,
      },
    }
    const result = alignText(input, customPaddingMap)
    printAligned('Custom paddingMap (uppercase width=2)', result)

    expect(result).toEqual(['ABC  ', 'ABCD', 'AB    '])
  })

  it('should support custom placeholder', () => {
    const input = ['Hello', 'Hi', 'Hey']
    const result = alignText(input, {}, '-')
    printAligned('Custom placeholder', result)

    expect(result).toEqual(['Hello', 'Hi---', 'Hey--'])
  })

  it('should support custom paddingMap with function test', () => {
    const input = ['a1b2', 'abc', '123']
    const customPaddingMap = {
      digit: {
        test: (char: string) => /\d/.test(char),
        width: 2,
      },
    }
    const result = alignText(input, customPaddingMap)
    printAligned('Custom paddingMap with function test', result)

    expect(result).toEqual(['a1b2', 'abc   ', '123'])
  })
})
