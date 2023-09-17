const bannerusuario = document.getElementById("usuario")
let usuario =
  JSON.parse(localStorage.getItem("mcm2@usuario")) || "Sr(a). Produtivo(a)"
bannerusuario.innerHTML = "Bem-vindo(a), " + usuario + "!"

function defineusuario() {
  if (usuario == "Sr(a). Produtivo(a)") {
    usuario = prompt("Qual o seu nome?")
    if (usuario == "" || usuario == " " || usuario == null) {
      usuario = "Sr(a). Produtivo(a)"
    }
  } else {
    usuario = prompt("Qual o seu novo nome?")
    if (usuario == "" || usuario == null) {
      usuario = "Sr(a). Produtivo(a)"
    }
  }
  localStorage.setItem("mcm2@usuario", JSON.stringify(usuario))
  bannerusuario.innerHTML = "Bem-vindo (a), " + usuario + "!"
}

const listaPendentes = document.getElementById("pendentes")
const listaIniciadas = document.getElementById("iniciadas")
const listaConcluidas = document.getElementById("concluidas")

const tarefasPendentes =
  JSON.parse(localStorage.getItem("mcm2@pendentes")) || []
const tarefasIniciadas =
  JSON.parse(localStorage.getItem("mcm2@iniciadas")) || []
const tarefasConcluidas =
  JSON.parse(localStorage.getItem("mcm2@concluidas")) || []

function verificarListasVazias() {
  if (
    (listaPendentes.children.length === 0 &&
      !localStorage.getItem("mcm2@pendentes")) ||
    localStorage.getItem("mcm2@pendentes") == "[]"
  ) {
    const tarefaPadraoPendentes = criarTarefaPadrao()
    listaPendentes.appendChild(tarefaPadraoPendentes)
  }
  if (
    (listaIniciadas.children.length === 0 &&
      !localStorage.getItem("mcm2@iniciadas")) ||
    localStorage.getItem("mcm2@iniciadas") == "[]"
  ) {
    const tarefaPadraoIniciadas = criarTarefaPadrao()
    listaIniciadas.appendChild(tarefaPadraoIniciadas)
  }
  if (
    (listaConcluidas.children.length === 0 &&
      !localStorage.getItem("mcm2@concluidas")) ||
    localStorage.getItem("mcm2@concluidas") == "[]"
  ) {
    const tarefaPadraoConcluidas = criarTarefaPadrao()
    listaConcluidas.appendChild(tarefaPadraoConcluidas)
  }
}

function criarTarefaPadrao() {
  const cardTarefa = document.createElement("div")
  cardTarefa.className = "card tarefa"
  cardTarefa.draggable = true
  cardTarefa.addEventListener("dragstart", handleDragStart)
  cardTarefa.addEventListener("dragover", handleDragOver)
  cardTarefa.addEventListener("drop", handleDrop)
  const acoesTarefa = document.createElement("div")
  acoesTarefa.className = "acoes-tarefa"
  const concluirIcon = document.createElement("i")
  concluirIcon.className = "fa-solid fa-check"
  concluirIcon.onclick = concluirTarefa
  const editarIcon = document.createElement("i")
  editarIcon.className = "fa-solid fa-pencil"
  editarIcon.onclick = editarTarefa
  const anexarIcon = document.createElement("i")
  anexarIcon.className = "fa-solid fa-paperclip"
  anexarIcon.onclick = anexarArquivo
  const excluirIcon = document.createElement("i")
  excluirIcon.className = "fa-solid fa-trash"
  excluirIcon.onclick = excluirTarefa
  const reabrirIcon = document.createElement("i")
  reabrirIcon.className = "fa-solid fa-rotate-right"
  reabrirIcon.onclick = reabrirTarefa
  acoesTarefa.appendChild(concluirIcon)
  acoesTarefa.appendChild(editarIcon)
  acoesTarefa.appendChild(anexarIcon)
  acoesTarefa.appendChild(excluirIcon)
  acoesTarefa.appendChild(reabrirIcon)
  const cardBody = document.createElement("div")
  cardBody.className = "card-body"
  cardBody.textContent = "Crie, edite ou arraste uma tarefa aqui..."
  cardBody.appendChild(acoesTarefa)
  cardTarefa.appendChild(cardBody)
  return cardTarefa
}

verificarListasVazias()

tarefasPendentes.forEach((textoTarefa) => {
  const novaTarefa = criarCardTarefa(textoTarefa)
  listaPendentes.appendChild(novaTarefa)
})
tarefasIniciadas.forEach((textoTarefa) => {
  const novaTarefa = criarCardTarefa(textoTarefa)
  listaIniciadas.appendChild(novaTarefa)
})
tarefasConcluidas.forEach((textoTarefa) => {
  const novaTarefa = criarCardTarefa(textoTarefa)
  listaConcluidas.appendChild(novaTarefa)
})

const cardsTarefa = document.querySelectorAll(".tarefa")
cardsTarefa.forEach((card) => {
  card.draggable = true
  card.addEventListener("dragstart", handleDragStart)
  card.addEventListener("dragover", handleDragOver)
  card.addEventListener("drop", handleDrop)
})

function escondeBotao(lista) {
  const botaoPendente = document.getElementById("botaoPendente")
  const inputPendente = document.getElementById("inputPendente")
  const adicionaPendente = document.getElementById("adicionaPendente")
  const botaoIniciada = document.getElementById("botaoIniciada")
  const inputIniciada = document.getElementById("inputIniciada")
  const adicionaIniciada = document.getElementById("adicionaIniciada")
  const botaoConcluida = document.getElementById("botaoConcluida")
  const inputConcluida = document.getElementById("inputConcluida")
  const adicionaConcluida = document.getElementById("adicionaConcluida")
  if (lista == 0) {
    botaoPendente.style.display = "block"
    adicionaPendente.style.display = "none"
    botaoIniciada.style.display = "block"
    adicionaIniciada.style.display = "none"
    botaoConcluida.style.display = "block"
    adicionaConcluida.style.display = "none"
  } else if (lista == 1) {
    botaoPendente.style.display = "none"
    adicionaPendente.style.display = "block"
    inputPendente.focus()
  } else if (lista == 2) {
    botaoIniciada.style.display = "none"
    adicionaIniciada.style.display = "block"
    inputIniciada.focus()
  } else if (lista == 3) {
    botaoConcluida.style.display = "none"
    adicionaConcluida.style.display = "block"
    inputConcluida.focus()
  }
}

escondeBotao(0)

function adicionarTarefa(lista) {
  let inputTarefa, listaTarefas
  if (lista === 1) {
    inputTarefa = document.getElementById("inputPendente")
    listaTarefas = listaPendentes
  } else if (lista === 2) {
    inputTarefa = document.getElementById("inputIniciada")
    listaTarefas = listaIniciadas
  } else if (lista === 3) {
    inputTarefa = document.getElementById("inputConcluida")
    listaTarefas = listaConcluidas
  }
  const texto = inputTarefa.value.trim()
  if (texto !== "") {
    const novaTarefa = criarCardTarefa(texto)
    listaTarefas.appendChild(novaTarefa)
    atualizarTarefas()
    inputTarefa.value = ""
  }
}

function criarCardTarefa(texto, anexo = null) {
  const cardTarefa = document.createElement("div")
  cardTarefa.className = "card tarefa"
  cardTarefa.draggable = true
  cardTarefa.addEventListener("dragstart", handleDragStart)
  cardTarefa.addEventListener("dragover", handleDragOver)
  cardTarefa.addEventListener("drop", handleDrop)
  const acoesTarefa = document.createElement("div")
  acoesTarefa.className = "acoes-tarefa"
  const concluirIcon = document.createElement("i")
  concluirIcon.className = "fa-solid fa-check"
  concluirIcon.onclick = concluirTarefa
  const editarIcon = document.createElement("i")
  editarIcon.className = "fa-solid fa-pencil"
  editarIcon.onclick = editarTarefa
  const anexarIcon = document.createElement("i")
  anexarIcon.className = "fa-solid fa-paperclip"
  anexarIcon.onclick = anexarArquivo
  const excluirIcon = document.createElement("i")
  excluirIcon.className = "fa-solid fa-trash"
  excluirIcon.onclick = excluirTarefa
  const reabrirIcon = document.createElement("i")
  reabrirIcon.className = "fa-solid fa-rotate-right"
  reabrirIcon.onclick = reabrirTarefa
  acoesTarefa.appendChild(concluirIcon)
  acoesTarefa.appendChild(editarIcon)
  acoesTarefa.appendChild(anexarIcon)
  acoesTarefa.appendChild(excluirIcon)
  acoesTarefa.appendChild(reabrirIcon)
  const cardBody = document.createElement("div")
  cardBody.className = "card-body"
  cardBody.textContent = texto
  if (anexo) {
    const linkAnexo = document.createElement("a")
    linkAnexo.href = anexo
    linkAnexo.textContent = "Anexo"
    linkAnexo.target = "_blank"
    linkAnexo.style.display = "block"
    cardBody.appendChild(linkAnexo)
  }
  cardBody.appendChild(acoesTarefa)
  cardTarefa.appendChild(cardBody)
  return cardTarefa
}

function anexarArquivo(event) {}

function atualizarTarefas() {
  const tarefasListas = {
    pendentes: Array.from(listaPendentes.children).map(
      (item) => item.textContent
    ),
    iniciadas: Array.from(listaIniciadas.children).map(
      (item) => item.textContent
    ),
    concluidas: Array.from(listaConcluidas.children).map(
      (item) => item.textContent
    ),
  }
  localStorage.setItem(
    "mcm2@pendentes",
    JSON.stringify(tarefasListas.pendentes)
  )
  localStorage.setItem(
    "mcm2@iniciadas",
    JSON.stringify(tarefasListas.iniciadas)
  )
  localStorage.setItem(
    "mcm2@concluidas",
    JSON.stringify(tarefasListas.concluidas)
  )
}
let draggingItem = null

function handleDragStart(event) {
  draggingItem = event.target
  event.dataTransfer.effectAllowed = "move"
}

function handleDragOver(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = "move"
}

function handleDrop(event) {
  event.preventDefault()
  const target = event.target.closest(".tarefa")
  if (draggingItem && target && target !== draggingItem) {
    const listaOrigem = draggingItem.parentElement
    const listaDestino = target.parentElement
    listaDestino.insertBefore(draggingItem, target)
    atualizarTarefas()
    draggingItem = null
    if (listaOrigem.children.length === 0 || listaOrigem.children == "[]") {
      const tarefaPadrao = criarTarefaPadrao()
      listaOrigem.appendChild(tarefaPadrao)
    }
  }
}


function concluirTarefa(event) {
  const card = event.currentTarget.closest(".tarefa")
  const listaConcluidas = document.getElementById("concluidas")
  if (!listaConcluidas.contains(card)) {
    const listaAtual = card.parentElement
    listaAtual.removeChild(card)
    if (listaAtual.length === 0 || listaAtual == "[]") {
      const tarefaPadrao = criarTarefaPadrao()
      listaAtual.appendChild(tarefaPadrao)
    }
    listaConcluidas.appendChild(card)
    atualizarTarefas()
  }
}

function editarTarefa(event) {
  const card = event.currentTarget.closest(".tarefa")
  const cardBody = card.querySelector(".card-body")
  const novoTexto = prompt("Editar tarefa:", cardBody.textContent)
  if (novoTexto !== null && novoTexto.trim() !== "") {
    cardBody.textContent = novoTexto
    const acoesTarefa = card.querySelector(".acoes-tarefa")
    if (acoesTarefa) {
      acoesTarefa.remove()
    }
    const novaAcoesTarefa = document.createElement("div")
    novaAcoesTarefa.className = "acoes-tarefa"
    const concluirIcon = document.createElement("i")
    concluirIcon.className = "fa-solid fa-check"
    concluirIcon.onclick = concluirTarefa
    const editarIcon = document.createElement("i")
    editarIcon.className = "fa-solid fa-pencil"
    editarIcon.onclick = editarTarefa
    const anexarIcon = document.createElement("i")
    anexarIcon.className = "fa-solid fa-paperclip"
    anexarIcon.onclick = anexarArquivo
    const excluirIcon = document.createElement("i")
    excluirIcon.className = "fa-solid fa-trash"
    excluirIcon.onclick = excluirTarefa
    const reabrirIcon = document.createElement("i")
    reabrirIcon.className = "fa-solid fa-rotate-right"
    reabrirIcon.onclick = reabrirTarefa
    novaAcoesTarefa.appendChild(concluirIcon)
    novaAcoesTarefa.appendChild(editarIcon)
    novaAcoesTarefa.appendChild(anexarIcon)
    novaAcoesTarefa.appendChild(excluirIcon)
    novaAcoesTarefa.appendChild(reabrirIcon)
    card.appendChild(novaAcoesTarefa)
    atualizarTarefas()
  }
}

function excluirTarefa(event) {
  const card = event.currentTarget.parentElement.parentElement.parentElement
  if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
    card.remove()
    atualizarTarefas()
  }
}

function reabrirTarefa(event) {
  const card = event.currentTarget.closest(".tarefa")
  const listaPendentes = document.getElementById("pendentes")
  if (!listaPendentes.contains(card)) {
    const listaAtual = card.parentElement
    listaAtual.removeChild(card)
    if (listaAtual.length === 0 || listaAtual == "[]") {
      const tarefaPadrao = criarTarefaPadrao()
      listaAtual.appendChild(tarefaPadrao)
    }
    listaPendentes.appendChild(card)
    atualizarTarefas()
  }
}

function cancelarTarefa(lista) {
  if (lista == 1) {
    botaoPendente.style.display = "block"
    adicionaPendente.style.display = "none"
  } else if (lista == 2) {
    botaoIniciada.style.display = "block"
    adicionaIniciada.style.display = "none"
  } else if (lista == 3) {
    botaoConcluida.style.display = "block"
    adicionaConcluida.style.display = "none"
  }
}
