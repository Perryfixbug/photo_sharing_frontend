import './App.css';

import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from './components/LoginRegister';
import { getCookie } from './lib/cookie';
import { getAPI } from './lib/restfullAPI';
import Home from './components/Home';

const App = (props) => {
  const [user, setUser] = useState(null);
  const userId = getCookie('userId');
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (userId) {
  //       try {
  //         const data = await getAPI(`user/${userId}`);
  //         setUser(data);
  //       } catch (error) {
  //         console.error('Error fetching user:', error);
  //       }
  //     }
  //   };
  //   fetchUser();
  // }
  // , [userId]);

  return (
      <Router>
        {!userId && <LoginRegister />}
        {userId &&
        <div>
          <Grid container spacing={2}>
            {/* Cột bên trái */}
            <Grid item sm={3}>
              <Paper className="main-grid-item" sx={{ height: '100vh', width: 300, position: "fixed" }} >
                <TopBar /> {/* TopBar nằm trên cùng trong cột trái */}
              </Paper>
            </Grid>

            {/* Cột bên phải */}
            <Grid item sm={9}>
              <Paper className="main-grid-item" elevation={0} >
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/login" element={<LoginRegister />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      }
      </Router>
  );
}

export default App;
