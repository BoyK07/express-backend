const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = { id: idCounter++, title, description, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id == id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    todo.title = title;
    todo.description = description;
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id == id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

app.put('/todos/:id/complete', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id == id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = true;
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
