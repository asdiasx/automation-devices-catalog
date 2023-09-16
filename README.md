# AutomationDevicesCatalog (Automagic-app)

## Automagic

Este projeto tem como objetivo implementar progressivamente e de forma didática uma aplicação web para controle de inventario de dispositivos de automação residencial (ex: consulta, cadastro, edição, remoção ).

O frontend da aplicação é desenvolvido com Angular e o backend é simulado pela implementação de uma API Fake, usando o JSON Server.

## [Link do video](https://youtu.be/WhowfSt4ElU) - Apresentação do Projeto

[![Link da Apresentação](https://img.youtube.com/vi/WhowfSt4ElU/0.jpg)](https://youtu.be/WhowfSt4ElU)

## [](https://github.com/asdias/aserdefinido---github-pages)Endereço de Deploy - GitHub Pages

[https://github.com/asdiasx/automation-devices-catalog](https://github.com/asdiasx/automation-devices-catalog)

## Protótipo

[Link para o protótipo no Figma](https://www.figma.com/file/213t22ANCcS5HWd8ZTy3ZZ/Automagic?type=design&node-id=1%3A2&mode=design&t=Y2zApc6BA09CQFqg-1)

## [](https://github.com/utfpr-gp/roubank-app/blob/master/README.md#checklist)Checklist

- [x] Criar o repositório no GitHub com a estrutura do Gitflow, ou seja, branches main e develop.
- [x] Usar componentes de algum framework CSS (Bootstrap, Materialize ou outro)
- [x] Apresentar as telas com layout responsivo usando ou não algum framework CSS.
- [x] Construir páginas web com o conceito de componentes.
- [x] Criar o layout da aplicação com componentes, ou seja, o cabeçalho e rodapé precisam ser componentes.
- [x] Usar pelo menos dois tipos de data-binding (Interpolation, Property Binding, Event Binding e Two Way Data Binding).
- [x] Passar dados via hierarquia de componentes, ou seja, usando @Input ou @Output.
- [x] Mapear componentes à rotas no módulo de rotas.
- [x] Criar navegação entre páginas por meio de rotas.
- [x] Passar dados entre componentes que representam diferentes telas via parâmetros de rotas.
- [x] Validar campos do formulário com REGEX e apresentar os erros.
- [x] Desabilitar o botão de submit enquanto o formulário está inválido.
- [x] Fazer requisições a API com tratamento da resposta com Promises ou Observables.
- [x] Cadastrar uma entidade no JSON Server.
- [x] Apresentar uma lista de dados com a diretiva estrutural ngFor.
- [x] Usar a diretiva ngIf
- [x] Formatar a apresentação de dados com Pipes.
- [x] Build e deploy da aplicação.

## [](https://github.com/utfpr-gp/roubank-app/blob/master/README.md#manual-de-execu%C3%A7%C3%A3o)Manual de execução

- Clonar o repositório com `git clone`
- Fazer checkout no branch `develop` que contém as modificações mais recentes
- Abrir o projeto no editor Visual Studio Code (VS Code)
- Abrir um terminal pelo VSCode ou qualquer terminal do seu Sistema Operacional apontando para o diretório raiz do projeto
- Instalar as dependências contidas no `package.json`
  - Comando: `npm i`
- (Opcional) Instalar o JSON Server globalmente disponível em `https://www.npmjs.com/package/json-server`
  - Comando: `npm i -g json-server`
  - É opcional porque a dependência já vem cadastrada no arquivo `package.json` para instalação local na pasta `node_modules`
- Executar a API Fake (JSON Server) via um dos seguintes comandos:
  - Execução via script registrado no `package.json`: `npm run json:server:routes`
  - Ou via Execução explícita: `json-server --watch db.json --routes routes.json`
- O comando para execução do JSON Server deve ser aplicado no diretório raiz do projeto, ou seja, que contém o arquivo `db.json` e `routes.json`.
  - Por padrão, a aplicação JSON Server executa no endereço `localhost:3000`
- Abrir um novo terminal pelo VSCode e então executar o projeto Angular
  - Comando: `ng s -o`
