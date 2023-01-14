/* eslint-disable @next/next/no-img-element */
import {AiOutlinePlus} from "react-icons/ai"
import Link from 'next/link';
import { auth } from '@/utils/firebase';
import {useAuthState} from "react-firebase-hooks/auth";


const Nav = () => {
    const [user, loading] = useAuthState(auth);

  return (
    <div className='py-10'>
        <nav className=' mx-6 md:max-w-6xl md:mx-auto flex items-center justify-between'>
            <h1 className='text-2xl font-lobsterTwo text-purple-500'>
                <Link href={"/"}>
                Bloggy
                </Link>
            </h1>
            <ul className='flex items-center gap-10'>
                {!user && (
                    <li className='secondary-btn' role="button">
                    <Link href={"/auth/login"}>Join Now</Link>
                </li>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <button className="secondary-btn flex items-center gap-2">
                            <AiOutlinePlus size={15} />
                            <Link href={"/post"}>Post</Link>
                        </button>
                        <Link href={"/dashboard"}>
                            <img src={user.photoURL} alt={user.displayName} className="rounded-full w-12"/>
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default Nav;