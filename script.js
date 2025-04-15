// Lógica para autenticação, requisições ao backend e manipulação da interface
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userTypeSelect = document.getElementById('user-type');
const moradorSection = document.getElementById('morador-section');
const entregadorSection = document.getElementById('entregador-section');
const adminSection = document.getElementById('admin-section');
const notificacoesList = document.getElementById('notificacoes');
const registrosList = document.getElementById('registros');
const codigoRetiradaInput = document.getElementById('codigo-retirada');
const retirarEncomendaButton = document.getElementById('retirar-encomenda');
const destinatarioInput = document.getElementById('destinatario');
const codigoDepositoInput = document.getElementById('codigo-deposito');
const depositarEncomendaButton = document.getElementById('depositar-encomenda');
const gerenciarUsuariosButton = document.getElementById('gerenciar-usuarios');
const resolverProblemasButton = document.getElementById('resolver-problemas');

loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const userType = userTypeSelect.value;

    // Requisição ao backend para autenticação
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, userType })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Exibir seção correspondente ao tipo de usuário
            if (userType === 'morador') {
                moradorSection.style.display = 'block';
                // Requisição para obter notificações de entrega
                fetch('/api/notificacoes/' + data.userId)
                    .then(response => response.json())
                    .then(notificacoes => {
                        notificacoes.forEach(notificacao => {
                            const li = document.createElement('li');
                            li.textContent = notificacao;
                            notificacoesList.appendChild(li);
                        });
                    });
            } else if (userType === 'entregador') {
                entregadorSection.style.display = 'block';
            } else if (userType === 'admin') {
                adminSection.style.display = 'block';
                // Requisição para obter registros de entrega
                fetch('/api/registros')
                    .then(response => response.json())
                    .then(registros => {
                        registros.forEach(registro => {
                            const li = document.createElement('li');
                            li.textContent = registro;
                            registrosList.appendChild(li);
                        });
                    });
            }
        } else {
            alert('Falha na autenticação.');
        }
    });
});

// Lógica para as demais funcionalidades (retirar encomenda, depositar encomenda, etc.)
// ...

// Mostrar o botão de topo após scroll
window.addEventListener("scroll", () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        if (window.scrollY > 100) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Adiciona ou remove a classe active
    });
});

document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const results = document.getElementById("results");

    // Limpar resultados anteriores
    results.innerHTML = "";

    // Filtrar os itens com base no valor de entrada
    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(searchInput)
    );

    // Exibir resultados
    if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            results.appendChild(li);
        });
    } else {
        results.innerHTML = "<li>Nenhum resultado encontrado</li>";
    }
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (name === "") {
        document.querySelector("#name + .error-message").style.display = "block";
        hasError = true;
    } else {
        document.querySelector("#name + .error-message").style.display = "none";
    }

    if (!emailPattern.test(email)) {
        document.querySelector("#email + .error-message").style.display = "block";
        hasError = true;
    } else {
        document.querySelector("#email + .error-message").style.display = "none";
    }

    if (message === "") {
        document.querySelector("#message + .error-message").style.display = "block";
        hasError = true;
    } else {
        document.querySelector("#message + .error-message").style.display = "none";
    }

    if (hasError) {
        event.preventDefault();
    }
    });

    document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('active');
    });

    document.addEventListener("DOMContentLoaded", () => {
    const backToTop = document.getElementById("back-to-top");
    let isScrolling;

    // Mostrar o botão de topo após scroll
    window.addEventListener("scroll", () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (window.scrollY > 100) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        }, 200);
    });

    // Validação em tempo real no formulário
    document.getElementById("contact-form").addEventListener("submit", (event) => {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let hasError = false;

        if (!name.value.trim()) {
            name.nextElementSibling.style.display = "block";
            hasError = true;
        } else {
            name.nextElementSibling.style.display = "none";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            email.nextElementSibling.style.display = "block";
            hasError = true;
        } else {
            email.nextElementSibling.style.display = "none";
        }

        if (!message.value.trim()) {
            message.nextElementSibling.style.display = "block";
            hasError = true;
        } else {
            message.nextElementSibling.style.display = "none";
        }

        if (hasError) event.preventDefault();
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
document.querySelector('.nav').classList.toggle('active');
});

