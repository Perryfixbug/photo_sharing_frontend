import React, { useEffect, useState } from "react";
import {
  Grid,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";
import UploadPhoto from "../UploadPhoto";
import AddComment from "../AddComment";
import { getCookie } from "../../lib/cookie";
import { getAPI } from "../../lib/restfullAPI";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const [photoOfUser, setPhotoOfUser] = useState([]);
  const [newPhoto, setNewPhoto] = useState(false);

  const handleUploadPhoto = (photo) => {
    setPhotoOfUser((prevPhotos) => [...prevPhotos, photo]);
    setNewPhoto(!newPhoto);
  };

  const handleAddComment = (photoId, comment) => {
    setPhotoOfUser((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo._id === photoId
          ? { ...photo, comments: [...photo.comments, comment] }
          : photo
      )
    );
  };

  useEffect(() => {
    async function fetchPhoto() {
      const userId = user.userId;
      const photoUserModelData = await getAPI(`photo/${userId}`);
      setPhotoOfUser(photoUserModelData);
    }
    fetchPhoto();
  }, [user.userId, newPhoto]);

  return (
    <>
      {user.userId === getCookie("userId") && (
        <UploadPhoto onUploadPhoto={handleUploadPhoto} />
      )}
      {photoOfUser.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            width: "70%",
            margin: "0 auto",
          }}
        >
          {photoOfUser.map((photo) => (
            <Grid
              container
              spacing={2}
              key={photo._id}
              className="photo-item"
              sx={{ mb: 3 }}
            >
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
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
                  src={photo.url || `/images/${photo.file_name}`}
                  alt={photo.url || photo.file_name}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  loading="lazy"
                />
              </Grid>

              <Grid item xs={12}>
                <List component="nav">
                  {photo?.comments.length > 0 &&
                    photo.comments.slice(0, 2).map((comment) => (
                      <Box
                        key={comment._id}
                        sx={{
                          border: "1px solid lightgray",
                          borderRadius: "4px",
                          padding: "8px",
                          marginBottom: "8px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          {/* Bên trái: Avatar + Tên */}
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              alt={`${comment?.user_id?.first_name} ${comment?.user_id?.last_name}`}
                              src={`/images/${comment?.user_id?.avatar}`}
                              sx={{ width: 24, height: 24, marginRight: 1 }}
                            />
                            <Typography variant="body1">
                              {comment?.user_id?.first_name}{" "}
                              {comment?.user_id?.last_name}
                            </Typography>
                          </Box>

                          {/* Bên phải: Ngày giờ */}
                          <Typography variant="body2" color="text.secondary">
                            {new Date(comment.date_time).toLocaleString(
                              "vi-VN"
                            )}
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
                <AddComment
                  photo_id={photo._id}
                  onAddComment={handleAddComment}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ margin: "20px 0" }} />
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        <p>No photos available.</p>
      )}
    </>
  );
}

export default UserPhotos;
