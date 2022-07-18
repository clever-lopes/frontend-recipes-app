function formatName(str) {
  const RANGE = 3;
  const strFormat = str.split('');
  if (strFormat.slice(0, RANGE).join('').includes('str')) {
    return strFormat.slice(RANGE).join('');
  }
  return strFormat.join('');
}

function formatCategory(categoryList) {
  if (categoryList === null) return [];
  return categoryList.map((category) => (
    Object.entries(category).reduce((acc, item) => {
      const [name, value] = item;
      acc[formatName(name)] = value;
      return acc;
    }, {})
  ));
}

export default formatCategory;
