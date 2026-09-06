# Miau State Specification

## 1. Objetivo

O módulo State fornece um mecanismo simples para armazenar,
consultar e atualizar valores de estado em aplicações Web.

Local:

src/nucleo/state/

---

## 2. Princípios

O módulo State deve seguir:

- Simplicidade
- TypeScript
- Baixo acoplamento
- API pequena
- Nenhuma dependência externa
- Estado explícito
- Comportamento previsível

O State deve fornecer mecanismos, não impor uma arquitetura
de gerenciamento de estado à aplicação.

---

## 3. Responsabilidades

O módulo State será responsável por:

- Armazenar um valor
- Retornar o valor atual
- Atualizar o valor
- Notificar alterações
- Permitir inscrição para alterações
- Permitir remoção da inscrição

---

## 4. Localização

A implementação ficará em:

src/nucleo/state/State.ts

---

## 5. Conceito

Um State representa um valor que pode ser alterado durante
a execução da aplicação.

Exemplo:

const counter = new State(0);

counter.get();

counter.set(1);

---

## 6. API

A classe State deverá possuir:

constructor(initialValue)

get(): T

set(value: T): void

subscribe(listener: (value: T) => void): () => void

---

## 7. get()

Retorna o valor atual do estado.

Exemplo:

const count = new State(0);

console.log(count.get());

Resultado:

0

---

## 8. set()

Atualiza o valor do estado.

Exemplo:

count.set(10);

console.log(count.get());

Resultado:

10

Quando o valor for atualizado, os listeners registrados
deverão ser notificados.

---

## 9. subscribe()

Permite registrar uma função para receber notificações
quando o estado for alterado.

Exemplo:

const unsubscribe = count.subscribe((value) => {
    console.log('New value:', value);
});

count.set(1);

Resultado:

New value: 1

---

## 10. unsubscribe

O método subscribe() deverá retornar uma função responsável
por remover o listener.

Exemplo:

const unsubscribe = count.subscribe((value) => {
    console.log(value);
});

count.set(1);

unsubscribe();

count.set(2);

O listener não deverá receber a segunda alteração.

---

## 11. Tipagem

State deverá utilizar Generics do TypeScript.

Exemplo:

const name = new State<string>('Tom');

const count = new State<number>(0);

const authenticated = new State<boolean>(false);

A tipagem deverá impedir valores incompatíveis.

---

## 12. Notificação

Os listeners deverão ser chamados quando set() alterar o estado.

Exemplo:

const state = new State(0);

state.subscribe((value) => {
    console.log(value);
});

state.set(1);
state.set(2);
state.set(3);

Resultado:

1
2
3

---

## 13. Mesmo valor

A primeira versão deverá notificar os listeners sempre que
set() for chamado.

Exemplo:

const state = new State(10);

state.subscribe((value) => {
    console.log(value);
});

state.set(10);

O listener será chamado.

Não haverá comparação automática entre valores.

---

## 14. Estado mutável

O State não deverá realizar cópia profunda,
serialização ou congelamento dos valores.

Exemplo:

const user = new State({
    name: 'Tom'
});

A responsabilidade pela manipulação do objeto permanece
com a aplicação.

---

## 15. Relação com Component

O State não deverá depender de Component.

Component poderá utilizar State futuramente.

Exemplo conceitual:

const counter = new State(0);

class CounterComponent extends Component {
    ...
}

A integração entre State e Component será responsabilidade
da aplicação ou de uma futura evolução do framework.

---

## 16. Relação com outros módulos

State não deverá depender de:

- Component
- DOM
- Events
- HTTP
- Router

O módulo deve funcionar de forma independente.

---

## 17. O que não faz parte da primeira versão

A primeira versão não terá:

- Global Store
- Redux
- Context API
- Signals
- Computed State
- Derived State
- Middleware
- Persistence
- LocalStorage
- SessionStorage
- DevTools
- Time Travel
- Undo/Redo
- Async State
- API integration

Esses recursos poderão ser avaliados futuramente,
caso exista necessidade real.

---

## 18. Princípio arquitetural

O State deve fornecer um mecanismo simples para representar
dados mutáveis e observar suas alterações.

A aplicação decide como utilizar esse mecanismo.

State:

Valor
 ↓
get()
 ↓
set()
 ↓
Listeners

---

## 19. Critérios de conclusão

O módulo State será considerado concluído quando:

- [ ] State.ts estiver implementado
- [ ] Generic funcionar
- [ ] get() funcionar
- [ ] set() funcionar
- [ ] subscribe() funcionar
- [ ] unsubscribe() funcionar
- [ ] Listeners receberem alterações
- [ ] TypeScript compilar sem erros
- [ ] Teste real no navegador funcionar

---

## 20. Próxima etapa

Após a conclusão do State, o Miau Core estará completo.

Miau Core:

- Component
- DOM
- Events
- HTTP
- Router
- State