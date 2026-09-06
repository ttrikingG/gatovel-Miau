# Miau Events Specification

## 1. Objetivo

O módulo Events fornece uma API simples para registrar, remover e disparar eventos em elementos do DOM.

O objetivo é organizar o uso dos eventos nativos do navegador sem substituir a API de eventos do JavaScript.

Local:

src/nucleo/events/

---

## 2. Princípios

O módulo Events deve seguir:

- Simplicidade
- API pequena
- Baixo acoplamento
- Uso da API nativa do navegador
- TypeScript
- Comportamento previsível
- Nenhuma dependência externa
- Nenhuma dependência do Gatovel

O módulo deve fornecer mecanismos para trabalhar com eventos, não controlar a aplicação.

---

## 3. Responsabilidades

O módulo Events será responsável por:

- Registrar eventos
- Remover eventos
- Disparar eventos
- Trabalhar com eventos nativos do navegador
- Permitir callbacks definidos pela aplicação

---

## 4. Localização

A implementação ficará em:

src/nucleo/events/Events.ts

---

## 5. API inicial

A classe Events deverá possuir:

on(
    element: HTMLElement,
    event: string,
    handler: EventListener
): void

off(
    element: HTMLElement,
    event: string,
    handler: EventListener
): void

emit(
    element: HTMLElement,
    event: string
): void

---

## 6. Comportamento

### 6.1 on()

Deve registrar um evento utilizando:

element.addEventListener()

Exemplo:

Events.on(button, 'click', handler);

---

### 6.2 off()

Deve remover um evento utilizando:

element.removeEventListener()

Exemplo:

Events.off(button, 'click', handler);

---

### 6.3 emit()

Deve criar e disparar um evento utilizando a API nativa do navegador.

Deve utilizar:

new Event()

e:

element.dispatchEvent()

Exemplo:

Events.emit(button, 'click');

---

## 7. EventListener

O módulo deve utilizar o tipo nativo:

EventListener

Não deve criar um sistema próprio de callbacks.

O navegador continua responsável pelo ciclo de eventos.

---

## 8. Limites do módulo

A primeira versão do Events não deverá possuir:

- Event Bus global
- Event Manager global
- Delegação automática
- Sistema próprio de eventos
- Event Store
- Integração com State
- Integração com Router
- Integração automática com Component
- Plugins
- Observers
- Sistema complexo de lifecycle

Esses recursos podem ser considerados futuramente caso exista uma necessidade real.

---

## 9. Relação com outros módulos

O Events pode trabalhar com o DOM e Components, mas não deve depender diretamente deles.

A aplicação pode utilizar os módulos separadamente.

Exemplo:

Component
    ↓
Events
    ↓
Browser Events

E:

Application
    ↓
Events
    ↓
DOM

O módulo Events deve permanecer independente.

---

## 10. Princípio arquitetural

O módulo Events deve fornecer mecanismos, não impor uma forma de desenvolvimento.

O desenvolvedor continua podendo utilizar diretamente:

addEventListener()
removeEventListener()
dispatchEvent()

O Miau apenas fornece uma API organizada e previsível para operações comuns.

---

## 11. Critérios de conclusão

O módulo Events será considerado concluído quando:

- [ ] Events.ts estiver implementado
- [ ] on() funcionar
- [ ] off() funcionar
- [ ] emit() funcionar
- [ ] TypeScript compilar sem erros
- [ ] Teste real no navegador funcionar

---

## 12. Próximo módulo

Após a implementação e validação do Events:

src/nucleo/http/