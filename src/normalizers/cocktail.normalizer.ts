import { TCocktail } from "../store/models/cocktail.model";


export const normalizeFetchRandomCocktailsResponse = (
  data: any
): any => {
  const cocktailList: TCocktail[] = data?.map((cocktail: any) => {
    const { drinks } = cocktail?.data;

    return {
      cocktailId: drinks[0].idDrink,
      cocktailName: drinks[0].strDrink,
      category: drinks[0].strCategory,
      description: drinks[0].strInstructions,
      image: drinks[0].strDrinkThumb
    };
  });

  return cocktailList;
};
