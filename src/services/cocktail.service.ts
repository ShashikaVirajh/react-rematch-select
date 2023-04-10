import axios from 'axios';
import { COCKTAIL_LIST_LENGTH, FETCH_COCKTAILS_URL } from '../constants';
import { normalizeFetchRandomCocktailsResponse } from '../normalizers/cocktail.normalizer';


export class CocktailService {
  static FetchRandomCocktails = async (): Promise<any> => {
    const proms = [];

    try {
      for (let i = 1; i <= COCKTAIL_LIST_LENGTH; i++) {
        proms.push(
          axios.get(FETCH_COCKTAILS_URL, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        );
      }
      const list = await Promise.all(proms);

      const cocktailList = normalizeFetchRandomCocktailsResponse(list);
      return cocktailList;
    } catch (error) {
      return error;
    }
  };
}
