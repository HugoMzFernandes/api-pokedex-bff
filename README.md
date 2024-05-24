# Pokedex BFF API | Node + NestJS + Typescript + Redis

<div align="center">
  Aplicação BFF onde é possível pesquisar pokémons pelo nome, obter suas informações e cachear os resultados.
</div>

## Tecnologias
- [Node](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [Redis](https://redis.io/)
- [Jest](https://jestjs.io/)


## Buildar e executar o Pokedex BFF API localmente

Para builda e executar o Pokedex localmente, garanta que você tenha [Git](https://git-scm.com/downloads) e [Node.js](https://nodejs.org/) instalados e siga as instruções abaixo.

1. Clone o código fonte:

```
git clone https://github.com/HugoMzFernandes/api-pokedex-bff
```

2. (Opcional) Instale a versão correta do node(v16.17.1) usando [nvm](https://github.com/nvm-sh/nvm):

```
nvm install 16.17.1
```

3. Instale as depedências

```
npm install
```

4. Rode o servidor local de desenvolvimento:

```
npm run start:dev
```

5. Defina as variaveis de ambiente em [dotenv](https://www.npmjs.com/package/dotenv) na raiz do projeto
> [!IMPORTANT]
> O Redis está configurado em uma URL de desenvolvimento, nāo sendo necessário a configuraçāo localmente.

> [!IMPORTANT]
> O BFF API Pokedex agora está em execução e pode ser acessado no [http://localhost:3000/](http://localhost:3000/)

## Documentação

Para acessar a documentação do BFF API basta acessar [http://localhost:3000/api](http://localhost:3000/api)

## Testes

A cobertura de testes automatizados vem na forma de testes unitários.

### e2e e visual
Os testes unitários foram escritos em [Jest](https://jestjs.io/)

Para executar a suite de testes unitários:

`npm run test`

Para executar a suite de testes unitários com as métricas de cobertura

`npm run test:cov`






