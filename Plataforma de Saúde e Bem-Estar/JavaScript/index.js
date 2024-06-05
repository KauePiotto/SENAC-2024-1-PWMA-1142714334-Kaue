/*SLIDE DE FOTOS*/
let contador = 1;
setInterval(function () {
    document.getElementById('slide' + contador).checked = true;
    contador++;
    if (contador > 4) {
        contador = 1;
    }
}, 3000);
/*FEEDBACK DO CLIENTE*/
document.getElementById("feedbackform").addEventListener("submit", function(event){
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let avaliacao = document.querySelector('input[name="avaliacao"]:checked').value;
    let mensagem = document.getElementById("mensagem").value;
    let feedback = {
        nome: nome,
        avaliacao: avaliacao,
        mensagem: mensagem
    };
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    alert("Feedback enviado com sucesso!");
    document.getElementById("mensagemSucesso").classList.remove("hidden");
    document.getElementById("feedbackform").reset();
    atualizarFeedbacks();
});
function atualizarFeedbacks() {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    let feedbacksDiv = document.getElementById("feedbacks");
    feedbacksDiv.innerHTML = '';
    for (let feedback of feedbacks) {
        let feedbackDiv = document.createElement("div");
        feedbackDiv.innerHTML = `
            <h3>${feedback.nome}</h3>
            <p>Avaliação: ${feedback.avaliacao}</p>
            <p>${feedback.mensagem}</p>
        `;
        feedbacksDiv.appendChild(feedbackDiv);
    }
}
atualizarFeedbacks();
/*CADASTRAR-SE*/
function validateForm() {
    let form = document.getElementById('cadastro-form');
    let medicamentoSelect = form.medicamento.value;
    let medicamentoDetalhes = form.detalhesmedicamentos.value;
    let problemamedSelect = form.problemamed.value;
    let promedDetalhes = form.detalhesprob.value;
    let messageDiv = document.getElementById('message');

    if (medicamentoSelect === 'sim' && !medicamentoDetalhes) {
        alert('Por favor, informe quais remédios você toma.');
        messageDiv.style.color = 'red';
        return false;
    }
    if (problemamedSelect === 'sim' && !promedDetalhes) {
        alert('Por favor, informe quais problemas médicos você tem.');
        messageDiv.style.color = 'red';
        return false;
    }
    // Salva os detalhes no localStorage
    localStorage.setItem('detalhesMedicamentos', medicamentoDetalhes);
    localStorage.setItem('detalhesProblemas', promedDetalhes);

    messageDiv.innerHTML = 'Cadastro realizado com sucesso!';
    messageDiv.style.color = 'green';
    form.reset();
    document.querySelector('.detalhesmedicamentos').style.display = 'none';
    document.querySelector('.problemed').style.display = 'none'
    return true;
}
/*LOGIN*/
function handeLogin(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let messageDiv = document.getElementById('message');
    if (email === '' || senha === '') {
        alert(messageDiv.innerHTML = 'Por favor preencha todos os campos.'); 
        messageDiv.style.color = 'red';
        return false;
    }
    if (validarEmailSenha(email, senha)) {
       alert(messageDiv.innerHTML = 'Login realizado com sucesso!'); 
        messageDiv.style.color = 'green';
        localStorage.setItem('email', email);
        window.location.href = "MenuUsuario.html" // Corrigido aqui
    } else {
      alert(messageDiv.innerHTML = 'Usuario ou senha invalidos.');  
        messageDiv.style.color = 'red';
    }
    return false;
}
function validarEmailSenha(email, senha) {
    let emailRegistrado = localStorage.getItem('email');
    let senhaRegistrada = localStorage.getItem('senha');

    if (email === emailRegistrado && senha === senhaRegistrada) {
        return true; 
        return false;
    }
}
/*Menu do Usuario*/