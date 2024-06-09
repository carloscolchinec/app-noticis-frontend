

import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Grid, Typography } from '@mui/material';
import { API_URL } from '../config'; 

import NewsCard from '../components/CardsLists/BannersCards';

const Tendencias = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/posts`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.map(post => {
          // Verifica si la URL de la imagen comienza con /storage
          // y agrega el dominio y el puerto si es así
          if (post.image.startsWith('/storage')) {
            post.image = `${API_URL}${post.image}`;
          }
          return post;
        }));
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      style={{
        // bordeRadios: "20px !important"
        // padding: "-20px !important"
      }}
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // arrows={false}
      // customTransition="transform 300ms ease-in-out"
      // customTransition="all .5"
      // dotListClass="custom-dot-list-style"
      // itemClass="carousel-item-padding-40-px"
    >
      {posts.map((post, index) => (
        <div key={index}>
           <NewsCard
          key={index}
          title={post.title}
          time={post.time}
          image={post.image}
        />
        </div>
      ))}
    </Carousel>
  );
};

export default Tendencias;

