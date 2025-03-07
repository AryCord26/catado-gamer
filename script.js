// script.js

// Função para listar os jogos favoritados
async function listarJogosFavoritados() {
    try {
        const response = await fetch('http://localhost:8080/jogos');  // Endereço da API de jogos no backend
        if (!response.ok) {
            throw new Error('Falha ao carregar os jogos favoritados.');
        }
        const jogos = await response.json();
        
        // Seleciona o container onde os jogos serão exibidos
        const container = document.querySelector('.content');
        container.innerHTML = '';  // Limpa conteúdo existente

        jogos.forEach(jogo => {
            const jogoItem = document.createElement('div');
            jogoItem.classList.add('game-item');
            
            jogoItem.innerHTML = `
                <img src="assets/images/${jogo.nome}.jpg" alt="Imagem do Jogo">
                <h2>${jogo.nome}</h2>
                <p>${jogo.descricao}</p>
                <p><strong>Avaliação:</strong> ${jogo.avaliacao}</p>
            `;
            
            container.appendChild(jogoItem);
        });
    } catch (error) {
        console.error('Erro ao listar jogos favoritados:', error);
    }
}

// Chama a função para listar os jogos quando a página de favoritos for carregada
if (window.location.pathname.includes('favorites.html')) {
    listarJogosFavoritados();
}

// Função para autenticação do login
document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('http://localhost:8080/usuarios/login', {  // Endpoint de login
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error('Credenciais inválidas.');
        }

        const user = await response.json();
        console.log('Usuário logado:', user);
        window.location.href = 'home.html';  // Redireciona para a página principal após login
    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    }
});
