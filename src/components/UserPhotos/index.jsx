import React, { useEffect, useState } from "react";
import { Grid, ImageListItem, List, ListItem, ListItemText, Typography, Box, Avatar, Button, Divider } from "@mui/material";
import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";
import UploadPhoto from "../UploadPhoto";
import AddComment from "../AddComment";
import { getCookie } from "../../lib/cookie";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const user = useParams();
    const [photoOfUser, setPhotoOfUser] = useState([]);

    const handleUploadPhoto = (photo) => {
        setPhotoOfUser(prevPhotos => [...prevPhotos, photo]);
    }

    const handleAddComment = (photoId, comment) => {
        setPhotoOfUser(prevPhotos =>
            prevPhotos.map(photo => 
                photo._id === photoId 
                ? { ...photo, comments: [...photo.comments, comment] } 
                : photo
            )
        );
    }
    
    useEffect(() => { 
      async function fetchPhoto(){
        const userId = user.userId;
        const photoUserModelData = await fetchModel(`http://localhost:8081/api/photo/${userId}`);
        setPhotoOfUser(photoUserModelData);
      }
      fetchPhoto()
    },[user.userId]);
    console.log(photoOfUser);
    return (
      <>
      {user.userId === getCookie("userId") && <UploadPhoto onUploadPhoto={handleUploadPhoto}/>}
      {photoOfUser.length > 0 ? (
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
              {photoOfUser.map(photo => (
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
                  <List component="nav">
                      {photo?.comments.length > 0 &&
                      photo.comments.slice(0,2).map(comment => (
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
                              
                          </Box>
                      ))}
                  </List>
                  </Grid>
                  {photo?.comments.length > 2 && (
                      <Grid item xs={12}>
                          <Button>More..</Button>
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
      {/* <List component="nav">
        {photoOfUser.map((item) => (
          <Grid container spacing={1} key={item._id}>
            <Grid xs={4} item>
              <ListItem>
                <ListItemText primary={`Posted time: ${item.date_time}`}/>
              </ListItem>
              
              <ImageListItem key={item._id}>
                <img
                  src={`/images/${item.file_name}`}
                  srcSet={`/images/${item.file_name}`}
                  alt={item.file_name}
                  style={{ width: '248px', height: 'auto', objectFit: 'cover' }}
                  loading="lazy"
                />
              </ImageListItem>
              
            </Grid >
            <Grid xs={8} item>
              <List component="nav">
                {item?.comments?.length > 0 && item.comments.map((comment) => (
                  <Box 
                    key={comment._id}
                    sx={{
                      border: '1px solid lightgray',
                      borderRadius: '4px',
                      padding: '8px',
                      marginBottom: '8px',
                      backgroundColor: '#f9f9f9'
                    }}
                  >
                    <ListItem>
                      <ListItemText primary={`User: ${comment?.user_id?.first_name} ${comment?.user_id?.last_name}`}/>
                    </ListItem>
                    <ListItem key={comment._id}>
                      <ListItemText primary={`Comment: ${comment?.comment}`}/>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Commented time: ${comment.date_time}`}/>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Grid >
          </Grid>
        ))}
      </List> */}
      </>
    );
}

export default UserPhotos;
