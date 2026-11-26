const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// KẾT NỐI MYSQL DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tài khoản mặc định của MySQL
    password: '',      // Điền mật khẩu MySQL của bạn (XAMPP để trống)
    database: 'quan_ly_thu_chi'
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err.message);
        return;
    }
    console.log('Đã kết nối thành công với MySQL Database!');
});

// 1. API Lấy danh sách & Tính toán thống kê
app.get('/api/transactions', (req, res) => {
    db.query("SELECT * FROM transactions ORDER BY id DESC", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        let totalIncome = 0;
        let totalExpense = 0;

        rows.forEach(item => {
            const amount = parseFloat(item.amount);
            if (item.status === 'completed') {
                if (item.type === 'income') totalIncome += amount;
                else totalExpense += amount;
            }
        });

        res.json({
            transactions: rows,
            stats: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense
            }
        });
    });
});

// 2. API Thêm giao dịch mới
app.post('/api/transactions', (req, res) => {
    const { title, amount, type, status } = req.body;
    if (!title || !amount || amount <= 0) {
        return res.status(400).json({ error: "Dữ liệu không hợp lệ" });
    }
    const sql = "INSERT INTO transactions (title, amount, type, status) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, amount, type, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Thêm thành công" });
    });
});

// 3. API Sửa thông tin giao dịch
app.put('/api/transactions/:id', (req, res) => {
    const { title, amount, type, status } = req.body;
    const sql = "UPDATE transactions SET title = ?, amount = ?, type = ?, status = ? WHERE id = ?";
    db.query(sql, [title, amount, type, status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Cập nhật thành công" });
    });
});

// 4. API Cập nhật nhanh trạng thái
app.patch('/api/transactions/:id/status', (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE transactions SET status = ? WHERE id = ?";
    db.query(sql, [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Đổi trạng thái thành công" });
    });
});

// 5. API Xóa giao dịch
app.delete('/api/transactions/:id', (req, res) => {
    db.query("DELETE FROM transactions WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Xóa thành công" });
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
