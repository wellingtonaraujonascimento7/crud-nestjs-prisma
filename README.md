# CRUD NestJS + Prisma + SQLite

API REST completa construída com NestJS, Prisma ORM e SQLite, implementando autenticação JWT e validação robusta com Zod.

## 📋 Sobre o Projeto

Este projeto é uma API REST que demonstra as melhores práticas de desenvolvimento backend usando o ecossistema NestJS. O objetivo é fornecer uma base sólida e escalável para aplicações que necessitam de:

- **CRUD completo de usuários**
- **Autenticação e autorização** com JWT
- **Validação de dados** robusta e type-safe
- **Persistência de dados** com Prisma ORM
- **Arquitetura modular** e testável

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para aplicações server-side
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript e Node.js
- **[SQLite](https://www.sqlite.org/)** - Banco de dados embutido e leve
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash de senhas seguro

## 🏗️ Arquitetura e Estrutura

O projeto segue a arquitetura modular do NestJS, com separação clara de responsabilidades:

```
src/
├── auth/                    # Módulo de autenticação
│   ├── decorators/         # Decorators customizados (@Public)
│   ├── dto/                # DTOs e schemas de validação
│   ├── auth.controller.ts  # Endpoints de autenticação
│   ├── auth.service.ts     # Lógica de negócio de autenticação
│   └── auth.guard.ts       # Guard JWT global
├── user/                    # Módulo de usuários
│   ├── dto/                # DTOs e schemas de validação
│   ├── entities/           # Entidades do domínio
│   ├── user.controller.ts  # Endpoints CRUD de usuários
│   └── user.service.ts     # Lógica de negócio de usuários
├── prisma/                  # Módulo Prisma
│   └── prisma.service.ts   # Serviço de conexão com banco
├── common/                  # Recursos compartilhados
│   └── pipes/              # Pipes customizados (ZodValidationPipe)
└── main.ts                 # Ponto de entrada da aplicação
```

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Autorização

- **JWT Guards Globais**: Proteção automática de todas as rotas
- **Decorator @Public**: Permite marcar rotas públicas (ex: login, cadastro)
- **Hash de Senhas**: Bcrypt com salt para segurança máxima
- **Tokens JWT**: Geração e validação de tokens de acesso

### ✅ Validação com Zod

Implementação de validação type-safe usando Zod em todos os endpoints:

- **ZodValidationPipe**: Pipe customizado e reutilizável
- **Schemas declarativos**: Definição clara de regras de validação
- **Mensagens de erro detalhadas**: Feedback preciso sobre falhas de validação
- **Type Inference**: Tipos TypeScript gerados automaticamente dos schemas

**Exemplo de validação:**

```typescript
const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});
```

### 👥 CRUD de Usuários

- **POST /users** - Criar usuário (público, com hash de senha)
- **GET /users** - Listar todos os usuários (protegido)
- **GET /users/:id** - Buscar usuário por ID (protegido)
- **PATCH /users/:id** - Atualizar usuário (protegido)
- **DELETE /users/:id** - Remover usuário (protegido)

### 🔑 Autenticação

- **POST /auth/login** - Login com email e senha (público)

## 📦 Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd crud-nestjs-prisma

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate dev

# (Opcional) Abrir Prisma Studio para visualizar dados
npx prisma studio
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./prisma/db/dev.db"
JWT_SECRET="sua-chave-secreta-super-segura"
```

## 🎯 Executando o Projeto

```bash
# Modo desenvolvimento (com watch)
npm run start:dev

# Modo produção
npm run build
npm run start:prod

# Modo debug
npm run start:debug
```

A API estará disponível em `http://localhost:3000`

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📚 Endpoints da API

### Autenticação

| Método | Endpoint      | Descrição        | Auth |
| ------ | ------------- | ---------------- | ---- |
| POST   | `/auth/login` | Login de usuário | Não  |

**Exemplo de requisição de login:**

```json
{
    "email": "user@example.com",
    "password": "senha123"
}
```

### Usuários

| Método | Endpoint     | Descrição             | Auth |
| ------ | ------------ | --------------------- | ---- |
| POST   | `/users`     | Criar novo usuário    | Não  |
| GET    | `/users`     | Listar todos usuários | Sim  |
| GET    | `/users/:id` | Buscar usuário por ID | Sim  |
| PATCH  | `/users/:id` | Atualizar usuário     | Sim  |
| DELETE | `/users/:id` | Deletar usuário       | Sim  |

**Exemplo de criação de usuário:**

```json
{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
}
```

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt (salt rounds: 10)
- ✅ Validação de entrada em todos os endpoints
- ✅ JWT com expiração configurável
- ✅ Guards globais para proteção de rotas
- ✅ Sanitização automática de dados via Zod

## 🛠️ Boas Práticas Implementadas

1. **Separação de Responsabilidades**: Módulos, controllers, services e repositories bem definidos
2. **Validação Type-Safe**: Uso de Zod para validação em runtime com inferência de tipos
3. **DTOs com Schemas**: Tipos TypeScript gerados automaticamente dos schemas Zod
4. **Guards Globais**: Proteção de rotas centralizada e declarativa
5. **Error Handling**: Tratamento consistente de erros com mensagens descritivas
6. **Import Types**: Uso de `import type` para evitar problemas com decorators

## 📖 Aprendizados e Conceitos

Este projeto demonstra:

- **Dependency Injection** do NestJS
- **Decorators** customizados (@Public)
- **Pipes** para transformação e validação de dados
- **Guards** para autorização
- **Prisma Migrations** para versionamento de schema
- **Schema Validation** com Zod
- **JWT Authentication** com @nestjs/jwt
- **Type Safety** em toda a aplicação

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests para melhorias!

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
