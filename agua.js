document.querySelector("#salvar").addEventListener("click", cadastrar)

let contas = []

window.addEventListener("load", () => {
  contas = JSON.parse(localStorage.getItem("contas")) || []
  atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
  let busca = document.querySelector("#busca").value
  let contasFiltradas = contas.filter ((conta) => {
    return conta.mes.toLowerCase().includes(busca)
  })
  filtrar(contasFiltradas)
})

function filtrar(contas) {
  document.querySelector("#contas").innerHTML =""
  contas.forEach((conta) => {
  document.querySelector("#contas").innerHTML += createCard(conta)
  })
}

function atualizar() {
  document.querySelector("#contas").innerHTML =""
  localStorage.setItem("contas", JSON.stringify(contas))
  contas.forEach((conta) => {
  document.querySelector("#contas").innerHTML += createCard(conta)
  })
}
    

function cadastrar() {
    const mes = document.querySelector('#mes').value
    const ano = document.querySelector('#ano').value
    const preco = document.querySelector('#preco').value
    const agua = document.querySelector('#agua').value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const conta = {
      id: Date.now(),
        mes,
        ano,
        preco,
        agua,
        concluida: false 
    }
    
    if (!validar(conta.mes, document.querySelector("#mes"))) return
    if (!validar(conta.ano, document.querySelector("#ano"))) return
    if (!validar(conta.preco, document.querySelector("#preco"))) return
    if (!validar(conta.agua, document.querySelector("#agua"))) return
    
    contas.push(conta)
    
    atualizar()

    modal.hide()

}

function validar(valor, campo) {
    if (valor == "") {
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true

}

function apagar(id){
    contas = contas.filter((conta) => {
      return conta.id != id
    })
    atualizar()
}

function concluir(id){
  let contaEncontrada = contas.find((conta) => {
    return conta.id == id
  })
  contaEncontrada.concluida = true 
  atualizar()
}

function createCard(conta) {
  let disabled = conta.concluida ? "disabled" : "" 
  return `
    <div class="col-lg-3 col-md-6 col-12">
        <div class="card mb-3">
          <div class="card-header">
            ${conta.mes} - ${conta.ano}
          </div>
          <div class="card-body">
            <p>
              <span class="badge text-bg-danger">$${conta.preco}</span>
            </p>
            <p>
              <span class="badge text-bg-primary">${conta.agua} L</span>
            </p>
            <a onClick="concluir(${conta.id})" href="#" class="btn btn-success ${disabled}" title="marcar como paga">
              <i class="bi bi-check-lg"></i>
            </a>
            <a onClick="apagar(${conta.id})" href="#" class="btn btn-danger" title="apagar conta">
              <i class="bi bi-trash"></i>
            </a>
          </div>
        </div> <!--card-->
      </div> <!--col-->` //template literals
}
  
