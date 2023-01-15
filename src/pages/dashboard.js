import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import {MdOutlineEdit, MdDelete} from "react-icons/md"
import Message from "@/Components/Message";
import Link from "next/link";
import empty from "../images/post_empty.svg"
import Image from "next/image";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    //check if user is logged
    const getData = async() => {
        if(loading) return;
        if(!user) return route.push("/");
        const collectioRef = collection(db, "posts");
        //Get posts based on the user id.
        const q = query(collectioRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }))

        return unsubscribe;
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user, loading]);

    //deletePost
    const handleDeletePost = async (id) => {
        if(confirm("Are you sure you want to delete this post?")) {
            const docRef = doc(db, "posts", id);
            await deleteDoc(docRef)
        }
    }

  return (
    <section className='mt-16 min-h-screen'>
        <div className='your-post'>
            <h1 className='font-medium text-2xl pb-10'>Your Posts</h1>
            <div>
                {posts?.length === 0 ? (<div className="flex flex-col items-center gap-4">
                    <Image src={empty} alt="no posts" className="opacity-40"  />
                    <span className="text-center text-lg font-medium">No Posts</span>
                </div>) :
                    (posts.map(post => (
                        <Message key={post.id} {...post}>
                            <div className="post-container">
                                <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="post-btn">
                                    <MdDelete size={20} color="red"/>
                                    <span>Delete</span>
                                </button>
                                <Link href={{pathname: "/post", query: post}}>
                                <button 
                                className="post-btn-edit"
                                >
                                    <MdOutlineEdit size={20} color="purple"/>
                                    <span>Edit</span>
                                </button>
                                </Link>
                            </div>
                        </Message>
                    )))
                }
            </div>
            <button className=' text-purple-600 border-2 border-purple-600 py-1 px-4 rounded-lg shadow-lg my-10' onClick={() => auth.signOut()}>
                Sign Out
            </button>
        </div>
    </section>
  )
}

export default Dashboard;