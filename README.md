# POC de Micro Frontends com [Module Federation](https://webpack.js.org/concepts/module-federation/)

# Mesuda

docker run -p 3050:3000 -it scriptedalchemy/mf-dashboard:latest

# Setup

1. Host: 
    
    Responsavel por carregar as aplicações dos containers remotos.
    Fornece uma interface de comunicaçao entre o Host e a aplicação.
    Utiliza o React 17.0.0

2. App1:

    App de exemplo que utiliza a interface de comunicaçao do fornecida pelo Host
    Utiliza o React 17.0.2

3. App2:

    App de exemplo que utiliza a interface de comunicaçao do fornecida pelo Host
    Utiliza o React 16.13.0

# TODO

- Migrar o Host para TS
- Criar uma lib comum entre o App1 e App2 e consumila também pelo module federation
- Implementar algo mais complexo para validar melhor a poc nas aplicações (rotas, etc)

# Conclusão

Dessa maneira é possivel utilizar essa abordagem para construir:

1. Um backend que controle as dependencias remotas de cada aplicação
2. Um host que teria itens comuns como autenticação, notificacoes, etc e carregaria as aplicações remotas, consumiria o backend para saber quais aplicações carregar.
3. Várias aplicações remotas, com liberdade quanto a versionamento de bibliotecas.
4. Construir uma biblioteca comum de componentes/services e atualiza-la em todos por meio do backend.
