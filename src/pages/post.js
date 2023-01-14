/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { auth, db } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import {toast} from "react-toastify"


const Post = () => {
    const [post, setPost] = useState({description: "", title: ""});
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    //handle submit
    const submitPost = async(e) => {
        e.preventDefault();
        //run check for title and subscription
        if(!post.description && !post.title) {
            toast.error('Title and Description are empty 😅', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500
            })
            return;
        } else if(post.description.length > 350) {
            toast.error('Post description exceed the maximum characters 🙁', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
            });
            return;
        } else {
            //check if the post has an Id or not to edit
            if(post.hasOwnProperty("id")) {
                const docRef = doc(db, "posts", post.id);
                const updatePost = {...post, timestamp: serverTimestamp()}
                await updateDoc(docRef, updatePost);
                return route.push("/");
            } else {
                //make a post
                const colletionRef = collection(db, "posts");
                await addDoc(colletionRef, {
                    ...post,
                    timestamp: serverTimestamp(),
                    user: user.uid,
                    avatar: user.photoURL,
                    username: user.displayName
                });
            }
        }

        setPost({...post, title: ""});
        setPost({...post, description: ""});
        toast.success("New post created 😄", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        })
        if(post.description && post.title) {
            return route.push("/")
        }
}

    //check the user query
    const checkUser = async() => {
        if(loading) return;
        if(!user) route.push("/auth/login");
        if(routeData.id) {
            setPost({...post, 
                description: routeData.description, 
                id: routeData.id, 
                title: routeData.title
            })
        }
    }

    useEffect(() => {
        checkUser();
    }, [user, loading])

  return (
    <section className='mx-6 md:max-w-6xl md:mx-auto'>
        <form 
        className='form-container'
        onSubmit={submitPost}
        >
            <legend className='text-2xl font-bold pb-5'>
                {post.hasOwnProperty("id") ? 'Edit your post' : 'Create a new post'}
            </legend>
            <div className='flex flex-col pt-5 gap-2'>
                <label htmlFor="title">Title</label>
                <input 
                value={post.title} 
                type="text"  
                id="title" 
                placeholder='title' 
                className='input'
                required
                onChange={(e) => setPost({...post, title: e.target.value})}
                 />
            </div>
            <div className='flex flex-col py-5 gap-2'>
                <label htmlFor="description">Description</label>
                <textarea 
                value={post.description} 
                id="description" 
                placeholder='Enter description...' 
                className='text'
                required 
                onChange={e => setPost({...post, description: e.target.value})}
                />
                <p 
                className={`text-purple-800 font-medium text-sm ${post.description.length > 350 ? "text-red-600" : "" }`}
                >
                {post.description.length}/350
                </p>
            </div>
            <input 
            type="submit" 
            value="Submit" 
            className='secondary-btn cursor-pointer w-full'
             />
        </form>
    </section>
  )
}

export default Post;