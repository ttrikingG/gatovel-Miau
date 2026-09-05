# Miau Component Specification

## 1. Objetivo

O módulo `component` é responsável pelo sistema básico de componentes do Miau.

Um componente representa uma unidade de interface que pode:

* gerar elementos HTML;
* ser montada no DOM;
* ser atualizada;
* ser desmontada;
* possuir um ciclo de vida previsível.

O módulo deve permanecer pequeno e independente.

---

## 2. Localização

```text
src/nucleo/component/
└── Component.ts
```

---

## 3. Princípios

O sistema de componentes do Miau deve seguir os seguintes princípios:

* simplicidade;
* previsibilidade;
* baixo acoplamento;
* uso do DOM nativo;
* TypeScript;
* API pequena;
* nenhuma dependência de Gatovel;
* nenhuma dependência de frameworks externos.

O componente não deve esconder o funcionamento básico do navegador.

---

## 4. Responsabilidade

O `Component` é responsável por controlar o ciclo básico de uma unidade de interface.

Fluxo principal:

```text
Component
    │
    ├── render()
    │      │
    │      ▼
    │   HTMLElement
    │
    ├── mount()
    │      │
    │      ▼
    │     DOM
    │
    ├── update()
    │
    └── unmount()
           │
           ▼
          DOM
```

---

## 5. API Pública

A primeira versão do componente terá uma API mínima:

```text
render()
mount()
update()
unmount()
```

---

## 6. `render()`

### Responsabilidade

`render()` é responsável por criar e retornar o elemento HTML representado pelo componente.

Assinatura:

```ts
protected abstract render(): HTMLElement;
```

Exemplo:

```ts
class HelloWorld extends Component {

    protected render(): HTMLElement {
        const element = document.createElement('h1');

        element.textContent = 'Hello World';

        return element;
    }
}
```

### Regras

* deve retornar um `HTMLElement`;
* deve representar a interface do componente;
* não deve realizar a montagem diretamente;
* não deve manipular o elemento raiz de outro componente.

---

## 7. `mount()`

### Responsabilidade

`mount()` adiciona o componente ao DOM.

Assinatura:

```ts
public mount(container: HTMLElement): void;
```

Exemplo:

```ts
const hello = new HelloWorld();

hello.mount(document.body);
```

Resultado:

```html
<body>
    <h1>Hello World</h1>
</body>
```

### Regras

* recebe um elemento HTML como destino;
* executa `render()`;
* adiciona o elemento retornado ao container;
* registra o elemento criado internamente;
* deve impedir uma segunda montagem do mesmo componente.

---

## 8. `update()`

### Responsabilidade

`update()` atualiza a representação visual do componente.

Assinatura:

```ts
public update(): void;
```

Na primeira versão, a atualização será simples.

Não haverá:

* Virtual DOM;
* diffing;
* reconciliador;
* sistema complexo de reatividade.

O comportamento inicial será baseado na reconstrução do elemento do componente.

Fluxo:

```text
update()
   │
   ├── render()
   │
   └── substitui elemento anterior
```

### Regras

* o componente precisa estar montado;
* o novo elemento deve substituir o elemento anterior;
* o componente deve continuar montado no mesmo container;
* o estado interno do componente não deve ser perdido automaticamente.

---

## 9. `unmount()`

### Responsabilidade

`unmount()` remove o componente do DOM.

Assinatura:

```ts
public unmount(): void;
```

Fluxo:

```text
Component
    │
    ▼
unmount()
    │
    ▼
Elemento removido do DOM
```

### Regras

* remove o elemento atualmente montado;
* limpa a referência interna ao elemento;
* torna possível montar o componente novamente;
* não deve destruir a instância do componente.

Exemplo:

```ts
const hello = new HelloWorld();

hello.mount(document.body);

hello.unmount();

hello.mount(document.body);
```

---

## 10. Estado interno

O componente deve manter internamente uma referência ao elemento HTML que representa sua instância.

Conceito:

```ts
private element: HTMLElement | null;
```

Essa referência não deve fazer parte da API pública.

A aplicação não deve precisar manipular diretamente essa propriedade.

---

## 11. Estado de montagem

O componente deve possuir um estado interno indicando se está montado.

Conceito:

```text
unmounted
    │
    │ mount()
    ▼
 mounted
    │
    │ update()
    │
    ▼
 mounted
    │
    │ unmount()
    ▼
unmounted
```

---

## 12. Ciclo de vida

A primeira versão terá o seguinte ciclo:

```text
                    ┌──────────────┐
                    │  Component   │
                    └──────┬───────┘
                           │
                           ▼
                        render()
                           │
                           ▼
                         mount()
                           │
                           ▼
                       ┌─────────┐
                       │ MOUNTED │
                       └────┬────┘
                            │
                    ┌───────┴───────┐
                    │               │
                    ▼               ▼
                  update()       unmount()
                    │               │
                    │               ▼
                    │          ┌───────────┐
                    │          │ UNMOUNTED │
                    │          └───────────┘
                    │
                    └──────► MOUNTED
```

---

## 13. Proteção contra uso incorreto

O componente deve proteger seu ciclo de vida.

### Mount duplicado

Não deve permitir:

```ts
component.mount(container);
component.mount(container);
```

sem que exista uma desmontagem entre as operações.

### Update antes do mount

Não deve permitir:

```ts
component.update();
```

antes de:

```ts
component.mount(container);
```

### Unmount antes do mount

Deve ser tratado de maneira segura.

O método não deve gerar um erro desnecessário caso o componente ainda não esteja montado.

---

## 14. Reutilização

Uma instância de componente pode ser desmontada e montada novamente.

Exemplo:

```ts
const component = new HelloWorld();

component.mount(document.body);

component.unmount();

component.mount(document.body);
```

A instância continua válida.

---

## 15. Independência do Gatovel

O módulo `component` não deve conhecer:

* Gatovel Framework;
* PHP;
* rotas do backend;
* banco de dados;
* autenticação;
* sessões;
* APIs específicas do Gatovel.

O componente trabalha exclusivamente com o ambiente do navegador.

---

## 16. O que NÃO faz parte da primeira versão

O sistema inicial de componentes não terá:

* Virtual DOM;
* JSX;
* templates complexos;
* decorators;
* dependency injection;
* sistema de plugins;
* lifecycle complexo;
* hooks;
* signals;
* sistema de reatividade;
* gerenciamento global de estado;
* comunicação automática entre componentes.

Esses mecanismos somente serão adicionados quando houver uma necessidade arquitetural real.

---

## 17. Exemplo completo

Uma aplicação poderá futuramente utilizar:

```ts
import { Component } from 'miau';

class HomePage extends Component {

    protected render(): HTMLElement {
        const element = document.createElement('main');

        element.innerHTML = `
            <h1>Welcome to Miau</h1>
            <p>Frontend made simple.</p>
        `;

        return element;
    }
}

const page = new HomePage();

page.mount(document.body);
```

Resultado:

```html
<body>
    <main>
        <h1>Welcome to Miau</h1>
        <p>Frontend made simple.</p>
    </main>
</body>
```

---

## 18. Critério de conclusão

O módulo `component` será considerado concluído quando:

* `Component.ts` estiver implementado;
* um componente puder ser criado;
* `render()` gerar seu elemento;
* `mount()` inserir o elemento no DOM;
* `update()` substituir o elemento corretamente;
* `unmount()` remover o elemento;
* montagem duplicada for protegida;
* atualização antes da montagem for protegida;
* remontagem funcionar;
* testes básicos forem implementados.

---

## 19. Próxima etapa

Após a implementação e os testes do `Component`, o próximo módulo será:

```text
src/nucleo/dom/
```

O módulo `dom` fornecerá mecanismos auxiliares para criação e manipulação do DOM.

A implementação do `component` deve ser feita antes de avançarmos para `dom`.
