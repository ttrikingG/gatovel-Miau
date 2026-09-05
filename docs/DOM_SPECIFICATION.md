# Miau DOM Specification

## 1. Objetivo

O módulo DOM fornece operações simples para criação e manipulação de elementos HTML.

O objetivo é facilitar operações comuns do DOM sem esconder ou substituir a API nativa do navegador.

Local:

```text
src/nucleo/dom/
```

---

## 2. Princípios

O módulo DOM deve seguir:

* Simplicidade
* API pequena
* Baixo acoplamento
* Uso da API nativa do navegador
* TypeScript
* Comportamento previsível
* Nenhuma dependência externa
* Nenhuma dependência do Gatovel

O módulo deve fornecer mecanismos para manipular o DOM, não controlar a aplicação.

---

## 3. Responsabilidades

O módulo DOM será responsável por:

* Criar elementos HTML
* Definir atributos
* Remover atributos
* Adicionar classes
* Remover classes
* Definir conteúdo textual
* Adicionar elementos
* Remover elementos

---

## 4. Localização

A implementação ficará em:

```text
src/nucleo/dom/DOM.ts
```

---

## 5. API inicial

A classe `DOM` deverá possuir os seguintes métodos:

```ts
create(tag: string): HTMLElement

setAttribute(
    element: HTMLElement,
    name: string,
    value: string
): void

removeAttribute(
    element: HTMLElement,
    name: string
): void

addClass(
    element: HTMLElement,
    className: string
): void

removeClass(
    element: HTMLElement,
    className: string
): void

setText(
    element: HTMLElement,
    text: string
): void

append(
    parent: HTMLElement,
    child: HTMLElement
): void

remove(
    element: HTMLElement
): void
```

---

## 6. Comportamento

### 6.1 create()

Deve criar um elemento utilizando a API nativa:

```ts
document.createElement()
```

Exemplo:

```ts
const element = DOM.create('div');
```

---

### 6.2 setAttribute()

Deve definir um atributo utilizando:

```ts
element.setAttribute()
```

Exemplo:

```ts
DOM.setAttribute(element, 'id', 'app');
```

---

### 6.3 removeAttribute()

Deve remover um atributo utilizando:

```ts
element.removeAttribute()
```

---

### 6.4 addClass()

Deve adicionar uma classe utilizando:

```ts
element.classList.add()
```

---

### 6.5 removeClass()

Deve remover uma classe utilizando:

```ts
element.classList.remove()
```

---

### 6.6 setText()

Deve definir o conteúdo textual utilizando:

```ts
element.textContent
```

Não deve utilizar `innerHTML`.

---

### 6.7 append()

Deve adicionar um elemento utilizando:

```ts
parent.appendChild(child)
```

---

### 6.8 remove()

Deve remover o elemento utilizando a API nativa:

```ts
element.remove()
```

---

## 7. Limites do módulo

A primeira versão do DOM não deverá possuir:

* Template engine
* Virtual DOM
* JSX
* Renderização automática
* Data binding
* Event handling
* State management
* Seletores complexos
* Animações
* Manipulação automática de componentes

Essas responsabilidades pertencem a outros módulos do Miau.

---

## 8. Relação com Component

O módulo `Component` poderá utilizar o módulo DOM futuramente.

Porém, o módulo DOM não deve depender de `Component`.

A dependência deve permanecer:

```text
Component
    ↓
DOM
    ↓
Browser DOM
```

Nunca:

```text
DOM
    ↓
Component
```

---

## 9. Princípio arquitetural

O módulo DOM deve fornecer mecanismos, não impor uma forma de desenvolvimento.

O desenvolvedor continua tendo acesso direto ao DOM nativo quando necessário.

O Miau apenas fornece operações comuns de forma organizada e previsível.

---

## 10. Critérios de conclusão

O módulo DOM será considerado concluído quando:

* [ ] `DOM.ts` estiver implementado
* [ ] `create()` funcionar
* [ ] `setAttribute()` funcionar
* [ ] `removeAttribute()` funcionar
* [ ] `addClass()` funcionar
* [ ] `removeClass()` funcionar
* [ ] `setText()` funcionar
* [ ] `append()` funcionar
* [ ] `remove()` funcionar
* [ ] TypeScript compilar sem erros
* [ ] Teste real no navegador funcionar

---

## 11. Próximo módulo

Após a implementação e validação do DOM:

```text
src/nucleo/events/
```
