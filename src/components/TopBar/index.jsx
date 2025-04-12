import React, {useState} from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box, Tab, Tabs } from "@mui/material";

import "./styles.css";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    
    const userId = location.state?.userId;

    const handleChange = (event, newValue) => {
      setValue(newValue);
      if (newValue === 0) {
        navigate(`/users/${userId}`, { state: { userId } });
      } else if (newValue === 1) {
        navigate(`/photos/${userId}`, { state: { userId } });
      }
    };

    return (
      <AppBar className="topbar-appbar" position="static">
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: { backgroundColor: 'white' } // đây chỉnh màu gạch chân
            }}
          >
            <Tab label="User Profile" ></Tab>
            <Tab label="User Photos" ></Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
