import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
export const SidebarData = [
{
	title: "Home",
	path: "/",
	icon: <AiIcons.AiOutlineHome color="fff"  />,
},
{
	title: "Winner",
	path: "/winners",
	icon: <AiIcons.AiOutlineGift color="fff" />,

},
{
	title: "Wallet",
	path: "/wallet",
	icon: <HiIcons.HiOutlineCurrencyDollar color="fff" />,

},
{
	title: "My Orders",
	path: "/my-orders",
	icon: <AiIcons.AiOutlineShoppingCart color="fff" />,
},
{
	title: "About US",
	path: "/about-us",
	icon: <AiIcons.AiFillInfoCircle color="fff" />,
	
},
{
	title: "Contact Us",
	path: "/contact-us",
	icon: <FaIcons.FaEnvelopeOpenText color="fff" />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

},
{
	title: "T & C",
	path: "/terms-and-conditions",
	icon: <RiIcons.RiContactsBook2Line color="fff" />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

},
{
	title: "Privacy policy",
	path: "/privacy-policy",
	icon: <FaIcons.FaUserLock color="fff" />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

},
];
