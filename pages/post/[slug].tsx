import { useState } from 'react'
import { GetStaticProps } from "next"
import Header from "../../components/Header"
import { sanityClient, urlFor } from "../../sanity"
import { Post } from "../../typing"
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    post: Post
}

interface IFormInput {
    _id: string,
    name: string,
    email?: string,
    comment: string
}

const Post = ({ post }: Props) => {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        await fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data);
            console.log(post);

            setSubmitted(true)
        }).catch((err) => {
            console.log(err);
            setSubmitted(false)
        })

    }
    // console.log(watch("_id")) // watch input value by passing the name of it

    return (
        <main>
            <Header />
            <img
                className="w-full h-40 md:h-60 object-cover"
                src={urlFor(post.mainImage).url()!}
                alt="mainImage"
            />
            <article className="max-w-4xl mx-auto p-3 md:p-5">
                <h1 className="text-3xl mt-10 mb-3 ">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-500">{post.description}</h2>
                <div className="flex items-center space-x-2 py-2">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={urlFor(post.author.image).url()}
                        alt="author avata"
                    />
                    <p className="font-extralight text-sm">
                        Blog post by{" "}
                        <span className="text-blue-600">
                            {post.author.name}  </span>
                        {" "} - Published at{" "}
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="mt-10">
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                        content={post.body}
                        serializers={
                            {
                                h1: (props: any) => (
                                    <h1 className="text-2xl font-bold my-5" {...props} />
                                ),
                                h2: (props: any) => (
                                    <h2 className="text-xl font-bold my-5" {...props} />
                                ),
                                li: ({ children }: any) => (
                                    <li className="ml-4 list-disc"> {children}</li>
                                ),
                                link: ({ href, children }: any) => (
                                    <a
                                        href={href}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {children}
                                    </a>
                                ),
                                blockquote: ({ children }: any) => (
                                    <blockquote className="border-l-8 border-blue-600"> {children} </blockquote>
                                ),
                                figure: ({ children }: any) => {
                                    <figure className="h-40 md:h-60 flex justify-center">
                                        {children}
                                    </figure>
                                }

                            }
                        }
                    />
                </div>
            </article>
            <hr className="max-w-lg my-5 mx-auto border border-blue-500" />
            {submitted ? (
                <div className='flex flex-col py-10 px-10 my-10 bg-blue-500 text-white max-w-2xl mx-auto'>
                    <h3 className='text-2xl font-bold'>Thank for for submitting your comment</h3>
                    <p>Once it has been approved, it will apper beloew!</p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
                    <h3 className="text-sm text-blue-500">Enjoyed this artcle?</h3>
                    <h4 className="text-3xl font-bold">Leave a comment below!</h4>
                    <hr className="mt-2 py-3" />
                    <input
                        {...register("_id")}
                        type="hidden"
                        value={post._id}
                    />
                    <label htmlFor=""
                        className="block mb-5">
                        <span className="text-gray-700">
                            Name
                        </span>
                        <input
                            {...register("name", { required: true })}
                            className="shadow border rounded py-2 px-3 outline-none form-input mt-1 block w-full focus:ring-blue-500 focus:ring-2"
                            type="text"
                            placeholder="John ... "
                        />
                    </label>
                    <label htmlFor=""
                        className="block mb-5">
                        <span className="text-gray-700">
                            Email
                        </span>
                        <input
                            {...register("email", { required: true })}
                            className="shadow border rounded py-2 px-3 outline-none form-input mt-1 block w-full focus:ring-blue-500 focus:ring-2"
                            type="email"
                            placeholder="John@gmail.com ... "
                        />
                    </label>
                    <label htmlFor=""
                        className="block mb-5">
                        <span className="text-gray-700">
                            Comment
                        </span>
                        <textarea
                            {...register("comment", { required: true })}
                            className="shadow border rounded py-2 px-3 outline-none form-textarea mt-1 block w-full focus:ring-blue-500 focus:ring-2"
                            rows={10}
                            placeholder="Comment here ... "
                        />
                    </label>
                    <div className="flex flex-col p-5">
                        {errors.name && (
                            <span className="text-red-500">The name field is required</span>
                        )}
                        {errors.email && (
                            <span className="text-red-500">The email field is required</span>
                        )}
                        {errors.comment && (
                            <span className="text-red-500">The comment field is required</span>
                        )}
                    </div>
                    <input type="submit" className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold p-1 md:p-2 rounded cursor-pointer" />
                </form>
            )}

            {/* Comment */}
            <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-blue-300'>
                <h3 className='text-4xl'>Comments</h3>
                <hr />
                {
                    post.comment.map(item => (
                        <div key={item._id}>
                            <p>
                                <span className="text-blue-500">
                                    {item.name}
                                </span>    : {item.comment}
                            </p>
                        </div>
                    ))
                }
            </div>

        </main>
    )
}


export const getStaticPaths = async () => {
    const query = `
    *[_type == "post"]{
        _id,
        slug{
            current
        },
      }
    `

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        mainImage,
        description,
        'comment': *[
            _type=="comment" && post._ref == ^._id && approved == true
        ],
        categories[]->{
            title
        },
        body,
        author ->{
            name,
            image,
        }
      }
    `

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    });

    if (!post) return { notFound: true }

    return {
        props: {
            post: post
        }
    }
}



export default Post