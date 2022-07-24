const createTitle = (title) => {
  const split = title.toLowerCase().split(' ').map((word) => {
    const letterArr = word.split('');
    letterArr[0] = letterArr[0].toUpperCase();
    return letterArr.join('');
  });
  return split.join(' ');
};

export default createTitle;
