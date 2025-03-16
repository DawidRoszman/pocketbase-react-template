import pb from '../db/conn';
import Post from '../models/post';

const getAllPosts = async () => {
  const posts: Post[] = await pb.collection('posts').getFullList();
  return posts;
};

export default getAllPosts;
