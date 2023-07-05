import * as c from './../actions/ActionTypes';

const reducer = (state = false, action) => {
  switch (action.type) {
    case c.ADD_TICKET:
      const { names, location, issue, id } = action;
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    case c.DELETE_TICKET:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default reducer;

// const reducer = (state = {}, action) => {
//   const { names, location, issue, id } = action;
//   switch (action.type) {
//   case 'ADD_TICKET':
//     return Object.assign({}, state, {
//       [id]: {
//         names: names,
//         location: location,
//         issue: issue,
//         id: id
//       }
//     });
//   case 'DELETE_TICKET':
//     const newState = { ...state };
//     delete newState[id];
//     return newState;
//   default:
//     return state;
//   }
// };

// export default reducer; 