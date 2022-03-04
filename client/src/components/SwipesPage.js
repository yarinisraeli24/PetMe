import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardSwiper } from "react-card-rotate-swiper";

import './Card.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SwipesPage(props) {
  const [expanded, setExpanded] = useState(false);
  const [showMore,setShowMore] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const items =  [
    {
      image: "https://thediscerningcat.com/wp-content/uploads/2021/09/british-short-hair-chincilla-up-close.jpg.webp",
      zIndex: 5,
      description: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your guests. Add 1 cup of frozen peas along with the mussels,
      if you like.`,
      moreInfo: `Add rice and stir very gently to distribute. Top with artichokes and
      peppers, and cook without stirring, until most of the liquid is absorbed,
      15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
      mussels, tucking them down into the rice, and cook again without
      stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don’t open.)`
    },
    {
      image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*',
      zIndex: 4,
      description: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your guests. Add 1 cup of frozen peas along with the mussels,
      if you like.`,
      moreInfo: `Add rice and stir very gently to distribute. Top with artichokes and
      peppers, and cook without stirring, until most of the liquid is absorbed,
      15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
      mussels, tucking them down into the rice, and cook again without
      stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don’t open.)`
    }]

    const addToFavorites = (item) => {
      console.log('added')
    }

    const handleSwipe = (direction, item) => {
      switch (direction) {
        case 'right': return addToFavorites(item);
        case 'left': break;
        case 'up': return addToFavorites(item);
        case 'down': break;
        default: break;
      }
    }

    const pets = items.map( item =>  
      <CardSwiper onSwipe={(direction) => handleSwipe(direction, item)} className="swiper" contents={
        <Card sx={{background: `url(${item.image}) no-repeat center center`,backgroundSize: 'cover', maxWidth: 800, height: 750, zIndex: item.zIndex}}>
          <div className="content">
            <div className="content-fade">
          <CardHeader
            title="Shrimp and Chorizo Paella"
          />
          <CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {item.moreInfo}
              </Typography>
            </CardContent>
          </Collapse>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={!expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          </div>
          </div>
        </Card>
        }/>
    )

  return pets
}
