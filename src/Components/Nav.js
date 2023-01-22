/* eslint-disable @next/next/no-img-element */
import {AiOutlinePlus} from "react-icons/ai"
import Link from 'next/link';
import { auth } from '@/utils/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {BsMoon, BsSun} from "react-icons/bs"

const Nav = () => {
    const [user, loading] = useAuthState(auth);
    //set up dark and light mode
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) {
        return null;
    }
    
  return (
    <div className='py-1'>
        <nav className='nav'>
            <h1 className='logo'>
                <Link href={"/"}>
                Bloggy
                </Link>
            </h1>
            <ul className='navItems'>
                <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <span>{theme === "light" ? (<BsMoon size={20} />) : (<BsSun size={20} />)}</span>
                </button>
                {!user && (
                    <li className='secondary-btn' role="button">
                    <Link href={"/auth/login"}>Join Now</Link>
                </li>
                )}
                {user && (
                    <div className="nav-item">
                        <Link href={"/post"}>
                        <button className="secondary-btn flex items-center gap-2">
                            <AiOutlinePlus size={15} />
                            Post
                        </button>
                        </Link>
                        <Link href={"/dashboard"}>
                            <img src={user.photoURL} alt={user.displayName} className="nav-img"/>
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default Nav;