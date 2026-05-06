"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app textarea");
let buttonElement = document.querySelector("#app button");
let listaStorage = localStorage.getItem("@listagem_tarefas");
let tarefas = listaStorage !== null && JSON.parse(listaStorage) || [];
function listarTarefas() {
    listElement.innerHTML = "";
    if (tarefas.length === 0) {
        listElement.innerHTML = "<h2>As tarefas aparecerão aqui</h2>";
        return;
    }
    tarefas.map((tarefa) => {
        let element = document.createElement("li");
        element.setAttribute("class", "tarefa-item");
        let tarefaText = document.createTextNode(tarefa);
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "javascript:void(0)");
        let posicao = tarefas.indexOf(tarefa);
        linkElement.setAttribute("onclick", `removerTarefa(${posicao})`);
        linkElement.setAttribute("class", "btn-remover");
        let iconDelete = document.createElement("i");
        iconDelete.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
        linkElement.appendChild(iconDelete);
        let linkEdit = document.createElement("a");
        linkEdit.setAttribute("href", "javascript:void(0)");
        linkEdit.setAttribute("class", "btn-editar");
        linkEdit.setAttribute("onclick", `editarTarefa(${posicao})`);
        let iconEdit = document.createElement("i");
        iconEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 000-1.42L18.37 3.29a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"/></svg>';
        linkEdit.appendChild(iconEdit);
        element.appendChild(tarefaText);
        element.appendChild(linkElement);
        element.appendChild(linkEdit);
        listElement.appendChild(element);
    });
}
listarTarefas();
function adicionarTarefa() {
    if (inputElement.value === "") {
        alert("Digite alguma tarefa!");
        return false;
    }
    else {
        let tarefaInput = inputElement.value;
        tarefas.push(tarefaInput);
        inputElement.value = "";
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
    inputElement.value = tarefas[posicao];
    buttonElement.textContent = "Editar";
    buttonElement.setAttribute("onclick", `editarTarefaContent(${posicao})`);
}
function editarTarefaContent(posicao) {
    if (typeof tarefas[posicao] === "undefined")
        return;
    tarefas[posicao] = inputElement.value;
    inputElement.value = "";
    buttonElement.textContent = "Adicionar";
    buttonElement.setAttribute("onclick", "adicionarTarefa()");
    buttonElement.setAttribute("class", "btn-adicionar");
    buttonElement.setAttribute("type", "button");
    listarTarefas();
    salvarDados();
}
//# sourceMappingURL=index.js.map