// Estrutura de dados para armazenar as dicas cadastradas
let dicas = [];

// Função para adicionar uma nova dica à lista de dicas cadastradas
function adicionarDica(material, dica) {
    dicas.push({
        material,
        dica
    });
    salvarDicasNoLocalStorage();
    exibirDicas();
}

// Função para exibir as dicas cadastradas no HTML
function exibirDicas() {
    const listaDicas = document.getElementById("listaDicas");
    listaDicas.innerHTML = "";

    dicas.forEach((dica) => {
        const card = document.createElement("div");
        card.classList.add("dica-card");

        const materialElement = document.createElement("div");
        materialElement.classList.add("material");
        materialElement.textContent = obterNomeMaterial(dica.material);

        const dicaElement = document.createElement("div");
        dicaElement.textContent = dica.dica;

        switch (dica.material) {
            case "plastico":
                card.classList.add("vermelho");
                break;
            case "metal":
                card.classList.add("amarelo");
                break;
            case "papel":
                card.classList.add("azul");
                break;
            case "vidro":
                card.classList.add("verde");
                break;
            case "organico":
                card.classList.add("marrom");
                break;
        }

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.classList.add("excluir-button")
        excluirButton.addEventListener("click", () => excluirDica(dica));

        card.appendChild(materialElement);
        card.appendChild(dicaElement);
        card.appendChild(excluirButton);

        listaDicas.appendChild(card);
    });
}

// Função para filtrar as dicas por material
function filtrarDicas(material) {
    const listaFiltrada = dicas.filter((dica) => dica.material === material);
    exibirDicasFiltradas(listaFiltrada);
}

// Função para exibir as dicas filtradas no HTML
function exibirDicasFiltradas(dicasFiltradas) {
    const listaDicas = document.getElementById("listaDicas");
    listaDicas.innerHTML = "";

    // Criar opção para selecionar todas as dicas
    const SelTodos = document.createElement("option");
    SelTodos.value = "";
    // SelTodos.textContent = "Todas as dicas";
    listaDicas.appendChild(SelTodos);

    dicasFiltradas.forEach((dica) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const materialElement = document.createElement("div");
        materialElement.classList.add("material");
        materialElement.textContent = obterNomeMaterial(dica.material);

        const dicaElement = document.createElement("div");
        dicaElement.textContent = dica.dica;

        switch (dica.material) {
            case "plastico":
                card.classList.add("vermelho");
                break;
            case "metal":
                card.classList.add("amarelo");
                break;
            case "papel":
                card.classList.add("azul");
                break;
            case "vidro":
                card.classList.add("verde");
                break;
            case "organico":
                card.classList.add("marrom");
                break;
        }

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.classList.add("excluir-button")
        excluirButton.addEventListener("click", () => excluirDica(dica));

        card.appendChild(materialElement);
        card.appendChild(dicaElement);
        card.appendChild(excluirButton);

        listaDicas.appendChild(card);
    });
}

// Função para excluir uma dica
function excluirDica(dica) {
    const index = dicas.indexOf(dica);
    if (index !== -1) {
        dicas.splice(index, 1);
        salvarDicasNoLocalStorage();
        exibirDicas();
    }
}

// Função para obter o nome do material a partir do valor
function obterNomeMaterial(material) {
    switch (material) {
        case "plastico":
            return "Plástico";
        case "metal":
            return "Metal";
        case "papel":
            return "Papel";
        case "vidro":
            return "Vidro";
        case "organico":
            return "Orgânico";
        default:
            return "";
    }
}

// Manipulador de evento para cadastro de dicas
document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const materialInput = document.getElementById("materialInput");
    const dicaInput = document.getElementById("dicaInput");

    const material = materialInput.value;
    const dica = dicaInput.value;

    if (material === "") {
        materialInput.setCustomValidity("Selecione um material.");
    } else {
        materialInput.setCustomValidity("");
    }

    if (dica.trim() === "") {
        dicaInput.setCustomValidity("Insira uma dica.");
    } else {
        dicaInput.setCustomValidity("");
    }

    if (this.checkValidity()) {
        adicionarDica(material, dica);

        // Limpa os campos do formulário
        materialInput.value = "";
        dicaInput.value = "";
    }
});

// Manipulador de evento para filtrar as dicas
document.getElementById("filtroButton").addEventListener("click", function () {
    const filtroInput = document.getElementById("filtroInput");
    const material = filtroInput.value;

    if (material === "") {
        filtroInput.setCustomValidity("");
        exibirDicas(); // Mostrar todas as dicas
    } else {
        filtroInput.setCustomValidity("");
        filtrarDicas(material);
    }

});

// Função para salvar as dicas no Local Storage
function salvarDicasNoLocalStorage() {
    localStorage.setItem("dicas", JSON.stringify(dicas));
}

// Função para carregar as dicas do Local Storage
function carregarDicasDoLocalStorage() {
    const dicasString = localStorage.getItem("dicas");
    if (dicasString) {
        dicas = JSON.parse(dicasString);
        exibirDicas();
    }
}

// Carrega as dicas do Local Storage ao carregar a página
carregarDicasDoLocalStorage();

