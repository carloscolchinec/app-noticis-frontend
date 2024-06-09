import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'; // Importa makeStyles desde '@mui/styles'
const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    // borderRadius: "15px !important",
    overflow: 'hidden',
    // borderRadius: "40px",
    height: "200px",
    margin: "-15x",
    // marginTop: "-20px"
  },
  mediaContainer: {
    position: 'relative',
    overflow: 'hidden',
    height: "100%",
  },
  mediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Color de superposición oscuro
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: "0px", // Espaciado alrededor del texto
    boxSizing: 'border-box',
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  title: {
    color: "#ffff",
    fontWeight: 'bold',
    fontSize: "1rem",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    padding: "10px",
    // marginBottom: "5px"
  },
  time: {
    color: "#fff",
    opacity: 0.9,
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    padding: "10px"
  },
}));

const BannersCards = ({ title, time, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.mediaContainer}>
        <img src={image} alt={title} className={classes.media} />
        <div className={classes.mediaOverlay}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          {/* <Typography variant="body2" className={classes.time}>
            {time}
          </Typography> */}
        </div>
      </div>
    </Card>
  );
};

export default BannersCards;
