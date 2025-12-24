# やることリスト（ToDoアプリ）

シンプルでおしゃれなToDoアプリケーションです。React + TypeScriptで構築され、Atomicデザインパターンに基づいてコンポーネントが構成されています。REST APIを使用してサーバーサイドでデータを管理します。

## 機能

- ✅ タスクの追加（POST /api/todos）
- ✅ タスクの完了チェック（PUT /api/todos/:id）
- ✅ タスクの削除（DELETE /api/todos/:id）
- ✅ 完了済みタスクの一括削除
- ✅ サーバーサイドでのJSONファイルによるデータ管理
- ✅ REST APIによるデータ操作
- ✅ レスポンシブデザイン

## 技術スタック

**フロントエンド**
- React 18
- TypeScript
- Vite

**バックエンド**
- Node.js
- Express
- TypeScript
- JSONファイルによるデータ永続化

## APIエンドポイント

- `GET /api/todos` - 全Todo取得
- `POST /api/todos` - Todo追加
- `PUT /api/todos/:id` - Todo更新
- `DELETE /api/todos/:id` - Todo削除

## プロジェクト構造（Atomicデザイン）

```
├── server/             # バックエンド（REST API）
│   ├── data/           # データファイル
│   │   └── todos.json  # Todoデータ（JSON形式）
│   ├── types/          # TypeScript型定義
│   │   └── todo.ts
│   ├── utils/          # ユーティリティ関数
│   │   └── fileManager.ts  # JSONファイル管理
│   └── index.ts        # Expressサーバー
└── src/                # フロントエンド
    ├── components/
    │   ├── atoms/          # 最小単位のコンポーネント
    │   │   ├── Button/
    │   │   ├── Input/
    │   │   ├── Checkbox/
    │   │   └── Text/
    │   ├── molecules/      # Atomsを組み合わせたコンポーネント
    │   │   └── TodoItem/
    │   ├── organisms/      # Moleculesを組み合わせた複雑なコンポーネント
    │   │   ├── TodoList/
    │   │   ├── TodoInput/
    │   │   └── TodoFooter/
    │   └── templates/      # ページレイアウト
    │       └── TodoTemplate/
    ├── pages/              # 実際のページコンポーネント
    │   └── TodoPage/
    ├── types/              # TypeScript型定義
    │   └── todo.ts
    ├── utils/              # ユーティリティ関数
    │   ├── api.ts          # APIクライアント
    │   └── storage.ts      # （未使用：API使用のため）
    ├── App.tsx
    ├── App.css
    └── main.tsx
```

## セットアップ

### 必要な環境

- Node.js 16以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

#### フロントエンドとバックエンドを同時に起動

```bash
npm run dev:all
```

これにより、以下が起動します：
- バックエンドAPIサーバー: `http://localhost:3001`
- フロントエンド開発サーバー: `http://localhost:5173`

ブラウザで `http://localhost:5173` を開いてください。

#### 個別に起動する場合

```bash
# バックエンドのみ
npm run dev:server

# フロントエンドのみ
npm run dev
```

### データ管理

Todoデータは `server/data/todos.json` ファイルに保存されます。このファイルが存在しない場合、自動的に作成されます。

### ビルド

```bash
# フロントエンドのビルド
npm run build

# バックエンドのビルド（TypeScriptコンパイル）
npm run build:server
```

### プレビュー

```bash
npm run preview
```

## ライセンス

MIT

