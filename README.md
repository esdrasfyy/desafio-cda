# Desafio para Vaga de Desenvolvedor FullStack na Empresa Cidade Alta

## Sobre o Projeto

Este projeto é um desafio para a vaga de Desenvolvedor FullStack na empresa Cidade Alta. A aplicação consiste em um sistema de login com OAuth e/ou credenciais tradicionais, onde os dados dos usuários são protegidos utilizando cookies com a flag `httpOnly`. O dashboard apresenta informações do usuário logado, permitindo editar dados como email com confirmação de alteração. Além disso, há um ranking global e a funcionalidade de resgatar emblemas aleatórios.

## Sobre a Experiência Adquirida no Projeto

Durante este projeto, pude expandir significativamente meu conhecimento em desenvolvimento backend utilizando Node.js. Enquanto anteriormente estava familiarizado com o uso do Express puro e Sequelize/Mongoose para ORM, este projeto introduziu-me ao NestJS e ao ORM Prisma. A transição foi desafiadora, porém extremamente enriquecedora, permitindo-me explorar novos paradigmas e metodologias no desenvolvimento de APIs.

No frontend, senti-me completamente à vontade trabalhando com React e ChakraUI. Com experiência prévia e diária nessas ferramentas, pude concentrar-me em criar uma interface robusta e responsiva para o aplicativo. Foi gratificante poder aplicar meu conhecimento existente de forma tão eficaz neste projeto.

## Considerações Finais

Considero que o sistema poderia alcançar um nível ainda maior de segurança ao adotar Next.js para o frontend. O server-side rendering oferecido pelo Next.js proporcionaria vantagens significativas, como a manipulação de rotas através de middleware no servidor, além de permitir o armazenamento de cookies httpOnly no servidor do Next.js, reduzindo assim a carga no servidor NestJS. Além disso, o cacheamento oferecido pelo Next.js poderia ser aproveitado para melhorar ainda mais o desempenho e a eficiência das requisições.

Planejo continuar atualizando este repositório regularmente, realizando refatorações de código e aprimorando o design do sistema. A proposta do projeto me cativou desde o início, e estou ansioso para expandir e aperfeiçoar ainda mais este projeto.

- **Clone**: "[text](https://github.com/esdrasfyy/desafio-cda.git)"

## Funcionalidades Implementadas

- **Login**: Autenticação utilizando OAuth e/ou credenciais tradicionais.
- **Proteção de Dados**: Utilização de cookies com a flag `httpOnly` para proteger os dados dos usuários.
- **Dashboard**: Exibe informações do usuário logado.
- **Edição de Usuário**: Permite editar o perfil do usuário, com confirmação de alteração no email.
- **Ranking Global**: Mostra a posição do usuário em um ranking global.
- **Resgate de Emblemas**: Funcionalidade para resgatar emblemas aleatórios.

## Futuras Implementações

Estas são algumas das funcionalidades que planejo implementar futuramente:

- **Mais Jogos**: Implementação de mais 3 jogos, como jogo de digitação, jogo da memória e miner.
- **Pesquisa de Usuário**: Sistema para buscar e visualizar perfis de outros usuários.
- **Compra de Emblemas**: Funcionalidade para os usuários comprarem emblemas adicionais.
- **Esqueci Minha Senha**: Recuperação de senha com confirmação via email.
- **Escalabilidade**: Refatoração, testes automatizados, documentação abrangente e deployment em ambiente de produção.

Esta versão inicial é simplificada em relação ao plano completo. A falta de testes, refatoração, documentação detalhada e deployment em produção serão abordados em fases futuras do desenvolvimento.

## Instalação

Para executar este projeto, siga as instruções nos respectivos READMEs do frontend e do backend:

- [README do Frontend](./frontend/README.md)
- [README do Backend](./frontend/README.md)

Lembre-se de configurar os arquivos `.env` de acordo com o `.env.example` fornecido para fins de teste. Lembrando que nos .env.example são todos os dados para fins de teste dos recrutadores, por conta de não existir o app em produção.
