import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

// export async function getStaticProps(){
//   const {data: posts, error} = await supabase.from('posts').select('*')
  
//   if(error) {
//     throw new Error(error)
//   }
//   return {
//     props: {
//       posts
//     }
//     }
//   }


export default function Posts() {
    const [loading, setLoading] = useState(true)
    // const [title, setTitle] = useState(null)
    // const [isPublished, setIsPublished] = useState(null)
    // const [content, setContent] = useState(null)
    const [postData, setPostData] = useState(null)

    useEffect(() => {
        getPosts()
      }, [])
    

    async function getPosts() {
        try {
            setLoading(true)
            let { data, error, status } = await supabase
              .from('posts')
              .select('*')

            if (error && status !== 406) {
              throw error
            }
            if (data) {
              setPostData({
                posts: data
                })
            }
          } catch (error) {
            alert(error.message)
          } finally {
            setLoading(false)
          }
    }


    return (    
        <div>
            <h1>Published Blogs</h1>
                {
                    postData &&
                    <div>
                    {postData.posts.map((post) => {
                        const {is_published, title, content, id} = post
                        return (
                            is_published &&
                            <div key={id}>
                                <h2>{title}</h2>
                                <p>{content}</p>
                            </div>     
                        ) 
                    })}
                    </div>
                }
        </div>
    )
}