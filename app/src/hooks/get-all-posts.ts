import Post from '@/models/post';
import pb from '../db/conn';

const getAllPosts = async () => {
  const posts: Post[] = await pb.collection('posts').getFullList();
  return posts;
};

export default getAllPosts;
