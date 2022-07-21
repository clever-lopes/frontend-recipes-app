const createTitle = (title) => {
  const split = title.toLowerCase().split('');
  split[0] = split[0].toUpperCase();
  return split;
};

export default createTitle;
