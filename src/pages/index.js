import Message from '@/Components/Message';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import Spinner from '@/Components/Spinner';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  //get the docs
  const getPosts = async() => {
    setLoading(true)
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      setLoading(false)
    })

    return unsubscribe;
  }

  useEffect(() => {
    getPosts();
  }, [])


  return (
    <>
      <Head>
        <title>Bloggy</title>
        <meta name="description" content="A small blog built with create-next-app by Maria Tati" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='mx-6 min-h-screen md:max-w-6xl lg:mx-auto my-12 text-lg'>
        <h2>See other people&apos;s posts</h2>
        {loading === true ? (<Spinner />) : (
          allPosts.map(post => (
            <Message key={post.id} {...post}>
              <Link href={{pathname: `/${post.id}`, query: {...post}}} className="pt-6 text-sm underline text-purple-600">
                {post.comments?.length > 0 ? post.comments?.length : 0} Comments
              </Link>
            </Message>
            ))
        )}
      </div>
    </>
  )
}
