import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // ✅ Import CSS for styling

const Sidebar = () => {
  const [open, setOpen] = useState(true); // ✅ Sidebar is open by default
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Marksheets", icon: <AssignmentIcon />, path: "/marksheets" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  return (
    <Box>
      {/* Toggle Button */}
      <IconButton onClick={toggleDrawer} className="menu-button">
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Drawer variant="persistent" anchor="left" open={open} className="sidebar">
        <List className="sidebar-list">
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
