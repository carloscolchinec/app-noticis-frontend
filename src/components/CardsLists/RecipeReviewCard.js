import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config'; // Importa la variable de configuración desde config.js
import { darkTheme } from '../../themes';

import CommentIcon from '@mui/icons-material/Comment';


const StyledLink = styled(Link)({
  textDecoration: 'none',
});

export default function RecipeReviewCard({ idPost, title, image, description, likes, time_creation, comment }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikes] = React.useState(likes);
  // const [isComment, setIsComment] =React.useState(false);
  // const [commentCount, setCommentCount] = React.useState(comment);
  const [timeAgo, setTimeAgo] = useState('');

  // useEffect(() => {
  //   console.log(comment)
  // }, [comment])

  React.useEffect(() => {
    const isLikedLocally = localStorage.getItem(`liked_${idPost}`) === 'true';
    setIsLiked(isLikedLocally);
  }, [idPost]);

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const postedTime = new Date(time_creation);
      const timeDifference = Math.abs(currentTime - postedTime);
      const minutesAgo = Math.floor(timeDifference / (1000 * 60));
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      const monthsAgo = Math.floor(daysAgo / 30);
      const yearsAgo = Math.floor(monthsAgo / 12);

      if (yearsAgo > 0) {
        setTimeAgo(`Publicado hace ${yearsAgo} ${yearsAgo === 1 ? 'año' : 'años'}`);
      } else if (monthsAgo > 0) {
        setTimeAgo(`Publicado hace ${monthsAgo} ${monthsAgo === 1 ? 'mes' : 'meses'}`);
      } else if (daysAgo > 0) {
        setTimeAgo(`Publicado hace ${daysAgo} ${daysAgo === 1 ? 'día' : 'días'}`);
      } else if (hoursAgo > 0) {
        setTimeAgo(`Publicado hace ${hoursAgo} ${hoursAgo === 1 ? 'hora' : 'horas'}`);
      } else {
        setTimeAgo(`Publicado hace ${minutesAgo} ${minutesAgo === 1 ? 'minuto' : 'minutos'}`);
      }
    };

    calculateTimeAgo();
  }, [time_creation]);


  const handleLike = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/posts/${idPost}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        const { status } = data;

        if (status) {
          const updatedLikes = isLiked ? likesCount - 1 : likesCount + 1;
          setIsLiked(!isLiked);
          setLikes(updatedLikes);
          localStorage.setItem(`liked_${idPost}`, !isLiked);
        } else {
          console.error('Failed to toggle like');
        }
      } else {
        console.error('Failed to toggle like');
      }
    } catch (error) {
      console.error('Error while toggling like:', error);
    }
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${idPost}`; // Obtiene la URL del post
    shareContent(title, postUrl); // Llama a la función para compartir contenido
  };

  const shareContent = async (title, url) => {


    try {
      if (navigator.share) { // Verifica si el navegador es compatible con la función de compartir
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        console.log('Web Share API not supported');
        // Aquí puedes manejar una alternativa si el navegador no admite la función de compartir
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const truncateTitle = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const truncateDescription = (text, maxLength) => {
    let truncatedText = text;
    if (text.length > maxLength) {
      truncatedText = text.substring(0, maxLength);
    }
    // Reemplaza los saltos de línea con espacios
    return truncatedText.replace(/<br\s*\/?>/gi, ' ');
  };

  return (
    <Card style={{
      background: "#292929",
      borderRadius: "20px",
      position: 'relative',
    }} sx={{ maxWidth: 345 }}>
      <StyledLink to={`/post/${idPost}`}> {/* Establece la ruta del enlace */}
        <CardMedia
          component="div"
          height="194"
          style={{ position: "relative", overflow: 'hidden', borderRadius: '20px', width: "100%" }}
        >
          <Typography
            variant="h5"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "rgba(41,41,41, 0.7)",
              color: "#fff",
              padding: "10px",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.02rem",
              // borderTopLeftRadius: "20px",
              // borderTopRightRadius: "20px ",
              border: "20px 20px 0px 0px !important",
              whiteSpace: 'wrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <img
            src={image}
            alt={title}
            style={{ width: "500px", height: "300px", objectFit: "cover" }}
          />


        </CardMedia>


        <CardContent style={{ paddingBottom: '0' }}>
          <Typography variant="body2" color="#fff" style={{ marginBottom: '5px', marginTop: "-10px", fontSize: "14px" }}>
            <div dangerouslySetInnerHTML={{ __html: truncateDescription(description, 120) }} />
          </Typography>

          <Typography variant="body2" color="#fff" style={{ marginBottom: '5px', marginTop: "20px" }}>
            <div dangerouslySetInnerHTML={{ __html: truncateDescription(timeAgo, 120) }} />
          </Typography>
        </CardContent>

      </StyledLink>
      <CardActions disableSpacing style={{ paddingTop: '0', justifyContent: 'space-between' }}>
        <div>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            {isLiked ? <FavoriteIcon style={{ color: "#ff0000" }} /> : <FavoriteBorderIcon style={{ color: "#fff" }} />}
            <Typography variant="body2" color="#fff" style={{ whiteSpace: 'nowrap', marginLeft: "10px" }}>
              {likesCount} Me gusta
            </Typography>
          </IconButton>
        </div>
        <IconButton aria-label="comments">
            <CommentIcon style={{ color: "#fff" }} />
            <Typography variant="body2" color="#fff" style={{ whiteSpace: 'nowrap', marginLeft: "10px" }}>
              {comment} Comentarios
            </Typography>
          </IconButton>
      </CardActions>
    </Card>
  );
}
