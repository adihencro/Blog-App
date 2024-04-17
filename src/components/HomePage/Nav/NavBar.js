import React, { useContext } from "react";
import "./NavBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "../../Auth/AuthContext";

const NavBar = () => {
    const { logout } = useContext(AuthContext);

    const searchHandle = () => {

    }

    const createHandle = () => {

    }

    const profileHandle = () => {

    }

    const logoutHandle = () => {
        logout();
    }

    return (
        <div class="sidebar">
            <p><BiSearchAlt2 onClick={searchHandle} /> Search</p>
            <p><MdOutlineAddToPhotos onClick={createHandle} /> Create</p>
            <p><CgProfile onClick={profileHandle} /> Profile</p>
            <p style={{ margin: '600px 0' }}><TbLogout onClick={logoutHandle} /> Logout</p>
        </div>
    );
};

export default NavBar;
