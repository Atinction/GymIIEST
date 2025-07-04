import React from "react";
import { AppBar, Toolbar, Button, Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/" || location.pathname === "/main";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // State for the hamburger menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", padding: "8px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/IIEST.png" alt="Logo" style={{ height: "40px" }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              backgroundImage: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            gymIIest
          </Typography>
        </Box>

        {/* Right side buttons/menu */}
        {!isAuthPage && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            {/* User Profile Button - Always beside the hamburger icon for authenticated views */}
            {!isMainPage && (
              <IconButton component={Link} to="/profile" sx={{ color: "#fff" }}>
                <AccountCircleIcon />
              </IconButton>
            )}

            {isMainPage ? (
              // Show Login/Signup only on main/landing page
              <>
                <Button component={Link} to="/login" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Login
                </Button>
                <Button component={Link} to="/signup" sx={{ color: "#fff", fontWeight: "bold" }}>
                  Signup
                </Button>
              </>
            ) : (
              // Show Hamburger menu for other pages (Home, About, Contact, Developers)
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuClick}
                  // This icon will be visible for all screen sizes on these pages
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose} component={Link} to="/home">Home</MenuItem>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/about">About</MenuItem>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/contact">Contact</MenuItem>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/developers">Developers</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;