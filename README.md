# class.scheduler - API

## Stack
Typescript | Node | Fastify | DrizzleORM | MySQL | zod

### Instalação dos pacotes
  ```
  npm install
  ```

### Banco de dados em Docker
- O docker já cria o usuário "docker" com senha "docker", o banco "classscheduler" na porta "33066
  ```
  docker-compose up -d
  ```

### Variáveis de ambiente
- Crie um arquivo .env na raiz do projeto e coloque o seguinte conteúdo nele:
  ```
  API_BASE_URL="http://localhost:3333"
  MYSQL_URL=mysql://docker:docker@localhost:33066/classschedule
  JWT_SECRET="my-secret-key"
  ```

### Rodar a API
 ```
  npm run dev
 ```

### Caso precise rodar migrations
```
  npx drizzle-kit migrate
```
