export const addItem = (name) => {
  return { 
    type: 'INCREASE_COUNT',
    item: name
  };
};
