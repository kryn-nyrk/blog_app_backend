import express from "express";
import mysql from "mysql2/promise";
// フロントエンドからのリクエストを許可するため
import cors from "cors";
const app = express();
const port = 5000;
// jsonを解析できるようにするためのミドルウェア
app.use(express.json());
app.use(cors());
const db = mysql.createPool({
    host: "db",
    user: "root",
    password: "password",
    database: "blog_db",
});
// 投稿を取得するためエンドポイント
app.get("/posts", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM posts");
    res.json(rows);
});
// 新しい投稿を追加するエンドポイント
app.post("/posts", async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    try {
        // クエリの結果を取得
        const [result] = await db.query(" INSERT INTO  posts (title, content) VALUES (?, ?)", [title, content]);
        // insertIdをResultSetHeaderから取得
        const insertId = result.insertId;
        // 成功した場合は、新規に作成した投稿のデータを返す
        res.status(201).json({ id: insertId, title, content });
    }
    catch (error) {
        res.status(500).json({ message: "Error saving the post" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
