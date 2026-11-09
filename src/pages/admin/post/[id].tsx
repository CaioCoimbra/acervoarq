import type { GetServerSideProps } from "next";
import { getPost } from "../../../lib/posts";
import { getSessionUserId, SESSION_COOKIE_NAME } from "../../../lib/auth";
import PostForm from "../post";
import type { PostDetails } from "../../../../types/Post";

interface EditPostPageProps {
  post: PostDetails;
}

export default function EditPostPage({ post }: EditPostPageProps) {
  return <PostForm post={post} authenticated />;
}

export const getServerSideProps: GetServerSideProps<EditPostPageProps> = async ({ params, req, resolvedUrl }) => {
  const userId = await getSessionUserId(req.cookies[SESSION_COOKIE_NAME]);
  if (!userId) {
    return { redirect: { destination: `/admin/login?returnTo=${encodeURIComponent(resolvedUrl)}`, permanent: false } };
  }

  const id = params?.id;
  if (typeof id !== "string") return { notFound: true };

  const post = await getPost(id);
  if (!post) return { notFound: true };
  const { authorId, ...editablePost } = post;
  if (authorId !== userId) return { redirect: { destination: `/post/${id}`, permanent: false } };
  return { props: { post: editablePost } };
};
