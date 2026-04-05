import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const location = useLocation();
    const [contextText, setContextText] = useState("Welcome to PhotoShare");
    
    useEffect(() => {
        const fetchContext = async () => {
            if (location.pathname.startsWith("/users/")) {
                const userId = location.pathname.split("/")[2];
                const user = await fetchModel(`/user/${userId}`);
                if (user) {
                    setContextText(`${user.first_name} ${user.last_name}`);
                }
            } else if (location.pathname.startsWith("/photos/")) {
                const userId = location.pathname.split("/")[2];
                const user = await fetchModel(`/user/${userId}`);
                if (user) {
                    setContextText(`Photos of ${user.first_name} ${user.last_name}`);
                }
            } else {
                setContextText("Welcome to PhotoShare");
            }
        };
        fetchContext();
    }, [location.pathname]);
    
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar className="topbar-toolbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" color="inherit">
            Nguyen Duy Nam - B23DCVT295
          </Typography>
          <Typography variant="h6" color="inherit">
            {contextText}
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
