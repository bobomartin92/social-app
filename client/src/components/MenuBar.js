import React, { useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {} from "@mui/material/colors";

import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    if (path === "login") {
      navigate("/login");
    } else if (path === "register") {
      navigate("/register");
    } else {
      logout();
    }

    setAnchorElNav(null);
  };

  const menuBar = user ? (
    <div className="mobile-nav">
      <AppBar sx={{ position: { sm: "fixed", md: "static" } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="inherit"
            href="/"
            variant="text"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Home
          </Button>
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            href="/"
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" disabled>
              <PersonIcon />
              {user.username}
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <AccountCircle fontSize="small" />
                {user.username}
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("logout")}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className="mobile-nav">
      <AppBar sx={{ position: { sm: "fixed", md: "static" } }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="inherit"
            href="/"
            variant="text"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            HOME
          </Button>
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            href="/"
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/register">
              Register
            </Button>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleNavigate("login")}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("register")}>
                <Typography textAlign="center">Register</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );

  return menuBar;
};

export default MenuBar;
