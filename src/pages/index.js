import Message from '@/Components/Message';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  //get the docs
  const getPosts = async() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
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
        <meta name="description" content="A small blog build with create-next-app by Maria Tati" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='mx-6 min-h-screen md:max-w-6xl lg:mx-auto my-12 text-lg'>
        <h2>See other people&apos;s posts</h2>
        {allPosts?.length === 0 ? (<span>No Posts Available</span>) :
        (
          allPosts.map(post => (
            <Message key={post.id} {...post}>
              <Link href={{pathname: `/${post.id}`, query: {...post}}} className="pt-6 text-sm underline text-purple-600">
                {post.comments?.length > 0 ? post.comments?.length : 0} Comments
              </Link>
            </Message>
            ))
        )
        }
      </div>
    </>
  )
}
