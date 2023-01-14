import {FcGoogle} from "react-icons/fc";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';
import {useAuthState} from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Login = () => {
    const route = useRouter();
    const [user, loading] = useAuthState(auth)

    //sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async() => {
        try{
            const result = await signInWithPopup(auth, googleProvider);
            route.push("/");
        } catch(error) {
            alert(error.message);
        }
    }

    //Check if there is an user logged
    useEffect(() => {
        if(user) {
            route.push("/")
        } else {
            console.log("login");
        }
    }, [user, route])

  return (
    <div className='shadow-xl mt-32 p-10 border-2 border-purple-300 mx-6 rounded-lg md:max-w-6xl md:mx-auto'>
        <h2 className='text-2xl font-medium'>Join Today</h2>
        <div className='py-4'>
            <h3 className='py-4'>Sign in with one of the providers</h3>
            <button onClick={GoogleLogin} className='main-btn'>
                <FcGoogle size={25} />
                Sign in with Google
            </button>
        </div>
    </div>
  )
}

export default Login;