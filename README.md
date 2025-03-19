# class.scheduler - API

## Stack
Node | Fastify | DrizzleORM | MySQL | zod

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
  JWT_SECRET_KEY="my-secret-key"
  
  DATABASE_URL="postgresql://postgres.wsoocvnhownwgfsgedwv:Sj8pPA7Lezz1uiab@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
  ```

### Rodar a API
 ```
  npm run dev
 ```

### Documentação
```
  http://localhost:3333/docs
 ```
