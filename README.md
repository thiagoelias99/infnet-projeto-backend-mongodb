# infnet-projeto-backend-typescript
 Repositório do projeto de curso de BackEnd com Typescript da Infnet.

## Descrição
A funcionalidade da API é gerenciar matrículas de estudante em determinados cursos. Os estudante podem realizar cadastro e inscrever nos cursos que estão em aberto. Os cursos somente podem ser gerenciados por um administrador.
Implementado um painel de admin utilizando biblioteca "adminJS" para gerenciamento dos cursos.
Implementado um bloco de anotações em cada cursos, com comunicação em tempo real utilizando sockets.
Utiliza banco de dados SQL (sqlite) para amarzenameto de dados de usuários e cursos.
Utiliza banco de dados NoSQL (mongoDB) para armazenamento dos blocos de anotações.

### Documentação com Swagger
![swagger](https://github.com/thiagoelias99/infnet-projeto-backend-mongodb/blob/main/utils/images/docs.png?raw=true)

### Admin Panel com Admin.JS
![admin](https://github.com/thiagoelias99/infnet-projeto-backend-mongodb/blob/main/utils/images/admin.png?raw=true)

### Informações do Estudante e Cursos
![studentsInfo](https://github.com/thiagoelias99/infnet-projeto-backend-mongodb/blob/main/utils/images/students.png?raw=true)

### Bloco de anotações do curso
![notes](https://github.com/thiagoelias99/infnet-projeto-backend-mongodb/blob/main/utils/images/notes.png?raw=true)

## **Instalação e Execução do BackEnd**
1. Renomear o arquivo ***"env.example"*** para ***"env"***.
2. Alterar as informações de conexão no arquivo ***.env*** e salvar.
3. Executar o comando para instalação do projeto
```
npm install
 ```
4. A criação do database e tabelas são feitas automaticamento no SGDB (*sqlite*) se não existir previamente.
5. Está configura por padrão para acessar o mongoDB no localhost.
6. Executar o projeto
```
npm start
```
- **Obs**: O servidor executa por padrão no endereço <http://localhost:3333/api/v1>.

7. Utilizar endereço **<http://localhost:3333/api/v1/docs/>** para acessar documentação ***SWAGGER*** com as rotas/endpoints.
8. Utilizar endereço **<http://localhost:3333/admin/>** para acessar a interface de administrador ***AdminJS***.
9. Utilizar endereço **<http://localhost:3333/login>** para acesar a página inicial.
10. Para acesso padrão de Administrador utilizar. Pode ser configurado no ***.env***
```
{
    "email": "admin@email.com",
    "password": "Admin123"
}
```
11. É utilizado JWT para autenticação. Retorno na rota ***"/login"***. Utilizar o ***Authorize*** do swagger para inserir o JWT.
12. Rotas privadas para gerenciamento de Student e Course só podem ser acessadas com usuário de Admin.
13. Students só têm acesso as rotas privadas ***/students/info***, ***/courses/info***, ***courses/{uuid}/subscribe*** e ***courses/{uuid}/unsubscribe***
14. Rotas ***subscribe*** e ***unsubscribe*** utilizam o UUID do curso e JWT do estudante para identificação.

## **Versões**
- Node.Js 18.16.0