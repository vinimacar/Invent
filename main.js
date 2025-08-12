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

// Chama o carregamento ao iniciar
window.addEventListener('DOMContentLoaded', loadBooksFromFirebase);
