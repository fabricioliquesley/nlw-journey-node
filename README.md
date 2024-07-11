# API - Planejador de viagens

### Sobre o projeto

Este projeto foi desenvolvido durante o ``NLW Journey`` evento de programação criado pela [Rocketseat](https://www.rocketseat.com.br/). Essa API pode ser utilizada para planejar e gerenciar viagens, permitido ao líder da viagem convidar participantes, cadastrar atividades que serão realizadas durante a viagem e cadastrar links importantes para a realização da viagem. 

#### A API disponibiliza as seguintes funcionalidades:

- [Criar uma viagem](#post-cadastro)
- [Confirmar viagem](#get-confirmar-viagem)
- [Confirmar presença em viagem](#get-confirmar-presença)
- [Criar uma atividade](#post-criar-atividade)
- [Listar atividades](#get-listar-atividades)
- [Criar link](#post-criar-link)
- [Listar links](#get-listar-links)
- [Listar participantes](#get-listar-participantes)
- [Criar convite](#post-criar-convite)
- [Atualizar viagem](#put-atualizar-viagem)
- [Buscar detalhes de uma viagem](#get-detalhes-da-viagem)
- [Buscar detalhes de um participante](#get-buscar-participante)

### 🛠 Tecnologias usadas

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### 📋 Como usar

#### 1 - Iniciando um repositório git

```
git init
```

#### 2 - Clone o repositório

```
git clone https://github.com/fabricioliquesley/nlw-journey-node.git
```

#### 3 - Instale as dependências

Na pasta do projeto execute o comando abaixo.

```
npm install
```

#### 4 - Configure as variáveis de ambiente

```env
DATABASE_URL="file:./dev.db"
API_BASE_URL="http://localhost:3333"
WEB_BASE_URL="http://localhost:3000"
PORT="3333"
```

#### 5 - Executando a API

```
npm run dev
```

## 🌐 Rotas da API

- ### viagem

  - #### [POST] Cadastro

    Rota usada para cadastrar uma nova viagem.

    ```url
    http://localhost:3333/trips
    ```

    Deve ser passado um `json` no corpo da requisição com as informações da viagem.

    ```json
    {
      "destination": "Gramado, RS",
      "starts_at": "2024-12-12T22:23:51.973Z",
      "ends_at": "2025-01-12T22:23:51.973Z",
      "owner_name": "Pedro Miguel",
      "owner_email": "pedro@gmail.com",
      "emails_to_envite": ["lucas@gmail.com", "matheus@gmail.com"]
    }
    ```

    ##### Resposta

    ```json
    {
      "trip": {
        "id": "4c4a7d1f-30fd-47d2-8e9a-a35156d31975",
        "destination": "Gramado, RS",
        "starts_at": "2024-12-12T22:23:51.973Z",
        "ends_at": "2025-01-12T22:23:51.973Z",
        "is_confirmed": false,
        "created_at": "2024-07-10T22:30:35.697Z"
      }
    }
    ```

  - #### [GET] Detalhes da viagem

    Rota usada para buscar os dados de uma viagem

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM
    ```

    ##### Resposta

    ```json
    {
      "trip": {
        "id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d",
        "destination": "Gramado, RS",
        "starts_at": "2024-12-10T22:23:51.973Z",
        "ends_at": "2025-01-12T22:23:51.973Z",
        "is_confirmed": true
      }
    }
    ```

  - #### [GET] Confirmar viagem

    Rota usada para marcar a viagem como confirmada

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/confirm
    ```

    > Apos confirmada a viagem a API envia convites via email para cada usuário informado durante a criação da viagem.

  - #### [PUT] Atualizar viagem

    Rota usada para atualizar os dados da viagem.

    > Deve ser passado um `json` no corpo da requisição com as informações atualizadas.

    ```url
      http://localhost:3333/trips/ID_DA_VIAGEM
    ```

    ```json
    {
      "destination": "Capitólio, MG",
      "starts_at": "2024-12-10T22:23:51.973Z",
      "ends_at": "2025-01-12T22:23:51.973Z"
    }
    ```

    ##### Resposta

    ```json
    {
      "updateTrip": {
        "id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d",
        "destination": "Capitólio, MG",
        "starts_at": "2024-12-10T22:23:51.973Z",
        "ends_at": "2025-01-12T22:23:51.973Z",
        "is_confirmed": true,
        "created_at": "2024-07-09T11:55:55.312Z"
      }
    }
    ```

- ### Participante

  - #### [POST] Criar convite

    Rota usada para convidar novos participantes para a viagem.

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/invite
    ```

    > Deve ser passado o email da pessoa convidada ao corpo da requisição via `json`.

    ```json
    {
      "email": "pedroherrique@emal.com"
    }
    ```

    ##### Resposta

    ```json
    {
      "participantId": "76d315e5-715e-408d-a0d7-d17fec8a4c5c"
    }
    ```

  - #### [GET] Confirmar presença

    Rota usada para marca a presença de um convidado na viagem.

    ```url
    http://localhost:3333/participants/ID_DO_PARTICIPANTE/confirm
    ```

  - #### [GET] Buscar participante

    Rota usada para buscar os dados de um participante.

    ```url
    http://localhost:3333/participants/ID_DO_PARTICIPANTE
    ```

    ##### Resposta

    ```json
    {
      "participant": {
        "id": "75040650-b8fa-49c6-af03-6c90a2f3c4b3",
        "name": "Pedro Miguel",
        "email": "pedro@email.com",
        "is_confirmed": true
      }
    }
    ```

  - #### [GET] Listar participantes

    Rota usada para listar todos os convidados de uma viagem.

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/participants
    ```

    ##### Resposta

    ```json
    "participants": [
      {
        "id": "75040650-b8fa-49c6-af03-6c90a2f3c4b3",
        "name": "Pedro Miguel",
        "email": "pedro@email.com",
        "is_confirmed": true
      },
      {
        "id": "8122aea3-a810-4029-8ff3-bb5fbbbdc22b",
        "name": null,
        "email": "lucas@gmail.com",
        "is_confirmed": false
      },
    ]
    ```

- ### Links

  - #### [POST] Criar link

    Rota usada para cadastrar links importantes para a viagem.

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/links
    ```

    > Deve ser passado um `json` no corpo da requisição com as informações do link.

    ```json
    {
      "title": "Compra de ingresso do museu",
      "url": "https://museu.com/ticket"
    }
    ```

    ##### Resposta

    ```json
    {
      "link": {
        "id": "c3cb8627-9919-4ab0-a3cc-d525603c53be",
        "title": "Compra de ingresso do museu",
        "url": "https://museu.com/ticket",
        "trip_id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d"
      }
    }
    ```

  - #### [GET] Listar links

    Rota usada listar todos os links importantes da viagem.

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/links
    ```

    ##### Resposta

    ```json
    {
      "links": [
        {
          "id": "c3cb8627-9919-4ab0-a3cc-d525603c53be",
          "title": "Compra de ingresso do museu",
          "url": "https://museu.com/ticket",
          "trip_id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d"
        },
        {
          "id": "c3cb8627-9919-4ab0-a3cc-d525603c53be",
          "title": "Compra de ingresso do aquário",
          "url": "https://aqua.com/ticket",
          "trip_id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d"
        }
      ]
    }
    ```

- ### Atividades

  - #### [POST] Criar atividade

    Rota usada para cadastrar as atividades que serão realizadas durante a viagem.

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/activities
    ```

    > Deve ser passado um `json` com as informações da atividade.

    ```json
    {
      "title": "Atividade 6",
      "occurs_at": "2024-12-20T22:23:51.973Z"
    }
    ```

    ##### Resposta

    ```json
    {
      "activity": {
        "id": "e6695be1-be8b-44ad-8171-77f00515b660",
        "title": "Atividade 6",
        "occurs_at": "2024-12-20T22:23:51.973Z",
        "trip_id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d"
      }
    }
    ```

  - #### [GET] Listar atividades

    Rota usada para listar todas as atividades que serão realizadas durante a viagem.

    ```url
    http://localhost:3333/trips/ID_DA_VIAGEM/activities
    ```

    ##### Resposta

    > Retorna as atividades ordenadas por data de realização.

    ```json
    {
      "activities": [
        {
          "date": "2024-12-30T22:23:51.973Z",
          "activities": []
        },
        {
          "date": "2024-12-31T22:23:51.973Z",
          "activities": [
            {
              "id": "b5b505bd-6211-4162-8486-c0bbcc8a95ef",
              "title": "Visita ao museu",
              "occurs_at": "2024-12-31T22:23:51.973Z",
              "trip_id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d"
            }
          ]
        },
        {
          "date": "2025-01-01T22:23:51.973Z",
          "activities": [
            {
              "id": "69d48c2f-32fd-4fdf-a010-0595170c2f05",
              "title": "Visita ao aquário",
              "occurs_at": "2025-01-01T22:23:51.973Z",
              "trip_id": "f13bb3f5-f1f0-4e2b-bdfd-0fdfbf13b49d"
            }
          ]
        }
      ]
    }
    ```
