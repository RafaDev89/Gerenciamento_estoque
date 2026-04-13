# Gerenciamento de Estoque

Aplicacao web para gerenciamento de estoque com controle de usuarios, produtos e transacoes, desenvolvida com Vue 3 + TypeScript.

## Visao geral

O sistema permite:

- Cadastro, edicao e exclusao de usuarios
- Cadastro, edicao e exclusao de produtos
- Registro de transacoes de compra/venda com validacao de estoque
- Controle de acesso por perfil (administrador e cliente)
- Persistencia local dos dados via localStorage

## Tecnologias

- Vue 3 (Composition API + script setup)
- TypeScript
- Vite
- Vue Router
- Bootstrap 5

## Requisitos

- Node.js: `^20.19.0` ou `>=22.12.0`
- npm: versao compativel com a instalacao do Node.js

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Rode em ambiente de desenvolvimento:

```bash
npm run dev
```

3. Gere build de producao:

```bash
npm run build
```

4. Visualize a build localmente:

```bash
npm run preview
```

## Scripts disponiveis

- `npm run dev`: inicia servidor de desenvolvimento (Vite)
- `npm run build`: executa type-check e gera build de producao
- `npm run preview`: sobe servidor para validar a build gerada
- `npm run type-check`: valida tipagem com vue-tsc

## Estrutura do projeto

```text
src/
  components/
    admin/
    common/
    layout/
    user/
  router/
  stores/
  views/
  App.vue
  main.ts
```

## Arquitetura e organizacao

- `stores/useInventoryStore.ts`
  - Estado global reativo (usuarios, produtos, transacoes, usuario atual)
  - Regras de negocio (CRUD, selecao de usuario, validacao e execucao de transacoes)
  - Persistencia em localStorage

- `views/`
  - Paginas principais: Home, Admin e Usuario
  - Organizacao por fluxo de uso

- `components/`
  - Componentes reutilizaveis para formularios, tabelas, cards e layout
  - Reducao de duplicacao e melhor manutencao

## Regras de negocio importantes

- Transacoes so sao executadas com usuario valido e quantidade positiva
- Compra/venda so acontece quando ha estoque suficiente
- Ao remover produto, transacoes relacionadas sao removidas
- Ao remover usuario atual, o sistema seleciona outro usuario disponivel

## Qualidade e manutencao

- Tipagem forte com TypeScript
- Componentizacao para reuso e clareza
- Fluxo de dados centralizado no store

## Melhorias futuras

- Integracao com backend/API
- Autenticacao de usuarios
- Relatorios e filtros avancados
- Testes unitarios e de integracao

## Licenca

Projeto para fins academicos e demonstracao tecnica.
