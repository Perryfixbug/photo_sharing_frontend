import React, { useEffect, useState } from "react";
import { Grid, ImageListItem, List, ListItem, ListItemText, Typography, Box } from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const user = useParams();
    const [photoOfUser, setPhotoOfUser] = useState([]);
    useEffect(() => { 
      const userId = user.userId;
      const photoUserModelData = models.photoOfUserModel(userId);
      setPhotoOfUser(photoUserModelData);
    },[user.userId]);
    console.log(photoOfUser);
    return (
      <List component="nav">
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
                      <ListItemText primary={`User: ${comment.user.first_name} ${comment.user.last_name}`}/>
                    </ListItem>
                    <ListItem key={comment._id}>
                      <ListItemText primary={`Comment: ${comment.comment}`}/>
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
      </List>
    );
}

export default UserPhotos;
