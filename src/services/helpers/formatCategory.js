function formatName(str) {
  return str.split('str').filter((item) => item !== 'str').join('');
}

function formatCategory(categoryList) {
  return categoryList.map((category) => (
    Object.entries(category).reduce((acc, item) => {
      const [name, value] = item;
      acc[formatName(name)] = value;
      return acc;
    }, {})
  ));
}

export default formatCategory;
