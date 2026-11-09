import type { GetServerSideProps } from "next";
import { getPost } from "../../../lib/posts";
import PostForm from "../post";
import type { PostDetails } from "../../../../types/Post";

interface EditPostPageProps {
  post: PostDetails;
}

export default function EditPostPage({ post }: EditPostPageProps) {
  return <PostForm post={post} />;
}

export const getServerSideProps: GetServerSideProps<EditPostPageProps> = async ({ params }) => {
  const id = params?.id;
  if (typeof id !== "string") return { notFound: true };

  const post = await getPost(id);
  if (!post) return { notFound: true };

  return { props: { post } };
};
