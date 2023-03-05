import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { auth, fs } from '../Config/Config'
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { userCircleO } from 'react-icons-kit/fa/userCircleO'
import logo from '../Resources/nynepay.gif';

import {
	Nav,
	NavLink,
	NavIcon,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink
} from './NavbarElements';

// const Navs = styled.div`
// background: #15171c;
// height: 40px;
// display: flex;
// justify-content: flex-start;
// align-items: center;
// `;

// const NavIcon = styled(Link)`
// margin-left: 2rem;
// font-size: 2rem;
// height: 80px;
// display: flex;
// justify-content: flex-start;
// align-items: center;
// `;

const SidebarNav = styled.nav`
background: #15171c;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
position: fixed;
top: 0;
top: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const TopNavbar = () => {

    const navigate = useNavigate();

	const [photo, setphoto] = useState('');

	// getting current user function
	function GetCurrentUser() {
		const [user, setUser] = useState(null);

		useEffect(() => {
			auth.onAuthStateChanged(user => {
				if (user) {
					const docRef = fs.collection('users').doc(user.uid)
					docRef.get().then((doc) => {
						if (doc.exists) {
							setphoto(doc.data().ProfileImage);
							setUser(doc.data().FullName);
						}
					})
				}
				else {
					setUser(null);
					setphoto(null);
				}
			})
		}, [])
		return user;
	}

	const user = GetCurrentUser();
	// console.log(user);

	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>

			<Nav>
				<NavIcon to="#"><HiIcons.HiOutlineMenuAlt4 onClick={showSidebar} size={20} color="#fff" /></NavIcon>
				<NavLink to='/'>
					<img src={logo} height="40" width="120" alt='logo' />
				</NavLink>
				<div className='rightside'>
					<div className='funbutton'>

						{!user && <>
							{/* <div className='logbutton'>
		<div><Link className='navlink' to="signup">SIGN UP</Link></div> <div><Link className='navlink' to="login">LOGIN</Link></div>
		</div> */}

							{!photo && <><Link className='navlink' to="/profile"><Icon icon={userCircleO} size={20} /></Link> </>}

						</>}

					</div>
					{user && <>
						<div className='cart-menu-btn'>
							{photo && <><Link className='navlink' to="/profile"><img className="roundimage" src={photo} height="20" width="20" alt="profile-img" /></Link> </>}
							{!photo && <><Link className='navlink' to="/profile"><Icon icon={userCircleO} size={20} /></Link> </>}
						</div>
					</>}
				</div>
			</Nav>
			<SidebarNav sidebar={sidebar}>
				<SidebarWrap onClick={showSidebar}>
					<NavIcon to="#"><AiIcons.AiOutlineClose onClick={showSidebar} size={20} color="#fff" /></NavIcon>
					<div className="sideload">
						{SidebarData.map((item, index) => { return <SubMenu item={item} key={index} />; })}
					</div>
				</SidebarWrap>
			</SidebarNav>
		</>
	);
};

export default TopNavbar;
