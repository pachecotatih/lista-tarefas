let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputElement = document.querySelector("#app textarea") as HTMLTextAreaElement;
let buttonElement = document.querySelector("#app button") as HTMLButtonElement;

let listaStorage: (string | null) = localStorage.getItem("@listagem_tarefas");
let tarefas: string[] =listaStorage !== null && JSON.parse(listaStorage) || [];

function listarTarefas() {
    listElement.innerHTML = "";
    if(tarefas.length === 0){
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
        
        element.appendChild(tarefaText);
        element.appendChild(linkElement);
        listElement.appendChild(element);
    });
}

listarTarefas();
function adicionarTarefa(): boolean | void {
    if (inputElement.value === "") {
        alert("Digite alguma tarefa!");
        return false;
    } else {
        let tarefaInput: string = inputElement.value;
        tarefas.push(tarefaInput);
        inputElement.value = "";

        listarTarefas();
        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefa;

function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}

function removerTarefa(posicao: number) {
    const confirmado: boolean = confirm("Tem certeza que deseja excluir essa tarefa?");
    if (confirmado) {
        tarefas.splice(posicao, 1);
        listarTarefas();
        salvarDados();
    }
}