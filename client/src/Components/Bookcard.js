import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CenterFocusStrong } from '@material-ui/icons';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  img: {
    objectFit: "contain",
  }
  
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.img}  
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image='http://3.bp.blogspot.com/-vpM2K_Dtt5k/UYk0uk9jMGI/AAAAAAAAB7E/ZHWz8VkFeSo/s1600/HorrorCover017.jpg'
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5"  align='center' component="h2">
           Book Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            book summary in few lines.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Explore
        </Button>
        <Button size="small" color="primary" >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
