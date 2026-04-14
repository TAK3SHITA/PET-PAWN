# 🐾 PetPaw — Cadastro de Pets

Aplicação web para cadastro e gerenciamento de cães, desenvolvida com HTML, CSS e JavaScript puro. Utiliza a [TheDogAPI](https://thedogapi.com/) para carregar raças com imagens e informações, e o **LocalStorage** do navegador para persistir os dados cadastrados sem necessidade de banco de dados ou servidor.

---

## Participantes do desenvolvimento

---

├── Pedro Takeshita
├── Marcelo Castro
└── Otavio Rodrigues

---

## Funcionalidades

- **Cadastro de pets** com nome, tutor, raça, idade, sexo, peso, cor da pelagem e observações
- **Seletor de raça** com pré-visualização de imagem e tags informativas (temperamento, peso, altura e expectativa de vida) carregadas da TheDogAPI
- **Listagem dos pets cadastrados** em cards, com busca por nome em tempo real e contador de resultados
- **Remoção de pets** individualmente, com confirmação antes de excluir
- **Limpeza do formulário** com um clique, sem apagar dados salvos

- **Persistência local** via LocalStorage: os dados permanecem mesmo após fechar o navegador

---

## Estrutura de arquivos

```
petpaw/
├── index.html        # Estrutura da página (formulário, lista de pets, galeria)
├── css/
│   └── style.css     # Estilos da interface
├── js/
│    └── script.js     # Lógica da aplicação (API, LocalStorage, DOM)
└── images/
      └── favicon.png  # Imagem utilizada na logo do navegador
```

---

## Como executar

A aplicação **não requer instalação, build ou servidor Node.js**. Basta servir os arquivos estáticos localmente.

### Extensão Live Server (VS Code)

1. Instale a extensão **Live Server** no VS Code
2. Abra a pasta do projeto no VS Code
3. Clique com o botão direito em `index.html` → **"Open with Live Server"**
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500`

---

## 💡 Conceitos Abordados

### 1. Fetch API

A **Fetch API** é a forma moderna de fazer requisições HTTP no JavaScript. Ela substitui o antigo `XMLHttpRequest` e funciona com **Promises**.

```js
// Sintaxe básica com async/await
async function loadBreeds() {
  const response = await fetch("https://api.thedogapi.com/v1/breeds", {
    headers: { "x-api-key": API_KEY }
  });
  const data = await response.json(); // converte para objeto JS
  return data;
}
```

Neste projeto, utilizamos a **TheDogAPI** para carregar raças:

```
https://api.thedogapi.com/v1/breeds
```

Exemplo de retorno da API para uma raça:

```json
{
  "id": 1,
  "name": "Affenpinscher",
  "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  "weight": { "metric": "3 - 6" },
  "height": { "metric": "23 - 29" },
  "life_span": "10 - 12 years",
  "image": { "url": "https://cdn2.thedogapi.com/images/..." }
}
```

---

### 2. LocalStorage

O **LocalStorage** é um mecanismo do navegador que permite guardar dados **sem precisar de servidor**. Os dados persistem mesmo após fechar o navegador.

| Método | O que faz |
|---|---|
| `localStorage.setItem('chave', valor)` | Salva um dado |
| `localStorage.getItem('chave')` | Lê um dado |
| `localStorage.removeItem('chave')` | Remove um dado |
| `localStorage.clear()` | Apaga tudo |

> ⚠️ O LocalStorage **só armazena strings**. Para salvar objetos, precisamos convertê-los com `JSON.stringify()` e `JSON.parse()`.

```js
// Salvando um pet
const pet = { name: "Thor", breed: "Labrador", owner: "João" };
localStorage.setItem('pets', JSON.stringify(pets));

// Lendo de volta
const dados = JSON.parse(localStorage.getItem('pets'));
console.log(dados[0].name); // "Thor"
```

---

## Dependências externas

| Recurso | Uso |
|---|---|
| [TheDogAPI](https://thedogapi.com/) | Carregamento de raças, imagens e informações |
| [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Tipografia da interface |
| LocalStorage do navegador | Persistência dos pets cadastrados |


---

## Observações

- **Compatibilidade:** funciona em qualquer navegador moderno (Chrome, Firefox, Edge, Safari). Não suporta IE.

---
