import { AuthContext } from '@/context/auth/auth-context';
import getAllPosts from '@/hooks/get-all-posts';
import Post from '@/models/Post';
import { createFileRoute } from '@tanstack/react-router';
import { useContext, useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getAllPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <div>
      <div>
        {auth.isLoggedIn && (
          <div>
            <h1>Welcome {auth.user?.email}</h1>
          </div>
        )}
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
