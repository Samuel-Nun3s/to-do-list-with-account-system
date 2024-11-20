# API de Controle de Tarefas
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

Uma API simples para gerenciar tarefas (adicionar, listar, editar e excluir). A aplicação utiliza PHP para o backend, MySQL como banco de dados, e HTML, CSS e Javascript para o frontend.

## 🛠 Tecnologias Utilizadas

- **Frontend**: HTML, CSS, Javascript
- **Backend**: PHP
- **Banco de Dados**: MySQL

---

## 📋 Pré-requisitos

1. Servidor local (exemplo: [XAMPP](https://www.apachefriends.org/) ou [WAMP](https://www.wampserver.com/)).
2. PHP versão 7.4 ou superior.
3. MySQL configurado no servidor local.

---

## 🚀 Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/Samuel-Nun3s/API-controle-de-tarefas.git
    cd to-do_list_api

2. Configure o banco de dados:
    - Crie um banco de dados no MySQL:
    ```sql
    CREATE DATABASE task_manager;
    ```

    - Importe o arquivo de configuração:
    ```bash
    mysql -u root -p api_todo < database/api_todo.sql
    ```

    - Atualize o arquivo de conexão com o banco de dados em **config/database.php**:
    ```php
    <?php 
        // Conectando o Banco de dados:
        $host = 'localhost';
        $db_name = 'api_todo';
        $username = 'seu-usuario';
        $password = 'sua-senha';

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
            $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Erro de conexão: " . $e -> getMessage();
        }

    ?>
    ```

3. Configure o servidor local:
    - Coloque os arquivos na pasta pública do seu servidor local(htdocs no XAMPP).
    - acesse http://localhost/to-do_list_api/

---

# 📚 Endpoints da API

1. Adicionar Tarefa
    - Rota: **/api/add_task.php**
    - Método: **POST**
    - Parâmetros:
        - id(int): ID da tarefa.
        - title(string): Nome da tarefa.
        - status(boolean): Status da tarefa (ex.: False = "pendente", True = "concluido").
    - Exemplo de Corpo da Requisição:
    ```json
    {
        "id": 1,
        "title": "Comprar pão",
        "status": "1"
    }
    ```
    - Exemplo de Resposta:
    ```json
    {
        "message": "Tarefa adicionada com sucesso!"
    }
    ```

2. Listar Tarefas
    - Rota: **/api/get_tasks.php**
    - Método: **GET**
    - Resposta:
    ```json
    [
        {
            "id": 1,
            "title": "Comprar pão",
            "status": "0"
        },

        {
            "id": 2,
            "title": "Estudar PHP",
            "status": "1"
        }
    ]
    ```

3. Editar Tarefa
    - Rota: **/api/update_task.php**
    - Método: **PUT**
    - Parâmetros:
        - id(int): ID da tarefa a ser editada.
        - title(string): Nome atualizado da tarefa.
        - status(boolean): Status atualizado.
    - Exemplo de Corpo da Requisição:
    ```json
    {
        "id": 1,
        "title": "Comprar pão integral",
        "status": "1"
    }
    ```
    - Exemplo de Resposta:
    ```json
    {
        "message": "Tarefa atualizada com sucesso!"
    }
    ```

4. Excluir Tarefa
    - Rota: **/api/delete_task.php**
    - Método: **DELETE**
    - Parâmetros:
        - id(int): ID da tarefa a ser excluída.
    - Exemplo do Corpo da Requisição:
    ```json
    {
        "id": 1
    }
    ```
    - Exemplo de Resposta:
    ```json
    {
        "message": "Tarefa excluída com sucesso!"
    }
    ```

---

# 🧪 Testando a API

1. Use o navegador ou ferramentas como Postman ou Insomnia.
2. Certifique-se de que o servidor local esteja ativo.
3. Realize requisições para os enpoints mencionados acima.

---

# 🌟 Funcionalidades Futuras
- Autenticação de usuários.
- Filtros avançados (por status, data de criação, etc.).
- Paginação na listagem de tarefas.

# 📝 Licença
Este projeto é distribuido sob a licença MIT. Consulte o arquivo **LICENSE** para mais informações.

# 📬 Contato
Se você tiver dúvidas ou sugestões, entre em contato:
- Nome: Samuel Nunes
- Email: samuel.n.c.nun3s@gmail.com
- GitHub: Samuel-Nun3s 
