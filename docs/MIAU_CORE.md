# MIAU CORE

## Especificação dos Módulos — v1

### 1. Objetivo

O `src/nucleo` contém o código interno responsável pelo funcionamento do Miau.

```text
src/
└── nucleo/
```

O núcleo deve fornecer somente as funcionalidades necessárias para que uma aplicação Miau funcione.

A aplicação utiliza o núcleo, mas não deve precisar conhecer sua implementação interna.

---

# 2. Estrutura oficial

A estrutura inicial do núcleo será:

```text
src/
└── nucleo/
    ├── component/
    ├── dom/
    ├── events/
    ├── http/
    ├── router/
    ├── state/
    └── ...
```

O `...` representa módulos que poderão ser adicionados futuramente somente quando houver necessidade real.

Não vamos preencher o núcleo antecipadamente com funcionalidades desnecessárias.

---

# 3. Component

```text
src/nucleo/component/
```

Responsável pelo sistema de componentes do Miau.

O componente será a unidade básica de construção da interface.

Responsabilidades:

* criação de componentes;
* montagem;
* atualização;
* desmontagem;
* ciclo de vida, quando necessário;
* comunicação entre componentes.

Exemplo conceitual:

```text
Component
    ↓
render
    ↓
DOM
```

O desenvolvedor utilizará esse sistema através de:

```text
src/app/components/
```

---

# 4. DOM

```text
src/nucleo/dom/
```

Responsável pelas operações internas relacionadas ao DOM.

Responsabilidades:

* criação de elementos;
* manipulação de elementos;
* atualização de conteúdo;
* atributos;
* classes;
* inserção e remoção de elementos.

O objetivo é centralizar operações comuns do Miau sem esconder o funcionamento do DOM do desenvolvedor.

Conceitualmente:

```text
Miau
  ↓
DOM API
  ↓
Browser
```

---

# 5. Events

```text
src/nucleo/events/
```

Responsável pelo sistema interno de eventos do Miau.

Responsabilidades:

* registro de eventos;
* remoção de eventos;
* disparo de eventos;
* comunicação entre partes da interface quando necessário.

Exemplos de eventos:

```text
click
submit
change
input
load
```

O Miau utilizará os eventos nativos do navegador sempre que possível.

---

# 6. HTTP

```text
src/nucleo/http/
```

Responsável pela comunicação HTTP.

O módulo deve permitir que a aplicação consuma APIs externas.

Responsabilidades:

* GET;
* POST;
* PUT;
* PATCH;
* DELETE;
* headers;
* JSON;
* tratamento básico de respostas;
* erros HTTP.

Exemplo conceitual:

```text
App Service
     ↓
Miau HTTP
     ↓
HTTP
     ↓
Backend
```

O módulo não conhecerá:

* Gatovel;
* Node;
* PHP;
* Java;
* Python;
* banco de dados.

Ele trabalha somente com HTTP.

---

# 7. Router

```text
src/nucleo/router/
```

Responsável pelo sistema de roteamento do Miau.

O núcleo fornece o mecanismo.

A aplicação define as rotas.

```text
src/nucleo/router/
        ↓
mecanismo

src/app/routes/
        ↓
rotas da aplicação
```

Exemplo conceitual:

```text
/
/login
/register
/dashboard
/about
```

Responsabilidades:

* registrar rotas;
* identificar a rota atual;
* navegar;
* alterar a URL;
* executar a página correspondente.

---

# 8. State

```text
src/nucleo/state/
```

Responsável pelo mecanismo de gerenciamento de estado.

O núcleo fornece a infraestrutura.

A aplicação define os estados.

```text
src/nucleo/state/
        ↓
mecanismo de estado

src/app/state/
        ↓
estado da aplicação
```

Exemplo:

```text
AuthState
UserState
CartState
```

O sistema deve ser simples.

Não devemos criar uma solução de gerenciamento de estado semelhante às bibliotecas complexas existentes se isso não for necessário.

---

# 9. Módulo de renderização

A renderização faz parte do funcionamento central do Miau.

Inicialmente, não será criado obrigatoriamente um diretório separado:

```text
src/nucleo/render/
```

A renderização será definida em conjunto com o sistema de componentes e DOM.

Somente se a implementação demonstrar que a separação é necessária será criado um módulo específico.

Essa decisão evita criar abstrações antecipadamente.

---

# 10. Templates

O Miau não terá inicialmente um sistema de templates complexo.

Não queremos criar algo semelhante a:

```text
Blade
Twig
JSX
Vue Templates
```

sem necessidade.

A primeira versão deve trabalhar de maneira próxima ao JavaScript/TypeScript e ao DOM.

Uma solução específica de templates somente será criada se houver uma necessidade arquitetural clara.

---

# 11. Estado global

O Miau terá suporte ao gerenciamento de estado, mas não assumirá que toda aplicação precisa de um estado global.

A preferência será:

```text
Estado local
     ↓
quando necessário
     ↓
Estado compartilhado
     ↓
quando realmente necessário
     ↓
Estado global
```

Isso mantém o framework simples.

---

# 12. Comunicação entre componentes

O sistema de componentes poderá utilizar:

```text
Props
Events
State
```

A arquitetura não deve criar um sistema complexo de comunicação entre componentes.

A regra será utilizar primeiro os mecanismos mais simples.

---

# 13. Dependência do navegador

O Miau é um framework frontend.

Portanto, o núcleo poderá utilizar APIs nativas do navegador.

Exemplos:

```text
document
window
fetch
URL
history
localStorage
sessionStorage
Event
CustomEvent
```

Não existe necessidade de reinventar APIs que o navegador já fornece adequadamente.

---

# 14. Dependências externas

O Core deve possuir o mínimo possível de dependências externas.

Preferência:

```text
Miau
   ↓
TypeScript
   ↓
Web APIs
```

Em vez de:

```text
Miau
   ↓
biblioteca A
   ↓
biblioteca B
   ↓
biblioteca C
   ↓
biblioteca D
```

O objetivo é manter o Miau pequeno e controlável.

---

# 15. Relação Core → App

A arquitetura será:

```text
                 MIAU

              src/nucleo
                   │
          fornece mecanismos
                   │
                   ▼
               src/app
                   │
          cria a aplicação
```

O desenvolvedor utiliza o Core.

O desenvolvedor não deve modificar o Core para implementar funcionalidades normais da aplicação.

---

# 16. Relação App → Backend

A aplicação utiliza os serviços do Miau:

```text
src/app/services/
          │
          ▼
src/nucleo/http/
          │
          ▼
       HTTP/JSON
          │
          ▼
       Backend
```

O backend pode ser Gatovel ou qualquer outro sistema compatível.

---

# 17. Integração com Gatovel

A integração com Gatovel não ficará espalhada pelo Core.

O objetivo é manter:

```text
Miau Core
    ↓
independente

Gatovel Integration
    ↓
camada específica
```

Dessa maneira:

```text
Gatovel
   │
   ▼
Miau Integration
   │
   ▼
Miau Core
```

O Core continua reutilizável.

---

# 18. Módulos obrigatórios da v1

A primeira versão do Core será construída em torno destes módulos:

```text
src/nucleo/
├── component/
├── dom/
├── events/
├── http/
├── router/
└── state/
```

Esses são os módulos fundamentais.

---

# 19. Módulos que NÃO serão criados inicialmente

Não vamos criar na v1:

```text
src/nucleo/
├── animation/
├── forms/
├── validation/
├── i18n/
├── websocket/
├── cache/
├── storage/
├── notification/
├── accessibility/
├── plugin/
└── ...
```

Isso não significa que essas funcionalidades nunca existirão.

Significa apenas que **não serão colocadas no Core antes de existir uma necessidade real**.

---

# 20. Regra para novos módulos

Um novo módulo somente poderá entrar no Core quando:

1. existir uma necessidade real;
2. a responsabilidade estiver claramente definida;
3. a funcionalidade não pertencer a `app`;
4. a funcionalidade não puder ser resolvida adequadamente por um módulo existente;
5. a inclusão não tornar o Miau desnecessariamente complexo.

---

# 21. Visão do Core

A arquitetura inicial:

```text
                         MIAU CORE
                             │
       ┌─────────────┬───────┼───────┬─────────────┐
       │             │       │       │             │
       ▼             ▼       ▼       ▼             ▼
   Component        DOM    Events   HTTP         Router
       │             │       │       │             │
       └─────────────┴───────┴───────┴─────────────┘
                             │
                             ▼
                           State
```

O Core fornece os mecanismos.

A aplicação combina esses mecanismos para construir sua interface.

---

# 22. Filosofia do Core

O Miau Core deve seguir uma regra simples:

> **Fornecer mecanismos, não impor a aplicação.**

O Core sabe:

```text
como criar componente
como manipular DOM
como tratar eventos
como fazer HTTP
como navegar
como controlar estado
```

Mas não sabe:

```text
qual é a aplicação
qual é o usuário
qual é o produto
qual é a página
qual é a API específica
qual é o backend
```

Essas responsabilidades pertencem à aplicação.

---

# 23. Estado da especificação

```text
MIAU CORE v1

[✓] Component
[✓] DOM
[✓] Events
[✓] HTTP
[✓] Router
[✓] State

[ ] API pública
[ ] Contratos dos módulos
[ ] Sistema de componentes
[ ] Sistema de renderização
[ ] Sistema de roteamento
[ ] Sistema de estado
[ ] Cliente HTTP
[ ] Integração Gatovel
[ ] CLI
```

---

# 24. Regra arquitetural final

O Miau deve permanecer pequeno.

A arquitetura não deve crescer porque "um framework precisa ter".

Ela deve crescer somente quando o próprio desenvolvimento demonstrar uma necessidade.

```text
Necessidade
    ↓
Análise
    ↓
Responsabilidade
    ↓
Módulo
    ↓
Implementação
```

Nunca:

```text
Módulo
    ↓
vamos descobrir depois para que serve
```

**Fim da especificação do Miau Core v1.**
