const API_KEY = "live_ODyziaUeykAShF1s3hn1V4r6xhIUOmhmgaH4ZbpNq8aJ0j5we6J0a79JPSjh5DB9";
const API_URL = "https://api.thedogapi.com/v1/breeds";

let breeds = [];

// ==============================
// 🔹 CARREGAR RAÇAS DA API
// ==============================
/**
 * Carrega a lista de raças de cães da TheDogAPI e popula o select de raças no formulário.
 * Em caso de erro na requisição, exibe mensagem no console.
 *
 * @param {void}
 * @returns {Promise<void>} Promise que resolve após o select ser populado com as raças.
 */
async function loadBreeds() {
  try {
    const response = await fetch(API_URL, {
      headers: { "x-api-key": API_KEY }
    });

    breeds = await response.json();

    const select = document.getElementById("breedSelect");
    select.innerHTML = '<option value="">Selecione a raça</option>';

    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar raças:", error);
  }
}

// ==============================
// 🔹 AO MUDAR RAÇA
// ==============================
/**
 * Atualiza a imagem de pré-visualização e as informações da raça selecionada no formulário.
 * Busca a raça correspondente no array global `breeds` e exibe seus dados (temperamento,
 * peso, altura e expectativa de vida).
 *
 * @param {void}
 * @returns {void}
 */
function onBreedChange() {
  const breedId = document.getElementById("breedSelect").value;
  const breed = breeds.find(b => b.id == breedId);

  if (!breed) {
    document.getElementById("breedPreview").style.display = "none";
    document.getElementById("breedInfoTags").innerHTML = "";
    return;
  }

  const img = document.getElementById("breedPreview");
  img.src = breed.image?.url || "";
  img.style.display = breed.image?.url ? "block" : "none";

  const infoBox = document.getElementById("breedInfoTags");
  infoBox.innerHTML = `
    <span>🐕 ${breed.temperament || "N/A"}</span>
    <span>⚖️ ${breed.weight.metric || "?"} kg</span>
    <span>📏 ${breed.height.metric || "?"} cm</span>
    <span>⏳ Vida: ${breed.life_span}</span>
  `;
}

// ==============================
// 🔹 CADASTRAR PET (LOCALSTORAGE)
// ==============================
/**
 * Coleta os dados do formulário de cadastro, valida os campos obrigatórios e salva
 * um novo pet no LocalStorage. Após o cadastro exibe confirmação, limpa o formulário
 * e atualiza a lista de pets.
 *
 * @param {void}
 * @returns {void} Retorna antecipadamente se algum campo obrigatório estiver vazio.
 */
function registerPet() {
  const pet = {
    id: Date.now(),
    name: document.getElementById("petName").value.trim(),
    owner: document.getElementById("ownerName").value.trim(),
    breedId: document.getElementById("breedSelect").value,
    breedName: document.getElementById("breedSelect").selectedOptions[0].text,
    age: document.getElementById("petAge").value,
    gender: document.getElementById("petGender").value,
    weight: document.getElementById("petWeight").value,
    color: document.getElementById("petColor").value.trim(),
    notes: document.getElementById("petNotes").value.trim(),
    image: document.getElementById("breedPreview").src
  };

  if (!pet.name || !pet.owner || !pet.breedId) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets.push(pet);
  localStorage.setItem("pets", JSON.stringify(pets));

  alert("Pet cadastrado com sucesso!");
  clearForm();
  renderPets();
}

// ==============================
// 🔹 LIMPAR FORMULÁRIO
// ==============================
/**
 * Limpa todos os campos do formulário de cadastro, redefinindo selects para o estado
 * inicial e ocultando a imagem de pré-visualização da raça e suas informações.
 *
 * @param {void}
 * @returns {void}
 */
function clearForm() {
  document.getElementById("petName").value = "";
  document.getElementById("ownerName").value = "";
  document.getElementById("breedSelect").value = "";
  document.getElementById("petAge").value = "";
  document.getElementById("petGender").value = "";
  document.getElementById("petWeight").value = "";
  document.getElementById("petColor").value = "";
  document.getElementById("petNotes").value = "";

  const img = document.getElementById("breedPreview");
  img.src = "";
  img.style.display = "none";

  document.getElementById("breedInfoTags").innerHTML = "";
}

// ==============================
// 🔹 DELETAR PET
// ==============================
/**
 * Remove um pet cadastrado do LocalStorage com base no seu ID único e re-renderiza
 * a lista de pets. Solicita confirmação do usuário antes de excluir.
 *
 * @param {number} petId - ID único do pet gerado no momento do cadastro (Date.now()).
 * @returns {void}
 */
function deletePet(petId) {
  if (!confirm("Tem certeza que deseja remover este pet?")) return;

  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets = pets.filter(p => p.id !== petId);
  localStorage.setItem("pets", JSON.stringify(pets));

  renderPets();
}

// ==============================
// 🔹 LISTAR PETS
// ==============================
/**
 * Lê os pets salvos no LocalStorage, filtra pelo termo de busca atual e renderiza
 * os cards na grade de pets cadastrados. Exibe mensagem de estado vazio caso não
 * haja resultados. Também atualiza o contador de pets visíveis.
 *
 * @param {void}
 * @returns {void}
 */
function renderPets() {
  const grid = document.getElementById("petsGrid");
  const search = document.getElementById("searchPets").value.toLowerCase();

  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets = pets.filter(p => p.name.toLowerCase().includes(search));

  grid.innerHTML = "";

  if (pets.length === 0) {
    grid.innerHTML = `<p class="pets-empty">Nenhum pet encontrado 🐾</p>`;
    document.getElementById("petsCount").textContent = "0 pets";
    return;
  }

  pets.forEach(pet => {
    const card = document.createElement("div");
    card.className = "pet-card";

    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.breedName}" onerror="this.style.display='none'">
      <p class="pet-card-name">${pet.name}</p>
      <p class="pet-card-breed">${pet.breedName}</p>
      <p class="pet-card-info"><strong>Tutor:</strong> ${pet.owner}</p>
      <p class="pet-card-info"><strong>Idade:</strong> ${pet.age || "-"} anos</p>
      <p class="pet-card-info"><strong>Peso:</strong> ${pet.weight || "-"} kg</p>
      ${pet.gender ? `<p class="pet-card-info"><strong>Sexo:</strong> ${pet.gender}</p>` : ""}
      <button class="pet-card-delete" onclick="deletePet(${pet.id})">🗑 Remover</button>
    `;

    grid.appendChild(card);
  });

  document.getElementById("petsCount").textContent = `${pets.length} pet${pets.length !== 1 ? "s" : ""}`;
}

// ==============================
// 🔹 NAVEGAÇÃO
// ==============================
/**
 * Controla a navegação entre as seções da página, ocultando todas e exibindo
 * apenas a seção selecionada. Se a seção for "racas", carrega a galeria.
 *
 * @param {string} section - Identificador da seção a exibir ("cadastro" ou "racas").
 * @returns {void}
 */
function showSection(section) {
  document.getElementById("sec-cadastro").style.display = "none";
  document.getElementById("sec-" + section).style.display = "block";
}

// ==============================
// 🔹 INICIALIZAÇÃO
// ==============================
/**
 * Função executada ao carregar a página. Inicializa o carregamento das raças da API
 * e renderiza a lista de pets já salvos no LocalStorage.
 *
 * @param {void}
 * @returns {void}
 */
window.onload = () => {
  loadBreeds();
  renderPets();
};
