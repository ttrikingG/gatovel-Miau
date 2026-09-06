# Miau Application Routes Specification

## 1. Objetivo

A camada Routes configura as rotas específicas da aplicação.

Local:

src/app/routes/

---

## 2. Responsabilidade

Routes é responsável por conectar:

URL → Page → Layout

O Router do Core continua sendo responsável pelo mecanismo
de roteamento.

A Application Layer apenas configura as rotas.

---

## 3. Não duplicar o Router

A camada Routes não deverá implementar um novo sistema de
roteamento.

Não deverá possuir:

- History API própria
- pushState próprio
- popstate próprio
- sistema próprio de matching
- armazenamento próprio de rotas

Essas responsabilidades pertencem ao:

src/nucleo/router/

---

## 4. AppRoutes

A primeira implementação será:

src/app/routes/AppRoutes.ts

AppRoutes será responsável por registrar as rotas da aplicação.

---

## 5. Primeira rota

A primeira rota será:

/

Essa rota deverá carregar:

Home

dentro de:

AppLayout

Arquitetura:

/
 ↓
Router
 ↓
AppRoutes
 ↓
AppLayout
 ↓
Home

---

## 6. Responsabilidades

AppRoutes poderá:

- Registrar rotas.
- Instanciar Pages.
- Instanciar Layouts.
- Montar a estrutura inicial da aplicação.

AppRoutes não deverá:

- Implementar Router.
- Implementar HTTP.
- Acessar banco de dados.
- Implementar regras de negócio.
- Implementar autenticação.

---

## 7. Inicialização

A aplicação deverá configurar as rotas através de uma função
ou método responsável pela configuração.

Exemplo:

AppRoutes.register();

Depois:

Router.start();

---

## 8. Primeira versão

A primeira versão possuirá somente:

/

Página:

Home

Layout:

AppLayout

---

## 9. Objetivo arquitetural

O Core fornece o mecanismo.

A Application Layer fornece a configuração.

Core:

Router

Application:

AppRoutes

---

## 10. Critérios de conclusão

- [ ] AppRoutes implementado.
- [ ] Utiliza Router do Core.
- [ ] Utiliza AppLayout.
- [ ] Utiliza Home.
- [ ] Rota / registrada.
- [ ] Aplicação inicia corretamente.
- [ ] TypeScript compila.
- [ ] Teste real no navegador funciona.