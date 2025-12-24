import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { readTodos, writeTodos } from './utils/fileManager';
import { Todo } from './types/todo';

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(express.json());

// GET /api/todos - 全Todo取得
app.get('/api/todos', async (_req: Request, res: Response) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos - Todo追加
app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const todos = await readTodos();
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    todos.push(newTodo);
    await writeTodos(todos);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id - Todo更新
app.put('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { text, completed } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const todos = await readTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...(text !== undefined && { text: typeof text === 'string' ? text.trim() : todos[todoIndex].text }),
      ...(completed !== undefined && { completed: Boolean(completed) }),
    };

    todos[todoIndex] = updatedTodo;
    await writeTodos(todos);

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /api/todos/:id - Todo削除
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const todos = await readTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    await writeTodos(todos);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

