import { Models } from '@rematch/core';
import { cocktailStore } from './cocktail.model';

export interface RootModel extends Models<RootModel> {
  cocktailStore: typeof cocktailStore
}

export const models: RootModel = {
  cocktailStore
};
