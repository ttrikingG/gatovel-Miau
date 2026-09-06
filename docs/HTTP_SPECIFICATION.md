# Miau HTTP Specification

## 1. Objetivo

O módulo HTTP fornece uma API simples para comunicação entre o Miau e servidores Web através de HTTP.

O módulo deve permitir que aplicações realizem requisições HTTP sem criar dependência com um backend específico.

Local:

src/nucleo/http/

---

## 2. Princípios

O módulo HTTP deve seguir:

- Simplicidade
- API pequena
- Baixo acoplamento
- TypeScript
- API nativa Fetch
- JSON como formato principal
- Nenhuma dependência externa
- Nenhuma dependência do Gatovel
- Compatibilidade com qualquer backend HTTP

O módulo deve fornecer mecanismos de comunicação, não conhecer regras específicas da aplicação.

---

## 3. Responsabilidades

O módulo HTTP será responsável por:

- GET
- POST
- PUT
- PATCH
- DELETE
- Headers
- Body
- JSON
- Status HTTP
- Tratamento básico de erros
- Retorno de respostas

---

## 4. Localização

A implementação ficará em:

src/nucleo/http/Http.ts

---

## 5. API inicial

A classe Http deverá possuir:

get<T>(
    url: string,
    options?: RequestInit
): Promise<T>

post<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
): Promise<T>

put<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
): Promise<T>

patch<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
): Promise<T>

delete<T>(
    url: string,
    options?: RequestInit
): Promise<T>

---

## 6. Comportamento

### 6.1 GET

Deve realizar uma requisição HTTP GET utilizando:

fetch()

Exemplo:

const users = await Http.get<User[]>('/api/users');

---

### 6.2 POST

Deve realizar uma requisição POST.

Quando existir body, o módulo deverá:

- Converter o body para JSON
- Definir Content-Type como application/json

Exemplo:

const user = await Http.post<User>(
    '/api/users',
    {
        name: 'Tom'
    }
);

---

### 6.3 PUT

Deve realizar uma requisição PUT utilizando o mesmo tratamento de JSON do POST.

---

### 6.4 PATCH

Deve realizar uma requisição PATCH utilizando o mesmo tratamento de JSON do POST.

---

### 6.5 DELETE

Deve realizar uma requisição DELETE.

---

## 7. Headers

O módulo deverá aceitar headers através de RequestInit.

Exemplo:

Http.get('/api/users', {
    headers: {
        Authorization: 'Bearer token'
    }
});

Headers fornecidos pela aplicação não devem ser sobrescritos desnecessariamente.

---

## 8. JSON

Quando a resposta possuir conteúdo JSON, o módulo deverá utilizar:

response.json()

O método deverá retornar o resultado convertido para o tipo genérico informado.

Exemplo:

interface User {
    id: number;
    name: string;
}

const user = await Http.get<User>('/api/user');

---

## 9. Erros HTTP

Respostas HTTP fora da faixa 200–299 devem gerar erro.

O módulo deverá verificar:

response.ok

Quando false, deverá lançar um Error.

Exemplo:

try {
    await Http.get('/api/users');
} catch (error) {
    console.error(error);
}

---

## 10. RequestInit

Os métodos deverão aceitar RequestInit para permitir configurações nativas do fetch.

Isso mantém o módulo simples e evita a criação de uma API própria para todas as opções possíveis do navegador.

---

## 11. Backend

O módulo HTTP não deve conhecer:

- Gatovel
- Laravel
- Node.js
- PHP
- Java
- APIs específicas
- Estrutura específica de banco de dados

A comunicação deve ser baseada somente em HTTP.

Arquitetura:

Miau
 ↓
Http
 ↓
Fetch API
 ↓
HTTP
 ↓
Qualquer Backend

---

## 12. Limites do módulo

A primeira versão não deverá possuir:

- Axios
- Interceptors
- Retry automático
- Cache
- Authentication Manager
- API Client específico
- WebSocket
- GraphQL
- Upload Manager
- Download Manager
- Gerenciamento global de erros
- Sistema próprio de promises

Esses recursos podem ser adicionados futuramente caso exista necessidade real.

---

## 13. Princípio arquitetural

O módulo HTTP deve fornecer mecanismos de comunicação HTTP sem impor uma arquitetura de backend.

O Miau deve conseguir conversar com:

Miau → Gatovel

Miau → Laravel

Miau → Node.js

Miau → Java / Spring

Miau → qualquer API HTTP

---

## 14. Critérios de conclusão

O módulo HTTP será considerado concluído quando:

- [ ] Http.ts estiver implementado
- [ ] get() funcionar
- [ ] post() funcionar
- [ ] put() funcionar
- [ ] patch() funcionar
- [ ] delete() funcionar
- [ ] JSON funcionar
- [ ] Headers funcionarem
- [ ] Erros HTTP forem tratados
- [ ] TypeScript compilar sem erros
- [ ] Teste real no navegador funcionar

---

## 15. Próximo módulo

Após a implementação e validação do HTTP:

src/nucleo/router/