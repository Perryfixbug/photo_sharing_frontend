import React, {useState} from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box, Tab, Tabs } from "@mui/material";

import "./styles.css";
import {  useNavigate} from "react-router-dom";
import { getCookie, deleteCookie } from "../../lib/cookie";

/**
 * Define TopBar, a React component of Project 4.
 */

function TopBar() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  
  // const userId = location.state?.userId || location.pathname.split("/")[2];
  const userId = getCookie('userId')
  const fullname = getCookie('fullname');

  const handleChange = (event, newValue) => {
    if(newValue === 0) {
      navigate(`/`, { state: { userId } });
    }else if (newValue === 1) {
      navigate(`/users/${userId}`, { state: { userId } });
    } else if (newValue === 2) {
      navigate(`/photos/${userId}`, { state: { userId } });
    } else if(newValue === 3) {
      navigate(`/users`, { state: { userId } });
    } else if(newValue === 4) {
      deleteCookie('userId');
      deleteCookie('fullname');
      window.location.reload(); // Reload the page to reflect the logged-out state
      navigate(`/login`);
    }
    setTabValue(newValue);
  };

  return (
    <AppBar className="toolbar-appbar" position="sticky" sx={{ height: "97%", backgroundColor: "rgb(0,0,20)", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" className="toolbar-title">{`Hi, ${fullname}`}</Typography>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex"}}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: { backgroundColor: "white", left: 0 },
            }}
            sx={{width: 200, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start"}}
          >
            <Tab label="Home" />
            <Tab label="My Profile" />
            <Tab label="My Photos" />
            <Tab label="Friends"/>
            <Tab label="Log out" 
              sx={{
              backgroundColor: "#cc0000", '&:hover': {
              backgroundColor: "red", 
              color: "white"
            }}}/>
          </Tabs>
            
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;