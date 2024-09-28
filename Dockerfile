# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリのソースコードをコピー
COPY . .

# 開発モードで起動
CMD ["npm", "run", "dev"]

# サーバーがポート5000で動作
EXPOSE 5000
