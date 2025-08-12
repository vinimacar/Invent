// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD38SuiPi9dLi-UDHMATPaQ7oOf2s7WfHk",
    authDomain: "invent-a6d59.firebaseapp.com",
    projectId: "invent-a6d59",
    storageBucket: "invent-a6d59.firebasestorage.app",
    messagingSenderId: "93463510955",
    appId: "1:93463510955:web:62fea6ceed2e3a8b93dcee"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let books = [];

// Adiciona livro ao Firebase e atualiza tabela
function addBook(event) {
    event.preventDefault();
    const isbn = document.getElementById('isbn').value.trim();
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const ano = document.getElementById('ano').value.trim();
    const editora = document.getElementById('editora').value.trim();
    const genero = document.getElementById('genero').value.trim();

    if (!isbn || !titulo || !autor || !ano || !editora || !genero) return;

    // Salva no Firebase (usando ISBN como chave)
    db.ref('books/' + isbn).set({ isbn, titulo, autor, ano, editora, genero }, function(error) {
        if (error) {
            alert('Erro ao salvar no Firebase: ' + error.message);
        } else {
            document.getElementById('bookForm').reset();
        }
    });
}

// Atualiza a tabela com os livros
function updateTable() {
    const tbody = document.querySelector('#booksTable tbody');
    tbody.innerHTML = '';
    books.forEach(function(book) {
        var row = '<tr>' +
            '<td>' + book.isbn + '</td>' +
            '<td>' + book.titulo + '</td>' +
            '<td>' + book.autor + '</td>' +
            '<td>' + book.ano + '</td>' +
            '<td>' + book.editora + '</td>' +
            '<td>' + book.genero + '</td>' +
        '</tr>';
        tbody.innerHTML += row;
    });
}

// Carrega livros do Firebase ao iniciar
function loadBooksFromFirebase() {
    db.ref('books').on('value', function(snapshot) {
        const data = snapshot.val();
        books = [];
        if (data) {
            for (let key in data) {
                books.push(data[key]);
            }
        }
        updateTable();
    });
}

// Funções para usuários
let users = [];

// Adiciona usuário ao Firebase
function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    if (!name || !email) return;
    // Salva no Firebase (usando push para gerar id único)
    db.ref('users').push({ name, email }, function(error) {
        if (error) {
            alert('Erro ao cadastrar usuário: ' + error.message);
        } else {
            document.getElementById('userForm').reset();
        }
    });
}

// Atualiza a tabela de usuários
function updateUsersTable() {
    const tbody = document.querySelector('#usersTable tbody');
    if (!tbody) return; // Evita erro se a tabela não existir
    tbody.innerHTML = '';
    users.forEach(function(user) {
        var row = '<tr>' +
            '<td>' + user.name + '</td>' +
            '<td>' + user.email + '</td>' +
        '</tr>';
        tbody.innerHTML += row;
    });
}

// Carrega usuários do Firebase
function loadUsersFromFirebase() {
    db.ref('users').on('value', function(snapshot) {
        const data = snapshot.val();
        users = [];
        if (data) {
            for (let key in data) {
                users.push(data[key]);
            }
        }
        updateUsersTable();
    });
}

// Chama o carregamento ao iniciar
window.addEventListener('DOMContentLoaded', function() {
    loadBooksFromFirebase();
    loadUsersFromFirebase();
    // Garante que o botão de exportação esteja sempre habilitado
    var exportBtn = document.getElementById('exportBtn');
    if (exportBtn) exportBtn.disabled = false;
    // Listener para cadastro de usuário
    var userForm = document.getElementById('userForm');
    if (userForm) userForm.addEventListener('submit', addUser);
});
