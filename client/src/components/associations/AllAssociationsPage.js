import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {useNavigate} from 'react-router-dom';


const AllAssociationsPage = () => {
    const navigate = useNavigate()

  return (
    <ImageList style={{margin: 50}}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ width: 500, height: 500, margin: 10 }}>
          <img
            // onClick={() => navigate('/users/favorites')}
            style={{cursor:'pointer'}}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar sx={{ margin: 5}}
            title={item.location}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  
    {
        img: 'https://static.wixstatic.com/media/2325d2_568d9d1681414fff807caf6762a2e313~mv2.png/v1/crop/x_50,y_0,w_1401,h_1060/fill/w_232,h_152,al_c,usm_0.66_1.00_0.01,enc_auto/Sos%20logo%20small%20%20%D7%9C%D7%95%D7%92%D7%95%20%D7%A8%D7%A9%D7%9E%D7%99.png',
        name: 'S.O.S.',
        location: 'Herzelia'
    },
    {
        img: 'https://www.letlive.org.il/wp-content/themes/LetLive/images/logo.png',
        name: 'Let the Animals Live',
        location: 'Tel-Aviv'
    },
    {
        img: 'https://www.letlive.org.il/wp-content/themes/LetLive/images/logo.png',
        name: 'Let the Animals Live',
        location: 'Tel-Aviv'
    },
    {
        img: 'https://static.wixstatic.com/media/2325d2_568d9d1681414fff807caf6762a2e313~mv2.png/v1/crop/x_50,y_0,w_1401,h_1060/fill/w_232,h_152,al_c,usm_0.66_1.00_0.01,enc_auto/Sos%20logo%20small%20%20%D7%9C%D7%95%D7%92%D7%95%20%D7%A8%D7%A9%D7%9E%D7%99.png',
        name: 'S.O.S.',
        location: 'Herzelia'

    },
];

export default AllAssociationsPage;