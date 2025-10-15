// 简单的测试服务器
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('服务器运行正常！');
});

app.listen(port, () => {
    console.log(`测试服务器运行在 http://localhost:${port}`);
    console.log('按 Ctrl+C 停止服务器');
});

// 捕获未处理的错误
process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的Promise拒绝:', reason);
    process.exit(1);
});
