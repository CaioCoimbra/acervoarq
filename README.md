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
