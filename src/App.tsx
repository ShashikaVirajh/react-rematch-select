import { Box, Grid, Typography } from "@mui/material";
import { CocktailCard } from "./components/cocktail-card.component";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./store/store";
import {
  favouriteCocktailNames,
  favouriteCocktailsCount,
} from "./store/models/cocktail.model";

export const App: FC = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch>();

  const favCocktailCount = useSelector(favouriteCocktailsCount);
  const favCocktailNames = useSelector(favouriteCocktailNames);

  const cocktailList = useSelector(
    (state: RootState) => state.cocktailStore.cocktailList
  );

  useEffect(() => {
    dispatch.cocktailStore.fetchCocktailList();
  }, [dispatch]);

  return (
    <>
      <Box display="flex" flexDirection="row" mb="2rem">
        <Typography>Favourite Cocktail Count: {favCocktailCount}</Typography>

        <Box
          border="2px solid blue"
          width="16rem"
          padding="0.4rem"
          borderRadius="0.25rem"
          ml="2rem"
        >
          <Typography variant="h6" color="green">
            Favourite Cocktail Names
          </Typography>

          {favCocktailNames.map((cocktailName) => {
            return (
              <Typography variant="body1" color="blue">
                * {cocktailName}
              </Typography>
            );
          })}
        </Box>
      </Box>

      <Grid container justifyContent="center" spacing="1rem">
        {cocktailList.map((cocktail, index) => (
          <Grid key={index} item xs={2}>
            <CocktailCard key={cocktail.cocktailId} cocktailInfo={cocktail} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
