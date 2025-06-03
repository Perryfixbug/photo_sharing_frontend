import React, {useState, useEffect} from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"
import { getCookie } from "../../lib/cookie";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const [users, setUsers] = useState([])
    useEffect(()=>{
      const fetchUser = async ()=>{
      let data = await fetchModel("http://localhost:8081/api/user/list")
      data = data.filter((item) => item._id !== getCookie("userId")) 
      setUsers(data)
      }
      fetchUser()
    }, [])
    
    return (
      <div>
        <List component="nav">
          {users && users.map((item) => (
            <>
              <ListItem>
                  <Link to={`/users/${item._id}`} state={{ userId: item._id }}>
                    <ListItemText primary={`${item.first_name} ${item.last_name}`}/>
                  </Link>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
    );
}

export default UserList;
