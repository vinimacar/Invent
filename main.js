<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventário de Livros</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
        <div class="container py-4">
                <!-- Modal para nome do lançador -->
                <div class="modal fade" id="launcherModal" tabindex="-1" aria-labelledby="launcherModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="launcherModalLabel">Informe seu nome</h5>
                            </div>
                            <div class="modal-body">
                                <input type="text" class="form-control" id="launcherNameInput" placeholder="Nome do lançador" required autofocus>
                                <div class="invalid-feedback mt-2" id="launcherNameError" style="display:none;">Por favor, preencha seu nome.</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="saveLauncherName">Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 class="mb-4">Inventário de Livros</h1>
                <div class="mb-3">
                        <span id="launcherNameDisplay" class="fw-bold text-primary"></span>
                </div>
        <form id="bookForm" class="row g-3 mb-4">
            <div class="col-md-2">
                <input type="text" class="form-control" id="isbn" placeholder="ISBN" required>
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" id="titulo" placeholder="Título" required>
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" id="autor" placeholder="Autor" required>
            </div>
            <div class="col-md-1">
                <input type="number" class="form-control" id="ano" placeholder="Ano" required>
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" id="editora" placeholder="Editora" required>
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" id="genero" placeholder="Gênero" required>
            </div>
            <div class="col-md-1 d-grid">
                <button type="submit" class="btn btn-primary">Adicionar</button>
            </div>
        </form>
        <div class="mb-3">
            <button id="exportBtn" class="btn btn-success">Exportar para XLS</button>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered table-striped" id="booksTable">
                <thead class="table-dark">
                    <tr>
                        <th>ISBN</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ano</th>
                        <th>Editora</th>
                        <th>Gênero</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Livros serão inseridos aqui -->
                </tbody>
            </table>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js"></script>
    <script src="main.js"></script>
</body>
</html>
