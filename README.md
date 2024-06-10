## 使用技術
- フロントエンド：React, TypeScript
- API：RESAS
- グラフ：Highcharts
- リンター、フォーマッター：ESLint, Prettier
- CSS：sass
- テスト：Jest
- ホスティングサービス：Vercel
- 管理：Git
- ビルドツール：esbuild, Vite

## 事前準備
- [ ] ルートディレクトリに `.env` ファイルを作成する。
```
VITE_RESAS_API_KEY=your_api_key
```

- [ ] ルートディレクトリに `.env.test` ファイルを作成する。
```
VITE_RESAS_API_KEY=your_api_key
```

## 開発用コマンド
- ローカルコマンド①： `npm run dev`
- ローカルコマンド②： `npx serve dist`
- ビルドコマンド： `npm run build`
- テストコマンド： `npm run test`

## 補足
- ローカルコマンド①と②の差分としては、①は通常の開発用、②はビルドコマンドを実行した後、本番環境により近い環境で動作を確認する用途で使用しています。
