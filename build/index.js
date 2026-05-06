"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let listElement = document.querySelector("#app ul");
let inputTarefa = document.querySelector("#app textarea");
let inputData = document.querySelector("#data-input");
let buttonElement = document.querySelector("#app button");
let listaStorage = localStorage.getItem("@listagem_tarefas");
let tarefas = listaStorage !== null && JSON.parse(listaStorage) || [];
let dataMin = new Date().toISOString().split("T")[0];
if (dataMin) {
    inputData.setAttribute("min", dataMin);
    inputData.value = dataMin;
}
function listarTarefas() {
    listElement.innerHTML = "";
    if (tarefas.length === 0) {
        listElement.innerHTML = "<h2>As tarefas aparecerão aqui</h2>";
        return;
    }
    tarefas.map((tarefa, index) => {
        let element = document.createElement("li");
        element.setAttribute("class", "tarefa-item");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("class", "caixa-checkbox");
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;
            salvarDados();
            listarTarefas();
        });
        element.appendChild(checkbox);
        let tarefaText = document.createTextNode(`${tarefa.tarefa}`);
        element.appendChild(tarefaText);
        let dataElement = document.createElement("span");
        dataElement.setAttribute("class", "data-list");
        let dateFormat = new Date(tarefa.data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "UTC"
        });
        let dataText = document.createTextNode(`${dateFormat}`);
        dataElement.appendChild(dataText);
        element.appendChild(dataElement);
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "javascript:void(0)");
        linkElement.setAttribute("onclick", `removerTarefa(${index})`);
        linkElement.setAttribute("class", "btn-remover");
        let iconDelete = document.createElement("i");
        iconDelete.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
        linkElement.appendChild(iconDelete);
        element.appendChild(linkElement);
        let linkEdit = document.createElement("a");
        linkEdit.setAttribute("href", "javascript:void(0)");
        linkEdit.setAttribute("class", "btn-editar");
        linkEdit.setAttribute("onclick", `editarTarefa(${index})`);
        let iconEdit = document.createElement("i");
        iconEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 000-1.42L18.37 3.29a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"/></svg>';
        linkEdit.appendChild(iconEdit);
        element.appendChild(linkEdit);
        listElement.appendChild(element);
    });
}
listarTarefas();
function adicionarTarefa() {
    let existeTarefa = tarefas.some(t => t.tarefa === inputTarefa.value && t.data === inputData.value);
    if (inputTarefa.value === "" || inputData.value === "") {
        alert("Digite a tarefa e a data!");
        return false;
    }
    else if (existeTarefa) {
        alert("Esta tarefa já foi adicionada!");
        return false;
    }
    else {
        let tarefaInput = {
            tarefa: inputTarefa.value,
            data: inputData.value,
            concluida: false
        };
        tarefas.push(tarefaInput);
        inputTarefa.value = "";
        if (dataMin) {
            inputData.value = dataMin;
        }
        else {
            inputData.value = "";
        }
        listarTarefas();
        salvarDados();
    }
}
if (buttonElement.textContent === "Adicionar") {
    buttonElement.onclick = adicionarTarefa;
}
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
function removerTarefa(posicao) {
    const confirmado = confirm("Tem certeza que deseja excluir essa tarefa?");
    if (confirmado) {
        tarefas.splice(posicao, 1);
        listarTarefas();
        salvarDados();
    }
}
function editarTarefa(posicao) {
    if (typeof tarefas[posicao] === "undefined")
        return;
    inputTarefa.value = tarefas[posicao].tarefa;
    inputData.value = tarefas[posicao].data;
    buttonElement.textContent = "Editar";
    buttonElement.setAttribute("onclick", `editarTarefaContent(${posicao})`);
}
function editarTarefaContent(posicao) {
    if (typeof tarefas[posicao] === "undefined")
        return;
    tarefas[posicao].tarefa = inputTarefa.value;
    tarefas[posicao].data = inputData.value;
    inputTarefa.value = "";
    if (dataMin) {
        inputData.value = dataMin;
    }
    else {
        inputData.value = "";
    }
    buttonElement.textContent = "Adicionar";
    buttonElement.setAttribute("onclick", "adicionarTarefa()");
    buttonElement.setAttribute("class", "btn-adicionar");
    buttonElement.setAttribute("type", "button");
    listarTarefas();
    salvarDados();
}
//# sourceMappingURL=index.js.map