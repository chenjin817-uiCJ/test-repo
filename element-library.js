// 元素库相关变量
let elements = [];
let filteredElements = [];
let currentCategory = 'all';
let searchQuery = '';
let uploadedImageMap = {};
let pendingExcelFile = null;
let pendingImages = [];

// 元素分类映射
const categoryMap = {
    'seat': '座包库',
    'backrest': '靠背库', 
    'armrest': '扶手库',
    'leg': '脚形库',
    'panel': '面板库',
    'detail': '细节库'
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadElements();
    initializeEventListeners();
    // 确保当前分类设置为'all'
    currentCategory = 'all';
    renderElements();
    // 检查存储空间使用情况
    checkStorageUsage();
});

// 初始化事件监听器
function initializeEventListeners() {
    // 分类切换
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            filterElements();
        });
    });

    // 搜索功能
    document.getElementById('searchInput').addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        filterElements();
    });

    // 图片上传
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
    document.getElementById('imageUploadArea').addEventListener('dragover', handleDragOver);
    document.getElementById('imageUploadArea').addEventListener('drop', handleImageDrop);

    // Excel上传
    document.getElementById('excelInput').addEventListener('change', handleExcelUpload);
    document.getElementById('excelUploadArea').addEventListener('dragover', handleDragOver);
    document.getElementById('excelUploadArea').addEventListener('drop', handleExcelDrop);

    // 图片文件上传
    document.getElementById('imagesInput').addEventListener('change', handleImagesUpload);
    document.getElementById('imagesUploadArea').addEventListener('dragover', handleDragOver);
    document.getElementById('imagesUploadArea').addEventListener('drop', handleImagesDrop);

    // 保存按钮事件监听器
    document.getElementById('saveElementBtn').addEventListener('click', function(e) {
        e.preventDefault();
        saveElement();
    });
}

// 加载元素数据
function loadElements() {
    const saved = localStorage.getItem('elementLibrary');
    if (saved) {
        elements = JSON.parse(saved);
    } else {
        // 初始化示例数据
        elements = [
            {
                id: 1,
                category: 'seat',
                name: '经典圆形座包',
                style: '现代简约',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgwIiBmaWxsPSIjZjBmNGZmIiBzdHJva2U9IiM2NjdlZWEiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2Ij7nrKzkuInkuKrml6Dmh6E8L3RleHQ+PC9zdmc+',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                category: 'backrest',
                name: '人体工学靠背',
                style: '科技感',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZjBmNGZmIiBzdHJva2U9IiM2NjdlZWEiIHN0cm9rZS13aWR0aD0iMiIgcng9IjEwIi8+PHRleHQgeD0iMTAwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiPuW4uOeUqOaXoOaHoeW4uOeUqOaXoTwvdGV4dD48L3N2Zz4=',
                createdAt: new Date().toISOString()
            }
        ];
        saveElements();
    }
}

// 保存元素数据
function saveElements() {
    try {
        localStorage.setItem('elementLibrary', JSON.stringify(elements));
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('存储空间不足！请清理一些数据或减少图片大小。');
            // 尝试清理一些旧数据
            clearOldElements();
            // 再次尝试保存
            try {
                localStorage.setItem('elementLibrary', JSON.stringify(elements));
            } catch (e) {
                alert('无法保存数据，请清理浏览器缓存或减少图片数量。');
            }
        } else {
            console.error('保存数据时出错:', error);
            alert('保存数据时出错: ' + error.message);
        }
    }
}

// 清理旧元素数据
function clearOldElements() {
    if (elements.length > 50) {
        // 保留最新的50个元素
        elements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        elements = elements.slice(0, 50);
        alert('已清理旧数据，保留最新的50个元素。');
    }
}

// 过滤元素
function filterElements() {
    filteredElements = elements.filter(element => {
        const matchesCategory = currentCategory === 'all' || element.category === currentCategory;
        const matchesSearch = !searchQuery || 
            element.name.toLowerCase().includes(searchQuery) ||
            element.style.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    renderElements();
}

// 渲染元素列表
function renderElements() {
    const grid = document.getElementById('elementsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredElements.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    grid.innerHTML = filteredElements.map(element => `
        <div class="element-card" data-id="${element.id}" onclick="viewElement(${element.id})">
            <div class="element-image">
                ${element.image ? 
                    `<img src="${element.image}" alt="${element.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                    `<i class="fas fa-cube"></i>`
                }
            </div>
            <div class="element-info">
                <div class="element-name">${element.name}</div>
                <div class="element-style">${element.style}</div>
                <div class="element-actions">
                    <div class="element-date">${formatDate(element.createdAt)}</div>
                    <button class="element-edit-btn" onclick="event.stopPropagation(); editElement(${element.id})">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
}

// 查看元素详情
function viewElement(id) {
    const element = elements.find(e => e.id === id);
    if (!element) return;
    
    // 显示元素详情模态框
    showElementDetailModal(element);
}

// 显示元素详情模态框
function showElementDetailModal(element) {
    // 创建详情模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'detailModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3 class="modal-title">元素详情</h3>
                <span class="close" onclick="closeModal('detailModal')">&times;</span>
            </div>
            <div class="modal-body">
                <div style="text-align: center; margin-bottom: 20px;">
                    ${element.image ? 
                        `<img src="${element.image}" alt="${element.name}" style="max-width: 300px; max-height: 300px; border-radius: 8px;">` :
                        `<div style="width: 300px; height: 200px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto;"><i class="fas fa-cube" style="font-size: 3rem; color: #999;"></i></div>`
                    }
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>元素名称：</strong>${element.name}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>分类：</strong>${categoryMap[element.category] || element.category}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>风格：</strong>${element.style}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>创建时间：</strong>${formatDate(element.createdAt)}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('detailModal')">关闭</button>
                <button class="btn btn-danger" onclick="deleteElement(${element.id}); closeModal('detailModal');" style="background-color: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                    <i class="fas fa-trash"></i> 删除
                </button>
                <button class="btn btn-primary" onclick="editElement(${element.id}); closeModal('detailModal');">编辑</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal('detailModal');
        }
    });
}

// 打开新增模态框
function openAddModal() {
    document.getElementById('addModal').style.display = 'block';
    document.getElementById('addElementForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
}

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (modalId === 'detailModal') {
            // 对于动态创建的模态框，直接移除
            modal.remove();
        } else {
            modal.style.display = 'none';
        }
    }
}

// 压缩图片
function compressImage(file, maxWidth = 800, maxHeight = 600, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // 计算压缩后的尺寸
            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // 绘制压缩后的图片
            ctx.drawImage(img, 0, 0, width, height);
            
            // 转换为base64
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// 处理图片上传
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // 检查文件大小
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('图片文件过大，请选择小于5MB的图片。');
            return;
        }
        
        // 压缩图片
        compressImage(file).then(compressedDataUrl => {
            document.getElementById('imagePreview').src = compressedDataUrl;
            document.getElementById('imagePreview').style.display = 'block';
        });
    }
}

// 处理拖拽
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

function handleImageDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        // 检查文件大小
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('图片文件过大，请选择小于5MB的图片。');
            return;
        }
        
        // 压缩图片
        compressImage(file).then(compressedDataUrl => {
            document.getElementById('imagePreview').src = compressedDataUrl;
            document.getElementById('imagePreview').style.display = 'block';
        });
    }
}

// 处理Excel上传
function handleExcelUpload(event) {
    const file = event.target.files[0];
    if (file) {
        pendingExcelFile = file;
    }
}

function handleExcelDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('excelInput').files = files;
        handleExcelUpload({ target: { files: files } });
    }
}

// 处理图片文件上传
function handleImagesUpload(event) {
    const files = Array.from(event.target.files);
    pendingImages = files;
    console.log(`已选择 ${files.length} 个图片文件`);
    
    // 显示选择的图片预览
    showImagePreviews(files);
}

function handleImagesDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    const files = Array.from(event.dataTransfer.files);
    pendingImages = files;
    console.log(`已拖拽 ${files.length} 个图片文件`);
    
    // 显示选择的图片预览
    showImagePreviews(files);
}

// 显示图片预览
function showImagePreviews(files) {
    const uploadArea = document.getElementById('imagesUploadArea');
    
    // 清除之前的预览
    const existingPreviews = uploadArea.querySelectorAll('.image-preview-item');
    existingPreviews.forEach(preview => preview.remove());
    
    if (files.length === 0) return;
    
    // 创建预览容器
    const previewContainer = document.createElement('div');
    previewContainer.style.cssText = `
        margin-top: 15px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
    `;
    
    const title = document.createElement('div');
    title.textContent = `已选择 ${files.length} 个图片文件：`;
    title.style.cssText = `
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
    `;
    previewContainer.appendChild(title);
    
    // 显示文件名列表
    const fileList = document.createElement('div');
    fileList.style.cssText = `
        max-height: 150px;
        overflow-y: auto;
        font-size: 12px;
        color: #666;
    `;
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.style.cssText = `
            padding: 4px 8px;
            margin: 2px 0;
            background: white;
            border-radius: 4px;
            border: 1px solid #ddd;
        `;
        fileItem.textContent = `${index + 1}. ${file.name}`;
        fileList.appendChild(fileItem);
    });
    
    previewContainer.appendChild(fileList);
    uploadArea.appendChild(previewContainer);
}

// 保存元素
function saveElement() {
    const category = document.getElementById('elementCategory').value;
    const name = document.getElementById('elementName').value;
    const style = document.getElementById('elementStyle').value;
    const imageInput = document.getElementById('imageInput');
    
    if (!category || !name || !style) {
        alert('请填写所有必填字段');
        return;
    }
    
    const newElement = {
        id: Date.now(),
        category: category,
        name: name,
        style: style,
        image: '',
        createdAt: new Date().toISOString()
    };
    
    
    // 处理图片
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        // 检查文件大小
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('图片文件过大，请选择小于5MB的图片。');
            return;
        }
        
        // 使用压缩后的图片
        compressImage(file).then(compressedDataUrl => {
            newElement.image = compressedDataUrl;
            elements.push(newElement);
            saveElements();
            // 添加元素后，切换到"全部"分类以确保新元素可见
            currentCategory = 'all';
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            document.querySelector('[data-category="all"]').classList.add('active');
            filterElements();
            closeModal('addModal');
        });
    } else {
        elements.push(newElement);
        saveElements();
        // 添加元素后，切换到"全部"分类以确保新元素可见
        currentCategory = 'all';
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        filterElements();
        closeModal('addModal');
    }
}

// 编辑元素
function editElement(id) {
    const element = elements.find(e => e.id === id);
    if (!element) return;
    
    // 填充表单
    document.getElementById('elementCategory').value = element.category;
    document.getElementById('elementName').value = element.name;
    document.getElementById('elementStyle').value = element.style;
    
    if (element.image) {
        document.getElementById('imagePreview').src = element.image;
        document.getElementById('imagePreview').style.display = 'block';
    }
    
    // 打开模态框
    openAddModal();
    
    // 修改保存逻辑为更新
    const saveBtn = document.querySelector('#addModal .btn-primary');
    saveBtn.onclick = function() {
        updateElement(id);
    };
}

// 更新元素
function updateElement(id) {
    const category = document.getElementById('elementCategory').value;
    const name = document.getElementById('elementName').value;
    const style = document.getElementById('elementStyle').value;
    const imageInput = document.getElementById('imageInput');
    
    if (!category || !name || !style) {
        alert('请填写所有必填字段');
        return;
    }
    
    const elementIndex = elements.findIndex(e => e.id === id);
    if (elementIndex === -1) return;
    
    elements[elementIndex].category = category;
    elements[elementIndex].name = name;
    elements[elementIndex].style = style;
    
    // 处理图片更新
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            elements[elementIndex].image = e.target.result;
            saveElements();
            filterElements();
            closeModal('addModal');
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveElements();
        filterElements();
        closeModal('addModal');
    }
}

// 打开Excel导入模态框
function openExcelModal() {
    document.getElementById('excelModal').style.display = 'block';
    pendingExcelFile = null;
    pendingImages = [];
}

// 从Excel导入
function importFromExcel() {
    if (!pendingExcelFile) {
        alert('请先选择Excel文件');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // 跳过标题行，处理数据
            const importedElements = [];
            const imagePromises = [];
            
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (row.length >= 3 && row[0] && row[1] && row[2]) {
                    const categoryMap = {
                        '座包库': 'seat',
                        '靠背库': 'backrest',
                        '扶手库': 'armrest',
                        '脚形库': 'leg',
                        '面板库': 'panel',
                        '细节库': 'detail'
                    };
                    
                    const element = {
                        id: Date.now() + i,
                        category: categoryMap[row[2]] || 'seat',
                        name: row[0],
                        style: row[1],
                        image: '',
                        createdAt: new Date().toISOString()
                    };
                    
                    // 如果有图片文件名，尝试匹配
                    if (row[3] && pendingImages.length > 0) {
                        const imageFile = pendingImages.find(img => 
                            img.name.toLowerCase() === row[3].toLowerCase()
                        );
                        if (imageFile) {
                            // 创建Promise来处理异步图片加载
                            const imagePromise = new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onload = function(e) {
                                    element.image = e.target.result;
                                    resolve(element);
                                };
                                reader.onerror = function() {
                                    console.warn(`图片 ${imageFile.name} 加载失败`);
                                    resolve(element);
                                };
                                reader.readAsDataURL(imageFile);
                            });
                            imagePromises.push(imagePromise);
                        } else {
                            console.warn(`未找到匹配的图片文件: ${row[3]}`);
                        }
                    }
                    
                    importedElements.push(element);
                }
            }
            
            // 等待所有图片加载完成
            Promise.all(imagePromises).then(() => {
                if (importedElements.length > 0) {
                    elements.push(...importedElements);
                    saveElements();
                    filterElements();
                    closeModal('excelModal');
                    alert(`成功导入 ${importedElements.length} 个元素`);
                } else {
                    alert('Excel文件中没有找到有效数据');
                }
            });
        } catch (error) {
            console.error('Excel解析错误:', error);
            alert('Excel文件格式错误，请检查文件格式');
        }
    };
    reader.readAsArrayBuffer(pendingExcelFile);
}

// 导出元素数据
function exportElements() {
    const dataStr = JSON.stringify(elements, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `element-library-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// 清理存储空间
function clearStorage() {
    if (confirm('确定要清理存储空间吗？这将删除所有元素数据，建议先导出数据备份。')) {
        localStorage.removeItem('elementLibrary');
        elements = [];
        filteredElements = [];
        renderElements();
        alert('存储空间已清理完成！');
    }
}

// 检查存储空间使用情况
function checkStorageUsage() {
    try {
        const data = JSON.stringify(elements);
        const sizeInMB = (new Blob([data]).size / 1024 / 1024).toFixed(2);
        console.log(`当前存储使用: ${sizeInMB} MB`);
        
        if (sizeInMB > 4) { // 接近5MB限制
            alert(`存储空间使用较多 (${sizeInMB} MB)，建议清理一些数据。`);
        }
    } catch (error) {
        console.error('检查存储空间时出错:', error);
    }
}

// 删除元素
function deleteElement(id) {
    const element = elements.find(e => e.id === id);
    if (!element) return;
    
    // 显示确认对话框
    const confirmed = confirm(`确定要删除元素"${element.name}"吗？\n\n此操作不可撤销！`);
    if (!confirmed) return;
    
    // 从数组中移除元素
    const elementIndex = elements.findIndex(e => e.id === id);
    if (elementIndex !== -1) {
        elements.splice(elementIndex, 1);
        saveElements();
        filterElements();
        alert('元素已删除！');
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
