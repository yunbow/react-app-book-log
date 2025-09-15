# 読書記録アプリ (TypeScript + React + Storybook)

React 18とTypeScriptで構築された読書記録管理アプリケーションです。機能別のモジュラーアーキテクチャを採用しています。

## デモプレイ
https://yunbow.github.io/react-app-book-log/demo/

## 主要機能

### 書籍管理
- 書籍の登録・編集・削除
- タイトル、著者、ジャンル、読書期間の記録
- 星評価（1-5段階）とレビュー機能
- データの永続化（localStorage）

### フィルタリング・検索
- **ジャンル別フィルタ**: 小説、ビジネス、自己啓発等でフィルタリング
- **検索機能**: タイトルや著者名による検索
- **並び替え**: 日付、タイトル、評価による並び替え

### 統計機能
- 合計読書冊数の表示
- 今月読んだ本の数
- 最もよく読むジャンルの表示
- 平均評価の計算
- 過去6ヶ月の読書数グラフ（Chart.js使用）

### 操作方法
- **書籍追加**: フォームに情報を入力して追加ボタン
- **詳細表示**: 書籍カードをクリックでモーダル表示
- **編集**: モーダル内の編集ボタンからフォームに値を反映
- **削除**: 削除ボタンで確認ダイアログ後削除

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール
- **Chart.js** - グラフ描画ライブラリ

## プロジェクト構造

```
src/
├── features/                   # 機能別モジュール
│   └── reading-log/            # 読書記録機能
│       ├── components/         # 機能専用コンポーネント
│       │   ├── BookForm/       # 書籍登録フォーム
│       │   ├── BookCard/       # 書籍カード
│       │   ├── BookModal/      # 書籍詳細モーダル
│       │   ├── FilterControls/ # フィルタ・検索コントロール
│       │   ├── StatsCard/      # 統計カード
│       │   └── ReadingChart/   # 読書数グラフ
│       ├── ReadingLogApp/      # 機能ルートコンポーネント
│       ├── useBooks.ts         # 書籍管理フック
│       ├── useBookFilter.ts    # フィルタリングフック
│       ├── useBookStats.ts     # 統計計算フック
│       ├── useModal.ts         # モーダル管理フック
│       └── types.ts            # 機能固有の型定義
├── components/                 # 共通UIコンポーネント
│   ├── Button/                 # 操作ボタン
│   ├── Input/                  # テキスト入力
│   ├── Select/                 # セレクトボックス
│   ├── TextArea/               # テキストエリア
│   └── Rating/                 # 星評価コンポーネント
├── stories/                    # Storybook用ストーリー
├── utils/                      # ユーティリティ関数
├── Config.ts                   # 設定値
├── App.tsx                     # メインアプリ
└── main.tsx                    # エントリーポイント
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License