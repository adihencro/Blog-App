import React, { useContext } from "react";
import "./NavBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "../../Auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import { TiHome } from "react-icons/ti";


const NavBar = () => {
    const { userId, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const homeHandle = () => {
        navigate('/home');
    }

    const searchHandle = () => {
        navigate('/search');
    }

    const createHandle = () => {
        navigate('/create');
    }

    const profileHandle = () => {
        navigate(`/profile/${userId}`);
    }

    const logoutHandle = () => {
        logout();
    }

    return (
        <div class="sidebar">
            <p onClick={homeHandle} ><TiHome /> Home</p>
            <p onClick={searchHandle}><BiSearchAlt2 /> Search</p>
            <p onClick={createHandle}><MdOutlineAddToPhotos /> Create</p>
            <p onClick={ profileHandle}><CgProfile /> Profile</p>
            <p onClick={logoutHandle} style={{ margin: '600px 0' }}><TbLogout /> Logout</p>
        </div>
    );
};

export default NavBar;
