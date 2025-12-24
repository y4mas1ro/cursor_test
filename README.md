# やることリスト（ToDoアプリ）

シンプルでおしゃれなToDoアプリケーションです。React + TypeScriptで構築され、Atomicデザインパターンに基づいてコンポーネントが構成されています。

## 機能

- ✅ タスクの追加
- ✅ タスクの完了チェック
- ✅ タスクの削除
- ✅ 完了済みタスクの一括削除
- ✅ ブラウザのlocalStorageに自動保存
- ✅ レスポンシブデザイン

## 技術スタック

- React 18
- TypeScript
- Vite
- CSS Modules（通常のCSSファイル）

## プロジェクト構造（Atomicデザイン）

```
src/
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
│   └── storage.ts
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

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## ライセンス

MIT

