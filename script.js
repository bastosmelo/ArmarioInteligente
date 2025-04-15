// =======================
// ELEMENTOS DA INTERFACE
// =======================
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userTypeSelect = document.getElementById('user-type');
const moradorSection = document.getElementById('morador-section');
const entregadorSection = document.getElementById('entregador-section');
const adminSection = document.getElementById('admin-section');
const notificacoesList = document.getElementById('notificacoes');
const registrosList = document.getElementById('registros');
const backToTop = document.getElementById("back-to-top");

// =======================
// AUTENTICAÇÃO
// =======================
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const userType = userTypeSelect.value;

    if (!username || !password) {
        alert('Preencha todos os campos.');
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, userType })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert('Falha na autenticação.');
            return;
        }

        if (userType === 'morador') {
            moradorSection.style.display = 'block';
            fetch(`/api/notificacoes/${data.userId}`)
                .then(res => res.json())
                .then(notificacoes => {
                    notificacoesList.innerHTML = '';
                    notificacoes.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        notificacoesList.appendChild(li);
                    });
                });
        } else if (userType === 'entregador') {
            entregadorSection.style.display = 'block';
        } else if (userType === 'admin') {
            adminSection.style.display = 'block';
            fetch('/api/registros')
                .then(res => res.json())
                .then(registros => {
                    registrosList.innerHTML = '';
                    registros.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        registrosList.appendChild(li);
                    });
                });
        }
    })
    .catch(error => console.error('Erro ao autenticar:', error));
});

// =======================
// MENU RESPONSIVO
// =======================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});

// =======================
// BOTÃO VOLTAR AO TOPO
// =======================
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        backToTop.style.display = window.scrollY > 100 ? "block" : "none";
    }, 200);
});

// =======================
// FORMULÁRIO DE CONTATO
// =======================
document.getElementById("contact-form").addEventListener("submit", (event) => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    const toggleError = (input, condition) => {
        input.nextElementSibling.style.display = condition ? "block" : "none";
        if (condition) hasError = true;
    };

    toggleError(name, name.value.trim() === "");
    toggleError(email, !emailPattern.test(email.value.trim()));
    toggleError(message, message.value.trim() === "");

    if (hasError) event.preventDefault();
});

// =======================
// BUSCA SIMPLES
// =======================
document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = "";

    const filteredItems = items.filter(item => item.toLowerCase().includes(searchInput));

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
