import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

import { FC, useMemo } from 'react';
import { TCocktail } from '../store/models/cocktail.model';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../store/store';

type Props = {
  cocktailInfo: TCocktail;
};

export const CocktailCard: FC<Props> = ({ cocktailInfo }): JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const favouriteList = useSelector((state: RootState) => state.cocktailStore.favouriteList ?? []);

  const favouriteIds = useMemo(() => {
    return favouriteList.map((favourite: TCocktail) => {
      return favourite.cocktailId;
    });
  }, [favouriteList]);

  const handleAFavourites = (): void => {
    if (favouriteList.length === 0 || !favouriteIds.includes(cocktailInfo.cocktailId)) {
      dispatch.cocktailStore.addToFavourites(cocktailInfo);

      return;
    }

    dispatch.cocktailStore.removeFromFavourites(cocktailInfo.cocktailId);
  };

  const buttonText = !favouriteIds.includes(cocktailInfo.cocktailId)
    ? 'ADD TO FAVOURITES'
    : 'REMOVE FROM FAVOURITE';

  const buttonColor = !favouriteIds.includes(cocktailInfo.cocktailId) ? 'primary' : 'secondary';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        height: 400,
        border: '2px solid #3152F5',
        borderRadius: '0.4rem'
      }}
    >
      <CardActionArea>
        <CardMedia component='img' sx={{ height: 160 }} src={cocktailInfo.image} />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {cocktailInfo.cocktailName}
          </Typography>

          <Typography mt='-0.5rem' gutterBottom variant='caption' component='div'>
            Category: {cocktailInfo.category}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {cocktailInfo.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ mt: 'auto' }}>
        <Button size='small' color={buttonColor} onClick={handleAFavourites}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};
