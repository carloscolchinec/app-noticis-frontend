import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, CardActions, IconButton, TextField } from '@mui/material';



import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import BackupIcon from '@mui/icons-material/Backup';
import DirectionsCarIcons from '@mui/icons-material/DirectionsCar';


import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function DetailPosts() {
    const { id } = useParams();



    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [expandedComments, setExpandedComments] = useState({});
    const [usernames, setUsernames] = useState({});

    useEffect(() => {
        fetch(`${API_URL}/api/v1/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                const sortedComments = data.comments.sort((a, b) => {
                    const dateA = new Date(a.created_at).getTime();
                    const dateB = new Date(b.created_at).getTime();
                    return dateB - dateA;
                });
                setComments(sortedComments);
            })
            .catch(error => console.error('Error fetching comments:', error));
    }, [id]);


    useEffect(() => {
        fetch(`${API_URL}/api/v1/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                // Verifica si la URL de la imagen comienza con /storage
                // y agrega el dominio y el puerto si es así
                if (data.image.startsWith('/storage')) {
                    data.image = `${API_URL}${data.image}`;
                }
                setPost(data);
                setLikes(data.likes);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    useEffect(() => {
        const isLikedLocally = localStorage.getItem(`liked_${id}`) === 'true';
        setIsLiked(isLikedLocally);
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/posts/${id}/like`, {
                method: isLiked ? 'DELETE' : 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                const { status } = data;

                if (status) {
                    const updatedLikes = isLiked ? likesCount - 1 : likesCount + 1;
                    setIsLiked(!isLiked);
                    setLikes(updatedLikes);
                    localStorage.setItem(`liked_${id}`, !isLiked);
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
        const postUrl = `${window.location.origin}/post/${id}`;
        shareContent(post.title, postUrl);
    };




    const shareContent = async (title, url) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    url: url,
                });
            } else {
                console.log('Web Share API not supported');
            }
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    };



    const handleExpand = (id) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleSubmitComment = async () => {
        try {
            // Crear el objeto del comentario
            const newComment = {
                id_post: id,
                message: commentText
            };

            // Enviar el comentario al servidor
            const response = await fetch(`${API_URL}/api/v1/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const savedComment = await response.json();

            // Agregar el nuevo comentario a la lista de comentarios
            // y ordenar la lista nuevamente por fechas
            const updatedComments = [...comments, savedComment].sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return dateB - dateA;
            });

            // Actualizar el estado de los comentarios con la lista ordenada
            setComments(updatedComments);
            setCommentText('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };


    const generateRandomUsername = () => {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return `anónimo_${randomNumber}`;
    };

    useEffect(() => {
        const generatedUsernames = {};
        comments.forEach(comment => {
            if (!generatedUsernames[comment.id]) {
                let username;
                do {
                    username = generateRandomUsername();
                } while (Object.values(generatedUsernames).includes(username));
                generatedUsernames[comment.id] = username;
            }
        });
        setUsernames(generatedUsernames);
    }, [comments]);

    if (!post) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: "#fff", fontWeight: 800, fontSize: "30px" }}>
                
                <DirectionsCarIcons style={{fontSize: "32px", marginRight: "12px"}}/>
                Cargando...
            </div>
        );
    }

    const { title, image, description } = post;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "10px"
        }}>



            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                style={{
                    alignSelf: 'flex-start', marginTop: "20px", margin: "5px", marginBottom: '20px', border: "0px", color: "#fff", background: "rgba(41,41,41, 0.7)",
                    borderRadius: "20px"
                }}
                onClick={() => {
                    const currentPosition = window.pageYOffset;
                    window.history.back();
                    setTimeout(() => {
                        window.scrollTo(0, currentPosition);
                    }, 0);
                }}
            >
                Regresar
            </Button>



            <div style={{ marginTop: "auto" }}>
                <div style={{
                    padding: "2px",
                    background: "rgba(41,41,41, 0.7)",
                    borderRadius: "20px"
                }}>
                    <div style={{ flex: 1, margin: "20px" }}>
                        <div style={{
                            marginTop: "20px",
                            marginLeft: "-5px",
                            color: "#fff",

                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "wrap",
                            width: "100%",
                            marginBlock: "20px",
                        }}>
                            <Typography variant="h5" component="div" style={{
                                fontWeight: 900
                            }}>
                                {title}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex", padding: "10px", marginTop: "-20px", marginBottom: "-20px" }}>
                        <CardMedia
                            style={{
                                borderRadius: "20px",
                                // width: "auto", // Ancho predeterminado para pantallas grandes

                            }}
                            component="img"
                            src={image}
                            alt={title}
                        />
                    </div>


                    <CardActions disableSpacing style={{ paddingTop: '0', marginBottom: "-30px", marginTop: "20px", justifyContent: 'space-between' }}>
                        <div>
                            <IconButton aria-label="add to favorites" onClick={handleLike}>
                                {isLiked ? <FavoriteIcon style={{ color: "#ff0000" }} /> : <FavoriteBorderIcon style={{ color: "#fff" }} />}
                                <Typography variant="body2" color="#fff" style={{ whiteSpace: 'nowrap', marginLeft: "10px" }}>
                                    {likesCount} Me gusta
                                </Typography>
                            </IconButton>
                        </div>
                        <IconButton aria-label="share">
                            <ShareIcon onClick={handleShare} style={{ color: "#fff" }} />
                        </IconButton>
                    </CardActions>



                    <div style={{ flex: 1, margin: "15px 0px 0px 0px", borderRadius: "12px" }}>
                        <Typography variant="body1" component="div" style={{ color: "#fff", padding: "10px", textAlign: 'justify' }}>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Typography>
                    </div>

                </div>

                <div style={{
                    padding: "15px",
                    marginTop: "20px",
                    background: "rgba(41,41,41, 0.7)",
                    borderRadius: "20px"
                }}>

                    <div style={{ marginTop: "5px" }}>
                        <Typography variant="h6" component="div" style={{ color: "#fff" }}>
                            Comentarios
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitComment();
                            }}
                            style={{
                                backgroundColor: "#fff",
                                padding: "6px",
                                borderRadius: "5px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Comentar"
                                multiline
                                maxRows={4}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                variant="outlined"
                                style={{
                                    flex: 1,
                                    marginRight: "0px",

                                }}
                                InputProps={{
                                    style: { backgroundColor: "#fff", borderRadius: "5px", width: "260px" },
                                }}
                            />
                            <Button type="submit">
                                <SendIcon style={{ marginRight: "-25px", color: "#000" }} />
                            </Button>
                        </Box>

                        <div style={{ marginTop: "20px", color: "#000" }}>
                            {comments.map(comment => (
                                <div key={comment.id} style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                                    <Typography variant="body2" component="p" style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                        {usernames[comment.id]}
                                    </Typography>

                                    <div
                                        style={{
                                            overflow: expandedComments[comment.id] ? 'visible' : 'hidden',
                                            textOverflow: expandedComments[comment.id] ? 'initial' : 'ellipsis',
                                            maxHeight: expandedComments[comment.id] ? 'none' : '60px',
                                            cursor: 'pointer',
                                            wordWrap: "break-word"
                                        }}
                                        onClick={() => handleExpand(comment.id)}
                                    >
                                        <Typography variant="body2" component="p" style={{ marginBottom: "5px" }}>
                                            {comment.message.length > 120 && !expandedComments[comment.id]
                                                ? `${comment.message.substring(0, 120)}... Ver Más`
                                                : comment.message
                                            }
                                        </Typography>
                                        {comment.message.length > 120 && expandedComments[comment.id] && (
                                            <Typography variant="body2" component="p" style={{ color: 'blue' }}>
                                                Ver Menos
                                            </Typography>
                                        )}
                                    </div>
                                    <Typography variant="body2" color="#000" style={{ marginBottom: "5px", marginTop: "5px", fontSize: "14px", color: "#000" }}>
                                        {format(new Date(comment.created_at), "MMMM dd, yyyy 'a las' hh:mm a", { locale: es })}
                                    </Typography>
                                </div>
                            ))}
                            {comments.length === 0 && <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>No hay comentarios</div>}
                        </div>


                    </div>
                </div>


            </div>
        </div>
    );
}
