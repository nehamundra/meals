import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE, SET_FILTERS } from "../actions/meals";
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavArray = [...state.favoriteMeals];
        updatedFavArray.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavArray,
        };
      } else {
        return {
          ...state,
          favoriteMeals: [
            ...state.favoriteMeals,
            ...state.meals.filter((meal) => meal.id === action.mealId),
          ],
        };
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGluntenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegeterain && !meal.isVegeterian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: filteredMeals };  
    default:
      return state;
  }
};

export default mealsReducer;
