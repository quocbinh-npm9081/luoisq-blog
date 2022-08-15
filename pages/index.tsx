import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

import Header from '../components/Header'

import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typing';

interface Props {
  posts: [Post]
}


export const getServerSideProps = async () => {

  const query = `
  *[_type == "post"] | order(publishedAt desc){

    _id,
    title,
    slug,
    mainImage,
    description,
    body,
    categories[]->{
      title
    },

    author ->{
      name,
      image,
    }
  }
  `

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts: posts
    }
  }
}

const Home = ({ posts }: Props) => {
  console.log(posts);

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='flex items-center justify-between bg-blue-300 px-10 border-y border-black py-10'>
        <div className='space-y-5 flex-1'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>
              Louis Q
            </span>{" "}
            is a place to write, read and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic
            and connect wityh millions on readers
          </h2>
        </div>

        <div className='hidden md:inline-flex flex-1 items-center justify-center'>
          <span className='text-9xl font-extrabold '>L</span>
        </div>
      </div>
      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 '>
        {
          posts.map(post => (
            <Link
              key={post._id}
              href={`/post/${post.slug.current}`}
            >
              <div className='group cursor-pointer border rounded-lg overflow-hidden'>
                {
                  post.mainImage && (
                    <img
                      className='h-60 w-full object-cover group-hover:scale-105 transion-transform duration-200 ease-in-out'
                      src={urlFor(post.mainImage).url()!}
                      alt="post img"
                    />)
                }
                <div className="flex items-center justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className='text-xs'>{post.author.name}</p>
                    <p className='text-xs'>{post.description}</p>
                  </div>
                  <img className='h-12 w-12 rounded-full'
                    src={urlFor(post.author.image).url()!}
                    alt="author avata" />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
