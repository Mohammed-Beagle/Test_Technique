// Store/Reducers/favoriteReducer.js

const initialState = {
  favoritesContact: [],
};

function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteContactIndex = state.favoritesContact.findIndex(
        (item) => item.id === action.value.id
      );
      if (favoriteContactIndex != -1) {
        // the contact is already in favorites, we delete it from the list
        nextState = {
          ...state,
          favoritesContact: state.favoritesContact.filter(
            (item, index) => index !== favoriteContactIndex
          ),
        };
      } else {
        // the contact is not in the list, so we add it
        nextState = {
          ...state,
          favoritesContact: [...state.favoritesContact, action.value],
        };
      }
      return nextState || state;
    default:
      return state;
  }
}

export default toggleFavorite;
