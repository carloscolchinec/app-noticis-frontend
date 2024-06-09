import React, { useEffect, useState } from 'react';
import RecipeReviewCard from './RecipeReviewCard';
import { API_URL } from '../../config'; // Importa la URL de la API desde config.js

import ErrorIcon from '@mui/icons-material/Error';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/posts`) // Utiliza la URL de la API desde config.js
      .then(response => response.json())
      .then(data => setRecipes(data.map(recipe => {
        console.log(recipe.comments.length)
        // Verifica si la URL de la imagen comienza con /storage
        // y agrega el dominio y el puerto si es así
        if (recipe.image.startsWith('/storage')) {
          recipe.image = `${API_URL}${recipe.image}`; // Utiliza la URL de la API desde config.js
        }
        return recipe;
      }).sort((a, b) => new Date(b.time_creation) - new Date(a.time_creation)))) // Ordena las recetas por fecha de forma descendente
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', marginTop: "0px" }}>
      {recipes.length === 0 ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}>
          <ErrorIcon style={{
            fontSize: "42px"
          }} />
          <p>No hay noticias disponibles.</p>
        </div>
      ) : (
        recipes.map((recipe, index) => (
          <RecipeReviewCard
            key={index}
            idPost={recipe.id_posts}
            title={recipe.title}
            image={recipe.image}
            description={recipe.description}
            likes={recipe.likes}
            time_creation={recipe.time_creation}
            comment={recipe.comments.length}
          />
        ))
      )}
    </div>
  );
}

export default RecipeList;
