let currentPageUrl = "https://swapi.dev/api/people/";

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar cards");
  }

  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");

  nextButton.addEventListener("click", loadNextPage);
  backButton.addEventListener("click", loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson);
    responseJson.results.forEach((character, id) => {
      console.log(id);
      const card = document.createElement("div");
      card.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
        /\D/g,
        ""
      )}.jpg")`;
      card.className = "cards";

      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.createElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
          /\D/g,
          ""
        )}.jpg")`;
        characterImage.className = "character-image";

        const title = document.createElement("span");
        title.className = "character-details";
        title.innerText = `Nome: `;
        
        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;
       
        const characterHeight = document.createElement("span");
        characterHeight.className = "character-details";
        characterHeight.innerText = `Altura: ${character.height}`;
        
        const mass = document.createElement("span");
        mass.className = "character-details";
        mass.innerText = `Peso: ${character.mass}`;
      
        const eyeColor = document.createElement("span");
        eyeColor.className = "character-details";
        eyeColor.innerText = `Cor dos Olhos: ${character.eye_color}`;
        
        const gender = document.createElement("span");
        gender.className = "character-details";
        gender.innerText = `Genero: ${character.gender}`;

        modalContent.appendChild(characterImage)
        modalContent.appendChild(name)
        modalContent.appendChild(characterHeight)
        modalContent.appendChild(mass)
        modalContent.appendChild(eyeColor)
        modalContent.appendChild(gender)


      };
      mainContent.appendChild(card);
    });
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;
    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
    nextButton.style.visibility = responseJson.next ? "visible" : "hidden";
    currentPageUrl = url;
  } catch (error) {
    alert("Erro ao carregar os personagens");
    console.log(error);
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a proxima pagina");
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a pagina anterior");
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}
