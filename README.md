# 💳 デジタル名刺ジェネレーター / Digital Business Card Generator

テンプレートを選んで情報を入力するだけで、QRコード付きのデジタル名刺を即座に生成できるWebアプリケーションです。

A web application that instantly generates a digital business card with a QR code — just pick a template and fill in your info.

---

## 📋 目次 / Table of Contents

- [概要 / Overview](#概要--overview)
- [機能一覧 / Features](#機能一覧--features)
- [技術スタック / Tech Stack](#技術スタック--tech-stack)
- [プロジェクト構成 / Project Structure](#プロジェクト構成--project-structure)
- [セットアップ / Setup](#セットアップ--setup)
- [使い方 / Usage](#使い方--usage)
- [URL設計 / URL Design](#url設計--url-design)
- [コンポーネント設計 / Component Design](#コンポーネント設計--component-design)
- [多言語対応 / i18n](#多言語対応--i18n)
- [ライセンス / License](#ライセンス--license)

---

## 概要 / Overview

**JP**: テンプレートセット（背景＋アイコン）を選択し、プロフィール情報とSNSリンクを入力すると、専用URLが発行されます。そのURLをQRコードに変換することで、スマートフォンで読み込むだけで閲覧できるデジタル名刺として利用できます。

**EN**: Select a template set (background + icon), enter your profile info and SNS links, and a unique URL is generated. That URL becomes a QR code — scan it with any smartphone to view the digital business card instantly.

---

## 機能一覧 / Features

### LP画面（テンプレート選択）
- テンプレートセット選択（背景画像＋アイコンがセットで切り替わる）
- プロフィール入力フォーム（文字数カウンター付き）
- SNSリンク入力（8種類対応、任意入力）
- QRコード生成・表示
- 日本語 / English 切り替え

### 電子名刺画面
- URLパラメータからの動的コンテンツ生成
- ロードアニメーション
- 名刺の表裏フリップアニメーション
  - **表面**: アイコン・名前・会社名・肩書き・一言
  - **裏面**: SNSリンク一覧

---

## 技術スタック / Tech Stack

| 用途 | ライブラリ |
|---|---|
| フレームワーク | [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript |
| ルーティング | [react-router-dom](https://reactrouter.com/) v6 |
| アニメーション | [Framer Motion](https://www.framer.com/motion/) |
| QRコード生成 | [qrcode.react](https://github.com/zpao/qrcode.react) |
| 多言語対応 | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) |
| URLエンコード | [lz-string](https://github.com/pieroxy/lz-string)（圧縮）+ Base64 |
| スタイリング | CSS Modules / Tailwind CSS |

---

## プロジェクト構成 / Project Structure

```
src/
├── App.tsx
│
├── i18n/                          # 多言語対応
│   ├── index.ts
│   └── locales/
│       ├── ja.json
│       └── en.json
│
├── pages/
│   ├── LandingPage.tsx            # LP（テンプレート選択画面）
│   └── CardPage.tsx               # 電子名刺表示画面
│
├── features/
│   ├── template-selector/
│   │   ├── TemplateSelectorSection.tsx
│   │   ├── TemplateSetPicker.tsx      # セット番号で背景＋アイコンを一括選択
│   │   ├── TemplateSetPreview.tsx     # セットのサムネイルプレビュー
│   │   ├── ProfileFormSection.tsx     # 名前・会社・肩書き・一言フォーム
│   │   └── SnsLinkEditor.tsx          # SNS 8種のON/OFF + URL入力
│   │
│   ├── qr-generator/
│   │   ├── QrModal.tsx
│   │   └── QrCodeDisplay.tsx
│   │
│   └── business-card/
│       ├── CardFlipContainer.tsx      # 表裏フリップ制御
│       ├── CardFront.tsx              # 名刺・表面
│       ├── CardBack.tsx               # 名刺・裏面（SNSリンク）
│       └── CardLoadingAnimation.tsx   # ロードアニメーション
│
├── components/                    # 汎用UIコンポーネント
│   ├── SnsIconLink.tsx
│   ├── AvatarIcon.tsx
│   ├── CharCountInput.tsx         # 文字数カウンター付きinput/textarea
│   └── LanguageSwitcher.tsx       # JA/EN切り替えボタン
│
├── hooks/
│   ├── useCardParams.ts           # URLパラメータのエンコード／デコード
│   └── useTemplateState.ts        # テンプレート選択状態の管理
│
├── constants/
│   ├── templateSets.ts            # テンプレートセット定義
│   └── snsConfig.ts               # SNS 8種の設定
│
├── types/
│   └── card.ts                    # 共通型定義
│
└── utils/
    ├── encodeParams.ts            # CardConfig → URLパラメータ
    └── decodeParams.ts            # URLパラメータ → CardConfig
```

---

## セットアップ / Setup

### 必要環境 / Requirements

- Node.js `>= 18.x`
- npm `>= 9.x` または pnpm / yarn

### インストール / Install

```bash
git clone https://github.com/your-name/digital-business-card.git
cd digital-business-card
npm install
```

### 開発サーバー起動 / Dev Server

```bash
npm run dev
```

[http://localhost:5173](http://localhost:5173) で確認できます。

### ビルド / Build

```bash
npm run build
```

### プレビュー / Preview

```bash
npm run preview
```

---

## 使い方 / Usage

1. トップページでテンプレートセットを選ぶ
2. 名前・会社名・肩書き・一言を入力する
3. 使用するSNSを選択してURLを入力する
4. 「QRコードを生成」ボタンを押す
5. 表示されたQRコードを名刺として利用する

---

1. Choose a template set on the top page
2. Enter your name, company, job title, and short bio
3. Select SNS platforms and enter your profile URLs
4. Click "Generate QR Code"
5. Share the QR code as your digital business card

---

## URL設計 / URL Design

生成されたURLは以下の形式です：

```
https://your-domain.com/card/:encoded
```

`:encoded` は `CardConfig` オブジェクトを JSON にシリアライズし、`lz-string` で圧縮後に Base64 エンコードした文字列です。URLのみで完全な名刺情報を再現できるため、サーバーサイドのデータ保存は不要です。

The `:encoded` segment is the `CardConfig` object serialized to JSON, compressed with `lz-string`, and Base64-encoded. No server-side storage is needed — all card data lives in the URL.

---

## コンポーネント設計 / Component Design

### データフロー

```
LandingPage
 ├─ LanguageSwitcher    → i18n 切り替え
 ├─ TemplateSetPicker   → templateSetId 選択
 ├─ ProfileFormSection  → name / company / title / bio 入力
 └─ SnsLinkEditor       → SNS ON/OFF + URL 入力
        ↓
   encodeParams(CardConfig) → URL 生成
        ↓
   QrModal → QRコード表示

CardPage (/card/:encoded)
 └─ decodeParams() → CardConfig 復元
        ↓
   CardLoadingAnimation
        ↓
   CardFlipContainer
     ├─ CardFront（背景・アイコン・名前・会社・肩書き・一言）
     └─ CardBack（SNS リンクボタン 8種）
```

### 型定義 / Type Definitions (`types/card.ts`)

```typescript
type Locale = 'ja' | 'en';

type SnsPlatform =
  | 'line' | 'instagram' | 'x'
  | 'facebook' | 'tiktok' | 'linkedin'
  | 'whatsapp' | 'github';

type SnsLink = {
  platform: SnsPlatform;
  url: string;
};

type CardConfig = {
  templateSetId: number;   // テンプレートセット番号
  name: string;            // 最大 30文字
  company: string;         // 最大 40文字
  title: string;           // 最大 40文字
  bio: string;             // 最大 60文字
  snsLinks: SnsLink[];     // 入力されたSNSのみ含む
  locale: Locale;
};
```

---

## 多言語対応 / i18n

`src/i18n/locales/ja.json` と `en.json` にテキストを管理しています。  
画面右上の言語スイッチャーでいつでも切り替え可能です。

All UI text is managed in `src/i18n/locales/ja.json` and `en.json`.  
Switch languages anytime via the language switcher in the top-right corner.

---

## 対応SNS / Supported SNS Platforms

| プラットフォーム | 入力形式 |
|---|---|
| LINE | LINE ID |
| Instagram | プロフィールURL |
| X (Twitter) | プロフィールURL |
| Facebook | プロフィールURL |
| TikTok | プロフィールURL |
| LinkedIn | プロフィールURL |
| WhatsApp | 電話番号（国番号付き） |
| GitHub | プロフィールURL |

---

## ライセンス / License

MIT
