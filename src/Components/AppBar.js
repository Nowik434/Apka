import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AuthVerify from "../Actions/AuthVerify";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

const drawerWidth = 240;

const pages = [
  { name: "Certyfikaty", page: "/" },
  { name: "Kwalifikacje", page: "/qualifications" },
];

const guestPages = [
  { name: "O Fundacji", page: "/" },
  { name: "Kwalifikacje", page: "/qualifications" },
];

const AppBarNav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    console.log("LOGOUT");
    dispatch(logout());
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const mobileWidth = useMediaQuery('(max-width:900px)');

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" sx={{ my: 0, flexGrow: 1 }}>
            <img src={Logo} style={{ maxWidth: "40px", marginRight: "30px" }} />
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex", mr: 4 } }}>
            {user &&
              user.user.userRole === "user" &&
              pages.map(({ name, page }) => (
                <Link to={page} key={page} style={{ textDecoration: "none" }}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {name}
                  </Button>
                </Link>
              ))}
            {user &&
              user.user.userRole === "guest" &&
              guestPages.map(({ name, page }) => (
                <Link to={page} key={page} style={{ textDecoration: "none" }}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {name}
                  </Button>
                </Link>
              ))}
          </Box>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <IconButton
              size="small"
              sx={{ ml: 2, display: mobileWidth ? "none" : null }}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={`${user.user.firstname}${user.user.lastname}`}
                src={`${UPLOADS_URL}${user.user.profileImage}`}
              ></Avatar>
            </IconButton>
          </Link>
          <AuthVerify logOut={handleLogout}>
            <IconButton
              color="inherit"
              onClick={()=>handleLogout()}
              sx={{ ml: 1, display: mobileWidth ? "none" : null }}
            >
              <LogoutIcon color="fontWhite" />
            </IconButton>
          </AuthVerify>
          {/* MOBILE MENU */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              marginRight: "0px",
              display: !mobileWidth ? "none" : null,
            }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {user &&
              user.user.userRole === "user" &&
              pages.map(({ name, page }) => (
                <Link to={page} key={page} style={{ textDecoration: "none" }}>
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    sx={{ my: 2, color: "#474c55", display: "block" }}
                  >
                    {name}
                  </ListItemButton>
                </Link>
              ))}
            {user &&
              user.user.userRole === "guest" &&
              guestPages.map(({ name, page }) => (
                <Link to={page} key={page} style={{ textDecoration: "none" }}>
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    sx={{ my: 2, color: "#474c55", display: "block" }}
                  >
                    {name}
                  </ListItemButton>
                </Link>
              ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <Link
                to="/profile"
                style={{ textDecoration: "none" }}
                onClick={() => setOpen(false)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccountsIcon sx={{ mr: 1 }} />
                    Twój Profil
                  </ListItemIcon>
                  <ListItemText />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <AuthVerify logOut={handleLogout}>
                <ListItemButton onClick={()=>handleLogout()}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Wyloguj
                  </ListItemIcon>
                  <ListItemText />
                </ListItemButton>
              </AuthVerify>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default AppBarNav;
