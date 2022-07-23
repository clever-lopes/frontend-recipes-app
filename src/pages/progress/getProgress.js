const KEY_NAME = 'inProgressRecipes';

export const addItem = (item, type, id) => {
  let progress = JSON.parse(localStorage.getItem(KEY_NAME));
  progress = {
    ...progress,
    [type]: { ...progress[type], [id]: [...progress[type][id], item] },
  };
  localStorage.setItem(KEY_NAME, JSON.stringify(progress));
};

export const removeItem = (item, type, id) => {
  const progress = JSON.parse(localStorage.getItem(KEY_NAME));
  const filtered = progress[type][id].filter((ingredient) => ingredient !== item);
  const info = JSON
    .stringify({ ...progress, [type]: { ...progress[type], [id]: filtered } });
  localStorage
    .setItem(KEY_NAME, info);
};

const getProgress = (type, id) => {
  const inProgress = JSON.parse(localStorage.getItem(KEY_NAME));
  if (inProgress[type]) {
    if (inProgress[type][id]) {
      return inProgress[type][id];
    }
    localStorage
      .setItem(KEY_NAME, JSON
        .stringify({ ...inProgress, [type]: { ...inProgress[type], [id]: [] } }));
    return [];
  }
  localStorage
    .setItem(KEY_NAME, JSON
      .stringify({ ...inProgress, [type]: { [id]: [] } }));
  return [];
};

export default getProgress;
