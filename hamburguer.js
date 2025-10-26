// Seleciona o botão de menu e o container do menu
const menuToggle = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');
const navbar = document.getElementById('navbar')

// Adiciona um ouvinte de evento para o clique no botão de hambúrguer
menuToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active'); // Adiciona ou remove a classe 'active' que exibe o menu
    navbar.classList.toggle('active'); // Adiciona ou remove a classe 'active' que exibe o menu
});
