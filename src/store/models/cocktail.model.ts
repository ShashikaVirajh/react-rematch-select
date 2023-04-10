import { createModel } from "@rematch/core";
import { CocktailService } from "../../services/cocktail.service";
import { RootModel } from "./root.model";
import { createSelector } from "@rematch/select";
import { RootState } from "../store";

export type TCocktail = {
  cocktailId: string;
  cocktailName: string;
  category: string;
  description: string;
  image: string;
};

type TCocktailState = {
  cocktailList: TCocktail[] | [];
  favouriteList: TCocktail[] | [];
};

const COCKTAIL_INITIAL_STATE: TCocktailState = {
  cocktailList: [],
  favouriteList: []
};

export const cocktailStore = createModel<RootModel>()({
  state: {...COCKTAIL_INITIAL_STATE},
  reducers: {
    setFetchedCocktailList(state: TCocktailState, payload: TCocktail[])  {
      return {...state, cocktailList: payload}
    },
    handleAddToFavourites(state: TCocktailState, payload: TCocktail)  {
      return {...state, favouriteList: [...state.favouriteList, payload, ]}
    },
    handleRemoveFromFavourites(state: TCocktailState, payload: string)  {
      const updatedFavouriteList = state.favouriteList.filter((favourite) => {
        return favourite.cocktailId !== payload;
      });

      return {...state, favouriteList: updatedFavouriteList}
    },
  },
  effects: (dispatch)  => ({
    async fetchCocktailList() {
      const response = await CocktailService.FetchRandomCocktails();
      dispatch.cocktailStore.setFetchedCocktailList(response);
    },
    addToFavourites(payload: TCocktail) {
      dispatch.cocktailStore.handleAddToFavourites(payload);
    },
    removeFromFavourites(payload: string) {
      dispatch.cocktailStore.handleRemoveFromFavourites(payload)
    }
  }),
});

const selectFavoriteCocktailList = (state: RootState) => state.cocktailStore.favouriteList;

export const favouriteCocktailsCount  = createSelector(
  selectFavoriteCocktailList,
  (favouriteList) => favouriteList.length
);


export const favouriteCocktailNames = createSelector(
  selectFavoriteCocktailList,
  (favouriteList) => favouriteList.map((cocktail): string => {
    return cocktail.cocktailName;
  })
)