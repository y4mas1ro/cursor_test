import { promises as fs } from 'fs';
import path from 'path';
import { Todo } from '../types/todo';

const DATA_DIR = path.resolve(process.cwd(), 'server/data');
const TODOS_FILE = path.join(DATA_DIR, 'todos.json');

// データディレクトリとファイルの初期化
async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(TODOS_FILE);
  } catch {
    await fs.writeFile(TODOS_FILE, JSON.stringify([]), 'utf-8');
  }
}

// 初期化を実行
ensureDataFile().catch(console.error);

export async function readTodos(): Promise<Todo[]> {
  try {
    await ensureDataFile();
    const data = await fs.readFile(TODOS_FILE, 'utf-8');
    return JSON.parse(data) as Todo[];
  } catch (error) {
    console.error('Failed to read todos:', error);
    return [];
  }
}

export async function writeTodos(todos: Todo[]): Promise<void> {
  try {
    await ensureDataFile();
    await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write todos:', error);
    throw error;
  }
}

