import { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Post from "../../components/Post";
import CarregandoHome from '../../components/CarregandoHome';

interface PostData {
  id: number | string;
  nome: string;
  autor: string;
  descricao_resumida: string;
  localizacao: string;
  data: string;
  categoria: string;
  texto_explicativo: string;
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://acervoarq.site/api/listar_post.php')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar:", erro);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <CarregandoHome />;
  }

  return (
    <>
      <Header />
      <Main title="Início">
        {carregando ? (
          <p>Carregando posts...</p>
        ) : posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              nome={post.nome}
              autor={post.autor}
              descricao_resumida={post.descricao_resumida}
              localizacao={post.localizacao}
              data={post.data}
              categoria={post.categoria}
              texto_explicativo={post.texto_explicativo}
            />
          ))
        )}
      </Main>
      <Footer />
    </>
  );
}