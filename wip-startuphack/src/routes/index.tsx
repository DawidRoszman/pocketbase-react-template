import { AuthContext } from '@/context/AuthContext';
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useContext, useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import getAllPosts from '@/hooks/getAllPosts';
import Post from '@/models/Post';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [posts, setPosts] = useState<Post[]>([])
  const auth = useContext(AuthContext);

  useEffect(() => {
    getAllPosts().then(posts => setPosts(posts))
  }, [])
  return (
    <div>
      <div>
        {auth.isLoggedIn && (
          <div>
            <h1>Welcome {auth.user?.email}</h1>
          </div>
        )}
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  )

}
