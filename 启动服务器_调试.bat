@echo off
echo 正在启动产品卖点字典系统（调试模式）...
echo.

REM 检查Node.js是否已安装
echo 检查Node.js安装状态...
node --version
if %errorlevel% neq 0 (
    echo 错误：未检测到Node.js，请先安装Node.js
    echo 请访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)
echo Node.js已安装，版本信息如上
echo.

REM 检查package.json是否存在
echo 检查package.json文件...
if not exist package.json (
    echo 错误：未找到package.json文件
    pause
    exit /b 1
)
echo package.json文件存在
echo.

REM 检查server.js是否存在
echo 检查server.js文件...
if not exist server.js (
    echo 错误：未找到server.js文件
    pause
    exit /b 1
)
echo server.js文件存在
echo.

REM 检查node_modules是否存在
echo 检查依赖包...
if not exist node_modules (
    echo 正在安装依赖包...
    npm install
    if %errorlevel% neq 0 (
        echo 错误：依赖安装失败
        pause
        exit /b 1
    )
    echo 依赖安装完成
) else (
    echo 依赖包已存在
)
echo.

REM 检查端口是否被占用
echo 检查端口3000是否被占用...
netstat -an | findstr :3000
if %errorlevel% equ 0 (
    echo 警告：端口3000可能已被占用
    echo 如果启动失败，请关闭占用端口的程序或修改server.js中的端口号
) else (
    echo 端口3000可用
)
echo.

REM 启动服务器
echo 正在启动服务器...
echo.
echo 服务器启动后，请访问以下地址：
echo - 本机访问：http://localhost:3000
echo - 局域网访问：http://你的IP地址:3000
echo.
echo 按 Ctrl+C 可以停止服务器
echo.
echo 如果服务器启动失败，请查看下面的错误信息：
echo ========================================
node server.js
echo ========================================
echo 服务器已停止
pause
