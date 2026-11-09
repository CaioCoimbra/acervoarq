import Header from "../../components/Header";
import { Main } from "../../components/Main";
import Post from "../../components/Post";
import type { GetServerSideProps } from "next";
import { getPosts } from "../lib/posts";
import type { PostsPage } from "../lib/posts";

export default function Home({ posts, page, totalPages }: PostsPage) {
  return (
    <>
      <Header />
      <Main title="Início">
        {posts.map((post) => <Post key={post.id} post={post} />)}
        <nav aria-label="Paginação" className="flex justify-center gap-6 py-4">
          {page > 1 && (
            <a href={page === 2 ? "/" : `/?page=${page - 1}`}>Anterior</a>
          )}
          {page < totalPages && <a href={`/?page=${page + 1}`}>Próxima</a>}
        </nav>
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostsPage> = async ({ query }) => {
  const pageValue = Array.isArray(query.page) ? query.page[0] : query.page;
  const requestedPage = Number(pageValue ?? 1);
  const result = await getPosts(Number.isFinite(requestedPage) ? requestedPage : 1);

  return { props: result };
};
