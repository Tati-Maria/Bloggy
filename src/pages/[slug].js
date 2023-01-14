/* eslint-disable @next/next/no-img-element */
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Message from '@/Components/Message';
import { db, auth } from '@/utils/firebase';
import {toast} from "react-toastify"
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';

const Details = () => {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    //submit a message
    const handleSubmitMessage = async() => {
        //check if the user is loggin to comment
        if(!auth.currentUser)  return router.push("/auth/login")
        if(!message){
            toast.error("Don't leave an empty message!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500
            });

            return;
        }

        const docRef = doc(db, "posts", routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                username: auth.currentUser.displayName,
                time: Timestamp.now(),
            })
        })

        //reset
        setMessage("")
    }


    //get comments
    const getComments = async() => {
        const docRef = doc(db, "posts", routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments)
        });
        return unsubscribe
        // const docSnap =  await getDoc(docRef);
        // setAllMessages(docSnap.data().comments);
    }

    useEffect(() => {
        if(!router.isReady) return;
        getComments();
    }, [router.isReady])

  return (
    <section className='mt-16'>
    <div className='mx-6 md:max-w-6xl md:mx-auto'>
        <Message {...routeData}>

        </Message>
       <div className='my-4'>
       <div className='flex items-center'>
            <input 
            type="text" 
            value={message}  
            placeholder="Send a message 😃"
            onChange={e => setMessage(e.target.value)}
            className="bg-gray-900 text-sm p-2 w-full text-white placeholder:text-white placeholder:focus:invisible dark:bg-black dark:text-white"
            />
            <button
             className='py-2 px-4 bg-purple-400 text-sm font-medium'
             type='submit'
             onClick={handleSubmitMessage}
             >
                Submit
            </button>
        </div>
        <div className='py-6'>
            <h2 className='font-bold'>Comments({allMessages?.length})</h2>
            {allMessages?.map((message) => (
                    <div key={message.time} className="my-5 p-4 border-2 border-purple-300 bg-white rounded-md space-y-3">
                        <div className='flex items-center space-x-3'>
                            <img src={message.avatar} alt={message.username} width={50} className="rounded-full" />
                            <h4 className='font-medium'>{message.username}</h4>
                        </div>
                        <p className='text-gray-800'>{message.message}</p>
                </div>
            ))}
        </div>
       </div>
    </div>
    </section>
  )
}

export default Details;