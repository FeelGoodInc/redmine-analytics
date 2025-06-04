// declension of numbers function
// Example:
// const rub = numd(['рубль', 'рубля', 'рублей'])
// then execute rub with number in code: rub(1200)
// this will return string '1200 рублей'

const pluralize = (words: string[], showCount: boolean) => (number: number) => {
  const _number = Math.abs(number);

  if (Number.isInteger(_number)) {
    const cases = [ 2, 0, 1, 1, 1, 2 ];
    const word = words[(_number % 100 > 4 && _number % 100 < 20) ? 2 : cases[(_number % 10 < 5) ? _number % 10 : 5]];

    return showCount ? `${number} ${word}` : word;
  }

  return showCount ? `${number} ${words[1]}` : words[1];
};

export default function numd(words: string[], showCount = true) {
  return pluralize(words, showCount);
}