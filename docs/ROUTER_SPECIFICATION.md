# Miau Router Specification

## 1. Objetivo

O módulo Router fornece uma API simples para controlar a navegação entre páginas de uma aplicação Web sem recarregar o documento.

O Router utiliza as APIs nativas do navegador, principalmente:

- URL
- History API
- window.location
- history.pushState()
- history.replaceState()
- popstate

Local:

src/nucleo/router/

---

## 2. Princípios

O módulo Router deve seguir:

- Simplicidade
- API pequena
- Baixo acoplamento
- TypeScript
- APIs nativas do navegador
- Nenhuma dependência externa
- Nenhuma dependência do Gatovel
- Comportamento previsível

O Router deve fornecer mecanismos de navegação, não impor a estrutura da aplicação.

---

## 3. Responsabilidades

O módulo Router será responsável por:

- Registrar rotas
- Identificar a rota atual
- Navegar entre rotas
- Atualizar a URL
- Utilizar History API
- Responder ao botão voltar do navegador
- Responder ao botão avançar do navegador
- Executar o handler associado à rota

---

## 4. Localização

A implementação ficará em:

src/nucleo/router/Router.ts

---

## 5. Conceito de rota

Uma rota será definida por:

- Path
- Handler

Exemplo:

Router.add('/', () => {
    console.log('Home');
});

Router.add('/about', () => {
    console.log('About');
});

---

## 6. API inicial

A classe Router deverá possuir:

add(
    path: string,
    handler: () => void
): void

start(): void

navigate(path: string): void

current(): string

---

## 7. Comportamento

### 7.1 add()

Registra uma rota no Router.

Exemplo:

Router.add('/home', () => {
    console.log('Home page');
});

O Router deverá armazenar o path e seu respectivo handler.

---

### 7.2 start()

Inicia o Router.

Ao iniciar, deverá:

1. Identificar a URL atual.
2. Procurar uma rota correspondente.
3. Executar o handler da rota.
4. Registrar o listener para popstate.

---

### 7.3 navigate()

Realiza navegação para uma rota registrada.

Deve utilizar:

history.pushState()

Depois da alteração da URL, o Router deverá executar o handler correspondente.

Exemplo:

Router.navigate('/about');

A página não deve ser recarregada.

---

### 7.4 current()

Deve retornar o path atual da aplicação.

Exemplo:

const path = Router.current();

Resultado:

/about

---

## 8. History API

O Router deverá utilizar a History API nativa do navegador.

Para navegação:

history.pushState()

Para alterações que não devem criar uma nova entrada:

history.replaceState()

A primeira versão utilizará principalmente pushState().

---

## 9. Popstate

O Router deverá registrar:

window.addEventListener('popstate', ...)

Isso permitirá detectar:

- Botão voltar
- Botão avançar

Quando o evento ocorrer, o Router deverá identificar a nova URL e executar o handler correspondente.

---

## 10. Rotas não encontradas

Quando uma rota não estiver registrada, o Router deverá gerar um erro.

Exemplo:

Router.navigate('/unknown');

Resultado esperado:

Error: Route not found: /unknown

A primeira versão não possuirá automaticamente uma rota 404.

---

## 11. Rotas duplicadas

Não será permitido registrar duas rotas com o mesmo path.

Exemplo:

Router.add('/home', handler1);

Router.add('/home', handler2);

O Router deverá gerar um erro informando que a rota já está registrada.

---

## 12. Navegação

A navegação será feita utilizando paths.

Exemplos:

/
/about
/login
/dashboard
/users

A primeira versão não terá suporte a:

- Parâmetros dinâmicos
- Query parameters automáticos
- Wildcards
- Route groups
- Middleware
- Guards
- Nested routes

Esses recursos poderão ser adicionados futuramente caso exista necessidade real.

---

## 13. Backend

O Router não deve conhecer:

- Gatovel
- Laravel
- Node.js
- Java
- PHP
- APIs específicas

A responsabilidade do Router termina na navegação do frontend.

Arquitetura:

Application
    ↓
Router
    ↓
History API
    ↓
Browser

---

## 14. Relação com Component

O Router poderá futuramente trabalhar em conjunto com Component.

Porém:

Router não deve depender de Component.

A aplicação será responsável por decidir o que renderizar quando uma rota for executada.

Exemplo:

Router.add('/home', () => {
    const component = new HomeComponent();

    component.mount(document.body);
});

---

## 15. Limites do módulo

A primeira versão não deverá possuir:

- Dynamic routes
- Route parameters
- Route guards
- Middleware
- Nested routes
- Lazy loading
- Code splitting
- Automatic page rendering
- Authentication system
- Authorization system
- Global state
- API requests

Essas responsabilidades pertencem a outros módulos ou poderão ser adicionadas posteriormente.

---

## 16. Princípio arquitetural

O Router deve fornecer mecanismos de navegação, não controlar a aplicação.

A aplicação decide:

- O que cada rota representa.
- Qual componente será utilizado.
- Qual conteúdo será exibido.
- Como a página será construída.

O Router apenas conecta:

URL → Handler

---

## 17. Critérios de conclusão

O módulo Router será considerado concluído quando:

- [ ] Router.ts estiver implementado
- [ ] add() funcionar
- [ ] start() funcionar
- [ ] navigate() funcionar
- [ ] current() funcionar
- [ ] pushState() funcionar
- [ ] popstate funcionar
- [ ] Rotas inexistentes gerarem erro
- [ ] Rotas duplicadas gerarem erro
- [ ] TypeScript compilar sem erros
- [ ] Teste real no navegador funcionar

---

## 18. Próximo módulo

Após a implementação e validação do Router:

src/nucleo/state/