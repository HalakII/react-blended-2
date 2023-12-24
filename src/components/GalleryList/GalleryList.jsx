import { CardItem, Grid, GridItem } from 'components';

export const GalleryList = ({ photos, onModalClick }) => {
  return (
    <Grid>
      {photos.map(({ alt, id, src, avg_color }) => (
        <GridItem key={id}>
          <CardItem color={avg_color}>
            <img src={src.large} alt={alt} onClick={() => onModalClick(src, alt)}/>
          </CardItem>
        </GridItem>
      ))}
    </Grid>
  );
};
