/* eslint-disable @next/next/no-img-element */
import {AiOutlinePlus} from "react-icons/ai"
import Link from 'next/link';
import { auth } from '@/utils/firebase';
import {useAuthState} from "react-firebase-hooks/auth";


const Nav = () => {
    const [user, loading] = useAuthState(auth);

  return (
    <div className='py-1'>
        <nav className='nav'>
            <h1 className='logo'>
                <Link href={"/"}>
                Bloggy
                </Link>
            </h1>
            <ul className='navItems'>
                {!user && (
                    <li className='secondary-btn' role="button">
                    <Link href={"/auth/login"}>Join Now</Link>
                </li>
                )}
                {user && (
                    <div className="nav-item">
                        <button className="secondary-btn flex items-center gap-2">
                            <AiOutlinePlus size={15} />
                            <Link href={"/post"}>Post</Link>
                        </button>
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