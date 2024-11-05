## Backend - Wefit

Seja bem vindo ao teste de backend da Wefit.

### Antes de iniciar o banco de dados e o servidor, é necessário rodar o comando:

    npx prisma generate

### Logo após, para iniciar o banco de dados e o servidor é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e um serviço para o servidor backend usando uma imagem node, e você poderá acessar o banco de dados via localhost:3306 e a senha do usuário **root** é **senha_root_123**, já o servidor, pode ser acessado através da url localhost:3001

### Após rodar o comando acima, é necessário rodar o comando:

    docker exec -it wefit-backend /bin/sh

### e logo após:

    npx prisma migrate dev

Isso vai fazer com que você acesse o shell do container, para então rodar o comando que irá executar as migrations do prisma no banco de dados.

### Para acessar a documentação da API, use a url:

http://localhost:3001/api

Depois que concluir seu teste não de enviar o seu código junto a pasta data, nela está salvo o volume do MySQL criado pelo docker.

Boa sorte =)
