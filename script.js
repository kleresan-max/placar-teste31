function criarConta() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Digite um email");
    return;
  }

  const hoje = new Date();
  const vencimento = new Date();
  vencimento.setDate(hoje.getDate() + 90);

  const usuario = {
    email: email,
    premium_until: vencimento.toISOString()
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));

  alert("Conta criada com 90 dias grátis!");
}

function entrar() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    alert("Crie uma conta primeiro.");
    return;
  }

  window.location.href = "dashboard.html";
}

function sair() {
  window.location.href = "index.html";
}

function verificarPremium() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const agora = new Date();
  const vencimento = new Date(usuario.premium_until);

  const status = document.getElementById("status");

  if (agora > vencimento) {
    status.innerHTML = "<h3>Seu período de teste expirou.</h3>";
  } else {
    status.innerHTML = "<h3>Premium ativo até: " + vencimento.toLocaleDateString() + "</h3>";
  }
}

if (window.location.pathname.includes("dashboard")) {
  verificarPremium();
}
