export default function shoppingListItemReducer(state = {
  items: []
}, action) {
  console.log(action)
  switch(action.type) {

    case 'INCREASE_COUNT':
      console.log(state.items.concat(state.items.length));
      return Object.assign({}, {
        items: state.items.concat(state.items.length)
      });
    
    case 'OTHER_ACTION':
      console.log("other action")
      return null

    default:
      console.log(state)
      return state;
  }
};
