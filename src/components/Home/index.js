import React from 'react'
import {useState, useEffect} from 'react'
import { getAPI, deleteAPI } from '../../lib/restfullAPI';
import { Grid, List, ListItem, ListItemText, Box, Typography, Divider, Avatar, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddComment from '../AddComment';
import { getCookie } from '../../lib/cookie';
import axios from 'axios';


const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [numberOfComments, setNumberOfComments] = useState({});

    const handleAddComment = (photoId, comment) => {
        setPhotos(prevPhotos =>
            prevPhotos.map(photo => 
                photo._id === photoId 
                ? { ...photo, comments: [...photo.comments, comment] } 
                : photo
            )
        );
    }

    const handleDeleteComment = async (photoId, commentId) => {
        await axios.delete(`http://localhost:8081/api/comment/${commentId}`, {
            data: { photo_id: photoId }
        }).catch(error => {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment');
            return;
        });
        setPhotos(prevPhotos => 
            prevPhotos.map(photo =>
                photo._id === photoId
                ? {
                    ...photo,
                    comments: photo.comments.filter(comment => comment._id !== commentId)
                }   
                : photo
            )
        );
    }

    const handleMore = (photoId) => {
        setNumberOfComments(prevCount => ({
            ...prevCount,
            [photoId]: (prevCount[photoId] || 2) + 5
        }));
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await getAPI('photo');
                setPhotos(data);
                // setComments(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
        fetchPhotos();
    }, []);

    useEffect(() => {
        const initialCommentsCount = photos.reduce((acc, photo) => {
            acc[photo._id] = photo.comments.length > 2 ? 2 : photo.comments.length;
            return acc;
        }, {});
        setNumberOfComments(initialCommentsCount);
    }, [photos]);

    return (
        <>
            {photos.length > 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                        width: '70%',
                        margin: '0 auto',
                    }}
                    >
                    {photos.map(photo=> (
                    <Grid container spacing={2} key={photo._id} className="photo-item" sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                                <Typography variant="h6" component="div">
                                {photo?.user_id?.first_name} {photo?.user_id?.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Time: {new Date(photo.date_time).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}> 
                        <img
                            src={`/images/${photo.file_name}`}
                            alt={photo.file_name}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            loading="lazy"
                        />
                        </Grid>

                        <Grid item xs={12}>

                        {/* Comments */}
                        <List component="nav">
                            {photo?.comments.length > 0 &&
                            photo.comments.slice(0,numberOfComments[photo._id] || 2).map(comment => (
                                <Box
                                key={comment._id}
                                sx={{
                                    border: '1px solid lightgray',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    marginBottom: '8px',
                                    backgroundColor: '#f9f9f9',
                                }}
                                >
                                <Box
                                    sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    }}
                                >
                                    {/* Bên trái: Avatar + Tên */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            alt={`${comment?.user_id?.first_name} ${comment?.user_id?.last_name}`}
                                            src={`/images/${comment?.user_id?.avatar}`}
                                            sx={{ width: 24, height: 24, marginRight: 1 }}
                                        />
                                        <Typography variant="body1">
                                            {comment?.user_id?.first_name} {comment?.user_id?.last_name}
                                        </Typography>
                                    </Box>

                                    {/* Bên phải: Ngày giờ */}
                                    <Typography variant="body2" color="text.secondary">
                                    {new Date(comment.date_time).toLocaleString('vi-VN')}
                                    </Typography>
                                </Box>
                                    <ListItem>
                                        <ListItemText primary={`${comment?.comment}`} />
                                    </ListItem>
                                    {comment?.user_id?._id == getCookie('userId') && (
                                    <ListItem>
                                        <IconButton 
                                        edge="end" 
                                        aria-label="delete" 
                                        onClick={() => handleDeleteComment(photo?._id, comment?._id)} 
                                        sx={{ position: 'absolute', right: 0 }}>
                                            <DeleteIcon />
                                        </IconButton>   
                                    </ListItem>
                                    )}
                                </Box>
                            ))}
                        </List>
                        </Grid>
                        {photo?.comments.length > numberOfComments[photo._id] && (
                            <Grid item xs={12}>
                                <Button onClick={()=>handleMore(photo._id)}>More..</Button>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <AddComment photo_id={photo._id} onAddComment={handleAddComment}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                    </Grid>
                    
                    ))}
                    </Box>
            ) : (
                <p>No photos available.</p>
            )}
            
        </>
    )
}

export default Home