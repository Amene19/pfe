import React, { useContext, useEffect, useState } from "react";
import "./TechnicianDashboard.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link} from "react-router-dom";









const TechnicianSidebar = ({ isExpanded, toggleSidebar }) => {



	const menuItems = [
		{
			text: "Dashboard",
			icon: <DashboardIcon />,
			to:"/technician"
		},
		{
			text: "Technician Profile",
			icon: <AccountBoxIcon />,
			to:"/technician/profile"
		},
		{
			text: "Manage Reports",
			icon: <HomeRepairServiceIcon />,
			to:"/technician/manageReports"
		},
		
		{
			text: "notifications",
			icon: <NotificationsIcon />,
			to:"/technician/notifications"
		},
	
	];

	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="" alt=""/>
							<h2>Afin</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() =>toggleSidebar(!isExpanded)}
							 
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" pt="40px" pb="30px">
            <Avatar
            alt="Remy Sharp"
            src={localStorage.getItem('image')}
            sx={{ width: 60, height: 60 }}
            />
            <h4 className={!isExpanded ? "showOff" : "showOn"}>{localStorage.getItem('name')}</h4>
            <h4 className={!isExpanded ? "showOff" : "showOn"} style={{ color:"#141b2d", fontWeight:'bold'}}>Technician</h4>
        </Stack>
				<div className="nav-menu">
					{menuItems.map(({ text, icon, to }, index) => (
						<Link
							key={index}
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							to={to}
						>
							<div className="menu-item-icon">{icon} </div> 
    
							{isExpanded && <p className="textItem">{text}</p>}
						</Link>
					))}
				</div>
			</div>
			<div className="nav-footer">
				
			</div>
		</div>
	);
};

export default TechnicianSidebar;


