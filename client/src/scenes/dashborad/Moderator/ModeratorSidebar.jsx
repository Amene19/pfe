import React, { useContext, useEffect, useState } from "react";
import "./ModeratorDashboard.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link} from "react-router-dom";
import cookie from "js-cookie"








const ModeratorSidebar = ({ isExpanded, toggleSidebar }) => {



	const menuItems = [
		{
			text: "Dashboard",
			icon: window.location.pathname === '/moderator'? <DashboardIcon style={{color: "#141b2d"}}/>: <DashboardIcon />,
			to:"/moderator"
		},
		{
			text: "Profile",
		
			icon: window.location.pathname.startsWith('/moderator/profile')? <AccountBoxIcon style={{color: "#141b2d"}}/>: <AccountBoxIcon />,
			to:"/moderator/profile"
		},
		{
			text: "Manage Reports",
			icon: window.location.pathname.startsWith('/moderator/manageReports')? <HomeRepairServiceIcon style={{color: "#141b2d"}}/>: <HomeRepairServiceIcon />,
			to:"/moderator/manageReports"
		},
		{
			text: "Missions",
			icon: window.location.pathname.startsWith('/moderator/myMissions')? <ConfirmationNumberIcon style={{color: "#141b2d"}}/>: <ConfirmationNumberIcon />,
			to:"/moderator/myMissions"
		}
		
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
            <h4 className={!isExpanded ? "showOff" : "showOn"} style={{ color:"#141b2d", fontWeight:'bold'}}>Moderator</h4>
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

export default ModeratorSidebar;


