import React, { useEffect, useState } from "react";
import {ImageListItem, List, ListItem, ListItemText, Typography} from "@mui/material";

import "./styles.css";
import {Link, useParams} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { getAPI } from '../../lib/restfullAPI';

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const [userData, setUserData] = useState(null);
    const [photoOfUser, setPhotoOfUser] = useState([]);

    useEffect(() => {
      const fetchUser = async () => {
        const userId = user.userId;
        // const userById = await fetchModel(`http://localhost:8081/api/user/${userId}`)
        const userById = await getAPI(`user/${userId}`)

        setUserData(userById)
        // const photoUser = await fetchModel(`http://localhost:8081/api/photo/${userId}`)
        const photoUser = await getAPI(`photo/${userId}`)
        setPhotoOfUser(photoUser)
      }
      fetchUser()
    },[user.userId]);

    return (
        <>
          <Typography variant="body1">
            {/* This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel. */}
            <List component="nav">
              <ImageListItem key={userData?._id}>
                <img
                  src={photoOfUser[0]?.url || `/images/${photoOfUser[0]?.file_name}`}
                  srcSet={photoOfUser[0]?.url || `/images/${photoOfUser[0]?.file_name}`}
                  alt={userData?.first_name}
                  style={{ width: '248px', height: 'auto', objectFit: 'cover' }}
                  loading="lazy"
                />
              </ImageListItem>
              <ListItem>
                <ListItemText primary={`Full Name: ${userData?.first_name} ${userData?.last_name}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Location: ${userData?.location}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Description: ${userData?.description}`}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Occupation: ${userData?.occupation}`}/>
              </ListItem> 
              <ListItem>
                <Link to={`/photos/${user.userId}`} state={{ userId: user.userId }} >View all Photos</Link>
              </ListItem>
            </List>
          </Typography>
        </>
    );
}

export default UserDetail;
