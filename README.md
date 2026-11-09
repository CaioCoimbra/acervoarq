# AcervoARQ

## Executar com Docker

É necessário ter Docker instalado e em execução.

Na raiz do projeto, construa a imagem:

```bash
docker build -t acervoarq .
```

Inicie o aplicativo:

```bash
docker run --name acervoarq \
  -p 3000:3000 \
  -e JWT_SECRET="$(openssl rand -hex 32)" \
  -v acervoarq-data:/data \
  acervoarq
```

Abra [http://localhost:3000](http://localhost:3000). O banco SQLite e os dados permanecem no volume `acervoarq-data` entre reinicializações.
O Docker usa cookies compatíveis com HTTP local; se servir o app por HTTPS, defina `SESSION_COOKIE_SECURE=true` no `docker run`.

## URLs da aplicação

Use `http://localhost:3000` como endereço base.

### Páginas

| URL | Uso |
| --- | --- |
| `/` | Feed de projetos; aceite `?page=<n>` para navegar pelas páginas. |
| `/post/<id>` | Detalhes do projeto. |
| `/admin/login` | Entrar na conta. |
| `/admin/post` | Criar projeto (requer autenticação). |
| `/admin/post/<id>` | Editar projeto (requer autenticação e propriedade). |

### API

| Método | URL | Uso |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Criar conta. |
| `POST` | `/api/auth/login` | Iniciar sessão. |
| `POST` | `/api/auth/logout` | Encerrar sessão. |
| `POST` | `/api/posts` | Criar projeto (requer autenticação). |
| `PUT` | `/api/posts/<id>` | Atualizar projeto (requer autenticação e propriedade). |
| `DELETE` | `/api/posts/<id>` | Excluir projeto (requer autenticação e propriedade). |
| `GET` | `/api/hello` | Endpoint de exemplo. |

Para parar e iniciar novamente:

```bash
docker stop acervoarq
docker start acervoarq
```

Para apagar também o banco e os dados, remova o volume:

```bash
docker rm -f acervoarq
docker volume rm acervoarq-data
```
