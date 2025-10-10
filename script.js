// 全局变量
let materials = [];
let filteredMaterials = [];
let categoryFilter = 'all'; // all | wood | fabric | foam
let uploadedImageMap = {}; // filename(lowercased) -> dataURL (base64) or URL
let pendingExcelFile = null; // remember excel if images come first

// 面料相关变量
let fabrics = [];
let filteredFabrics = [];
let fabricCategoryFilter = 'all'; // all | amazon | website | wayfair
let fabricSearchQuery = ''; // 面料搜索关键词
let currentPage = 'materials'; // materials | fabrics | colorboard | highlights | options
let uploadedFabricImageMap = {}; // filename(lowercased) -> dataURL (base64) or URL
let pendingFabricExcelFile = null; // remember excel if images come first

// 色板管理相关变量
let colorboardCategoryFilter = 'all'; // all | amazon | website | wayfair
let colorboardSearchQuery = ''; // 色板搜索关键词

// 选项管理相关变量
let materialOptions = [];
let filteredOptions = [];
let optionsCategoryFilter = 'all'; // all | fabric | wood | foam
let optionsSearchQuery = '';

// 产品卖点相关变量
let highlights = [];
let filteredHighlights = [];
let highlightCategoryFilter = 'all'; // all | sofa | chair | table
let highlightSearchQuery = '';
let uploadedHighlightImageMap = {}; // filename(lowercased) -> dataURL (base64) or URL
let pendingHighlightExcelFile = null; // remember excel if images come first

// 示例选项数据
const sampleOptions = [
    {
        id: 1,
        category: 'foam',
        name: '高密度海绵'
    },
    {
        id: 2,
        category: 'foam',
        name: '海绵+羽绒'
    },
    {
        id: 3,
        category: 'foam',
        name: '海绵+弹簧包'
    },
    {
        id: 4,
        category: 'foam',
        name: '羽绒'
    },
    {
        id: 5,
        category: 'foam',
        name: '海绵+鸭毛'
    },
    {
        id: 6,
        category: 'fabric',
        name: '棉麻混纺'
    },
    {
        id: 7,
        category: 'fabric',
        name: '真丝面料'
    },
    {
        id: 8,
        category: 'wood',
        name: '橡木'
    },
    {
        id: 9,
        category: 'wood',
        name: '胡桃木'
    }
];

// 示例数据
const sampleMaterials = [
    {
        id: 1,
        name: "实木",
        description: "天然木材，环保健康，纹理自然美观",
        features: ["环保", "耐用", "自然纹理", "可修复"],
        imageUrl: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "人造板",
        description: "由木材碎片或纤维制成，价格实惠，性能稳定",
        features: ["价格实惠", "尺寸稳定", "易加工", "防潮"],
        imageUrl: "https://images.unsplash.com/photo-1582582429416-67fbd0bfcac7?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "金属",
        description: "坚固耐用，现代感强，易于清洁维护",
        features: ["坚固耐用", "现代感", "易清洁", "防火"],
        imageUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "玻璃",
        description: "透明美观，空间感强，现代简约风格",
        features: ["透明美观", "空间感强", "易清洁", "现代感"],
        imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "皮革",
        description: "质感奢华，舒适耐用，彰显品味",
        features: ["质感奢华", "舒适耐用", "易清洁", "透气性好"],
        imageUrl: "https://images.unsplash.com/photo-1616628188466-5181ed1cbab4?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "布艺",
        description: "柔软舒适，色彩丰富，价格亲民",
        features: ["柔软舒适", "色彩丰富", "价格亲民", "易更换"],
        imageUrl: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "石材",
        description: "天然石材，质感丰富，坚固耐用，适合台面和装饰",
        features: ["天然", "坚固耐用", "质感丰富", "易清洁"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
    }
];

// 面料示例数据
const sampleFabrics = [
    {
        id: 1,
        code: "F001",
        colorCode: "CC-001",
        name: "高级纯棉面料",
        description: "采用100%纯棉材质制作，天然环保，触感柔软舒适，透气性极佳，适合四季使用",
        features: ["透气", "柔软", "易清洁", "天然材质"],
        category: "amazon",
        price: 25.50,
        currency: "CNY",
        moq: "100米",
        manufacturer: "华纺集团",
        classification: "亚麻",
        composition: "100%棉",
        weight: "180g/m²",
        width: "150cm",
        color: "米白色",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 2,
        code: "F002",
        colorCode: "AG-002",
        name: "亚麻混纺面料",
        description: "优质亚麻与棉纤维混纺，保持天然纤维的舒适性，同时具有抗菌、吸湿排汗等特性",
        features: ["天然纤维", "抗菌", "吸湿排汗", "环保"],
        category: "website",
        price: 3.80,
        currency: "USD",
        moq: "200米",
        manufacturer: "Linen Textiles Co.",
        classification: "雪尼尔",
        composition: "60%亚麻, 40%棉",
        weight: "200g/m²",
        width: "140cm",
        color: "浅灰色",
        imageUrl: "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24fe?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 3,
        code: "F003",
        colorCode: "VB-003",
        name: "高档丝绒面料",
        description: "高档丝绒材质，具有奢华质感和优雅光泽，保暖性能优异，适合高端家具使用",
        features: ["奢华质感", "保暖", "防滑", "易维护"],
        category: "wayfair",
        price: 45.00,
        currency: "USD",
        moq: "50米",
        manufacturer: "Luxury Fabrics Ltd.",
        classification: "绒布",
        composition: "100%聚酯纤维",
        weight: "350g/m²",
        width: "145cm",
        color: "深蓝色",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 4,
        code: "F004",
        name: "现代合成纤维面料",
        description: "现代合成纤维材质，具有出色的耐用性和抗皱性能，色彩保持持久，易于维护",
        features: ["耐用", "抗皱", "快干", "色彩鲜艳"],
        category: "amazon",
        price: 18.00,
        currency: "CNY",
        manufacturer: "合成纤维厂",
        classification: "仿麻",
        composition: "100%聚酯纤维",
        weight: "150g/m²",
        width: "160cm",
        color: "白色",
        imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 5,
        code: "F005",
        name: "羊毛混纺面料",
        description: "优质羊毛与天然纤维混纺，保暖性极佳，具有良好的弹性和抗静电性能",
        features: ["保暖", "天然", "弹性好", "抗静电"],
        category: "website",
        price: 2.50,
        currency: "USD",
        manufacturer: "Wool Masters",
        classification: "雪尼尔",
        composition: "70%羊毛, 30%腈纶",
        weight: "280g/m²",
        width: "135cm",
        color: "棕色",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 6,
        code: "F006",
        name: "环保竹纤维面料",
        description: "环保竹纤维材质，具有天然的抗菌性能，透气性佳，柔软舒适，符合现代环保理念",
        features: ["抗菌", "环保", "透气", "柔软"],
        category: "wayfair",
        price: 32.00,
        currency: "CNY",
        manufacturer: "绿色纺织",
        classification: "亚麻",
        composition: "100%竹纤维",
        weight: "160g/m²",
        width: "155cm",
        color: "浅绿色",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop"
    }
];

// 产品卖点示例数据
const sampleHighlights = [
    {
        id: 1,
        name: "现代简约三人沙发",
        parentModel: "SF-2024-001",
        category: "seating",
        description: "采用优质实木框架，高密度海绵填充，外层选用进口真皮材质。设计简约现代，符合当代家居审美，提供极致的舒适体验。",
        features: ["舒适耐用", "现代设计", "易清洁", "环保材料"],
        referenceLinks: [
            "https://example.com/sofa-reference",
            "https://example.com/sofa-details",
            ""
        ],
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
        fabricMaterial: "棉麻混纺",
        legMaterial: "橡木",
        spongeMaterial: "高密度海绵",
        frameMaterial: "胡桃木",
        function: "可调节靠背",
        sceneImages: [
            {
                id: 1,
                imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 2,
                imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
            }
        ],
        designPoints: [
            {
                id: 1,
                title: "实木框架设计",
                description: "采用优质橡木制作，结构稳固，承重能力强",
                imageUrl: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 2,
                title: "真皮材质",
                description: "进口头层牛皮，触感柔软，透气性好",
                imageUrl: "https://images.unsplash.com/photo-1616628188466-5181ed1cbab4?q=80&w=800&auto=format&fit=crop"
            }
        ]
    },
    {
        id: 2,
        name: "北欧风格餐椅",
        parentModel: "CH-2024-002",
        category: "seating",
        description: "灵感来源于北欧设计理念，采用天然橡木制作，曲线优美，坐感舒适。适合现代家居和办公环境。",
        features: ["天然木材", "北欧风格", "人体工学", "手工制作"],
        referenceLinks: [
            "https://example.com/chair-reference",
            "",
            ""
        ],
        imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1200&auto=format&fit=crop",
        fabricMaterial: "真丝面料",
        legMaterial: "橡木",
        spongeMaterial: "高密度海绵",
        frameMaterial: "胡桃木",
        function: "人体工学设计",
        sceneImages: [
            {
                id: 3,
                imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800&auto=format&fit=crop"
            }
        ],
        designPoints: [
            {
                id: 3,
                title: "人体工学靠背",
                description: "符合人体曲线的靠背设计，长时间坐着也不会疲劳",
                imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800&auto=format&fit=crop"
            }
        ]
    },
    {
        id: 3,
        name: "大理石餐桌",
        parentModel: "TB-2024-003",
        category: "table",
        description: "精选意大利进口大理石台面，配以不锈钢底座，既实用又美观。适合现代家庭和商业空间使用。",
        features: ["进口大理石", "不锈钢底座", "易清洁", "现代简约"],
        referenceLinks: [
            "https://example.com/table-reference",
            "https://example.com/table-specs",
            ""
        ],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
        panelMaterial: "橡木",
        legMaterial: "胡桃木",
        function: "可伸缩设计",
        sceneImages: [],
        designPoints: [
            {
                id: 4,
                title: "意大利进口大理石",
                description: "精选卡拉拉白大理石，纹理自然，质感奢华",
                imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
            }
        ]
    },
    {
        id: 5,
        name: "L型转角沙发",
        parentModel: "SF-2024-005",
        category: "seating",
        description: "专为小户型设计的L型转角沙发，充分利用空间，提供更多座位。采用耐磨面料，经久耐用，清洁方便。",
        features: ["L型设计", "空间利用率高", "耐磨面料", "易清洁"],
        referenceLinks: ["", "", ""],
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
        fabricMaterial: "真丝面料",
        legMaterial: "橡木",
        spongeMaterial: "海绵+羽绒",
        frameMaterial: "胡桃木",
        function: "L型转角设计",
        sceneImages: [],
        designPoints: []
    },
    {
        id: 6,
        name: "办公转椅",
        parentModel: "CH-2024-006",
        category: "seating",
        description: "符合人体工学的办公转椅，可调节高度和靠背角度，提供全天候舒适办公体验。采用透气网布材质，久坐不累。",
        features: ["人体工学", "可调节", "透气材质", "办公专用"],
        referenceLinks: [
            "https://example.com/office-chair-reference",
            "",
            ""
        ],
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop",
        fabricMaterial: "棉麻混纺",
        legMaterial: "橡木",
        spongeMaterial: "海绵+弹簧包",
        frameMaterial: "胡桃木",
        function: "高度可调节",
        sceneImages: [],
        designPoints: []
    }
];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    
    // 添加全局图片点击事件委托
    document.addEventListener('click', function(e) {
        // 只处理图片点击，不影响其他元素
        if (e.target.tagName === 'IMG' && e.target.hasAttribute('data-image-src')) {
            // 检查是否在模态框内，如果是则使用不同的处理方式
            const modal = e.target.closest('.modal');
            if (modal && modal.id !== 'imagePreviewModal') {
                // 在模态框内的图片点击
                const imageSrc = e.target.getAttribute('data-image-src');
                console.log('Modal image click detected, src:', imageSrc);
                openImagePreview(imageSrc);
            } else if (!modal) {
                // 不在模态框内的图片点击
                const imageSrc = e.target.getAttribute('data-image-src');
                console.log('Global image click detected, src:', imageSrc);
                openImagePreview(imageSrc);
            }
        }
    });
    
});

// 初始化应用
function initializeApp() {
    // 初始化材质数据
    try {
        const stored = localStorage.getItem('materials_v1');
        if (stored) {
            materials = JSON.parse(stored);
        } else {
            materials = sampleMaterials.map(m => ({
                ...m,
                category: m.category || inferCategoryByName(m.name)
            }));
        }
    } catch (e) {
        materials = sampleMaterials.map(m => ({
            ...m,
            category: m.category || inferCategoryByName(m.name)
        }));
    }
    filteredMaterials = [...materials];

    // 初始化面料数据
    try {
        const storedFabrics = localStorage.getItem('fabrics_v1');
        if (storedFabrics) {
            const parsed = JSON.parse(storedFabrics);
            if (Array.isArray(parsed)) {
                // 验证和清理数据
                fabrics = parsed.filter(item => {
                    // 检查基本结构
                    if (!item || typeof item !== 'object') return false;
                    
                    // 检查是否有有效的标识字段
                    const hasValidId = item.id && item.id !== '';
                    const hasValidCode = (item.colorCode && item.colorCode !== '') || 
                                       (item.code && item.code !== '') || 
                                       (item.name && item.name !== '');
                    
                    return hasValidId && hasValidCode;
                });
                
                // 保留小图片的base64数据，清理过大的base64数据
                fabrics = fabrics.map(item => {
                    if (item.imageUrl && item.imageUrl.startsWith('data:image/')) {
                        // 如果base64数据过大（超过200KB），则清理
                        if (item.imageUrl.length > 200 * 1024) {
                            console.log('清理过大的base64图片数据');
                            return { ...item, imageUrl: '' };
                        }
                    }
                    return item;
                });
                
                console.log('从localStorage加载面料数据，数据条数:', fabrics.length);
            } else {
                fabrics = [...sampleFabrics];
                console.log('面料数据格式错误，使用默认数据，数据条数:', fabrics.length);
            }
        } else {
            fabrics = [...sampleFabrics];
            console.log('使用默认面料数据，数据条数:', fabrics.length);
        }
    } catch (e) {
        fabrics = [...sampleFabrics];
        console.log('面料数据加载失败，使用默认数据，数据条数:', fabrics.length);
    }
    filteredFabrics = [...fabrics];

    // 面料数据迁移 - 添加MOQ字段和色板型号字段
    let fabricDataUpdated = false;
    fabrics.forEach(fabric => {
        if (fabric.moq === undefined) {
            fabric.moq = '';
            fabricDataUpdated = true;
            console.log(`为面料 ${fabric.code} 添加空的MOQ字段`);
        }
        if (fabric.colorCode === undefined) {
            fabric.colorCode = '';
            fabricDataUpdated = true;
            console.log(`为面料 ${fabric.code} 添加空的色板型号字段`);
        }
        if (fabric.width === undefined) {
            fabric.width = '';
            fabricDataUpdated = true;
            console.log(`为面料 ${fabric.code} 添加空的门幅字段`);
        }
    });
    
    // 如果有面料数据更新，保存到localStorage
    if (fabricDataUpdated) {
        saveFabrics();
    }

    // 初始化面料过滤
    applyFabricFilters();

    // 初始化产品卖点数据
    try {
        const storedHighlights = localStorage.getItem('highlights_v1');
        if (storedHighlights) {
            highlights = JSON.parse(storedHighlights);
            console.log('从localStorage加载产品卖点数据:', highlights);
        } else {
            highlights = [...sampleHighlights];
            console.log('使用示例产品卖点数据:', highlights);
        }
    } catch (e) {
        highlights = [...sampleHighlights];
        console.log('解析localStorage数据失败，使用示例数据:', highlights);
    }
    filteredHighlights = [...highlights];
    
    // 调试：检查第一个产品的场景图数据
    if (highlights.length > 0) {
        console.log('第一个产品的场景图数据:', highlights[0].sceneImages);
    }
    
    // 检查并修复数据：确保所有产品都有必要的字段
    let dataUpdated = false;
    highlights.forEach(highlight => {
        if (!highlight.sceneImages) {
            highlight.sceneImages = [];
            dataUpdated = true;
            console.log(`为产品 ${highlight.name} 添加空的场景图数组`);
        }
        if (highlight.function === undefined) {
            highlight.function = '';
            dataUpdated = true;
            console.log(`为产品 ${highlight.name} 添加空的功能字段`);
        }
        
        // 将沙发和椅子分类迁移为坐具分类
        if (highlight.category === 'sofa' || highlight.category === 'chair') {
            highlight.category = 'seating';
            dataUpdated = true;
            console.log(`将产品 ${highlight.name} 分类从 ${highlight.category === 'sofa' ? '沙发' : '椅子'} 迁移为坐具`);
        }
        
        // 为桌子类产品添加面板材质字段
        if (highlight.category === 'table' && highlight.panelMaterial === undefined) {
            highlight.panelMaterial = '';
            dataUpdated = true;
            console.log(`为桌子产品 ${highlight.name} 添加空的面板材质字段`);
        }
        
        // 迁移 referenceLink 到 referenceLinks 数组
        if (highlight.referenceLink !== undefined) {
            highlight.referenceLinks = [
                highlight.referenceLink || '',
                '',
                ''
            ];
            delete highlight.referenceLink;
            dataUpdated = true;
            console.log(`为产品 ${highlight.name} 迁移参考链接到数组格式`);
        } else if (highlight.referenceLinks === undefined) {
            highlight.referenceLinks = ['', '', ''];
            dataUpdated = true;
            console.log(`为产品 ${highlight.name} 添加空的参考链接数组字段`);
        }
    });
    
    // 如果有数据更新，保存到localStorage
    if (dataUpdated) {
        saveHighlights();
        console.log('数据已更新并保存到localStorage');
    }

    // 初始化产品卖点过滤
    applyHighlightFilters();

    // 初始化选项数据
    loadOptions();
    
    // 填充材质选择框
    populateMaterialSelects();
    
    // 填充色板型号选择框
    populateColorCodeSelects();

    renderMaterials();
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // 面料搜索功能
    const fabricSearchInput = document.getElementById('fabricSearchInput');
    if (fabricSearchInput) {
        fabricSearchInput.addEventListener('input', handleFabricSearch);
    }

    // 选项搜索功能
    const optionsSearchInput = document.getElementById('optionsSearchInput');
    if (optionsSearchInput) {
        optionsSearchInput.addEventListener('input', handleOptionsSearch);
    }

    // 色板搜索功能
    const colorboardSearchInput = document.getElementById('colorboardSearchInput');
    if (colorboardSearchInput) {
        colorboardSearchInput.addEventListener('input', handleColorboardSearch);
    }
    
    // 色板表格排序
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notion-table-header[data-sort]')) {
            const header = e.target.closest('.notion-table-header[data-sort]');
            const sortField = header.getAttribute('data-sort');
            if (sortField && sortField !== 'image') {
                sortColorboardTable(sortField);
            }
        }
    });

    // 产品卖点搜索功能
    const highlightSearchInput = document.getElementById('highlightSearchInput');
    if (highlightSearchInput) {
        highlightSearchInput.addEventListener('input', handleHighlightSearch);
    }


    // 材质类型变化监听
    const addCategorySelect = document.getElementById('addCategory');
    if (addCategorySelect) {
        addCategorySelect.addEventListener('change', handleCategoryChange);
    }

    const editCategorySelect = document.getElementById('editCategory');
    if (editCategorySelect) {
        editCategorySelect.addEventListener('change', handleEditCategoryChange);
    }

    // 选项表单监听
    const addOptionForm = document.getElementById('addOptionForm');
    if (addOptionForm) {
        addOptionForm.addEventListener('submit', handleAddOption);
    }

    const editOptionForm = document.getElementById('editOptionForm');
    if (editOptionForm) {
        editOptionForm.addEventListener('submit', handleEditOption);
    }

    // 文件上传
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    // 拖拽上传
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('click', (e) => {
            // 避免按钮触发重复
            if (e.target && e.target.closest('button')) return;
            fileInput.click();
        });
    }

    // 面料文件上传
    const fabricFileInput = document.getElementById('fabricFileInput');
    if (fabricFileInput) {
        fabricFileInput.addEventListener('change', handleFabricFileUpload);
    }

    // 面料拖拽上传
    const fabricUploadArea = document.getElementById('fabricUploadArea');
    if (fabricUploadArea) {
        fabricUploadArea.addEventListener('dragover', handleFabricDragOver);
        fabricUploadArea.addEventListener('dragleave', handleFabricDragLeave);
        fabricUploadArea.addEventListener('drop', handleFabricDrop);
        fabricUploadArea.addEventListener('click', (e) => {
            // 避免按钮触发重复
            if (e.target && e.target.closest('button')) return;
            fabricFileInput.click();
        });
    }

    // 产品卖点文件上传
    const highlightFileInput = document.getElementById('highlightFileInput');
    if (highlightFileInput) {
        highlightFileInput.addEventListener('change', handleHighlightFileUpload);
    }

    // 产品卖点拖拽上传
    const highlightUploadArea = document.getElementById('highlightUploadArea');
    if (highlightUploadArea) {
        highlightUploadArea.addEventListener('dragover', handleHighlightDragOver);
        highlightUploadArea.addEventListener('dragleave', handleHighlightDragLeave);
        highlightUploadArea.addEventListener('drop', handleHighlightDrop);
        highlightUploadArea.addEventListener('click', (e) => {
            // 避免按钮触发重复
            if (e.target && e.target.closest('button')) return;
            highlightFileInput.click();
        });
    }

    // 新增材质表单提交（兜底）
    const addForm = document.getElementById('addMaterialForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddMaterial);
    }

    // 编辑材质表单提交（兜底）
    const editForm = document.getElementById('editMaterialForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditMaterial);
    }

    // 新增面料表单提交（兜底）
    const addFabricForm = document.getElementById('addFabricForm');
    if (addFabricForm) {
        addFabricForm.addEventListener('submit', handleAddFabric);
    }

    // 编辑面料表单提交（兜底）
    const editFabricForm = document.getElementById('editFabricForm');
    if (editFabricForm) {
        editFabricForm.addEventListener('submit', handleEditFabric);
    }
    
    // 新增色板表单提交（兜底）
    const addColorboardForm = document.getElementById('addColorboardForm');
    if (addColorboardForm) {
        addColorboardForm.addEventListener('submit', handleAddColorboard);
    }

    // 色板编辑面料表单提交（兜底）
    const editColorboardFabricForm = document.getElementById('editColorboardFabricForm');
    if (editColorboardFabricForm) {
        editColorboardFabricForm.addEventListener('submit', handleEditColorboardFabric);
    }

    // 新增产品卖点表单提交（兜底）
    const addHighlightForm = document.getElementById('addHighlightForm');
    if (addHighlightForm) {
        addHighlightForm.addEventListener('submit', handleAddHighlight);
    }

        // 编辑产品卖点表单提交（兜底）
        const editHighlightForm = document.getElementById('editHighlightForm');
        if (editHighlightForm) {
            editHighlightForm.addEventListener('submit', handleEditHighlight);
        }

        // 设计点编辑表单提交
        const designPointEditForm = document.getElementById('designPointEditForm');
        if (designPointEditForm) {
            designPointEditForm.addEventListener('submit', handleDesignPointEdit);
        }

        // 场景图编辑表单提交
        const sceneImageEditForm = document.getElementById('sceneImageEditForm');
        if (sceneImageEditForm) {
            sceneImageEditForm.addEventListener('submit', handleSceneImageEdit);
        }

        // 设计点编辑本地图片选择与预览
        const editDesignPointImageFileInput = document.getElementById('editDesignPointImageFile');
        const editDesignPointPreview = document.getElementById('editDesignPointImagePreview');
        const editDesignPointPreviewImg = document.getElementById('editDesignPointImagePreviewImg');
        if (editDesignPointImageFileInput && editDesignPointPreview && editDesignPointPreviewImg) {
            editDesignPointImageFileInput.addEventListener('change', function(e) {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    const objUrl = URL.createObjectURL(file);
                    editDesignPointPreviewImg.src = objUrl;
                    editDesignPointPreview.style.display = 'block';
                } else {
                    editDesignPointPreviewImg.src = '';
                    editDesignPointPreview.style.display = 'none';
                }
            });
        }

        // 新增产品卖点分类改变时显示/隐藏材质字段
        const addHighlightCategoryInput = document.getElementById('addHighlightCategory');
        if (addHighlightCategoryInput) {
            addHighlightCategoryInput.addEventListener('change', function(e) {
                const category = e.target.value;
                const materialFields = document.getElementById('addMaterialFields');
                const tableMaterialFields = document.getElementById('addTableMaterialFields');
                
                if (materialFields && tableMaterialFields) {
                    if (category === 'seating') {
                        materialFields.style.display = 'block';
                        tableMaterialFields.style.display = 'none';
                    } else if (category === 'table') {
                        materialFields.style.display = 'none';
                        tableMaterialFields.style.display = 'block';
                    } else {
                        materialFields.style.display = 'none';
                        tableMaterialFields.style.display = 'none';
                    }
                }
            });
        }

        // 编辑产品卖点分类改变时显示/隐藏材质字段
        const editHighlightCategoryInput = document.getElementById('editHighlightCategory');
        if (editHighlightCategoryInput) {
            editHighlightCategoryInput.addEventListener('change', function(e) {
                const category = e.target.value;
                const materialFields = document.getElementById('editMaterialFields');
                const tableMaterialFields = document.getElementById('editTableMaterialFields');
                
                if (materialFields && tableMaterialFields) {
                    if (category === 'seating') {
                        materialFields.style.display = 'block';
                        tableMaterialFields.style.display = 'none';
                    } else if (category === 'table') {
                        materialFields.style.display = 'none';
                        tableMaterialFields.style.display = 'block';
                    } else {
                        materialFields.style.display = 'none';
                        tableMaterialFields.style.display = 'none';
                    }
                }
            });
    }

    // 本地图片选择与预览
    const imageFileInput = document.getElementById('addImageFile');
    const preview = document.getElementById('addImagePreview');
    const previewImg = document.getElementById('addImagePreviewImg');
    if (imageFileInput && preview && previewImg) {
        imageFileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                previewImg.src = objUrl;
                preview.style.display = 'block';
            } else {
                previewImg.src = '';
                preview.style.display = 'none';
            }
        });
    }

    // 面料本地图片选择与预览
    const fabricImageFileInput = document.getElementById('addFabricImageFile');
    const fabricPreview = document.getElementById('addFabricImagePreview');
    const fabricPreviewImg = document.getElementById('addFabricImagePreviewImg');
    if (fabricImageFileInput && fabricPreview && fabricPreviewImg) {
        fabricImageFileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                fabricPreviewImg.src = objUrl;
                fabricPreview.style.display = 'block';
            } else {
                fabricPreviewImg.src = '';
                fabricPreview.style.display = 'none';
            }
        });
    }

    // 编辑材质本地图片选择与预览
    const editImageFileInput = document.getElementById('editImageFile');
    const editPreview = document.getElementById('editImagePreview');
    const editPreviewImg = document.getElementById('editImagePreviewImg');
    if (editImageFileInput && editPreview && editPreviewImg) {
        editImageFileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                editPreviewImg.src = objUrl;
                editPreview.style.display = 'block';
            } else {
                editPreviewImg.src = '';
                editPreview.style.display = 'none';
            }
        });
    }

    // 编辑面料本地图片选择与预览
    const editFabricImageFileInput = document.getElementById('editFabricImageFile');
    const editFabricPreview = document.getElementById('editFabricImagePreview');
    const editFabricPreviewImg = document.getElementById('editFabricImagePreviewImg');
    if (editFabricImageFileInput && editFabricPreview && editFabricPreviewImg) {
        editFabricImageFileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                editFabricPreviewImg.src = objUrl;
                editFabricPreview.style.display = 'block';
            } else {
                editFabricPreviewImg.src = '';
                editFabricPreview.style.display = 'none';
            }
        });
    }

    // 新增产品卖点本地图片选择与预览
    const addHighlightImageFileInput = document.getElementById('addHighlightImageFile');
    const addHighlightPreview = document.getElementById('addHighlightImagePreview');
    const addHighlightPreviewImg = document.getElementById('addHighlightImagePreviewImg');
    if (addHighlightImageFileInput && addHighlightPreview && addHighlightPreviewImg) {
        addHighlightImageFileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                addHighlightPreviewImg.src = objUrl;
                addHighlightPreview.style.display = 'block';
            } else {
                addHighlightPreviewImg.src = '';
                addHighlightPreview.style.display = 'none';
            }
        });
    }

    // 编辑产品卖点本地图片选择与预览
    const editHighlightImageFileInput = document.getElementById('editHighlightImageFile');
    const editHighlightPreview = document.getElementById('editHighlightImagePreview');
    const editHighlightPreviewImg = document.getElementById('editHighlightImagePreviewImg');
    if (editHighlightImageFileInput && editHighlightPreview && editHighlightPreviewImg) {
        editHighlightImageFileInput.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                editHighlightPreviewImg.src = objUrl;
                editHighlightPreview.style.display = 'block';
            } else {
                editHighlightPreviewImg.src = '';
                editHighlightPreview.style.display = 'none';
            }
        });
    }

    // 名称实时重复校验
    const nameInput = document.getElementById('addName');
    const dupMsg = document.getElementById('addNameDupMsg');
    if (nameInput && dupMsg) {
        nameInput.addEventListener('input', function() {
            const val = nameInput.value.trim().toLowerCase();
            const exists = val && materials.some(m => (m.name || '').toString().trim().toLowerCase() === val);
            if (exists) {
                dupMsg.style.display = 'inline';
            } else {
                dupMsg.style.display = 'none';
            }
        });
    }

    // 面料型号实时重复校验
    const fabricCodeInput = document.getElementById('addFabricCode');
    const fabricCodeDupMsg = document.getElementById('addFabricCodeDupMsg');
    if (fabricCodeInput && fabricCodeDupMsg) {
        fabricCodeInput.addEventListener('input', function() {
            const val = fabricCodeInput.value.trim().toLowerCase();
            const exists = val && fabrics.some(f => (f.code || '').toString().trim().toLowerCase() === val);
            if (exists) {
                fabricCodeDupMsg.style.display = 'inline';
            } else {
                fabricCodeDupMsg.style.display = 'none';
            }
        });
    }

    // 编辑材质名称实时重复校验
    const editNameInput = document.getElementById('editName');
    const editNameDupMsg = document.getElementById('editNameDupMsg');
    if (editNameInput && editNameDupMsg) {
        editNameInput.addEventListener('input', function() {
            const val = editNameInput.value.trim().toLowerCase();
            const currentId = parseInt(document.getElementById('editId').value) || 0;
            const exists = val && materials.some(m => m.id !== currentId && (m.name || '').toString().trim().toLowerCase() === val);
            if (exists) {
                editNameDupMsg.style.display = 'inline';
            } else {
                editNameDupMsg.style.display = 'none';
            }
        });
    }

    // 编辑面料型号实时重复校验
    const editFabricCodeInput = document.getElementById('editFabricCode');
    const editFabricCodeDupMsg = document.getElementById('editFabricCodeDupMsg');
    if (editFabricCodeInput && editFabricCodeDupMsg) {
        editFabricCodeInput.addEventListener('input', function() {
            const val = editFabricCodeInput.value.trim().toLowerCase();
            const currentId = parseInt(document.getElementById('editFabricId').value) || 0;
            const exists = val && fabrics.some(f => f.id !== currentId && (f.code || '').toString().trim().toLowerCase() === val);
            if (exists) {
                editFabricCodeDupMsg.style.display = 'inline';
            } else {
                editFabricCodeDupMsg.style.display = 'none';
            }
        });
    }
}

// 渲染材质列表
function renderMaterials() {
    console.log('renderMaterials called');
    console.log('filteredMaterials:', filteredMaterials);
    console.log('categoryFilter:', categoryFilter);
    
    const grid = document.getElementById('materialsGrid');
    const noResults = document.getElementById('noResults');
    
    let list = filteredMaterials;
    
    // 应用分类过滤
    if (categoryFilter !== 'all') {
        list = filteredMaterials.filter(m => m.category === categoryFilter);
    }

    if (list.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    grid.innerHTML = list.map(material => `
        <div class="material-card" onclick="showMaterialDetail(${material.id})">
            ${material.imageUrl ? `
                <div class="material-thumb">
                    <img src="${material.imageUrl}" alt="${material.name}" onerror="this.style.display='none'" />
                </div>
            ` : ''}
            <h3>${material.name}</h3>
            <div class="features">
                ${material.features.slice(0, 4).map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
                ${material.features.length > 4 ? 
                    `<span class="feature-tag">+${material.features.length - 4}</span>` : ''
                }
            </div>
        </div>
    `).join('');
}

// 显示材质详情
function showMaterialDetail(materialId) {
    console.log('showMaterialDetail called with id:', materialId);
    const material = materials.find(m => m.id === materialId);
    if (!material) {
        console.error('Material not found for id:', materialId);
        return;
    }
    
    console.log('Found material:', material);
    const modal = document.getElementById('materialModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    if (!modal || !title || !body) {
        console.error('Modal elements not found:', { modal, title, body });
        return;
    }
    
    title.textContent = material.name;
    body.innerHTML = `
        ${material.imageUrl ? `
            <div class="material-image">
                <img src="${material.imageUrl}" alt="${material.name}" data-image-src="${material.imageUrl}" onerror="this.style.display='none'" style="cursor: zoom-in;" title="点击放大图片" />
            </div>
        ` : ''}
        <div class="material-detail">
            <h3>材质描述</h3>
            <p>${material.description}</p>
        </div>
        
        <div class="detail-section">
            <h4>主要特性</h4>
            <div class="detail-tags">
                ${material.features.map(feature => 
                    `<span class="detail-tag">${feature}</span>`
                ).join('')}
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="event.stopPropagation(); showEditModal(${material.id});">
                <i class="fas fa-edit"></i> 编辑
            </button>
            <button class="btn btn-danger" onclick="event.stopPropagation(); deleteMaterial(${material.id});">
                <i class="fas fa-trash"></i> 删除
            </button>
            <button class="btn btn-secondary" onclick="event.stopPropagation(); closeModal();">
                关闭
            </button>
        </div>
        
    `;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto'; // 确保可以点击
    
    // 阻止背景页面滚动
    preventBodyScroll();
    
    console.log('Modal should be visible now');
    console.log('Modal classes:', modal.classList.toString());
    console.log('Modal style:', modal.style.cssText);
}

// 打开/关闭图片预览
function openImagePreview(src) {
    console.log('=== openImagePreview called ===');
    console.log('Opening image preview with src:', src);
    
    const modal = document.getElementById('imagePreviewModal');
    const img = document.getElementById('previewImage');
    
    console.log('Modal element:', modal);
    console.log('Image element:', img);
    
    if (!modal) {
        console.error('Image preview modal not found');
        alert('图片预览模态框未找到');
        return;
    }
    
    if (!img) {
        console.error('Preview image element not found');
        alert('预览图片元素未找到');
        return;
    }
    
    if (!src) {
        console.error('No image source provided');
        return;
    }
    
    // 检查是否是外部URL，如果是则显示警告
    if (src.startsWith('http://') || src.startsWith('https://')) {
        console.warn('External image URL detected, may be blocked by CORB:', src);
        
        // 创建图片对象来测试加载
        const testImg = new Image();
        testImg.onload = function() {
            img.src = src;
            modal.style.display = 'flex';
            modal.style.pointerEvents = 'auto';
            modal.classList.add('show');
            preventBodyScroll(); // 阻止背景滚动
            console.log('External image loaded successfully');
        };
        testImg.onerror = function() {
            console.error('Failed to load external image:', src);
            // 显示友好的错误信息而不是系统弹窗
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI0MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuWKoOi9veWksei0peWksei0pTwvdGV4dD48L3N2Zz4=';
            modal.style.display = 'flex';
            modal.style.pointerEvents = 'auto';
            modal.classList.add('show');
            preventBodyScroll(); // 阻止背景滚动
        };
        testImg.src = src;
    } else {
        // 本地图片或base64图片
        img.src = src;
        img.onerror = function() {
            console.error('Failed to load image:', src);
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI0MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuWKoOi9veWksei0peWksei0pTwvdGV4dD48L3N2Zz4=';
        };
        modal.style.display = 'flex';
        modal.style.pointerEvents = 'auto';
        modal.classList.add('show');
        preventBodyScroll(); // 阻止背景滚动
    }
    
    console.log('Image preview modal should be visible now');
    console.log('Modal display style:', modal.style.display);
    console.log('Modal classList:', modal.classList.toString());
}

// 测试函数：验证图片点击功能
function testImageClick() {
    console.log('Testing image click functionality...');
    const testSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=';
    openImagePreview(testSrc);
}

// 测试外部图片URL
function testExternalImage() {
    console.log('Testing external image URL...');
    const externalSrc = 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1200&auto=format&fit=crop';
    openImagePreview(externalSrc);
}

// 测试模态框滚动修复
function testModalScroll() {
    console.log('Testing modal scroll fix...');
    preventBodyScroll();
    console.log('Background scroll disabled. Try scrolling - it should not work.');
    console.log('To re-enable scrolling, run: allowBodyScroll()');
}

// 测试编辑模态框内部滚动
function testEditModalScroll() {
    console.log('Testing edit modal internal scroll...');
    if (materials && materials.length > 0) {
        showEditModal(materials[0].id);
        console.log('Edit modal opened. Try scrolling inside the modal - it should work.');
        console.log('Background should not scroll.');
    } else {
        console.log('No materials found for testing');
    }
}

// 检查编辑模态框的滚动样式
function checkEditModalScroll() {
    console.log('Checking edit modal scroll styles...');
    const editModal = document.getElementById('editModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    
    console.log('Edit modal:', editModal);
    console.log('Modal content:', modalContent);
    
    if (editModal) {
        console.log('Edit modal computed styles:');
        const styles = getComputedStyle(editModal);
        console.log('  - display:', styles.display);
        console.log('  - overflow:', styles.overflow);
        console.log('  - overflow-y:', styles.overflowY);
    }
    
    if (modalContent) {
        console.log('Modal content computed styles:');
        const contentStyles = getComputedStyle(modalContent);
        console.log('  - max-height:', contentStyles.maxHeight);
        console.log('  - overflow:', contentStyles.overflow);
        console.log('  - overflow-y:', contentStyles.overflowY);
        console.log('  - height:', contentStyles.height);
    }
}

// 立即修复编辑模态框滚动
function fixEditModalScroll() {
    console.log('Fixing edit modal scroll...');
    const editModal = document.getElementById('editModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    
    if (editModal && modalContent) {
        // 修复pointer-events问题
        editModal.style.pointerEvents = 'auto';
        
        // 确保滚动设置
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh'; // 减少高度以确保有滚动空间
        modalContent.style.height = 'auto'; // 让高度自适应内容
        
        console.log('Edit modal scroll fixed!');
        console.log('Edit modal styles:', editModal.style.cssText);
        console.log('Modal content styles:', modalContent.style.cssText);
    } else {
        console.error('Edit modal or modal content not found');
    }
}

// 测试函数：验证材质详情模态框功能
function testMaterialModal() {
    console.log('Testing material modal functionality...');
    if (materials && materials.length > 0) {
        const firstMaterial = materials[0];
        console.log('Testing with material:', firstMaterial);
        showMaterialDetail(firstMaterial.id);
    } else {
        console.log('No materials found for testing');
    }
}

// 测试函数：验证产品卖点模态框滚动功能
function testHighlightModalScroll() {
    console.log('Testing highlight modal scroll functionality...');
    if (highlights && highlights.length > 0) {
        showHighlightDetail(highlights[0].id);
        console.log('Highlight modal opened. Try scrolling inside the modal - it should work.');
        console.log('Background should not scroll.');
    } else {
        console.log('No highlights found for testing');
    }
}

// 测试函数：验证产品卖点编辑模态框滚动功能
function testEditHighlightModalScroll() {
    console.log('Testing edit highlight modal scroll functionality...');
    if (highlights && highlights.length > 0) {
        showEditHighlightModal(highlights[0].id);
        console.log('Edit highlight modal opened. Try scrolling inside the modal - it should work.');
        console.log('Background should not scroll.');
    } else {
        console.log('No highlights found for testing');
    }
}

// 测试函数：验证面料管理模态框功能
function testFabricModal() {
    console.log('Testing fabric modal functionality...');
    if (fabrics && fabrics.length > 0) {
        showFabricDetail(fabrics[0].id);
        console.log('Fabric modal opened. Try clicking the image, close, edit, and delete buttons.');
    } else {
        console.log('No fabrics found for testing');
    }
}

// 测试函数：验证面料编辑模态框滚动功能
function testEditFabricModalScroll() {
    console.log('Testing edit fabric modal scroll functionality...');
    if (fabrics && fabrics.length > 0) {
        showEditFabricModal(fabrics[0].id);
        console.log('Edit fabric modal opened. Try scrolling inside the modal - it should work.');
        console.log('Background should not scroll.');
    } else {
        console.log('No fabrics found for testing');
    }
}

// 测试函数：验证图片预览模态框关闭功能
function testImagePreviewClose() {
    console.log('Testing image preview modal close functionality...');
    if (fabrics && fabrics.length > 0 && fabrics[0].imageUrl) {
        // 打开图片预览
        openImagePreview(fabrics[0].imageUrl);
        console.log('Image preview opened. Try clicking the close button or outside the modal to close it.');
        
        // 3秒后自动关闭进行测试
        setTimeout(() => {
            console.log('Auto-closing image preview for testing...');
            closeImagePreview();
        }, 3000);
    } else {
        console.log('No fabrics with images found for testing');
    }
}

// 测试函数：验证上传模态框滚动功能
function testUploadModalScroll() {
    console.log('Testing upload modal scroll functionality...');
    showFabricUploadModal();
    console.log('Fabric upload modal opened. Try scrolling inside the modal - it should work.');
    console.log('Background should not scroll.');
}

// 测试函数：验证色板编辑删除功能
function testColorboardDelete() {
    console.log('Testing colorboard delete functionality...');
    if (fabrics && fabrics.length > 0) {
        showEditColorboardFabricModal(fabrics[0].id);
        console.log('Colorboard edit modal opened. You should now see a delete button.');
        console.log('Click the delete button to test deletion (with confirmation).');
    } else {
        console.log('No fabrics found for testing');
    }
}

// 测试函数：验证新增色板功能
function testAddColorboard() {
    console.log('Testing add colorboard functionality...');
    showAddColorboardModal();
    console.log('Add colorboard modal opened. Try filling out the form and submitting.');
    console.log('Required fields: 色板型号, 平台');
    console.log('Removed fields: 面料型号, 面料名称, 面料颜色');
}

// 简单测试模态框显示
function testModalDisplay() {
    console.log('Testing modal display...');
    const modal = document.getElementById('materialModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    console.log('Modal elements:', { modal, title, body });

    if (modal && title && body) {
        title.textContent = '测试模态框';
        body.innerHTML = `
            <p>这是一个测试模态框</p>
            <p>请测试以下功能：</p>
            <ul>
                <li>点击"编辑"按钮</li>
                <li>点击"删除"按钮</li>
                <li>点击"关闭"按钮</li>
                <li>点击头部的"X"按钮</li>
                <li>点击模态框外部区域</li>
            </ul>
            <button class="btn btn-primary" onclick="alert('编辑按钮被点击！')">编辑</button>
            <button class="btn btn-danger" onclick="alert('删除按钮被点击！')">删除</button>
            <button class="btn btn-secondary" onclick="closeModal()">关闭</button>
        `;

        modal.classList.add('show');
        modal.style.display = 'flex';
        console.log('Modal should be visible now');
    } else {
        console.error('Modal elements not found');
    }
}

// 最简单的测试函数
function simpleTest() {
    console.log('Simple test started');
    alert('JavaScript is working!');
    console.log('Simple test completed');
}

// 测试材质数据
function testMaterials() {
    console.log('Materials count:', materials.length);
    console.log('First material:', materials[0]);
    if (materials.length > 0) {
        showMaterialDetail(materials[0].id);
    }
}

// 强制显示模态框
function forceShowModal() {
    console.log('Force showing modal...');
    const modal = document.getElementById('materialModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.zIndex = '9999';
        modal.style.pointerEvents = 'auto'; // 修复：确保可以点击
        modal.classList.add('show');
        console.log('Modal forced to show');
        console.log('Modal display:', modal.style.display);
        console.log('Modal z-index:', modal.style.zIndex);
        console.log('Modal pointer-events:', modal.style.pointerEvents);
    } else {
        console.error('Modal not found');
    }
}

// 检查所有模态框元素
function checkModalElements() {
    console.log('Checking modal elements...');
    const modal = document.getElementById('materialModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    console.log('Modal:', modal);
    console.log('Title:', title);
    console.log('Body:', body);
    
    if (modal) {
        console.log('Modal computed styles:');
        const styles = getComputedStyle(modal);
        console.log('  - display:', styles.display);
        console.log('  - position:', styles.position);
        console.log('  - z-index:', styles.zIndex);
        console.log('  - visibility:', styles.visibility);
        console.log('  - pointer-events:', styles.pointerEvents);
    }
}

// 立即修复模态框点击问题
function fixModalClick() {
    console.log('Fixing modal click issue...');
    const modal = document.getElementById('materialModal');
    if (modal) {
        modal.style.pointerEvents = 'auto';
        modal.style.zIndex = '1000';
        console.log('Modal fixed! pointer-events set to auto');
        console.log('Modal style:', modal.style.cssText);
    } else {
        console.error('Modal not found');
    }
}

// 阻止背景页面滚动
function preventBodyScroll() {
    document.body.style.overflow = 'hidden';
}

// 恢复背景页面滚动
function allowBodyScroll() {
    document.body.style.overflow = '';
}

// 全面诊断函数
function diagnoseIssues() {
    console.log('=== 开始全面诊断 ===');
    
    // 1. 检查材质数据
    console.log('1. 材质数据检查:');
    console.log('  - materials数组长度:', materials.length);
    console.log('  - filteredMaterials数组长度:', filteredMaterials.length);
    console.log('  - 前3个材质:', materials.slice(0, 3));
    
    // 2. 检查DOM元素
    console.log('2. DOM元素检查:');
    const modal = document.getElementById('materialModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const grid = document.getElementById('materialsGrid');
    console.log('  - materialModal:', modal);
    console.log('  - modalTitle:', title);
    console.log('  - modalBody:', body);
    console.log('  - materialsGrid:', grid);
    
    // 3. 检查材质卡片
    console.log('3. 材质卡片检查:');
    if (grid) {
        const cards = grid.querySelectorAll('.material-card');
        console.log('  - 卡片数量:', cards.length);
        console.log('  - 第一个卡片:', cards[0]);
        if (cards[0]) {
            console.log('  - 第一个卡片的onclick:', cards[0].getAttribute('onclick'));
        }
    }
    
    // 4. 检查事件监听器
    console.log('4. 事件监听器检查:');
    console.log('  - 全局点击事件监听器已设置');
    
    // 5. 检查CSS样式
    console.log('5. CSS样式检查:');
    if (modal) {
        console.log('  - modal display:', getComputedStyle(modal).display);
        console.log('  - modal classes:', modal.classList.toString());
        console.log('  - modal z-index:', getComputedStyle(modal).zIndex);
    }
    
    console.log('=== 诊断完成 ===');
}

function closeImagePreview() {
    const modal = document.getElementById('imagePreviewModal');
    const img = document.getElementById('previewImage');
    
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.style.pointerEvents = ''; // 清理pointer-events样式
        modal.style.zIndex = ''; // 清理z-index样式
    }
    
    if (img) {
        img.src = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    console.log('Image preview modal closed');
}

// 关闭模态框
function closeModal() {
    console.log('closeModal called');
    const modal = document.getElementById('materialModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.style.pointerEvents = ''; // 清理pointer-events样式
        modal.style.zIndex = ''; // 清理z-index样式
        
        // 恢复背景页面滚动
        allowBodyScroll();
        
        console.log('Modal closed successfully');
    } else {
        console.error('Modal element not found');
    }
}

// 显示编辑模态框
function showEditModal(materialId) {
    const material = materials.find(m => m.id === materialId);
    if (!material) return;
    
    // 关闭详情模态框
    closeModal();
    
    // 填充编辑表单
    document.getElementById('editId').value = material.id;
    document.getElementById('editName').value = material.name;
    document.getElementById('editDescription').value = material.description;
    document.getElementById('editFeatures').value = material.features.join(', ');
    document.getElementById('editCategory').value = material.category || 'fabric';
    document.getElementById('editImageUrl').value = material.imageUrl || '';
    
    // 显示/隐藏海绵材质选项
    const foamOptions = document.getElementById('editFoamNameOptions');
    if (material.category === 'foam') {
        foamOptions.style.display = 'block';
    } else {
        foamOptions.style.display = 'none';
    }
    
    // 重置文件输入和预览
    document.getElementById('editImageFile').value = '';
    const preview = document.getElementById('editImagePreview');
    const previewImg = document.getElementById('editImagePreviewImg');
    if (preview && previewImg) {
        previewImg.src = '';
        preview.style.display = 'none';
    }
    
    // 显示编辑模态框
    const editModal = document.getElementById('editModal');
    const modalContent = editModal.querySelector('.modal-content');
    
    editModal.classList.add('show');
    editModal.style.display = 'flex';
    editModal.style.pointerEvents = 'auto'; // 确保可以交互
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh'; // 减少高度确保有滚动空间
        modalContent.style.height = 'auto'; // 自适应高度
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭编辑模态框
function closeEditModal() {
    const editModal = document.getElementById('editModal');
    const modalContent = editModal.querySelector('.modal-content');
    
    editModal.classList.remove('show');
    editModal.style.display = 'none';
    editModal.style.pointerEvents = ''; // 清理pointer-events样式
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
}

// 处理编辑材质
function handleEditMaterial(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById('editId');
    const nameInput = document.getElementById('editName');
    const descInput = document.getElementById('editDescription');
    const featInput = document.getElementById('editFeatures');
    const categoryInput = document.getElementById('editCategory');
    const imgInput = document.getElementById('editImageUrl');
    const imgFileInput = document.getElementById('editImageFile');

    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const featuresStr = featInput.value.trim();
    const category = categoryInput.value;
    const hasLocalImage = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgInput.value.trim();

    if (!name) {
        alert('请填写材质名称');
        nameInput.focus();
        return;
    }
    if (!description) {
        alert('请填写材质描述');
        descInput.focus();
        return;
    }
    
    // 重复校验（排除当前编辑的材质）
    const lower = name.toLowerCase();
    const exists = materials.some(m => m.id !== id && (m.name || '').toString().trim().toLowerCase() === lower);
    if (exists) {
        alert(`已存在相同材质："${name}"，请勿重复添加`);
        return;
    }

    const finalizeEdit = (finalImageUrl) => {
        // 更新材质数据
        const materialIndex = materials.findIndex(m => m.id === id);
        if (materialIndex !== -1) {
            materials[materialIndex] = {
                ...materials[materialIndex],
                name: name,
                description: description,
                features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [],
                imageUrl: finalImageUrl,
                category: category
            };
            
            // 更新过滤后的数据
            const filteredIndex = filteredMaterials.findIndex(m => m.id === id);
            if (filteredIndex !== -1) {
                filteredMaterials[filteredIndex] = materials[materialIndex];
            }
            
            saveMaterials();
            renderMaterials();
            closeEditModal();
            alert('修改成功');
        }
    };

    if (hasLocalImage) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => finalizeEdit(ev.target.result);
        reader.onerror = () => finalizeEdit('');
        reader.readAsDataURL(file);
        return;
    } else {
        finalizeEdit(imageUrlText);
    }
}

// 显示上传模态框
function showUploadModal() {
    const modal = document.getElementById('uploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭上传模态框
function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    // 关闭上传弹窗时清理选择状态（保留已导入的图片URL，避免列表图片丢失）
    pendingExcelFile = null;
}

// 显示新增模态框
function showAddModal() {
    document.getElementById('addModal').classList.add('show');
}

// 关闭新增模态框
function closeAddModal() {
    document.getElementById('addModal').classList.remove('show');
}

// 处理新增材质
function handleAddMaterial(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('addName');
    const descInput = document.getElementById('addDescription');
    const featInput = document.getElementById('addFeatures');
    const imgInput = document.getElementById('addImageUrl');
    const imgFileInput = document.getElementById('addImageFile');

    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const featuresStr = featInput.value.trim();
    const hasLocalImage = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgInput.value.trim();
    const categorySelect = document.getElementById('addCategory');
    const category = categorySelect ? categorySelect.value : inferCategoryByName(name);

    if (!name) {
        alert('请填写材质名称');
        nameInput.focus();
        return;
    }
    if (!description) {
        alert('请填写材质描述');
        descInput.focus();
        return;
    }
    // 重复校验（不区分大小写，去空格）
    const lower = name.toLowerCase();
    const exists = materials.some(m => (m.name || '').toString().trim().toLowerCase() === lower);
    if (exists) {
        alert(`已存在相同材质："${name}"，请勿重复添加`);
        return;
    }

    const finalizeAdd = (finalImageUrl) => {
        const newMaterial = {
            id: Date.now(),
            name: name,
            description: description,
            features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [],
            imageUrl: finalImageUrl,
            category: category
        };
        materials = [newMaterial, ...materials];
        filteredMaterials = [...materials];
        saveMaterials();
        renderMaterials();
        closeAddModal();
        alert('新增成功');
    };

    if (hasLocalImage) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => finalizeAdd(ev.target.result);
        reader.onerror = () => finalizeAdd('');
        reader.readAsDataURL(file);
        return;
    } else {
        finalizeAdd(imageUrlText);
    }

    // 清空表单
    nameInput.value = '';
    descInput.value = '';
    featInput.value = '';
    imgInput.value = '';
    if (imgFileInput) {
        imgFileInput.value = '';
        const preview = document.getElementById('addImagePreview');
        const previewImg = document.getElementById('addImagePreviewImg');
        if (preview && previewImg) {
            previewImg.src = '';
            preview.style.display = 'none';
        }
    }

}

// 删除材质
function deleteMaterial(materialId) {
    const material = materials.find(m => m.id === materialId);
    if (!material) return;
    const confirmDelete = confirm(`确定删除 "${material.name}" 吗？该操作不可恢复。`);
    if (!confirmDelete) return;

    materials = materials.filter(m => m.id !== materialId);
    filteredMaterials = filteredMaterials.filter(m => m.id !== materialId);
    saveMaterials();
    renderMaterials();
    closeModal();
}

// 处理搜索
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        filteredMaterials = [...materials];
    } else {
        filteredMaterials = materials.filter(material => 
            material.name.toLowerCase().includes(query) ||
            material.description.toLowerCase().includes(query) ||
            material.features.some(feature => feature.toLowerCase().includes(query))
        );
    }
    
    renderMaterials();
}

// 处理面料搜索
function handleFabricSearch(e) {
    fabricSearchQuery = e.target.value.toLowerCase().trim();
    applyFabricFilters();
}

// 处理色板搜索
function handleColorboardSearch(e) {
    colorboardSearchQuery = e.target.value.toLowerCase().trim();
    renderColorboard();
}

// 显示新增色板模态框
function showAddColorboardModal() {
    const modal = document.getElementById('addColorboardModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    // 更新色板型号选择框
    populateColorboardColorCodeSelects();
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
    
    // 绑定色板型号输入校验（失焦提示）
    attachColorboardColorCodeBlurValidation(document.getElementById('addColorboardColorCode'));
}

// 关闭新增色板模态框
function closeAddColorboardModal() {
    const modal = document.getElementById('addColorboardModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    // 清空表单
    const form = document.getElementById('addColorboardForm');
    if (form) {
        form.reset();
    }
    
    // 清空图片预览
    const preview = document.getElementById('addColorboardImagePreview');
    const previewImg = document.getElementById('addColorboardImagePreviewImg');
    if (preview && previewImg) {
        previewImg.src = '';
        preview.style.display = 'none';
    }
}

// 显示色板上传模态框（临时实现，复用面料上传功能）
function showColorboardUploadModal() {
    // 复用面料上传模态框：色板管理依赖面料数据
    const modal = document.getElementById('fabricUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        modal.style.pointerEvents = 'auto';
        
        // 确保模态框内容可以滚动
        if (modalContent) {
            modalContent.style.overflowY = 'auto';
            modalContent.style.maxHeight = '80vh';
            modalContent.style.height = 'auto';
        }
        
        // 阻止背景页面滚动
        preventBodyScroll();
    }
}

// 应用面料过滤（分类 + 搜索）
function applyFabricFilters() {
    let filtered = [...fabrics];
    
    // 应用分类过滤
    if (fabricCategoryFilter !== 'all') {
        filtered = filtered.filter(f => f.category === fabricCategoryFilter);
    }
    
    // 应用搜索过滤
    if (fabricSearchQuery) {
        filtered = filtered.filter(fabric => 
            (fabric.colorCode && fabric.colorCode.toLowerCase().includes(fabricSearchQuery)) ||
            fabric.code.toLowerCase().includes(fabricSearchQuery) ||
            (fabric.color && fabric.color.toLowerCase().includes(fabricSearchQuery))
        );
    }
    
    filteredFabrics = filtered;
    renderFabrics();
}

// 设置类别过滤
function setCategoryFilter(cat, event) {
    categoryFilter = cat;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === cat));
    renderMaterials();
}

// 处理文件上传
async function handleFileUpload(e) {
    const input = e.target;
    const files = Array.from(input.files || []);
    if (!files.length) return;

    const { excelFile, imageFiles } = splitExcelAndImages(files);
    if (imageFiles.length) {
        await buildUploadedImageMap(imageFiles); // 确保图片映射已就绪再解析Excel
    }
    if (excelFile) {
        pendingExcelFile = excelFile;
        processExcelFile(pendingExcelFile);
    } else if (imageFiles.length) {
        alert(`已添加 ${imageFiles.length} 张图片，请再选择Excel文件。`);
    }

    // 清空选择器值，保证下次即使选择相同文件也会触发change
    try { input.value = ''; } catch (_) {}
}

// 处理拖拽悬停
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

// 处理拖拽离开
function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

// 处理拖拽放置
async function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    const { excelFile, imageFiles } = splitExcelAndImages(files);
    if (imageFiles.length) {
        await buildUploadedImageMap(imageFiles);
    }
    if (excelFile) {
        pendingExcelFile = excelFile;
        processExcelFile(pendingExcelFile);
    } else if (imageFiles.length) {
        alert('已拖入图片，请再拖入或选择Excel文件。');
    }
}

// 处理Excel文件
function processExcelFile(file) {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        alert('请选择Excel文件（.xlsx或.xls格式）');
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
            
            const { added, skippedDuplicates } = parseExcelData(jsonData);
            if (added.length > 0) {
                materials = [...materials, ...added];
                filteredMaterials = [...materials];
                saveMaterials();
                renderMaterials();
                closeUploadModal();
                const dupMsg = skippedDuplicates.length ? `\n跳过重复：${skippedDuplicates.length} 个（${skippedDuplicates.join('、')}）` : '';
                alert(`成功导入 ${added.length} 个材质数据！${Object.keys(uploadedImageMap).length ? '\n图片：已匹配本地文件（如有同名）' : ''}${dupMsg}`);
                // 重置Excel选择，但保留图片URL以便页面显示
                pendingExcelFile = null;
            } else {
                const { skippedDuplicates } = parseExcelData(jsonData);
                if (skippedDuplicates && skippedDuplicates.length) {
                    alert(`全部被识别为重复，未导入。重复：${skippedDuplicates.join('、')}`);
                } else {
                    alert('Excel文件中没有找到有效的材质数据');
                }
            }
        } catch (error) {
            console.error('Excel解析错误:', error);
            alert('Excel文件解析失败，请检查文件格式');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// 解析Excel数据
function parseExcelData(data) {
    const added = [];
    const skippedDuplicates = [];
    const existing = new Set(materials.map(m => (m.name || '').toString().trim().toLowerCase()));
    const seenInFile = new Set();
    
    // 跳过标题行，从第二行开始
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length < 3) continue;
        
        const name = row[0]?.toString().trim();
        const description = row[1]?.toString().trim();
        const featuresStr = row[2]?.toString().trim();
        const imageCell = row[3]?.toString().trim();
        const categoryCell = row[4]?.toString().trim();
        
        if (!name) continue;
        const lower = name.toLowerCase();
        if (existing.has(lower) || seenInFile.has(lower)) {
            skippedDuplicates.push(name);
            continue;
        }
        
        // 图片匹配逻辑：若第四列是文件名并且用户上传了对应图片，则使用本地对象URL；否则按URL处理
        let resolvedImageUrl = '';
        if (imageCell) {
            const raw = imageCell.toString().trim();
            const base = decodeURI(raw).split(/[\\/]/).pop().trim();
            const lower = base.toLowerCase();
            const noExt = lower.replace(/\.[a-z0-9]+$/, '');
            const compact = lower.replace(/\s+/g, '');
            const candidates = [lower, noExt, compact];
            for (const c of candidates) {
                if (uploadedImageMap[c]) { resolvedImageUrl = uploadedImageMap[c]; break; }
            }
            if (!resolvedImageUrl) {
                if (/^https?:\/\//i.test(raw) || raw.startsWith('data:')) {
                    resolvedImageUrl = raw;
                }
            }
        }

        const material = {
            id: Date.now() + i, // 简单的ID生成
            name: name,
            description: description || '暂无描述',
            features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(s => s) : [],
            imageUrl: resolvedImageUrl,
            category: normalizeCategory(categoryCell) || inferCategoryByName(name)
        };
        
        added.push(material);
        seenInFile.add(lower);
    }
    
    return { added, skippedDuplicates };
}

// 处理材质类型变化
function handleCategoryChange(e) {
    const category = e.target.value;
    const foamOptions = document.getElementById('foamNameOptions');
    const dynamicOptions = document.getElementById('dynamicOptions');
    
    // 隐藏所有选项区域
    if (foamOptions) foamOptions.style.display = 'none';
    if (dynamicOptions) dynamicOptions.style.display = 'none';
    
    if (category === 'foam') {
        if (foamOptions) foamOptions.style.display = 'block';
    } else if (category) {
        // 显示动态选项
        showDynamicOptions(category, 'add');
    }
}

// 处理编辑材质类型变化
function handleEditCategoryChange(e) {
    const category = e.target.value;
    const foamOptions = document.getElementById('editFoamNameOptions');
    const dynamicOptions = document.getElementById('editDynamicOptions');
    
    // 隐藏所有选项区域
    if (foamOptions) foamOptions.style.display = 'none';
    if (dynamicOptions) dynamicOptions.style.display = 'none';
    
    if (category === 'foam') {
        if (foamOptions) foamOptions.style.display = 'block';
    } else if (category) {
        // 显示动态选项
        showDynamicOptions(category, 'edit');
    }
}

// 选择海绵材质名称（新增）
function selectFoamName(name) {
    document.getElementById('addName').value = name;
}

// 选择海绵材质名称（编辑）
function selectEditFoamName(name) {
    document.getElementById('editName').value = name;
}

// 显示动态选项
function showDynamicOptions(category, type) {
    const options = getOptionsByCategory(category);
    if (options.length === 0) return;
    
    const containerId = type === 'add' ? 'dynamicOptions' : 'editDynamicOptions';
    const nameInputId = type === 'add' ? 'addName' : 'editName';
    
    let container = document.getElementById(containerId);
    if (!container) {
        // 创建动态选项容器
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'foam-options';
        container.style.display = 'none';
        
        const nameInput = document.getElementById(nameInputId);
        nameInput.parentNode.insertBefore(container, nameInput.nextSibling);
    }
    
    container.innerHTML = `
        <p class="form-help">${getCategoryLabel(category)}选项：</p>
        <div class="foam-option-buttons">
            ${options.map(option => `
                <button type="button" class="btn btn-sm btn-outline" onclick="selectDynamicName('${option.name}', '${type}')">
                    ${option.name}
                </button>
            `).join('')}
        </div>
    `;
    
    container.style.display = 'block';
}

// 选择动态材质名称
function selectDynamicName(name, type) {
    const nameInputId = type === 'add' ? 'addName' : 'editName';
    document.getElementById(nameInputId).value = name;
}

// 工具：根据名称简单推断类别
function inferCategoryByName(name) {
    const n = (name || '').toLowerCase();
    const woodKeywords = ['木', '实木', '人造板', '板', '竹', '橡木'];
    const foamKeywords = ['海绵', '泡沫', '聚氨酯', '记忆棉', '乳胶'];
    
    if (woodKeywords.some(k => n.includes(k))) return 'wood';
    if (foamKeywords.some(k => n.includes(k))) return 'foam';
    return 'fabric';
}

// ==================== 选项管理功能 ====================

// 加载选项数据
function loadOptions() {
    try {
        const saved = localStorage.getItem('materialOptions_v1');
        if (saved) {
            materialOptions = JSON.parse(saved);
        } else {
            materialOptions = [...sampleOptions];
            saveOptions();
        }
    } catch (e) {
        materialOptions = [...sampleOptions];
        saveOptions();
    }
    filteredOptions = [...materialOptions];
}

// 保存选项数据
function saveOptions() {
    try { localStorage.setItem('materialOptions_v1', JSON.stringify(materialOptions)); } catch (_) {}
}

// 渲染选项列表
function renderOptions() {
    const grid = document.getElementById('optionsGrid');
    const noResults = document.getElementById('noOptionsResults');

    let list = filteredOptions;

    // 应用分类过滤
    if (optionsCategoryFilter !== 'all') {
        list = filteredOptions.filter(option => option.category === optionsCategoryFilter);
    }

    if (list.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = list.map(option => `
        <div class="option-item">
            <div class="option-name">${option.name}</div>
            <div>
                <span class="option-category ${option.category}">${getCategoryLabel(option.category)}</span>
            </div>
            <div class="option-actions">
                <button class="btn btn-secondary" onclick="editOption(${option.id})">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="btn btn-danger" onclick="deleteOption(${option.id})">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
        </div>
    `).join('');
}

// 获取分类标签
function getCategoryLabel(category) {
    const labels = {
        'fabric': '面料材质',
        'wood': '木头材质',
        'foam': '海绵材质'
    };
    return labels[category] || category;
}

// 选项搜索
function handleOptionsSearch(e) {
    optionsSearchQuery = e.target.value.toLowerCase();
    applyOptionsFilters();
}

// 应用选项过滤
function applyOptionsFilters() {
    filteredOptions = materialOptions.filter(option => {
        const matchesSearch = !optionsSearchQuery || 
            option.name.toLowerCase().includes(optionsSearchQuery);
        
        const matchesCategory = optionsCategoryFilter === 'all' || option.category === optionsCategoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    renderOptions();
}

// 设置选项分类过滤
function setOptionsCategoryFilter(cat, event) {
    optionsCategoryFilter = cat;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === cat));
    applyOptionsFilters();
}


// 显示新增选项模态框
function showAddOptionModal() {
    document.getElementById('addOptionModal').classList.add('show');
    document.getElementById('addOptionForm').reset();
    
    // 调试：检查select元素状态
    const selectElement = document.getElementById('addOptionCategory');
    if (selectElement) {
        console.log('新增选项模态框已打开，select元素存在');
        console.log('select元素是否禁用:', selectElement.disabled);
        console.log('select元素是否只读:', selectElement.readOnly);
        console.log('select元素样式:', window.getComputedStyle(selectElement).pointerEvents);
        
        // 强制设置select元素的样式，确保可以点击
        selectElement.style.pointerEvents = 'auto';
        selectElement.style.position = 'relative';
        selectElement.style.zIndex = '1';
        
        // 确保整个模态框内容区域可以交互
        const modalContent = document.querySelector('#addOptionModal .modal-content');
        if (modalContent) {
            modalContent.style.pointerEvents = 'auto';
            modalContent.style.position = 'relative';
            modalContent.style.zIndex = '1001';
        }
        
        // 确保模态框本身可以交互
        const modal = document.getElementById('addOptionModal');
        if (modal) {
            modal.style.pointerEvents = 'auto';
        }
        
        // 强制设置所有表单元素的样式
        const formElements = document.querySelectorAll('#addOptionModal input, #addOptionModal select, #addOptionModal button');
        formElements.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.position = 'relative';
            element.style.zIndex = '1002';
        });
        
        // 添加点击事件监听器用于调试
        selectElement.addEventListener('click', function(e) {
            console.log('select元素被点击了');
        });
        
        selectElement.addEventListener('focus', function(e) {
            console.log('select元素获得焦点');
        });
        
        selectElement.addEventListener('mousedown', function(e) {
            console.log('select元素鼠标按下');
        });
        
        // 为其他元素添加调试信息
        const nameInput = document.getElementById('addOptionName');
        const cancelBtn = document.querySelector('#addOptionModal .btn-secondary');
        const submitBtn = document.querySelector('#addOptionModal .btn-primary');
        const closeBtn = document.querySelector('#addOptionModal .close-btn');
        
        if (nameInput) {
            nameInput.addEventListener('click', function(e) {
                console.log('选项名称输入框被点击了');
            });
            nameInput.addEventListener('focus', function(e) {
                console.log('选项名称输入框获得焦点');
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                console.log('取消按钮被点击了');
            });
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                console.log('新增选项按钮被点击了');
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                console.log('关闭按钮被点击了');
            });
        }
    } else {
        console.error('找不到addOptionCategory select元素');
    }
}

// 关闭新增选项模态框
function closeAddOptionModal() {
    console.log('开始关闭新增选项模态框');
    const modal = document.getElementById('addOptionModal');
    if (modal) {
        modal.classList.remove('show');
        console.log('新增选项模态框已成功关闭');
    } else {
        console.error('找不到新增选项模态框元素');
    }
}

// 显示编辑选项模态框
function showEditOptionModal(optionId) {
    const option = materialOptions.find(o => o.id === optionId);
    if (!option) return;
    
    document.getElementById('editOptionId').value = option.id;
    document.getElementById('editOptionCategory').value = option.category;
    document.getElementById('editOptionName').value = option.name;
    
    const modal = document.getElementById('editOptionModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭编辑选项模态框
function closeEditOptionModal() {
    const modal = document.getElementById('editOptionModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 恢复模态框内容样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
}

// 编辑选项
function editOption(optionId) {
    showEditOptionModal(optionId);
}

// 删除选项
function deleteOption(optionId) {
    if (confirm('确定要删除这个选项吗？')) {
        materialOptions = materialOptions.filter(o => o.id !== optionId);
        saveOptions();
        applyOptionsFilters();
    }
}

// 处理新增选项
function handleAddOption(e) {
    e.preventDefault();
    
    const category = document.getElementById('addOptionCategory').value;
    const name = document.getElementById('addOptionName').value.trim();
    
    if (!category || !name) {
        alert('请填写完整信息');
        return;
    }
    
    // 检查重复
    if (materialOptions.some(o => o.name === name && o.category === category)) {
        alert('该材质类型下已存在相同名称的选项');
        return;
    }
    
    const newOption = {
        id: Date.now(),
        category,
        name
    };
    
    materialOptions.unshift(newOption);
    saveOptions();
    applyOptionsFilters();
    
    // 调试信息
    console.log('准备关闭新增选项模态框');
    
    // 重置表单
    document.getElementById('addOptionForm').reset();
    
    // 关闭模态框
    closeAddOptionModal();
    console.log('新增选项模态框已关闭');
    
    alert('新增成功');
}

// 处理编辑选项
function handleEditOption(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editOptionId').value);
    const category = document.getElementById('editOptionCategory').value;
    const name = document.getElementById('editOptionName').value.trim();
    
    if (!category || !name) {
        alert('请填写完整信息');
        return;
    }
    
    // 检查重复（排除自己）
    if (materialOptions.some(o => o.name === name && o.category === category && o.id !== id)) {
        alert('该材质类型下已存在相同名称的选项');
        return;
    }
    
    const optionIndex = materialOptions.findIndex(o => o.id === id);
    if (optionIndex !== -1) {
        materialOptions[optionIndex] = {
            ...materialOptions[optionIndex],
            category,
            name
        };
        saveOptions();
        applyOptionsFilters();
        closeEditOptionModal();
        alert('修改成功');
    }
}

// 根据材质类型获取选项
function getOptionsByCategory(category) {
    return materialOptions.filter(option => option.category === category);
}

// 规范化类别单元格值
function normalizeCategory(val) {
    if (!val) return '';
    const v = val.toString().trim().toLowerCase();
    if (['wood', '木', '木头', '木材'].includes(v)) return 'wood';
    if (['fabric', '面料', '布', '布艺'].includes(v)) return 'fabric';
    if (['foam', '海绵', '泡沫', '聚氨酯', '记忆棉', '乳胶'].includes(v)) return 'foam';
    return '';
}

// 工具：拆分Excel与图片文件
function splitExcelAndImages(files) {
    let excelFile = null;
    const imageFiles = [];
    for (const f of files) {
        if (/\.(xlsx|xls)$/i.test(f.name)) excelFile = f;
        else if (f.type.startsWith('image/')) imageFiles.push(f);
    }
    return { excelFile, imageFiles };
}

// 工具：构建文件名到base64的映射（限制大小）
function buildUploadedImageMap(imageFiles) {
    uploadedImageMap = {};
    const readers = imageFiles.map(img => new Promise((resolve) => {
        const filename = img.name;
        const lower = filename.toLowerCase();
        const noExt = lower.replace(/\.[a-z0-9]+$/, '');
        const compact = lower.replace(/\s+/g, '');
        
        // 检查文件大小（限制为500KB）
        if (img.size > 500 * 1024) {
            console.warn(`图片 ${filename} 太大 (${(img.size/1024).toFixed(1)}KB)，将跳过`);
            resolve();
            return;
        }
        
        const r = new FileReader();
        r.onload = () => {
            // 检查base64字符串长度（限制为300KB）
            const base64 = r.result;
            if (base64.length > 300 * 1024) {
                console.warn(`图片 ${filename} base64太大 (${(base64.length/1024).toFixed(1)}KB)，将跳过`);
                resolve();
                return;
            }
            
            uploadedImageMap[lower] = base64;
            uploadedImageMap[noExt] = base64;
            uploadedImageMap[compact] = base64;
            console.log(`图片 ${filename} 已处理，大小: ${(base64.length/1024).toFixed(1)}KB`);
            resolve();
        };
        r.onerror = () => { 
            console.error(`图片 ${filename} 读取失败`);
            resolve(); 
        };
        r.readAsDataURL(img);
    }));
    return Promise.all(readers);
}

// 保存到本地存储
function saveMaterials() {
    try { 
        // 清理失效的blob URL
        const cleanedMaterials = materials.map(material => {
            if (material.imageUrl && material.imageUrl.startsWith('blob:')) {
                console.log('清理材质数据中的失效blob URL');
                return { ...material, imageUrl: '' };
            }
            return material;
        });
        localStorage.setItem('materials_v1', JSON.stringify(cleanedMaterials)); 
    } catch (_) {}
}

// 保存面料到本地存储
function saveFabrics() {
    try { 
        // 清理过大的base64图片数据和失效的blob URL
        const cleanedFabrics = fabrics.map(fabric => {
            if (fabric.imageUrl) {
                if (fabric.imageUrl.startsWith('blob:')) {
                    // blob URL在页面刷新后会失效，需要清理
                    console.log('清理失效的blob URL');
                    return { ...fabric, imageUrl: '' };
                } else if (fabric.imageUrl.startsWith('data:image/')) {
                    // 如果base64数据过大（超过200KB），则清理
                    if (fabric.imageUrl.length > 200 * 1024) {
                        console.log('清理过大的base64图片数据以节省空间');
                        return { ...fabric, imageUrl: '' };
                    }
                }
            }
            return fabric;
        });
        
        const dataToSave = JSON.stringify(cleanedFabrics);
        const dataSize = (dataToSave.length / 1024).toFixed(2);
        console.log(`准备保存面料数据，大小: ${dataSize}KB`);
        
        localStorage.setItem('fabrics_v1', dataToSave); 
        console.log('面料数据已保存到localStorage，数据条数:', cleanedFabrics.length);
        
        // 更新内存中的数据
        fabrics = cleanedFabrics;
        
    } catch (error) {
        console.error('保存面料数据失败:', error);
        if (error.name === 'QuotaExceededError') {
            alert('存储空间不足！请尝试以下解决方案：\n1. 清除浏览器缓存\n2. 减少上传的图片数量\n3. 使用网络图片URL而不是本地图片文件');
            // 尝试清理一些数据
            clearOldImageData();
        }
    }
    // 更新色板型号选择框
    populateColorCodeSelects();
}

// 清理旧的图片数据以释放存储空间
function clearOldImageData() {
    try {
        // 移除所有blob: URL的图片数据
        const cleanedFabrics = fabrics.map(fabric => {
            if (fabric.imageUrl && fabric.imageUrl.startsWith('blob:')) {
                return { ...fabric, imageUrl: '' };
            }
            return fabric;
        });
        
        // 尝试保存清理后的数据
        localStorage.setItem('fabrics_v1', JSON.stringify(cleanedFabrics));
        fabrics = cleanedFabrics;
        console.log('已清理图片数据以释放存储空间');
        alert('已清理图片数据以释放存储空间，请重新上传图片');
    } catch (e) {
        console.error('清理数据失败:', e);
        alert('存储空间严重不足，请清除浏览器缓存后重试');
    }
}

// ==================== 面料相关功能 ====================

// 页面切换
function switchPage(page) {
    currentPage = page;
    
    // 更新导航按钮状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchPage('${page}')"]`).classList.add('active');
    
    // 显示/隐藏页面内容
    document.getElementById('materialsPage').style.display = page === 'materials' ? 'block' : 'none';
    document.getElementById('fabricsPage').style.display = page === 'fabrics' ? 'block' : 'none';
    document.getElementById('colorboardPage').style.display = page === 'colorboard' ? 'block' : 'none';
    document.getElementById('highlightsPage').style.display = page === 'highlights' ? 'block' : 'none';
    document.getElementById('optionsPage').style.display = page === 'options' ? 'block' : 'none';
    
    // 切换头部按钮
    const materialsActions = document.getElementById('materialsActions');
    const fabricsActions = document.getElementById('fabricsActions');
    const colorboardActions = document.getElementById('colorboardActions');
    const highlightsActions = document.getElementById('highlightsActions');
    
    materialsActions.style.display = 'none';
    fabricsActions.style.display = 'none';
    colorboardActions.style.display = 'none';
    highlightsActions.style.display = 'none';
    
    if (page === 'materials') {
        materialsActions.style.display = 'flex';
        renderMaterials();
    } else if (page === 'fabrics') {
        fabricsActions.style.display = 'flex';
        renderFabrics();
    } else if (page === 'colorboard') {
        colorboardActions.style.display = 'flex';
        renderColorboard();
    } else if (page === 'highlights') {
        highlightsActions.style.display = 'flex';
        renderHighlights();
    } else if (page === 'options') {
        renderOptions();
    }
}

// 渲染面料列表
function renderFabrics() {
    const gallery = document.getElementById('fabricsGallery');
    const noResults = document.getElementById('fabricsNoResults');
    
    const list = filteredFabrics;

    if (list.length === 0) {
        gallery.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    gallery.innerHTML = list.map(fabric => `
        <div class="fabric-card" onclick="showFabricDetail(${fabric.id})">
            <div class="fabric-info">
                <div class="fabric-color-code">${fabric.colorCode || '未设置'}</div>
                <div class="fabric-code">${fabric.code}</div>
                <div class="fabric-color">${fabric.color || '未设置'}</div>
            </div>
        </div>
    `).join('');
}

// 渲染色板管理页面
function renderColorboard() {
    const tableBody = document.getElementById('colorboardTableBody');
    const noResults = document.getElementById('colorboardNoResults');
    
    // 获取过滤后的面料数据
    const filteredFabrics = applyColorboardFilters();
    
    if (filteredFabrics.length === 0) {
        tableBody.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    tableBody.innerHTML = filteredFabrics.map(fabric => `
        <tr data-fabric-id="${fabric.id}">
            <td>
                ${fabric.imageUrl ? `
                    <img src="${fabric.imageUrl}" alt="${fabric.code}" class="notion-table-image" data-image-src="${fabric.imageUrl}" onerror="this.style.display='none'" />
                ` : `
                    <div class="notion-table-image" style="background: #f1f3f4; display: flex; align-items: center; justify-content: center; color: #6c757d;">
                        <i class="fas fa-image"></i>
                    </div>
                `}
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.colorCode || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-platform ${fabric.category}">${getCategoryLabel(fabric.category)}</div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span class="notion-table-price">${fabric.price ? `${fabric.price} ${fabric.currency === 'CNY' ? '¥' : '$'}` : '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.moq || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.manufacturer || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.classification || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.composition || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.weight || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-cell">
                    <span>${fabric.width || '-'}</span>
                </div>
            </td>
            <td>
                <div class="notion-table-actions">
                    <button class="notion-table-action-btn edit" onclick="showEditColorboardFabricModal(${fabric.id})" title="编辑">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="notion-table-action-btn delete" onclick="deleteFabric(${fabric.id})" title="删除">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 表格排序功能
let colorboardSortField = null;
let colorboardSortDirection = 'asc';

function sortColorboardTable(field) {
    // 切换排序方向
    if (colorboardSortField === field) {
        colorboardSortDirection = colorboardSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        colorboardSortField = field;
        colorboardSortDirection = 'asc';
    }
    
    // 更新表头样式
    document.querySelectorAll('.notion-table-header').forEach(header => {
        header.classList.remove('sorted', 'sorted-asc', 'sorted-desc');
    });
    
    const currentHeader = document.querySelector(`[data-sort="${field}"]`);
    if (currentHeader) {
        currentHeader.classList.add('sorted', `sorted-${colorboardSortDirection}`);
    }
    
    // 重新渲染表格
    renderColorboard();
}

// 获取分类标签
function getCategoryLabel(category) {
    const labels = {
        'amazon': '亚马逊',
        'website': '自建站',
        'wayfair': 'Wayfair'
    };
    return labels[category] || category;
}

// 色板管理过滤函数
function applyColorboardFilters() {
    let result = [...fabrics];
    
    // 按分类过滤
    if (colorboardCategoryFilter !== 'all') {
        result = result.filter(fabric => fabric.category === colorboardCategoryFilter);
    }
    
    // 按搜索关键词过滤
    if (colorboardSearchQuery.trim()) {
        const query = colorboardSearchQuery.trim().toLowerCase();
        result = result.filter(fabric => {
            return (
                (fabric.colorCode && fabric.colorCode.toLowerCase().includes(query)) ||
                (fabric.description && fabric.description.toLowerCase().includes(query)) ||
                (fabric.classification && fabric.classification.toLowerCase().includes(query)) ||
                (fabric.composition && fabric.composition.toLowerCase().includes(query))
            );
        });
    }
    
    // 应用排序
    if (colorboardSortField) {
        result.sort((a, b) => {
            let aVal = a[colorboardSortField] || '';
            let bVal = b[colorboardSortField] || '';
            
            // 处理数字字段
            if (colorboardSortField === 'price') {
                aVal = parseFloat(aVal) || 0;
                bVal = parseFloat(bVal) || 0;
            }
            
            // 处理字符串字段
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (colorboardSortDirection === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }
    
    return result;
}

// 设置色板分类过滤
function setColorboardCategoryFilter(cat, event) {
    colorboardCategoryFilter = cat;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderColorboard();
}

// 设置面料分类过滤
function setFabricCategoryFilter(cat, event) {
    fabricCategoryFilter = cat;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === cat));
    applyFabricFilters();
}

// 显示色板详情
function showColorboardDetail(fabricId) {
    const fabric = fabrics.find(f => f.id === fabricId);
    if (!fabric) return;
    
    const modal = document.getElementById('fabricModal');
    const title = document.getElementById('fabricModalTitle');
    const body = document.getElementById('fabricModalBody');
    
    title.textContent = fabric.colorCode || fabric.code;
    body.setAttribute('data-fabric-id', fabric.id);
    body.innerHTML = `
        ${fabric.imageUrl ? `
            <div class="material-image">
                <img src="${fabric.imageUrl}" alt="${fabric.code}" data-image-src="${fabric.imageUrl}" onerror="this.style.display='none'" style="cursor: zoom-in;" />
            </div>
        ` : ''}
        <div class="fabric-detail">
            <h3>面料信息</h3>
            ${fabric.colorCode ? `<p><strong>色板型号：</strong>${fabric.colorCode}</p>` : ''}
            <p><strong>型号：</strong>${fabric.code}</p>
            <p><strong>平台：</strong>${getCategoryLabel(fabric.category)}</p>
            ${fabric.price ? `<p><strong>价格：</strong>${fabric.price} ${fabric.currency === 'CNY' ? '¥' : '$'}</p>` : ''}
            ${fabric.moq ? `<p><strong>MOQ：</strong>${fabric.moq}</p>` : ''}
            ${fabric.manufacturer ? `<p><strong>厂家：</strong>${fabric.manufacturer}</p>` : ''}
            ${fabric.classification ? `<p><strong>归类：</strong>${fabric.classification}</p>` : ''}
            ${fabric.composition ? `<p><strong>成分：</strong>${fabric.composition}</p>` : ''}
            ${fabric.weight ? `<p><strong>克重：</strong>${fabric.weight}</p>` : ''}
            ${fabric.width ? `<p><strong>门幅：</strong>${fabric.width}</p>` : ''}
            ${fabric.color ? `<p><strong>颜色：</strong>${fabric.color}</p>` : ''}
        </div>
        
        <div class="detail-section">
            <h4>面料描述</h4>
            <p>${fabric.description || '暂无描述'}</p>
        </div>
        
        <div class="detail-section">
            <h4>面料特性</h4>
            <div class="fabric-features">
                ${fabric.features.map(feature => 
                    `<span class="fabric-feature-tag">${feature}</span>`
                ).join('')}
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="showEditColorboardFabricModal(${fabric.id})">
                <i class="fas fa-edit"></i> 编辑
            </button>
            <button class="btn btn-danger" onclick="deleteFabric(${fabric.id})">
                <i class="fas fa-trash"></i> 删除
            </button>
            <button class="btn btn-secondary" onclick="closeFabricModal()">
                关闭
            </button>
        </div>
    `;
    
    modal.classList.add('show');
}

// 显示色板编辑面料表单
function showEditColorboardFabricModal(fabricId) {
    const fabric = fabrics.find(f => f.id === fabricId);
    if (!fabric) return;
    
    const modal = document.getElementById('editColorboardFabricModal');
    const form = document.getElementById('editColorboardFabricForm');
    
    // 填充表单数据
    document.getElementById('editColorboardFabricId').value = fabric.id;
    document.getElementById('editColorboardFabricColorCode').value = fabric.colorCode || '';
    document.getElementById('editColorboardFabricDescription').value = fabric.description || '';
    document.getElementById('editColorboardFabricCategory').value = fabric.category || '';
    document.getElementById('editColorboardFabricPrice').value = fabric.price || '';
    document.getElementById('editColorboardFabricCurrency').value = fabric.currency || 'CNY';
    document.getElementById('editColorboardFabricMoq').value = fabric.moq || '';
    document.getElementById('editColorboardFabricManufacturer').value = fabric.manufacturer || '';
    document.getElementById('editColorboardFabricClassification').value = fabric.classification || '';
    document.getElementById('editColorboardFabricComposition').value = fabric.composition || '';
    document.getElementById('editColorboardFabricWeight').value = fabric.weight || '';
    document.getElementById('editColorboardFabricWidth').value = fabric.width || '';
    document.getElementById('editColorboardFabricImageUrl').value = fabric.imageUrl || '';
    
    // 清除文件输入
    document.getElementById('editColorboardFabricImageFile').value = '';
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭色板编辑面料表单
function closeEditColorboardFabricModal() {
    const modal = document.getElementById('editColorboardFabricModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    // 清除表单
    document.getElementById('editColorboardFabricForm').reset();
}

// 处理新增色板表单提交
function handleAddColorboard(e) {
    e.preventDefault();
    
    const colorCode = document.getElementById('addColorboardColorCode').value.trim();
    const description = document.getElementById('addColorboardDescription').value.trim();
    const category = document.getElementById('addColorboardCategory').value;
    const price = document.getElementById('addColorboardPrice').value;
    const currency = document.getElementById('addColorboardCurrency').value;
    const moq = document.getElementById('addColorboardMoq').value.trim();
    const manufacturer = document.getElementById('addColorboardManufacturer').value.trim();
    const classification = document.getElementById('addColorboardClassification').value.trim();
    const composition = document.getElementById('addColorboardComposition').value.trim();
    const weight = document.getElementById('addColorboardWeight').value.trim();
    const width = document.getElementById('addColorboardWidth').value.trim();
    const imageUrl = document.getElementById('addColorboardImageUrl').value.trim();
    const imageFile = document.getElementById('addColorboardImageFile').files[0];
    
    // 必填字段验证
    if (!colorCode || !category) {
        alert('请填写色板型号和平台');
        return;
    }
    
    // 检查色板型号是否重复
    if (colorCodeExists(colorCode)) {
        alert('色板型号已存在，请更换');
        return;
    }
    
    // 处理图片
    let finalImageUrl = imageUrl;
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            finalImageUrl = e.target.result;
            saveColorboardWithImage();
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveColorboardWithImage();
    }
    
    function saveColorboardWithImage() {
        // 创建新的面料数据
        const newFabric = {
            id: Date.now(), // 使用时间戳作为ID
            colorCode,
            code: null, // 面料型号设为null
            name: null, // 面料名称设为null
            color: null, // 面料颜色设为null
            description: description || null,
            category,
            price: price ? parseFloat(price) : null,
            currency,
            moq: moq || null,
            manufacturer: manufacturer || null,
            classification: classification || null,
            composition: composition || null,
            weight: weight || null,
            width: width || null,
            imageUrl: finalImageUrl || null,
            features: [] // 色板数据暂不包含特性，可后续扩展
        };
        
        // 添加到数组
        fabrics.push(newFabric);
        saveFabrics();
        
        // 关闭模态框
        closeAddColorboardModal();
        
        // 刷新显示
        renderColorboard();
        
        alert('色板添加成功');
    }
}

// 填充色板型号选择框（新增用）
function populateColorboardColorCodeSelects() {
    // 获取所有唯一的色板型号
    const colorCodes = [...new Set(fabrics.map(f => f.colorCode).filter(code => code && code.trim()))];
    
    // 填充新增色板表单的datalist
    const addList = document.getElementById('colorCodeListAdd');
    if (addList) {
        addList.innerHTML = colorCodes.map(code => `<option value="${code}">`).join('');
    }
}

// 色板型号存在性检查
function colorCodeExists(code) {
    const v = (code || '').toString().trim().toLowerCase();
    if (!v) return true; // 空值在提交时再处理
    const set = new Set((fabrics || []).map(f => (f.colorCode || '').toString().trim().toLowerCase()).filter(Boolean));
    return set.has(v);
}

// 绑定色板型号输入校验（失焦提示）
function attachColorboardColorCodeBlurValidation(input) {
    if (!input) return;
    
    // 移除之前的监听器
    if (input.__colorCodeBlurHandler) {
        input.removeEventListener('blur', input.__colorCodeBlurHandler);
    }
    
    const handler = function() {
        const value = (input.value || '').trim();
        const dupMsg = document.getElementById('addColorboardColorCodeDupMsg');
        
        if (value && colorCodeExists(value)) {
            dupMsg.style.display = 'block';
        } else {
            dupMsg.style.display = 'none';
        }
    };
    
    input.__colorCodeBlurHandler = handler;
    input.addEventListener('blur', handler);
}

// 删除色板面料
function deleteColorboardFabric() {
    const fabricId = document.getElementById('editColorboardFabricId').value;
    if (!fabricId) {
        alert('无法获取面料ID');
        return;
    }
    
    // 确认删除
    if (!confirm('确定要删除这个面料吗？此操作无法撤销。')) {
        return;
    }
    
    // 从数组中删除
    const fabricIndex = fabrics.findIndex(f => f.id == fabricId);
    if (fabricIndex === -1) {
        alert('面料不存在');
        return;
    }
    
    fabrics.splice(fabricIndex, 1);
    saveFabrics();
    
    // 关闭模态框
    closeEditColorboardFabricModal();
    
    // 刷新显示
    renderColorboard();
    
    alert('面料删除成功');
}

// 处理色板编辑面料表单提交
function handleEditColorboardFabric(e) {
    e.preventDefault(); // 防止表单默认提交行为
    
    const id = parseInt(document.getElementById('editColorboardFabricId').value);
    const colorCode = document.getElementById('editColorboardFabricColorCode').value.trim();
    const description = document.getElementById('editColorboardFabricDescription').value.trim();
    const category = document.getElementById('editColorboardFabricCategory').value;
    const price = document.getElementById('editColorboardFabricPrice').value;
    const currency = document.getElementById('editColorboardFabricCurrency').value;
    const moq = document.getElementById('editColorboardFabricMoq').value.trim();
    const manufacturer = document.getElementById('editColorboardFabricManufacturer').value.trim();
    const classification = document.getElementById('editColorboardFabricClassification').value.trim();
    const composition = document.getElementById('editColorboardFabricComposition').value.trim();
    const weight = document.getElementById('editColorboardFabricWeight').value.trim();
    const width = document.getElementById('editColorboardFabricWidth').value.trim();
    const imageUrl = document.getElementById('editColorboardFabricImageUrl').value.trim();
    const imageFile = document.getElementById('editColorboardFabricImageFile').files[0];
    
    
    if (!colorCode) {
        alert('色板型号不能为空');
        return;
    }
    
    // 处理图片
    let finalImageUrl = imageUrl;
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            finalImageUrl = e.target.result;
            updateFabricWithImage();
        };
        reader.readAsDataURL(imageFile);
    } else {
        updateFabricWithImage();
    }
    
    function updateFabricWithImage() {
        // 更新面料数据
        const fabricIndex = fabrics.findIndex(f => f.id === id);
        if (fabricIndex === -1) {
            alert('面料不存在');
            return;
        }
        
        fabrics[fabricIndex] = {
            ...fabrics[fabricIndex],
            colorCode,
            name,
            description,
            category,
            price: price ? parseFloat(price) : null,
            currency,
            moq,
            manufacturer,
            classification,
            composition,
            weight,
            width,
            imageUrl: finalImageUrl
        };
        
        saveFabrics();
        closeEditColorboardFabricModal();
        renderColorboard();
        
        // 更新详情页面内容（不关闭详情页面）
        showColorboardDetail(id);
        
        alert('面料修改成功');
    }
}

// 显示面料详情（面料管理页面专用）
function showFabricDetail(fabricId) {
    const fabric = fabrics.find(f => f.id === fabricId);
    if (!fabric) return;
    
    const modal = document.getElementById('fabricModal');
    const title = document.getElementById('fabricModalTitle');
    const body = document.getElementById('fabricModalBody');
    
    title.textContent = fabric.code;
    body.innerHTML = `
        ${fabric.imageUrl ? `
            <div class="material-image">
                <img src="${fabric.imageUrl}" alt="${fabric.code}" data-image-src="${fabric.imageUrl}" onerror="this.style.display='none'" style="cursor: zoom-in;" />
            </div>
        ` : ''}
        <div class="fabric-detail">
            <h3>面料信息</h3>
            ${fabric.colorCode ? `<p><strong>色板型号：</strong>${fabric.colorCode}</p>` : ''}
            <p><strong>型号：</strong>${fabric.code}</p>
            ${fabric.color ? `<p><strong>颜色：</strong>${fabric.color}</p>` : ''}
        </div>
        
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="event.stopPropagation(); showEditFabricModal(${fabric.id})">
                <i class="fas fa-edit"></i> 编辑
            </button>
            <button class="btn btn-danger" onclick="event.stopPropagation(); deleteFabric(${fabric.id})">
                <i class="fas fa-trash"></i> 删除
            </button>
            <button class="btn btn-secondary" onclick="event.stopPropagation(); closeFabricModal()">
                关闭
            </button>
        </div>
    `;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭面料模态框
function closeFabricModal() {
    const modal = document.getElementById('fabricModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
}

// 填充色板型号选择框
function populateColorCodeSelects() {
    // 获取所有唯一的色板型号
    const colorCodes = [...new Set(fabrics.map(f => f.colorCode).filter(code => code && code.trim()))];
    
    // 填充新增面料表单的datalist
    const addList = document.getElementById('colorCodeList');
    if (addList) {
        addList.innerHTML = '';
        colorCodes.forEach(colorCode => {
            const option = document.createElement('option');
            option.value = colorCode;
            addList.appendChild(option);
        });
    }
    
    // 填充编辑面料表单的datalist
    const editList = document.getElementById('colorCodeListEdit');
    if (editList) {
        editList.innerHTML = '';
        colorCodes.forEach(colorCode => {
            const option = document.createElement('option');
            option.value = colorCode;
            editList.appendChild(option);
        });
    }
}

// 显示面料上传模态框
function showFabricUploadModal() {
    const modal = document.getElementById('fabricUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭面料上传模态框
function closeFabricUploadModal() {
    const modal = document.getElementById('fabricUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    pendingFabricExcelFile = null;
}

function colorCodeExists(code) {
    const v = (code || '').toString().trim().toLowerCase();
    if (!v) return true; // 空值在提交时再处理
    const set = new Set((fabrics || []).map(f => (f.colorCode || '').toString().trim().toLowerCase()).filter(Boolean));
    return set.has(v);
}

function attachColorCodeBlurValidation(input) {
    if (!input) return;
    input.setAttribute('placeholder', '请选择或输入色板型号');
    // 防止重复绑定
    input.removeEventListener('blur', input.__colorCodeBlurHandler || (()=>{}));
    input.removeEventListener('input', input.__colorCodeInputHandler || (()=>{}));

    // 当输入变化时，清除取消状态与提示
    const onInput = function() {
        if (input.__warningEl && input.value.trim() && colorCodeExists(input.value)) {
            input.__warningEl.remove();
            input.__warningEl = null;
        }
        input.__cancelledOnce = false;
        input.__invalidColorValue = undefined;
    };
    input.__colorCodeInputHandler = onInput;
    input.addEventListener('input', onInput);

    const handler = function() {
        const val = input.value.trim();
        if (!val) {
            if (input.__warningEl) { input.__warningEl.remove(); input.__warningEl = null; }
            return; // 空值不提示
        }
        if (!colorCodeExists(val)) {
            // 若用户刚刚取消过同一个值，不要重复弹窗
            if (input.__cancelledOnce && input.__invalidColorValue === val) {
                if (!input.__warningEl) {
                    const small = document.createElement('small');
                    small.style.color = '#e74c3c';
                    small.style.display = 'block';
                    small.style.marginTop = '6px';
                    small.textContent = '该色板型号不存在，请前往"色板管理"页面新建或修改输入。';
                    input.parentNode.insertBefore(small, input.nextSibling);
                    input.__warningEl = small;
                }
                return;
            }
            const goCreate = confirm('当前色板型号不存在，是否前往"色板管理"页面新建？');
            if (goCreate) {
                // 关闭当前可能打开的面料弹窗
                const addModal = document.getElementById('addFabricModal');
                const editModal = document.getElementById('editFabricModal');
                if (addModal) addModal.classList.remove('show');
                if (editModal) editModal.classList.remove('show');
                // 跳转到色板管理
                try { switchPage('colorboard'); } catch (_) {}
            } else {
                // 用户点击取消，记录一次取消并提示
                input.__cancelledOnce = true;
                input.__invalidColorValue = val;
                if (!input.__warningEl) {
                    const small = document.createElement('small');
                    small.style.color = '#e74c3c';
                    small.style.display = 'block';
                    small.style.marginTop = '6px';
                    small.textContent = '该色板型号不存在，请前往"色板管理"页面新建或修改输入。';
                    input.parentNode.insertBefore(small, input.nextSibling);
                    input.__warningEl = small;
                }
                input.focus();
            }
        } else {
            if (input.__warningEl) { input.__warningEl.remove(); input.__warningEl = null; }
        }
    };
    input.__colorCodeBlurHandler = handler;
    input.addEventListener('blur', handler);
}

// 显示新增面料模态框
function showAddFabricModal() {
    const modal = document.getElementById('addFabricModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    // 更新色板型号选择框
    populateColorCodeSelects();
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
    
    // 绑定色板型号输入校验（失焦提示）
    attachColorCodeBlurValidation(document.getElementById('addFabricColorCode'));
}

// 显示编辑面料模态框
function showEditFabricModal(fabricId) {
    const fabric = fabrics.find(f => f.id === fabricId);
    if (!fabric) return;
    
    // 更新色板型号选择框
    populateColorCodeSelects();
    
    // 关闭详情模态框
    closeFabricModal();
    
    // 填充编辑表单
    document.getElementById('editFabricId').value = fabric.id;
    document.getElementById('editFabricCode').value = fabric.code;
    document.getElementById('editFabricColorCode').value = fabric.colorCode || '';
    document.getElementById('editFabricColor').value = fabric.color || '';
    document.getElementById('editFabricImageUrl').value = fabric.imageUrl || '';
    
    // 重置文件输入和预览
    document.getElementById('editFabricImageFile').value = '';
    const preview = document.getElementById('editFabricImagePreview');
    const previewImg = document.getElementById('editFabricImagePreviewImg');
    if (preview && previewImg) {
        previewImg.src = '';
        preview.style.display = 'none';
    }
    
    // 显示编辑模态框
    const editModal = document.getElementById('editFabricModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    
    editModal.classList.add('show');
    editModal.style.display = 'flex';
    editModal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
    
    // 绑定色板型号输入校验（失焦提示）
    attachColorCodeBlurValidation(document.getElementById('editFabricColorCode'));
}

// 关闭编辑面料模态框
function closeEditFabricModal() {
    const editModal = document.getElementById('editFabricModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    
    editModal.classList.remove('show');
    editModal.style.display = 'none';
    editModal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
}

// 处理编辑面料
function handleEditFabric(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById('editFabricId');
    const codeInput = document.getElementById('editFabricCode');
    const colorCodeInput = document.getElementById('editFabricColorCode');
    const colorInput = document.getElementById('editFabricColor');
    const imgInput = document.getElementById('editFabricImageUrl');
    const imgFileInput = document.getElementById('editFabricImageFile');

    const id = parseInt(idInput.value);
    const code = codeInput.value.trim();
    const colorCode = colorCodeInput.value.trim();
    const color = colorInput.value.trim();
    const hasLocalImage = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgInput.value.trim();

    if (!code) {
        alert('请填写面料型号');
        codeInput.focus();
        return;
    }

    // 校验色板型号是否存在于现有数据
    const existingColorCodes = new Set((fabrics || []).map(f => (f.colorCode || '').toString().trim().toLowerCase()).filter(Boolean));
    if (colorCode && !existingColorCodes.has(colorCode.toLowerCase())) {
        const goCreate = confirm('当前色板型号不存在，是否前往"色板管理"页面新建？');
        if (goCreate) {
            try { switchPage('colorboard'); } catch (_) {}
        }
        colorCodeInput.focus();
        return;
    }

    // 重复校验（排除当前编辑的面料）
    const lower = code.toLowerCase();
    const exists = fabrics.some(f => f.id !== id && (f.code || '').toString().trim().toLowerCase() === lower);

    const finalizeEdit = (imageUrl) => {
        const index = fabrics.findIndex(f => f.id === id);
        if (index !== -1) {
            fabrics[index] = {
                ...fabrics[index],
                code,
                colorCode,
                color,
                imageUrl
            };
            saveFabrics();
            renderFabrics();
            renderColorboard();
            alert('修改成功');
        }
    };

    if (hasLocalImage) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => finalizeEdit(ev.target.result);
        reader.onerror = () => finalizeEdit('');
        reader.readAsDataURL(file);
        return;
    } else {
        finalizeEdit(imageUrlText);
    }
}

// 处理新增面料
function handleAddFabric(e) {
    if (e) e.preventDefault();
    const codeInput = document.getElementById('addFabricCode');
    const colorCodeInput = document.getElementById('addFabricColorCode');
    const colorInput = document.getElementById('addFabricColor');
    const imgInput = document.getElementById('addFabricImageUrl');
    const imgFileInput = document.getElementById('addFabricImageFile');

    const code = codeInput ? codeInput.value.trim() : '';
    const colorCode = colorCodeInput ? colorCodeInput.value.trim() : '';
    const color = colorInput ? colorInput.value.trim() : '';
    const hasLocalImage = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgInput ? imgInput.value.trim() : '';

    if (!code) {
        alert('请填写面料型号');
        if (codeInput) codeInput.focus();
        return;
    }

    // 校验色板型号是否存在于现有数据
    const existingColorCodes = new Set((fabrics || []).map(f => (f.colorCode || '').toString().trim().toLowerCase()).filter(Boolean));
    if (colorCode && !existingColorCodes.has(colorCode.toLowerCase())) {
        const goCreate = confirm('当前色板型号不存在，是否前往"色板管理"页面新建？');
        if (goCreate) {
            try { switchPage('colorboard'); } catch (_) {}
        }
        if (colorCodeInput) colorCodeInput.focus();
        return;
    }

    // 重复校验（不区分大小写，去空格）
    const lower = code.toLowerCase();
    const exists = fabrics.some(f => (f.code || '').toString().trim().toLowerCase() === lower);

    const finalizeAdd = (imageUrl) => {
        const newFabric = {
            id: getNextFabricId(),
            code,
            colorCode,
            color,
            imageUrl
        };
        fabrics.push(newFabric);
        saveFabrics();
        closeAddFabricModal();
        applyFabricFilters();
        alert('新增成功');

        // 清空表单
        if (codeInput) codeInput.value = '';
        if (colorCodeInput) colorCodeInput.value = '';
        if (colorInput) colorInput.value = '';
        if (imgInput) imgInput.value = '';
        if (imgFileInput) imgFileInput.value = '';

        const preview = document.getElementById('addFabricImagePreview');
        const previewImg = document.getElementById('addFabricImagePreviewImg');
        if (preview && previewImg) {
            previewImg.src = '';
            preview.style.display = 'none';
        }
    };

    if (hasLocalImage) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => finalizeAdd(ev.target.result);
        reader.onerror = () => finalizeAdd('');
        reader.readAsDataURL(file);
    } else {
        finalizeAdd(imageUrlText);
    }
}

// 删除面料
function deleteFabric(fabricId) {
    const fabric = fabrics.find(f => f.id === fabricId);
    if (!fabric) return;
    
    // 使用 colorCode 或 code 来显示确认信息
    const displayName = fabric.colorCode || fabric.code || '此面料';
    const confirmDelete = confirm(`确定删除 "${displayName}" 吗？该操作不可恢复。`);
    if (!confirmDelete) return;

    fabrics = fabrics.filter(f => f.id !== fabricId);
    saveFabrics();
    
    // 检查当前在哪个页面，调用相应的渲染函数
    const colorboardPage = document.getElementById('colorboard');
    const fabricManagementPage = document.getElementById('fabricManagement');
    
    if (colorboardPage && colorboardPage.classList.contains('active')) {
        // 在色板管理页面
        applyColorboardFilters();
        renderColorboard();
    } else if (fabricManagementPage && fabricManagementPage.classList.contains('active')) {
        // 在面料管理页面
        applyFabricFilters();
        renderFabrics();
    } else {
        // 默认刷新两个页面
        applyFabricFilters();
        renderFabrics();
        applyColorboardFilters();
        renderColorboard();
    }
    
    closeFabricModal();
}

// 处理面料文件上传
async function handleFabricFileUpload(e) {
    const input = e.target;
    const files = Array.from(input.files || []);
    if (!files.length) return;

    const { excelFile, imageFiles } = splitExcelAndImages(files);
    if (imageFiles.length) {
        await buildFabricUploadedImageMap(imageFiles);
    }
    if (excelFile) {
        pendingFabricExcelFile = excelFile;
        processFabricExcelFile(pendingFabricExcelFile);
    } else if (imageFiles.length) {
        alert(`已添加 ${imageFiles.length} 张图片，请再选择Excel文件。`);
    }

    try { input.value = ''; } catch (_) {}
}

// 处理面料拖拽悬停
function handleFabricDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

// 处理面料拖拽离开
function handleFabricDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

// 处理面料拖拽放置
async function handleFabricDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    const { excelFile, imageFiles } = splitExcelAndImages(files);
    if (imageFiles.length) {
        await buildFabricUploadedImageMap(imageFiles);
    }
    if (excelFile) {
        pendingFabricExcelFile = excelFile;
        processFabricExcelFile(pendingFabricExcelFile);
    } else if (imageFiles.length) {
        alert('已拖入图片，请再拖入或选择Excel文件。');
    }
}

// 处理面料Excel文件
function processFabricExcelFile(file) {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        alert('请选择Excel文件（.xlsx或.xls格式）');
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
            
            const { added, skippedDuplicates } = parseFabricExcelData(jsonData);
            if (added.length > 0) {
                fabrics = [...fabrics, ...added];
                console.log('面料数据上传成功，当前总数据条数:', fabrics.length);
                console.log('上传的图片映射键:', Object.keys(uploadedFabricImageMap));
                console.log('新增的面料数据:', added);
                saveFabrics();
                applyFabricFilters();
                renderFabrics();
                closeFabricUploadModal();
                const dupMsg = skippedDuplicates.length ? `\n跳过重复：${skippedDuplicates.length} 个（${skippedDuplicates.join('、')}）` : '';
                alert(`成功导入 ${added.length} 个面料数据！${Object.keys(uploadedFabricImageMap).length ? '\n图片：已匹配本地文件（如有同名）' : ''}${dupMsg}`);
                pendingFabricExcelFile = null;
            } else {
                const { skippedDuplicates } = parseFabricExcelData(jsonData);
                if (skippedDuplicates && skippedDuplicates.length) {
                    alert(`全部被识别为重复，未导入。重复：${skippedDuplicates.join('、')}`);
                } else {
                    alert('Excel文件中没有找到有效的面料数据');
                }
            }
        } catch (error) {
            console.error('Excel解析错误:', error);
            alert('Excel文件解析失败，请检查文件格式');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// 解析面料Excel数据
function parseFabricExcelData(data) {
    const added = [];
    const skippedDuplicates = [];
    // 改为使用colorCode作为唯一标识，而不是code
    const existing = new Set(fabrics.map(f => (f.colorCode || '').toString().trim().toLowerCase()));
    const seenInFile = new Set();

    if (!data || data.length === 0) return { added, skippedDuplicates };

    // 头部行
    const headers = (data[0] || []).map(h => (h || '').toString().trim());
    const findIdx = (kwArr) => headers.findIndex(h => kwArr.some(k => h.toLowerCase().includes(k)));

    const idx = {
        colorCode: findIdx(['色板', 'color']),
        description: findIdx(['描述', 'description']),
        features: findIdx(['特性', 'features']),
        image: findIdx(['图片', 'image', 'url']),
        category: findIdx(['平台', '分类', 'category']),
        price: findIdx(['价格', 'price']),
        moq: findIdx(['moq']),
        currency: findIdx(['币种', 'currency']),
        manufacturer: findIdx(['厂家', '厂商', 'manufacturer']),
        classification: findIdx(['归类', '分类名', 'classification']),
        composition: findIdx(['成分', 'composition']),
        weight: findIdx(['克重', 'weight', 'gsm']),
        width: findIdx(['门幅', '宽度', 'width'])
        // 移除code、name、color字段的索引
    };

    // 遍历数据行
    for (let i = 1; i < data.length; i++) {
        const row = data[i] || [];
        const get = (index) => index >= 0 ? (row[index] !== undefined ? row[index].toString().trim() : '') : '';

        const colorCode = get(idx.colorCode);
        if (!colorCode) continue; // 使用colorCode作为必填字段
        const lower = colorCode.toLowerCase();
        if (existing.has(lower) || seenInFile.has(lower)) {
            skippedDuplicates.push(colorCode);
            continue;
        }

        const description = get(idx.description);
        const featuresStr = get(idx.features);
        const imageCell = get(idx.image);
        const categoryCell = get(idx.category);
        const priceCell = get(idx.price);
        const moqCell = get(idx.moq);
        const currencyCell = get(idx.currency);
        const manufacturerCell = get(idx.manufacturer);
        const classificationCell = get(idx.classification);
        const compositionCell = get(idx.composition);
        const weightCell = get(idx.weight);
        const widthCell = get(idx.width);

        // 图片匹配逻辑
        let resolvedImageUrl = '';
        if (imageCell) {
            const raw = imageCell.toString().trim();
            console.log(`处理图片单元格: "${raw}"`);
            
            const base = decodeURI(raw).split(/[\\/]/).pop().trim();
            const lowerName = base.toLowerCase();
            const noExt = lowerName.replace(/\.[a-z0-9]+$/, '');
            const compact = lowerName.replace(/\s+/g, '');
            const candidates = [lowerName, noExt, compact];
            
            console.log(`图片匹配候选: [${candidates.join(', ')}]`);
            console.log(`可用的图片映射键: [${Object.keys(uploadedFabricImageMap).join(', ')}]`);
            
            for (const c of candidates) {
                if (uploadedFabricImageMap[c]) { 
                    resolvedImageUrl = uploadedFabricImageMap[c]; 
                    console.log(`图片匹配成功: ${c} -> ${resolvedImageUrl.substring(0, 50)}...`);
                    break; 
                }
            }
            if (!resolvedImageUrl) {
                if (/^https?:\/\//i.test(raw) || raw.startsWith('data:') || raw.startsWith('blob:')) {
                    resolvedImageUrl = raw;
                    console.log(`使用原始URL: ${resolvedImageUrl.substring(0, 50)}...`);
                } else {
                    console.log(`图片未匹配: "${raw}"`);
                }
            }
        }

        const fabric = {
            id: Date.now() + i,
            code: null, // 面料型号设为null
            name: null, // 面料名称设为null
            color: null, // 面料颜色设为null
            colorCode: colorCode || '',
            description: description || '暂无描述',
            features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(s => s) : [],
            imageUrl: resolvedImageUrl,
            category: normalizeFabricCategory(categoryCell) || 'amazon',
            price: priceCell ? parseFloat(priceCell) : null,
            moq: moqCell || '',
            currency: normalizeCurrency(currencyCell) || 'CNY',
            manufacturer: manufacturerCell || '',
            classification: classificationCell || '',
            composition: compositionCell || '',
            weight: weightCell || '',
            width: widthCell || ''
        };

        added.push(fabric);
        seenInFile.add(lower);
    }

    return { added, skippedDuplicates };
}

// 规范化面料类别
function normalizeFabricCategory(val) {
    if (!val) return '';
    const v = val.toString().trim().toLowerCase();
    if (['amazon', '亚马逊'].includes(v)) return 'amazon';
    if (['website', '自建站', '自建'].includes(v)) return 'website';
    if (['wayfair', '韦法尔'].includes(v)) return 'wayfair';
    return '';
}

// 规范化币种
function normalizeCurrency(val) {
    if (!val) return '';
    const v = val.toString().trim().toUpperCase();
    if (['CNY', 'RMB', '人民币', '¥'].includes(v)) return 'CNY';
    if (['USD', '美元', '$'].includes(v)) return 'USD';
    return '';
}

// 图片压缩函数
function compressImage(file, filename, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        // 计算压缩后的尺寸
        let { width, height } = img;
        const maxWidth = 800;
        const maxHeight = 600;
        const maxSize = 500 * 1024; // 500KB
        
        // 按比例缩放
        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = width * ratio;
            height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // 绘制压缩后的图片
        ctx.drawImage(img, 0, 0, width, height);
        
        // 尝试不同的质量直到文件大小合适
        let quality = 0.8;
        let dataUrl;
        
        do {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
            if (dataUrl.length <= maxSize) {
                console.log(`图片 ${filename} 压缩完成，质量: ${quality}, 大小: ${(dataUrl.length/1024).toFixed(1)}KB`);
                callback(dataUrl);
                return;
            }
            quality -= 0.1;
        } while (quality > 0.1);
        
        // 如果还是太大，尝试进一步缩小尺寸
        if (dataUrl.length > maxSize) {
            const sizeRatio = Math.sqrt(maxSize / dataUrl.length);
            width = width * sizeRatio;
            height = height * sizeRatio;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            console.log(`图片 ${filename} 进一步压缩，最终大小: ${(dataUrl.length/1024).toFixed(1)}KB`);
        }
        
        callback(dataUrl);
    };
    
    img.onerror = function() {
        console.error(`图片 ${filename} 加载失败`);
        callback(null);
    };
    
    // 读取文件
    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    reader.onerror = function() {
        console.error(`图片 ${filename} 读取失败`);
        callback(null);
    };
    reader.readAsDataURL(file);
}

// 构建面料文件名映射
function buildFabricUploadedImageMap(imageFiles) {
    uploadedFabricImageMap = {};
    console.log('开始处理面料图片文件，数量:', imageFiles.length);
    
    const readers = imageFiles.map(img => new Promise((resolve) => {
        const filename = img.name;
        const lower = filename.toLowerCase();
        const noExt = lower.replace(/\.[a-z0-9]+$/, '');
        const compact = lower.replace(/\s+/g, '');
        
        console.log(`处理图片文件: ${filename}, 大小: ${(img.size/1024).toFixed(1)}KB`);
        
        // 检查文件大小（限制为3MB，超过则压缩）
        if (img.size > 3 * 1024 * 1024) {
            console.warn(`图片 ${filename} 太大 (${(img.size/1024/1024).toFixed(1)}MB)，将跳过`);
            resolve();
            return;
        }
        
        // 使用图片压缩功能
        compressImage(img, filename, (compressedDataUrl) => {
            if (compressedDataUrl) {
                uploadedFabricImageMap[lower] = compressedDataUrl;
                uploadedFabricImageMap[noExt] = compressedDataUrl;
                uploadedFabricImageMap[compact] = compressedDataUrl;
                console.log(`图片 ${filename} 已压缩并处理，映射到: [${lower}, ${noExt}, ${compact}]`);
            }
            resolve();
        });
    }));
    return Promise.all(readers);
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
        closeUploadModal();
        closeImagePreview();
        closeAddModal();
        closeEditModal();
        closeFabricModal();
        closeFabricUploadModal();
        closeAddFabricModal();
        closeEditFabricModal();
        closeHighlightModal();
        closeHighlightUploadModal();
        closeAddHighlightModal();
        closeEditHighlightModal();
        closeDesignPointEditModal();
        closeSceneImageEditModal();
    }
});

// 键盘事件
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeUploadModal();
        closeImagePreview();
        closeAddModal();
        closeEditModal();
        closeFabricModal();
        closeFabricUploadModal();
        closeAddFabricModal();
        closeEditFabricModal();
        closeHighlightModal();
        closeHighlightUploadModal();
        closeAddHighlightModal();
        closeEditHighlightModal();
        closeDesignPointEditModal();
        closeSceneImageEditModal();
    }
});

// ==================== 产品卖点相关功能 ====================

// 渲染产品卖点列表
function renderHighlights() {
    const gallery = document.getElementById('highlightsGallery');
    const noResults = document.getElementById('highlightsNoResults');
    
    const list = filteredHighlights;

    if (list.length === 0) {
        gallery.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    gallery.innerHTML = list.map(highlight => `
        <div class="highlight-card" onclick="showHighlightDetail(${highlight.id})">
            ${highlight.imageUrl ? `
                <div class="highlight-thumb">
                    <img src="${highlight.imageUrl}" alt="${highlight.name}" onerror="this.style.display='none'" />
                    <div class="highlight-category ${highlight.category}">${getHighlightCategoryLabel(highlight.category)}</div>
                </div>
            ` : ''}
            <div class="highlight-info">
                <div class="highlight-name">${highlight.name}</div>
                <div class="highlight-parent-model">${highlight.parentModel}</div>
                <div class="highlight-description">${highlight.description}</div>
                <div class="highlight-features">
                    ${highlight.features.slice(0, 3).map(feature => 
                        `<span class="highlight-feature-tag">${feature}</span>`
                    ).join('')}
                    ${highlight.features.length > 3 ? 
                        `<span class="highlight-feature-tag">+${highlight.features.length - 3}</span>` : ''
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// 获取产品卖点分类标签
function getHighlightCategoryLabel(category) {
    const labels = {
        'seating': '坐具',
        'table': '桌子'
    };
    return labels[category] || category;
}

// 格式化材质链接
function formatMaterialLink(materialName, materialType) {
    if (!materialName || materialName.trim() === '' || materialName === '未填写') {
        return '未填写';
    }
    
    // 查找匹配的材质
    const matchedMaterial = findMatchingMaterial(materialName, materialType);
    if (matchedMaterial) {
        return `<a href="#" onclick="navigateToMaterial('${matchedMaterial.id}')" class="material-link" title="点击查看材质详情">${materialName}</a>`;
    }
    
    // 如果没有找到匹配的材质，显示普通文本
    return materialName;
}

// 格式化面料链接
function formatFabricLink(fabricName) {
    if (!fabricName || fabricName.trim() === '' || fabricName === '未填写') {
        return '未填写';
    }
    
    // 查找匹配的面料
    const matchedFabric = findMatchingFabric(fabricName);
    if (matchedFabric) {
        return `<a href="#" onclick="navigateToFabric('${matchedFabric.id}')" class="material-link" title="点击查看面料详情">${fabricName}</a>`;
    }
    
    // 如果没有找到匹配的面料，显示普通文本
    return fabricName;
}

// 查找匹配的面料
function findMatchingFabric(fabricName) {
    const searchName = fabricName.toLowerCase().trim();
    
    // 首先精确匹配
    let matched = fabrics.find(f => 
        f.code.toLowerCase() === searchName
    );
    
    if (matched) return matched;
    
    // 然后模糊匹配面料型号
    matched = fabrics.find(f => 
        f.code.toLowerCase().includes(searchName)
    );
    
    if (matched) return matched;
    
    
    return matched;
}

// 导航到面料详情页面
function navigateToFabric(fabricId) {
    // 关闭当前的产品卖点详情模态框
    closeHighlightModal();
    
    // 切换到面料字典页面
    switchPage('fabrics');
    
    // 等待页面切换完成后显示面料详情
    setTimeout(() => {
        showFabricDetail(fabricId);
    }, 100);
}

// 填充材质选择框
function populateMaterialSelects() {
    // 确保materialOptions已加载
    if (!materialOptions || materialOptions.length === 0) {
        console.warn('材质选项数据未加载，跳过填充选择框');
        return;
    }
    
    // 获取材质选项
    const fabricOptions = materialOptions.filter(opt => opt.category === 'fabric');
    const foamOptions = materialOptions.filter(opt => opt.category === 'foam');
    const woodOptions = materialOptions.filter(opt => opt.category === 'wood');
    
    // 填充面料材质选择框
    const fabricSelects = [
        'addHighlightFabricMaterial',
        'editHighlightFabricMaterial'
    ];
    fabricSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            // 清空现有选项（保留第一个默认选项）
            select.innerHTML = '<option value="">请选择面料材质</option>';
            fabricOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        }
    });
    
    // 填充海绵材质选择框
    const foamSelects = [
        'addHighlightSpongeMaterial',
        'editHighlightSpongeMaterial'
    ];
    foamSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">请选择海绵材质</option>';
            foamOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        }
    });
    
    // 填充脚材质选择框
    const legSelects = [
        'addHighlightLegMaterial',
        'editHighlightLegMaterial'
    ];
    legSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">请选择脚材质</option>';
            woodOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        }
    });
    
    // 填充框架材质选择框
    const frameSelects = [
        'addHighlightFrameMaterial',
        'editHighlightFrameMaterial'
    ];
    frameSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">请选择框架材质</option>';
            woodOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        }
    });
    
    // 填充面板材质选择框
    const panelSelects = [
        'addHighlightPanelMaterial',
        'editHighlightPanelMaterial'
    ];
    panelSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">请选择面板材质</option>';
            woodOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        }
    });
}

// 查找匹配的材质
function findMatchingMaterial(materialName, materialType) {
    const searchName = materialName.toLowerCase().trim();
    
    // 首先精确匹配
    let matched = materials.find(m => 
        m.name.toLowerCase() === searchName && 
        m.category === materialType
    );
    
    if (matched) return matched;
    
    // 然后模糊匹配
    matched = materials.find(m => 
        m.name.toLowerCase().includes(searchName) && 
        m.category === materialType
    );
    
    if (matched) return matched;
    
    // 最后尝试部分匹配（材质名称包含搜索词）
    matched = materials.find(m => 
        searchName.includes(m.name.toLowerCase()) && 
        m.category === materialType
    );
    
    return matched;
}

// 导航到材质详情页面
function navigateToMaterial(materialId) {
    // 关闭当前的产品卖点详情模态框
    closeHighlightModal();
    
    // 切换到材质字典页面
    switchPage('materials');
    
    // 等待页面切换完成后显示材质详情
    setTimeout(() => {
        showMaterialDetail(materialId);
    }, 100);
}

// 打开办公椅配件页面
function openOfficeChairPage() {
    // 在新窗口中打开办公椅页面
    window.open('office-chair.html', '_blank');
}

// 设置产品卖点分类过滤
function setHighlightCategoryFilter(cat, event) {
    highlightCategoryFilter = cat;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === cat));
    applyHighlightFilters();
}

// 处理产品卖点搜索
function handleHighlightSearch(e) {
    highlightSearchQuery = e.target.value.toLowerCase().trim();
    applyHighlightFilters();
}

// 应用产品卖点过滤（分类 + 搜索）
function applyHighlightFilters() {
    let filtered = [...highlights];
    
    // 过滤掉储物分类的产品
    filtered = filtered.filter(h => h.category !== 'storage');
    
    // 应用分类过滤
    if (highlightCategoryFilter !== 'all') {
        filtered = filtered.filter(h => h.category === highlightCategoryFilter);
    }
    
    // 应用搜索过滤
    if (highlightSearchQuery) {
        filtered = filtered.filter(highlight => 
            highlight.name.toLowerCase().includes(highlightSearchQuery) ||
            highlight.parentModel.toLowerCase().includes(highlightSearchQuery) ||
            highlight.description.toLowerCase().includes(highlightSearchQuery) ||
            highlight.features.some(feature => feature.toLowerCase().includes(highlightSearchQuery))
        );
    }
    
    filteredHighlights = filtered;
    renderHighlights();
}

// 显示产品卖点详情
function showHighlightDetail(highlightId) {
    const highlight = highlights.find(h => h.id === highlightId);
    if (!highlight) return;
    
    // 调试信息
    console.log('显示产品详情:', highlight);
    console.log('场景图数据:', highlight.sceneImages);
    
    const modal = document.getElementById('highlightModal');
    const title = document.getElementById('highlightModalTitle');
    const body = document.getElementById('highlightModalBody');
    
    title.textContent = highlight.parentModel;
    body.setAttribute('data-highlight-id', highlight.id);
    body.innerHTML = `
        ${highlight.imageUrl ? `
            <div class="material-image">
                <img src="${highlight.imageUrl}" alt="${highlight.name}" data-image-src="${highlight.imageUrl}" onerror="this.style.display='none'" style="cursor: zoom-in;" />
            </div>
        ` : ''}
        <div class="detail-section">
            <h4>产品信息</h4>
            <p><strong>父款型号：</strong>${highlight.parentModel}</p>
            <p><strong>产品分类：</strong>${getHighlightCategoryLabel(highlight.category)}</p>
            ${highlight.category === 'table' ? `
                <p><strong>面板材质：</strong>${formatMaterialLink(highlight.panelMaterial, 'wood')}</p>
                <p><strong>脚材质：</strong>${formatMaterialLink(highlight.legMaterial, 'wood')}</p>
                <p><strong>功能：</strong>${highlight.function || '未填写'}</p>
            ` : `
                <p><strong>面料材质：</strong>${formatFabricLink(highlight.fabricMaterial)}</p>
                <p><strong>脚材质：</strong>${formatMaterialLink(highlight.legMaterial, 'wood')}</p>
                <p><strong>海绵材质：</strong>${formatMaterialLink(highlight.spongeMaterial, 'fabric')}</p>
                <p><strong>框架材质：</strong>${formatMaterialLink(highlight.frameMaterial, 'wood')}</p>
                <p><strong>功能：</strong>${highlight.function || '未填写'}</p>
            `}
        </div>
        
        <div class="detail-section">
            <h4>参考链接</h4>
            ${highlight.referenceLinks && highlight.referenceLinks.length > 0 ? 
                highlight.referenceLinks.map((link, index) => 
                    link.trim() ? 
                        `<p><strong>链接${index + 1}：</strong><a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></p>` : 
                        `<p><strong>链接${index + 1}：</strong><span style="color: #6c757d;">未填写</span></p>`
                ).join('') : 
                '<p><span style="color: #6c757d;">暂无参考链接</span></p>'
            }
        </div>
        
        ${highlight.designPoints && highlight.designPoints.length > 0 ? `
        <div class="design-points-display">
            <h4>设计亮点</h4>
            <div class="design-points-grid">
                ${highlight.designPoints.map(dp => `
                    <div class="design-point-card">
                        <div class="design-point-actions">
                            <button class="design-point-edit-btn" onclick="openDesignPointEdit(${dp.id}, ${highlight.id})">
                                <i class="fas fa-edit"></i> 编辑
                            </button>
                        </div>
                        ${dp.imageUrl ? `
                            <div class="design-point-image">
                                <img src="${dp.imageUrl}" alt="${dp.title}" data-image-src="${dp.imageUrl}" onerror="this.style.display='none'" />
                            </div>
                        ` : ''}
                        <div class="design-point-content">
                            <div class="design-point-title-display">${dp.title}</div>
                            <div class="design-point-description-display">${dp.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        ${highlight.sceneImages && highlight.sceneImages.length > 0 ? `
        <div class="scene-images-display">
            <h4>场景图</h4>
            <div class="scene-images-grid">
                ${highlight.sceneImages.map(si => `
                    <div class="scene-image-card">
                        <div class="scene-image-actions">
                            <button class="scene-image-edit-btn" onclick="openSceneImageEdit(${si.id}, ${highlight.id})">
                                <i class="fas fa-edit"></i> 编辑
                            </button>
                        </div>
                        <div class="scene-image-image">
                            <img src="${si.imageUrl}" alt="场景图" data-image-src="${si.imageUrl}" onerror="this.style.display='none'" />
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : `
        <div class="scene-images-display">
            <h4>场景图</h4>
            <div class="scene-images-grid">
                <div style="padding: 2rem; text-align: center; color: #6c757d;">
                    <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    <p>暂无场景图</p>
                    <p style="font-size: 0.9rem;">点击"编辑"按钮添加场景图</p>
                </div>
            </div>
        </div>
        `}
        
        <div class="modal-footer">
            <button class="btn btn-primary" onclick="showEditHighlightModal(${highlight.id})">
                <i class="fas fa-edit"></i> 编辑
            </button>
            <button class="btn btn-danger" onclick="deleteHighlight(${highlight.id})">
                <i class="fas fa-trash"></i> 删除
            </button>
            <button class="btn btn-secondary" onclick="closeHighlightModal()">
                关闭
            </button>
        </div>
    `;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭产品卖点模态框
function closeHighlightModal() {
    const modal = document.getElementById('highlightModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
}

// 显示新增产品卖点模态框
function showAddHighlightModal() {
    const modal = document.getElementById('addHighlightModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
    
    // 确保材质选择框被填充
    populateMaterialSelects();
}

// 关闭新增产品卖点模态框
function closeAddHighlightModal() {
    const modal = document.getElementById('addHighlightModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    // 清空表单
    const form = document.getElementById('addHighlightForm');
    if (form) {
        form.reset();
    }
    
    // 清空图片预览
    const preview = document.getElementById('addHighlightImagePreview');
    const previewImg = document.getElementById('addHighlightImagePreviewImg');
    if (preview && previewImg) {
        previewImg.src = '';
        preview.style.display = 'none';
    }
    
    // 隐藏材质字段
    const materialFields = document.getElementById('addMaterialFields');
    if (materialFields) {
        materialFields.style.display = 'none';
    }
    
    // 清空设计点表单
    clearDesignPointsForm('add');
    
    // 清空场景图表单
    clearSceneImagesForm('add');
}

// 显示编辑产品卖点模态框
function showEditHighlightModal(highlightId) {
    const highlight = highlights.find(h => h.id === highlightId);
    if (!highlight) return;
    
    // 关闭详情模态框
    closeHighlightModal();
    
    // 确保材质选择框被填充
    populateMaterialSelects();
    
    // 填充编辑表单
    document.getElementById('editHighlightId').value = highlight.id;
    document.getElementById('editHighlightName').value = highlight.name;
    document.getElementById('editHighlightParentModel').value = highlight.parentModel;
    document.getElementById('editHighlightCategory').value = highlight.category;
    document.getElementById('editHighlightDescription').value = highlight.description || '';
    document.getElementById('editHighlightFeatures').value = highlight.features.join(', ');
    // 填充参考链接
    const referenceLinks = highlight.referenceLinks || ['', '', ''];
    document.getElementById('editHighlightReferenceLink1').value = referenceLinks[0] || '';
    document.getElementById('editHighlightReferenceLink2').value = referenceLinks[1] || '';
    document.getElementById('editHighlightReferenceLink3').value = referenceLinks[2] || '';
    document.getElementById('editHighlightImageUrl').value = highlight.imageUrl || '';
    
    // 处理材质字段显示和填充
    const materialFields = document.getElementById('editMaterialFields');
    const tableMaterialFields = document.getElementById('editTableMaterialFields');
    
    if (materialFields && tableMaterialFields) {
        if (highlight.category === 'seating') {
            materialFields.style.display = 'block';
            tableMaterialFields.style.display = 'none';
            document.getElementById('editHighlightFabricMaterial').value = highlight.fabricMaterial || '';
            document.getElementById('editHighlightLegMaterial').value = highlight.legMaterial || '';
            document.getElementById('editHighlightSpongeMaterial').value = highlight.spongeMaterial || '';
            document.getElementById('editHighlightFrameMaterial').value = highlight.frameMaterial || '';
            document.getElementById('editHighlightFunction').value = highlight.function || '';
        } else if (highlight.category === 'table') {
            materialFields.style.display = 'none';
            tableMaterialFields.style.display = 'block';
            document.getElementById('editHighlightPanelMaterial').value = highlight.panelMaterial || '';
            document.getElementById('editHighlightTableLegMaterial').value = highlight.legMaterial || '';
            document.getElementById('editHighlightTableFunction').value = highlight.function || '';
        } else {
            materialFields.style.display = 'none';
            tableMaterialFields.style.display = 'none';
        }
    }
    
    // 重置文件输入和预览
    document.getElementById('editHighlightImageFile').value = '';
    const preview = document.getElementById('editHighlightImagePreview');
    const previewImg = document.getElementById('editHighlightImagePreviewImg');
    if (preview && previewImg) {
        previewImg.src = '';
        preview.style.display = 'none';
    }
    
    // 渲染设计点到编辑表单
    renderDesignPointsToForm('edit', highlight.designPoints || []);
    
    // 渲染场景图到编辑表单
    renderSceneImagesToForm('edit', highlight.sceneImages || []);
    
    // 显示编辑模态框
    const editModal = document.getElementById('editHighlightModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    
    editModal.classList.add('show');
    editModal.style.display = 'flex';
    editModal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭编辑产品卖点模态框
function closeEditHighlightModal() {
    const editModal = document.getElementById('editHighlightModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    
    editModal.classList.remove('show');
    editModal.style.display = 'none';
    editModal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    // 清空图片预览
    const preview = document.getElementById('editHighlightImagePreview');
    const previewImg = document.getElementById('editHighlightImagePreviewImg');
    if (preview && previewImg) {
        previewImg.src = '';
        preview.style.display = 'none';
    }
}

// 处理新增产品卖点
function handleAddHighlight(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('addHighlightName');
    const parentModelInput = document.getElementById('addHighlightParentModel');
    const categoryInput = document.getElementById('addHighlightCategory');
    const descriptionInput = document.getElementById('addHighlightDescription');
    const featuresInput = document.getElementById('addHighlightFeatures');
    const imgInput = document.getElementById('addHighlightImageUrl');
    const imgFileInput = document.getElementById('addHighlightImageFile');

    const name = nameInput.value.trim();
    const parentModel = parentModelInput.value.trim();
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();
    const featuresStr = featuresInput.value.trim();
    
    // 获取参考链接
    const referenceLinks = [
        document.getElementById('addHighlightReferenceLink1').value.trim(),
        document.getElementById('addHighlightReferenceLink2').value.trim(),
        document.getElementById('addHighlightReferenceLink3').value.trim()
    ];
    const hasLocalImage = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgInput.value.trim();

    if (!name) {
        alert('请填写产品名称');
        nameInput.focus();
        return;
    }
    if (!parentModel) {
        alert('请填写父款型号');
        parentModelInput.focus();
        return;
    }
    if (!category) {
        alert('请选择产品分类');
        categoryInput.focus();
        return;
    }
    if (!description) {
        alert('请填写卖点描述');
        descriptionInput.focus();
        return;
    }

    const finalizeAdd = (finalImageUrl) => {
        // 获取设计点数据
        const designPoints = getDesignPointsFromForm('add');
        
        // 处理设计点的本地图片
        const processedDesignPoints = designPoints.map(dp => {
            if (dp.hasLocalImage && dp.localImageFile) {
                // 将本地图片转换为base64
                const reader = new FileReader();
                reader.readAsDataURL(dp.localImageFile);
                // 这里简化处理，实际应该用Promise处理异步
                // 暂时先保存URL，后续可以改进
            }
            return {
                id: dp.id,
                title: dp.title,
                description: dp.description,
                imageUrl: dp.imageUrl
            };
        });
        
        // 获取场景图数据
        const sceneImages = getSceneImagesFromForm('add');
        
        // 处理场景图的本地图片
        const processedSceneImages = sceneImages.map(si => {
            if (si.hasLocalImage && si.localImageFile) {
                // 将本地图片转换为base64
                const reader = new FileReader();
                reader.readAsDataURL(si.localImageFile);
                // 这里简化处理，实际应该用Promise处理异步
                // 暂时先保存URL，后续可以改进
            }
            return {
                id: si.id,
                imageUrl: si.imageUrl
            };
        });
        
        // 构建基础产品信息
        const newHighlight = {
            id: Date.now(),
            name: name,
            parentModel: parentModel,
            category: category,
            description: description,
            features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [],
            referenceLinks: referenceLinks,
            imageUrl: finalImageUrl,
            designPoints: processedDesignPoints,
            sceneImages: processedSceneImages
        };
        
        // 根据分类添加不同的材质信息
        if (category === 'seating') {
            const fabricMaterial = document.getElementById('addHighlightFabricMaterial').value.trim();
            const legMaterial = document.getElementById('addHighlightLegMaterial').value.trim();
            const spongeMaterial = document.getElementById('addHighlightSpongeMaterial').value.trim();
            const frameMaterial = document.getElementById('addHighlightFrameMaterial').value.trim();
            const functionValue = document.getElementById('addHighlightFunction').value.trim();
            
            newHighlight.fabricMaterial = fabricMaterial;
            newHighlight.legMaterial = legMaterial;
            newHighlight.spongeMaterial = spongeMaterial;
            newHighlight.frameMaterial = frameMaterial;
            newHighlight.function = functionValue;
        } else if (category === 'table') {
            const panelMaterial = document.getElementById('addHighlightPanelMaterial').value.trim();
            const legMaterial = document.getElementById('addHighlightTableLegMaterial').value.trim();
            const functionValue = document.getElementById('addHighlightTableFunction').value.trim();
            
            newHighlight.panelMaterial = panelMaterial;
            newHighlight.legMaterial = legMaterial;
            newHighlight.function = functionValue;
        }
        
        highlights = [newHighlight, ...highlights];
        saveHighlights();
        applyHighlightFilters();
        renderHighlights();
        closeAddHighlightModal();
        alert('新增成功');
        
        // 清空表单
        nameInput.value = '';
        parentModelInput.value = '';
        categoryInput.value = '';
        descriptionInput.value = '';
        featuresInput.value = '';
        document.getElementById('addHighlightReferenceLink1').value = '';
        document.getElementById('addHighlightReferenceLink2').value = '';
        document.getElementById('addHighlightReferenceLink3').value = '';
        imgInput.value = '';
        if (imgFileInput) {
            imgFileInput.value = '';
            const preview = document.getElementById('addHighlightImagePreview');
            const previewImg = document.getElementById('addHighlightImagePreviewImg');
            if (preview && previewImg) {
                previewImg.src = '';
                preview.style.display = 'none';
            }
        }
        
        // 清空材质字段
        const materialFields = document.getElementById('addMaterialFields');
        const tableMaterialFields = document.getElementById('addTableMaterialFields');
        
        if (materialFields) {
            materialFields.style.display = 'none';
            document.getElementById('addHighlightFabricMaterial').value = '';
            document.getElementById('addHighlightLegMaterial').value = '';
            document.getElementById('addHighlightSpongeMaterial').value = '';
            document.getElementById('addHighlightFrameMaterial').value = '';
            document.getElementById('addHighlightFunction').value = '';
        }
        
        if (tableMaterialFields) {
            tableMaterialFields.style.display = 'none';
            document.getElementById('addHighlightPanelMaterial').value = '';
            document.getElementById('addHighlightTableLegMaterial').value = '';
            document.getElementById('addHighlightTableFunction').value = '';
        }
        
        // 清空设计点表单
        clearDesignPointsForm('add');
        
        // 清空场景图表单
        clearSceneImagesForm('add');
    };

    if (hasLocalImage) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => finalizeAdd(ev.target.result);
        reader.onerror = () => finalizeAdd('');
        reader.readAsDataURL(file);
        return;
    } else {
        finalizeAdd(imageUrlText);
    }
}

// 处理编辑产品卖点
function handleEditHighlight(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById('editHighlightId');
    const nameInput = document.getElementById('editHighlightName');
    const parentModelInput = document.getElementById('editHighlightParentModel');
    const categoryInput = document.getElementById('editHighlightCategory');
    const descriptionInput = document.getElementById('editHighlightDescription');
    const featuresInput = document.getElementById('editHighlightFeatures');
    const imgInput = document.getElementById('editHighlightImageUrl');
    const imgFileInput = document.getElementById('editHighlightImageFile');

    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const parentModel = parentModelInput.value.trim();
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();
    const featuresStr = featuresInput.value.trim();
    
    // 获取参考链接
    const referenceLinks = [
        document.getElementById('editHighlightReferenceLink1').value.trim(),
        document.getElementById('editHighlightReferenceLink2').value.trim(),
        document.getElementById('editHighlightReferenceLink3').value.trim()
    ];
    const hasLocalImage = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgInput.value.trim();

    if (!name) {
        alert('请填写产品名称');
        nameInput.focus();
        return;
    }
    if (!parentModel) {
        alert('请填写父款型号');
        parentModelInput.focus();
        return;
    }
    if (!category) {
        alert('请选择产品分类');
        categoryInput.focus();
        return;
    }
    if (!description) {
        alert('请填写卖点描述');
        descriptionInput.focus();
        return;
    }

    const finalizeEdit = (finalImageUrl) => {
        // 获取设计点数据
        const designPoints = getDesignPointsFromForm('edit');
        
        // 处理设计点的本地图片
        const processedDesignPoints = designPoints.map(dp => {
            if (dp.hasLocalImage && dp.localImageFile) {
                // 将本地图片转换为base64
                const reader = new FileReader();
                reader.readAsDataURL(dp.localImageFile);
                // 这里简化处理，实际应该用Promise处理异步
                // 暂时先保存URL，后续可以改进
            }
            return {
                id: dp.id,
                title: dp.title,
                description: dp.description,
                imageUrl: dp.imageUrl
            };
        });
        
        // 获取场景图数据
        const sceneImages = getSceneImagesFromForm('edit');
        
        // 处理场景图的本地图片
        const processedSceneImages = sceneImages.map(si => {
            if (si.hasLocalImage && si.localImageFile) {
                // 将本地图片转换为base64
                const reader = new FileReader();
                reader.readAsDataURL(si.localImageFile);
                // 这里简化处理，实际应该用Promise处理异步
                // 暂时先保存URL，后续可以改进
            }
            return {
                id: si.id,
                imageUrl: si.imageUrl
            };
        });
        
        // 更新产品卖点数据
        const highlightIndex = highlights.findIndex(h => h.id === id);
        if (highlightIndex !== -1) {
            // 构建基础更新数据
            const updateData = {
                ...highlights[highlightIndex],
                name: name,
                parentModel: parentModel,
                category: category,
                description: description,
                features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [],
                referenceLinks: referenceLinks,
                imageUrl: finalImageUrl,
                designPoints: processedDesignPoints,
                sceneImages: processedSceneImages
            };
            
        // 根据分类添加不同的材质信息
        if (category === 'seating') {
                const fabricMaterial = document.getElementById('editHighlightFabricMaterial').value.trim();
                const legMaterial = document.getElementById('editHighlightLegMaterial').value.trim();
                const spongeMaterial = document.getElementById('editHighlightSpongeMaterial').value.trim();
                const frameMaterial = document.getElementById('editHighlightFrameMaterial').value.trim();
                const functionValue = document.getElementById('editHighlightFunction').value.trim();
                
                updateData.fabricMaterial = fabricMaterial;
                updateData.legMaterial = legMaterial;
                updateData.spongeMaterial = spongeMaterial;
                updateData.frameMaterial = frameMaterial;
                updateData.function = functionValue;
                
                // 删除桌子专用字段
                delete updateData.panelMaterial;
            } else if (category === 'table') {
                const panelMaterial = document.getElementById('editHighlightPanelMaterial').value.trim();
                const legMaterial = document.getElementById('editHighlightTableLegMaterial').value.trim();
                const functionValue = document.getElementById('editHighlightTableFunction').value.trim();
                
                updateData.panelMaterial = panelMaterial;
                updateData.legMaterial = legMaterial;
                updateData.function = functionValue;
                
                // 删除沙发/椅子专用字段
                delete updateData.fabricMaterial;
                delete updateData.spongeMaterial;
                delete updateData.frameMaterial;
            } else {
                // 其他分类，删除所有材质字段
                delete updateData.fabricMaterial;
                delete updateData.legMaterial;
                delete updateData.spongeMaterial;
                delete updateData.frameMaterial;
                delete updateData.panelMaterial;
                delete updateData.function;
            }
            
            highlights[highlightIndex] = updateData;
            
            saveHighlights();
            applyHighlightFilters();
            renderHighlights();
            closeEditHighlightModal();
            alert('修改成功');
        }
    };

    if (hasLocalImage) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => finalizeEdit(ev.target.result);
        reader.onerror = () => finalizeEdit('');
        reader.readAsDataURL(file);
        return;
    } else {
        finalizeEdit(imageUrlText);
    }
}

// 删除产品卖点
function deleteHighlight(highlightId) {
    const highlight = highlights.find(h => h.id === highlightId);
    if (!highlight) return;
    const confirmDelete = confirm(`确定删除 "${highlight.name}" 吗？该操作不可恢复。`);
    if (!confirmDelete) return;

    highlights = highlights.filter(h => h.id !== highlightId);
    saveHighlights();
    applyHighlightFilters();
    renderHighlights();
    closeHighlightModal();
}

// 显示产品卖点上传模态框
function showHighlightUploadModal() {
    const modal = document.getElementById('highlightUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

// 关闭产品卖点上传模态框
function closeHighlightUploadModal() {
    const modal = document.getElementById('highlightUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
    
    pendingHighlightExcelFile = null;
}

// 保存产品卖点到本地存储
function saveHighlights() {
    try { localStorage.setItem('highlights_v1', JSON.stringify(highlights)); } catch (_) {}
}

// ==================== 设计点管理功能 ====================

// 设计点计数器（用于生成唯一ID）
let designPointIdCounter = 1000;

// 添加设计点
function addDesignPoint(type) {
    const containerId = type === 'add' ? 'addDesignPointsList' : 'editDesignPointsList';
    const container = document.getElementById(containerId);
    
    const designPointId = designPointIdCounter++;
    
    const designPointHtml = `
        <div class="design-point-item" data-id="${designPointId}">
            <div class="design-point-header">
                <span class="design-point-title">设计点 ${designPointId}</span>
                <button type="button" class="design-point-remove" onclick="removeDesignPoint(${designPointId})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="design-point-form">
                <div class="form-group">
                    <label for="designPointTitle_${designPointId}">设计点标题</label>
                    <input type="text" id="designPointTitle_${designPointId}" placeholder="例如：实木框架设计" required>
                </div>
                <div class="form-group">
                    <label for="designPointDescription_${designPointId}">设计点描述</label>
                    <textarea id="designPointDescription_${designPointId}" placeholder="详细描述这个设计点的特点和优势..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="designPointImageUrl_${designPointId}">设计点图片URL（可选）</label>
                    <input type="url" id="designPointImageUrl_${designPointId}" placeholder="https://...">
                </div>
                <div class="form-group">
                    <label for="designPointImageFile_${designPointId}">本地设计点图片（可选）</label>
                    <input type="file" id="designPointImageFile_${designPointId}" accept="image/*" onchange="previewDesignPointImage(${designPointId})">
                    <div class="design-point-image-preview" id="designPointPreview_${designPointId}">
                        <img id="designPointPreviewImg_${designPointId}" alt="预览" />
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', designPointHtml);
}

// 删除设计点
function removeDesignPoint(designPointId) {
    const item = document.querySelector(`[data-id="${designPointId}"]`);
    if (item) {
        item.remove();
    }
}

// 预览设计点图片
function previewDesignPointImage(designPointId) {
    const fileInput = document.getElementById(`designPointImageFile_${designPointId}`);
    const preview = document.getElementById(`designPointPreview_${designPointId}`);
    const previewImg = document.getElementById(`designPointPreviewImg_${designPointId}`);
    
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
        previewImg.src = '';
    }
}

// 获取表单中的设计点数据
function getDesignPointsFromForm(type) {
    const containerId = type === 'add' ? 'addDesignPointsList' : 'editDesignPointsList';
    const container = document.getElementById(containerId);
    const designPointItems = container.querySelectorAll('.design-point-item');
    
    const designPoints = [];
    designPointItems.forEach(item => {
        const id = parseInt(item.getAttribute('data-id'));
        const title = document.getElementById(`designPointTitle_${id}`).value.trim();
        const description = document.getElementById(`designPointDescription_${id}`).value.trim();
        const imageUrl = document.getElementById(`designPointImageUrl_${id}`).value.trim();
        const imageFile = document.getElementById(`designPointImageFile_${id}`);
        
        if (title && description) {
            const designPoint = {
                id: id,
                title: title,
                description: description,
                imageUrl: imageUrl
            };
            
            // 如果有本地图片，需要处理
            if (imageFile && imageFile.files && imageFile.files[0]) {
                // 这里暂时保存文件信息，实际保存时会在主表单提交时处理
                designPoint.hasLocalImage = true;
                designPoint.localImageFile = imageFile.files[0];
            }
            
            designPoints.push(designPoint);
        }
    });
    
    return designPoints;
}

// 清空设计点表单
function clearDesignPointsForm(type) {
    const containerId = type === 'add' ? 'addDesignPointsList' : 'editDesignPointsList';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
}

// 渲染设计点到表单
function renderDesignPointsToForm(type, designPoints) {
    const containerId = type === 'add' ? 'addDesignPointsList' : 'editDesignPointsList';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (designPoints && designPoints.length > 0) {
        designPoints.forEach(dp => {
            const designPointId = dp.id;
            designPointIdCounter = Math.max(designPointIdCounter, designPointId + 1);
            
            const designPointHtml = `
                <div class="design-point-item" data-id="${designPointId}">
                    <div class="design-point-header">
                        <span class="design-point-title">${dp.title}</span>
                        <button type="button" class="design-point-remove" onclick="removeDesignPoint(${designPointId})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="design-point-form">
                        <div class="form-group">
                            <label for="designPointTitle_${designPointId}">设计点标题</label>
                            <input type="text" id="designPointTitle_${designPointId}" value="${dp.title}" placeholder="例如：实木框架设计" required>
                        </div>
                        <div class="form-group">
                            <label for="designPointDescription_${designPointId}">设计点描述</label>
                            <textarea id="designPointDescription_${designPointId}" placeholder="详细描述这个设计点的特点和优势..." required>${dp.description}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="designPointImageUrl_${designPointId}">设计点图片URL（可选）</label>
                            <input type="url" id="designPointImageUrl_${designPointId}" value="${dp.imageUrl || ''}" placeholder="https://...">
                        </div>
                        <div class="form-group">
                            <label for="designPointImageFile_${designPointId}">本地设计点图片（可选）</label>
                            <input type="file" id="designPointImageFile_${designPointId}" accept="image/*" onchange="previewDesignPointImage(${designPointId})">
                            <div class="design-point-image-preview" id="designPointPreview_${designPointId}" ${dp.imageUrl ? 'style="display:block;"' : 'style="display:none;"'}>
                                <img id="designPointPreviewImg_${designPointId}" src="${dp.imageUrl || ''}" alt="预览" />
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', designPointHtml);
        });
    }
}

// ==================== 设计点独立编辑功能 ====================

// 打开设计点编辑模态框
function openDesignPointEdit(designPointId, highlightId) {
    const highlight = highlights.find(h => h.id === highlightId);
    if (!highlight || !highlight.designPoints) return;
    
    const designPoint = highlight.designPoints.find(dp => dp.id === designPointId);
    if (!designPoint) return;
    
    // 填充表单数据
    document.getElementById('editDesignPointId').value = designPointId;
    document.getElementById('editDesignPointHighlightId').value = highlightId;
    document.getElementById('editDesignPointTitle').value = designPoint.title;
    document.getElementById('editDesignPointDescription').value = designPoint.description;
    document.getElementById('editDesignPointImageUrl').value = designPoint.imageUrl || '';
    
    // 重置文件输入和预览
    document.getElementById('editDesignPointImageFile').value = '';
    const preview = document.getElementById('editDesignPointImagePreview');
    const previewImg = document.getElementById('editDesignPointImagePreviewImg');
    if (preview && previewImg) {
        if (designPoint.imageUrl) {
            previewImg.src = designPoint.imageUrl;
            preview.style.display = 'block';
        } else {
            previewImg.src = '';
            preview.style.display = 'none';
        }
    }
    
    // 显示模态框
    document.getElementById('designPointEditModal').classList.add('show');
}

// 关闭设计点编辑模态框
function closeDesignPointEditModal() {
    document.getElementById('designPointEditModal').classList.remove('show');
}

// 处理设计点编辑表单提交
function handleDesignPointEdit(e) {
    e.preventDefault();
    
    const designPointId = parseInt(document.getElementById('editDesignPointId').value);
    const highlightId = parseInt(document.getElementById('editDesignPointHighlightId').value);
    const title = document.getElementById('editDesignPointTitle').value.trim();
    const description = document.getElementById('editDesignPointDescription').value.trim();
    const imageUrl = document.getElementById('editDesignPointImageUrl').value.trim();
    const imageFile = document.getElementById('editDesignPointImageFile');
    
    // 验证必填字段
    if (!title) {
        alert('请填写设计点标题');
        document.getElementById('editDesignPointTitle').focus();
        return;
    }
    
    if (!description) {
        alert('请填写设计点描述');
        document.getElementById('editDesignPointDescription').focus();
        return;
    }
    
    // 处理图片
    const processImage = (finalImageUrl) => {
        // 找到对应的产品和设计点
        const highlightIndex = highlights.findIndex(h => h.id === highlightId);
        if (highlightIndex === -1) return;
        
        const designPointIndex = highlights[highlightIndex].designPoints.findIndex(dp => dp.id === designPointId);
        if (designPointIndex === -1) return;
        
        // 更新设计点数据
        highlights[highlightIndex].designPoints[designPointIndex] = {
            ...highlights[highlightIndex].designPoints[designPointIndex],
            title: title,
            description: description,
            imageUrl: finalImageUrl
        };
        
        // 保存数据并刷新
        saveHighlights();
        applyHighlightFilters();
        renderHighlights();
        closeDesignPointEditModal();
        
        // 如果当前显示的是这个产品的详情，需要重新渲染详情
        const currentModal = document.getElementById('highlightModal');
        if (currentModal.classList.contains('show')) {
            const currentHighlightId = parseInt(currentModal.querySelector('.modal-body').getAttribute('data-highlight-id'));
            if (currentHighlightId === highlightId) {
                showHighlightDetail(highlightId);
            }
        }
        
        alert('设计点修改成功');
    };
    
    // 检查是否有本地图片
    if (imageFile && imageFile.files && imageFile.files[0]) {
        const file = imageFile.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            processImage(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        processImage(imageUrl);
    }
}

// 删除设计点
function deleteDesignPoint() {
    const designPointId = parseInt(document.getElementById('editDesignPointId').value);
    const highlightId = parseInt(document.getElementById('editDesignPointHighlightId').value);
    
    if (!confirm('确定要删除这个设计点吗？删除后无法恢复。')) {
        return;
    }
    
    // 找到对应的产品和设计点
    const highlightIndex = highlights.findIndex(h => h.id === highlightId);
    if (highlightIndex === -1) return;
    
    const designPointIndex = highlights[highlightIndex].designPoints.findIndex(dp => dp.id === designPointId);
    if (designPointIndex === -1) return;
    
    // 删除设计点
    highlights[highlightIndex].designPoints.splice(designPointIndex, 1);
    
    // 保存数据并刷新
    saveHighlights();
    applyHighlightFilters();
    renderHighlights();
    closeDesignPointEditModal();
    
    // 如果当前显示的是这个产品的详情，需要重新渲染详情
    const currentModal = document.getElementById('highlightModal');
    if (currentModal.classList.contains('show')) {
        const currentHighlightId = parseInt(currentModal.querySelector('.modal-body').getAttribute('data-highlight-id'));
        if (currentHighlightId === highlightId) {
            showHighlightDetail(highlightId);
        }
    }
    
    alert('设计点删除成功');
}

// ==================== 场景图管理功能 ====================

// 场景图计数器（用于生成唯一ID）
let sceneImageIdCounter = 2000;

// 添加场景图
function addSceneImage(type) {
    const containerId = type === 'add' ? 'addSceneImagesList' : 'editSceneImagesList';
    const container = document.getElementById(containerId);
    
    const sceneImageId = sceneImageIdCounter++;
    
    const sceneImageHtml = `
        <div class="scene-image-item" data-id="${sceneImageId}">
            <div class="scene-image-header">
                <span class="scene-image-title">场景图 ${sceneImageId}</span>
                <button type="button" class="scene-image-remove" onclick="removeSceneImage(${sceneImageId})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="scene-image-form">
                <div class="form-group">
                    <label for="sceneImageUrl_${sceneImageId}">场景图URL（可选）</label>
                    <input type="url" id="sceneImageUrl_${sceneImageId}" placeholder="https://..." oninput="previewSceneImage(${sceneImageId})">
                    <small class="form-help">填写URL或选择本地图片，二选一即可</small>
                </div>
                <div class="form-group">
                    <label for="sceneImageFile_${sceneImageId}">本地场景图（可选）</label>
                    <input type="file" id="sceneImageFile_${sceneImageId}" accept="image/*" onchange="previewSceneImage(${sceneImageId})">
                    <div class="scene-image-preview" id="sceneImagePreview_${sceneImageId}">
                        <img id="sceneImagePreviewImg_${sceneImageId}" alt="预览" />
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', sceneImageHtml);
}

// 删除场景图
function removeSceneImage(sceneImageId) {
    const item = document.querySelector(`[data-id="${sceneImageId}"]`);
    if (item) {
        item.remove();
    }
}

// 预览场景图
function previewSceneImage(sceneImageId) {
    const fileInput = document.getElementById(`sceneImageFile_${sceneImageId}`);
    const preview = document.getElementById(`sceneImagePreview_${sceneImageId}`);
    const previewImg = document.getElementById(`sceneImagePreviewImg_${sceneImageId}`);
    
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        // 如果没有选择本地文件，检查是否有URL
        const urlInput = document.getElementById(`sceneImageUrl_${sceneImageId}`);
        const imageUrl = urlInput ? urlInput.value.trim() : '';
        
        if (imageUrl) {
            previewImg.src = imageUrl;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
            previewImg.src = '';
        }
    }
}

// 获取表单中的场景图数据
function getSceneImagesFromForm(type) {
    const containerId = type === 'add' ? 'addSceneImagesList' : 'editSceneImagesList';
    const container = document.getElementById(containerId);
    const sceneImageItems = container.querySelectorAll('.scene-image-item');
    
    const sceneImages = [];
    sceneImageItems.forEach(item => {
        const id = parseInt(item.getAttribute('data-id'));
        const imageUrl = document.getElementById(`sceneImageUrl_${id}`).value.trim();
        const imageFile = document.getElementById(`sceneImageFile_${id}`);
        
        // 检查是否有URL或本地文件
        const hasUrl = imageUrl && imageUrl.length > 0;
        const hasFile = imageFile && imageFile.files && imageFile.files[0];
        
        if (hasUrl || hasFile) {
            const sceneImage = {
                id: id,
                imageUrl: imageUrl // 暂时保存URL，如果有本地文件会在处理时覆盖
            };
            
            // 如果有本地图片，标记需要处理
            if (hasFile) {
                sceneImage.hasLocalImage = true;
                sceneImage.localImageFile = imageFile.files[0];
            }
            
            sceneImages.push(sceneImage);
        }
    });
    
    return sceneImages;
}

// 清空场景图表单
function clearSceneImagesForm(type) {
    const containerId = type === 'add' ? 'addSceneImagesList' : 'editSceneImagesList';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
}

// 渲染场景图到表单
function renderSceneImagesToForm(type, sceneImages) {
    const containerId = type === 'add' ? 'addSceneImagesList' : 'editSceneImagesList';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (sceneImages && sceneImages.length > 0) {
        sceneImages.forEach(si => {
            const sceneImageId = si.id;
            sceneImageIdCounter = Math.max(sceneImageIdCounter, sceneImageId + 1);
            
            const sceneImageHtml = `
                <div class="scene-image-item" data-id="${sceneImageId}">
                    <div class="scene-image-header">
                        <span class="scene-image-title">场景图 ${sceneImageId}</span>
                        <button type="button" class="scene-image-remove" onclick="removeSceneImage(${sceneImageId})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="scene-image-form">
                        <div class="form-group">
                            <label for="sceneImageUrl_${sceneImageId}">场景图URL（可选）</label>
                            <input type="url" id="sceneImageUrl_${sceneImageId}" value="${si.imageUrl || ''}" placeholder="https://..." oninput="previewSceneImage(${sceneImageId})">
                            <small class="form-help">填写URL或选择本地图片，二选一即可</small>
                        </div>
                        <div class="form-group">
                            <label for="sceneImageFile_${sceneImageId}">本地场景图（可选）</label>
                            <input type="file" id="sceneImageFile_${sceneImageId}" accept="image/*" onchange="previewSceneImage(${sceneImageId})">
                            <div class="scene-image-preview" id="sceneImagePreview_${sceneImageId}" ${si.imageUrl ? 'style="display:block;"' : 'style="display:none;"'}>
                                <img id="sceneImagePreviewImg_${sceneImageId}" src="${si.imageUrl || ''}" alt="预览" />
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', sceneImageHtml);
        });
    }
}

// ==================== 场景图独立编辑功能 ====================

// 打开场景图编辑模态框
function openSceneImageEdit(sceneImageId, highlightId) {
    const highlight = highlights.find(h => h.id === highlightId);
    if (!highlight || !highlight.sceneImages) return;
    
    const sceneImage = highlight.sceneImages.find(si => si.id === sceneImageId);
    if (!sceneImage) return;
    
    // 填充表单数据
    document.getElementById('editSceneImageId').value = sceneImageId;
    document.getElementById('editSceneImageHighlightId').value = highlightId;
    document.getElementById('editSceneImageUrl').value = sceneImage.imageUrl;
    
    // 重置文件输入
    document.getElementById('editSceneImageFile').value = '';
    
    // 显示模态框
    document.getElementById('sceneImageEditModal').classList.add('show');
    
    // 调用预览函数以显示当前图片
    previewEditSceneImage();
}

// 关闭场景图编辑模态框
function closeSceneImageEditModal() {
    document.getElementById('sceneImageEditModal').classList.remove('show');
}

// 处理场景图编辑表单提交
function handleSceneImageEdit(e) {
    e.preventDefault();
    
    const sceneImageId = parseInt(document.getElementById('editSceneImageId').value);
    const highlightId = parseInt(document.getElementById('editSceneImageHighlightId').value);
    const imageUrl = document.getElementById('editSceneImageUrl').value.trim();
    const imageFile = document.getElementById('editSceneImageFile');
    
    // 验证必填字段 - URL和本地文件二选一
    const hasUrl = imageUrl && imageUrl.length > 0;
    const hasFile = imageFile && imageFile.files && imageFile.files[0];
    
    if (!hasUrl && !hasFile) {
        alert('请填写场景图URL或选择本地图片文件');
        if (!hasUrl) {
            document.getElementById('editSceneImageUrl').focus();
        }
        return;
    }
    
    // 处理图片
    const processImage = (finalImageUrl) => {
        // 找到对应的产品和场景图
        const highlightIndex = highlights.findIndex(h => h.id === highlightId);
        if (highlightIndex === -1) return;
        
        const sceneImageIndex = highlights[highlightIndex].sceneImages.findIndex(si => si.id === sceneImageId);
        if (sceneImageIndex === -1) return;
        
        // 更新场景图数据
        highlights[highlightIndex].sceneImages[sceneImageIndex] = {
            ...highlights[highlightIndex].sceneImages[sceneImageIndex],
            imageUrl: finalImageUrl
        };
        
        // 保存数据并刷新
        saveHighlights();
        applyHighlightFilters();
        renderHighlights();
        closeSceneImageEditModal();
        
        // 如果当前显示的是这个产品的详情，需要重新渲染详情
        const currentModal = document.getElementById('highlightModal');
        if (currentModal.classList.contains('show')) {
            const currentHighlightId = parseInt(currentModal.querySelector('.modal-body').getAttribute('data-highlight-id'));
            if (currentHighlightId === highlightId) {
                showHighlightDetail(highlightId);
            }
        }
        
        alert('场景图修改成功');
    };
    
    // 检查是否有本地图片，优先使用本地文件
    if (imageFile && imageFile.files && imageFile.files[0]) {
        const file = imageFile.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            processImage(e.target.result);
        };
        reader.readAsDataURL(file);
    } else if (imageUrl) {
        processImage(imageUrl);
    }
}

// 删除场景图
function deleteSceneImage() {
    const sceneImageId = parseInt(document.getElementById('editSceneImageId').value);
    const highlightId = parseInt(document.getElementById('editSceneImageHighlightId').value);
    
    if (!confirm('确定要删除这个场景图吗？删除后无法恢复。')) {
        return;
    }
    
    // 找到对应的产品和场景图
    const highlightIndex = highlights.findIndex(h => h.id === highlightId);
    if (highlightIndex === -1) return;
    
    const sceneImageIndex = highlights[highlightIndex].sceneImages.findIndex(si => si.id === sceneImageId);
    if (sceneImageIndex === -1) return;
    
    // 删除场景图
    highlights[highlightIndex].sceneImages.splice(sceneImageIndex, 1);
    
    // 保存数据并刷新
    saveHighlights();
    applyHighlightFilters();
    renderHighlights();
    closeSceneImageEditModal();
    
    // 如果当前显示的是这个产品的详情，需要重新渲染详情
    const currentModal = document.getElementById('highlightModal');
    if (currentModal.classList.contains('show')) {
        const currentHighlightId = parseInt(currentModal.querySelector('.modal-body').getAttribute('data-highlight-id'));
        if (currentHighlightId === highlightId) {
            showHighlightDetail(highlightId);
        }
    }
    
    alert('场景图删除成功');
}

// 测试函数：为第一个产品添加场景图数据
function addTestSceneImages() {
    if (highlights.length > 0) {
        const firstHighlight = highlights[0];
        if (!firstHighlight.sceneImages) {
            firstHighlight.sceneImages = [];
        }
        
        firstHighlight.sceneImages = [
            {
                id: 1,
                imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 2,
                imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
            }
        ];
        
        saveHighlights();
        applyHighlightFilters();
        renderHighlights();
        
        console.log('已为第一个产品添加测试场景图数据:', firstHighlight.sceneImages);
        alert('已添加测试场景图数据，请刷新页面查看');
    }
}

// 将测试函数添加到全局作用域，方便在控制台调用
window.addTestSceneImages = addTestSceneImages;

// 调试函数：检查localStorage中的面料数据
function checkFabricData() {
    const stored = localStorage.getItem('fabrics_v1');
    console.log('localStorage中的面料数据:', stored);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            console.log('解析后的面料数据条数:', parsed.length);
            console.log('面料数据内容:', parsed);
        } catch (e) {
            console.error('解析面料数据失败:', e);
        }
    } else {
        console.log('localStorage中没有面料数据');
    }
    
    console.log('当前内存中的fabrics数组长度:', fabrics.length);
    console.log('当前内存中的fabrics数组:', fabrics);
}

// 将调试函数添加到全局作用域
window.checkFabricData = checkFabricData;

// 检查localStorage使用情况
function checkStorageUsage() {
    let totalSize = 0;
    const items = [];
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const size = localStorage[key].length;
            totalSize += size;
            items.push({
                key: key,
                size: size,
                sizeKB: (size / 1024).toFixed(2)
            });
        }
    }
    
    console.log('localStorage使用情况:');
    console.log('总大小:', (totalSize / 1024).toFixed(2), 'KB');
    console.log('各项目详情:', items);
    
    // 估算剩余空间（通常限制为5-10MB）
    const estimatedLimit = 5 * 1024 * 1024; // 5MB
    const usagePercent = (totalSize / estimatedLimit * 100).toFixed(2);
    console.log('预估使用率:', usagePercent + '%');
    
    if (totalSize > estimatedLimit * 0.8) {
        console.warn('⚠️ 存储空间使用率较高，建议清理数据');
    }
    
    return { totalSize, items, usagePercent };
}

// 清理所有blob URL图片数据
function clearAllBlobImages() {
    let cleanedCount = 0;
    
    // 清理面料数据
    fabrics = fabrics.map(fabric => {
        if (fabric.imageUrl && fabric.imageUrl.startsWith('blob:')) {
            cleanedCount++;
            return { ...fabric, imageUrl: '' };
        }
        return fabric;
    });
    
    // 清理材质数据
    materials = materials.map(material => {
        if (material.imageUrl && material.imageUrl.startsWith('blob:')) {
            cleanedCount++;
            return { ...material, imageUrl: '' };
        }
        return material;
    });
    
    // 保存清理后的数据
    saveFabrics();
    saveMaterials();
    
    console.log('已清理', cleanedCount, '个blob图片数据');
    alert(`已清理 ${cleanedCount} 个临时图片数据，释放了存储空间`);
    
    return cleanedCount;
}

// 强制清理localStorage中的所有base64图片数据
function forceCleanBase64Data() {
    try {
        // 获取所有localStorage数据
        const allKeys = Object.keys(localStorage);
        let cleanedKeys = [];
        
        allKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value && value.includes('data:image/')) {
                // 包含base64图片数据的键
                try {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                        // 清理数组中的base64图片
                        const cleaned = parsed.map(item => {
                            if (item && typeof item === 'object' && item.imageUrl && item.imageUrl.startsWith('data:image/')) {
                                return { ...item, imageUrl: '' };
                            }
                            return item;
                        });
                        localStorage.setItem(key, JSON.stringify(cleaned));
                        cleanedKeys.push(key);
                    }
                } catch (e) {
                    // 如果不是JSON，直接删除
                    localStorage.removeItem(key);
                    cleanedKeys.push(key);
                }
            }
        });
        
        console.log('已清理以下键的base64数据:', cleanedKeys);
        alert(`已清理 ${cleanedKeys.length} 个键的base64图片数据`);
        
        // 重新加载页面以应用清理
        location.reload();
        
    } catch (error) {
        console.error('强制清理失败:', error);
        alert('清理失败，请手动清除浏览器缓存');
    }
}

// 修复损坏的数据
function repairCorruptedData() {
    try {
        // 检查fabrics数据
        const fabricsData = localStorage.getItem('fabrics_v1');
        if (fabricsData) {
            const parsed = JSON.parse(fabricsData);
            if (Array.isArray(parsed)) {
                // 过滤掉无效的数据项
                const validFabrics = parsed.filter(item => 
                    item && 
                    typeof item === 'object' && 
                    item.id && 
                    (item.colorCode || item.code || item.name)
                );
                
                if (validFabrics.length !== parsed.length) {
                    console.log(`修复了 ${parsed.length - validFabrics.length} 个损坏的面料数据项`);
                    localStorage.setItem('fabrics_v1', JSON.stringify(validFabrics));
                    fabrics = validFabrics;
                }
            }
        }
        
        // 检查materials数据
        const materialsData = localStorage.getItem('materials_v1');
        if (materialsData) {
            const parsed = JSON.parse(materialsData);
            if (Array.isArray(parsed)) {
                const validMaterials = parsed.filter(item => 
                    item && 
                    typeof item === 'object' && 
                    item.id && 
                    item.name
                );
                
                if (validMaterials.length !== parsed.length) {
                    console.log(`修复了 ${parsed.length - validMaterials.length} 个损坏的材质数据项`);
                    localStorage.setItem('materials_v1', JSON.stringify(validMaterials));
                    materials = validMaterials;
                }
            }
        }
        
        console.log('数据修复完成');
        alert('数据修复完成，页面将重新加载');
        location.reload();
        
    } catch (error) {
        console.error('数据修复失败:', error);
        alert('数据修复失败，请手动清除浏览器缓存');
    }
}

// 调试图片显示问题
function debugImageDisplay() {
    console.log('=== 图片显示调试信息 ===');
    console.log('当前面料数据条数:', fabrics.length);
    
    fabrics.forEach((fabric, index) => {
        console.log(`面料 ${index + 1}:`, {
            id: fabric.id,
            colorCode: fabric.colorCode,
            code: fabric.code,
            name: fabric.name,
            imageUrl: fabric.imageUrl ? `${fabric.imageUrl.substring(0, 50)}...` : '无图片',
            imageUrlType: fabric.imageUrl ? (fabric.imageUrl.startsWith('data:') ? 'base64' : 
                                          fabric.imageUrl.startsWith('blob:') ? 'blob' : 
                                          fabric.imageUrl.startsWith('http') ? 'url' : 'unknown') : 'none'
        });
    });
    
    console.log('上传的图片映射:', Object.keys(uploadedFabricImageMap));
    console.log('=== 调试信息结束 ===');
}

// 强制重新渲染面料数据
function forceRenderFabrics() {
    console.log('强制重新渲染面料数据...');
    applyFabricFilters();
    renderFabrics();
    console.log('渲染完成');
}

// 将工具函数添加到全局作用域
window.checkStorageUsage = checkStorageUsage;
window.clearAllBlobImages = clearAllBlobImages;
window.forceCleanBase64Data = forceCleanBase64Data;
window.repairCorruptedData = repairCorruptedData;
window.debugImageDisplay = debugImageDisplay;
window.forceRenderFabrics = forceRenderFabrics;

// ==================== 产品卖点文件上传功能 ====================

// 处理产品卖点文件上传
function handleHighlightFileUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // 分离Excel文件和图片文件
    const excelFiles = files.filter(file => 
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel' ||
        file.name.toLowerCase().endsWith('.xlsx') ||
        file.name.toLowerCase().endsWith('.xls')
    );
    
    const imageFiles = files.filter(file => 
        file.type.startsWith('image/')
    );
    
    // 处理Excel文件
    if (excelFiles.length > 0) {
        const excelFile = excelFiles[0]; // 只处理第一个Excel文件
        pendingHighlightExcelFile = excelFile;
        processHighlightExcelFile(excelFile);
    }
    
    // 处理图片文件
    if (imageFiles.length > 0) {
        uploadedHighlightImageMap = buildHighlightUploadedImageMap(imageFiles);
        
        // 如果有待处理的Excel文件，现在可以处理了
        if (pendingHighlightExcelFile) {
            processHighlightExcelFile(pendingHighlightExcelFile);
            pendingHighlightExcelFile = null;
        }
    }
    
    // 清空文件输入
    e.target.value = '';
}

// 处理产品卖点Excel文件
function processHighlightExcelFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            const newHighlights = parseHighlightExcelData(jsonData);
            
            if (newHighlights.length > 0) {
                // 添加到现有数据
                highlights = [...newHighlights, ...highlights];
                saveHighlights();
                applyHighlightFilters();
                renderHighlights();
                
                alert(`成功导入 ${newHighlights.length} 个产品卖点数据`);
            } else {
                alert('Excel文件中没有找到有效的数据');
            }
        } catch (error) {
            console.error('处理Excel文件时出错:', error);
            alert('处理Excel文件时出错，请检查文件格式');
        }
    };
    reader.readAsArrayBuffer(file);
}

// 解析产品卖点Excel数据
function parseHighlightExcelData(data) {
    const highlights = [];
    const headers = data[0];
    
    // 查找列索引
    const nameIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('产品名称'));
    const parentModelIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('父款型号'));
    const categoryIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('分类'));
    const descriptionIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('描述'));
    const featuresIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('卖点'));
    // 查找多个参考链接字段
    const referenceLink1Index = headers.findIndex(h => h && h.toString().toLowerCase().includes('参考链接1'));
    const referenceLink2Index = headers.findIndex(h => h && h.toString().toLowerCase().includes('参考链接2'));
    const referenceLink3Index = headers.findIndex(h => h && h.toString().toLowerCase().includes('参考链接3'));
    // 兼容旧的单列格式
    const referenceLinkIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('参考链接') && !h.toString().toLowerCase().includes('参考链接1'));
    const imageUrlIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('图片'));
    
    // 材质字段索引
    const fabricMaterialIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('面料材质'));
    const legMaterialIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('脚材质'));
    const spongeMaterialIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('海绵材质'));
    const frameMaterialIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('框架材质'));
    const panelMaterialIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('面板材质'));
    const functionIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('功能'));
    
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;
        
        const name = row[nameIndex]?.toString().trim();
        const parentModel = row[parentModelIndex]?.toString().trim();
        const category = normalizeHighlightCategory(row[categoryIndex]?.toString().trim());
        const description = row[descriptionIndex]?.toString().trim();
        const features = row[featuresIndex]?.toString().trim();
        // 处理参考链接（支持多列和单列格式）
        let referenceLinks = ['', '', ''];
        if (referenceLink1Index >= 0 || referenceLink2Index >= 0 || referenceLink3Index >= 0) {
            // 多列格式
            if (referenceLink1Index >= 0) referenceLinks[0] = row[referenceLink1Index]?.toString().trim() || '';
            if (referenceLink2Index >= 0) referenceLinks[1] = row[referenceLink2Index]?.toString().trim() || '';
            if (referenceLink3Index >= 0) referenceLinks[2] = row[referenceLink3Index]?.toString().trim() || '';
        } else if (referenceLinkIndex >= 0) {
            // 单列格式（兼容旧格式）
            const singleLink = row[referenceLinkIndex]?.toString().trim() || '';
            referenceLinks[0] = singleLink;
        }
        let imageUrl = row[imageUrlIndex]?.toString().trim();
        
        if (!name || !parentModel || !category) continue;
        
        // 处理图片URL
        if (imageUrl && uploadedHighlightImageMap[imageUrl.toLowerCase()]) {
            imageUrl = uploadedHighlightImageMap[imageUrl.toLowerCase()];
        }
        
        const highlight = {
            id: Date.now() + i,
            name: name,
            parentModel: parentModel,
            category: category,
            description: description || '',
            features: features ? features.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [],
            referenceLinks: referenceLinks,
            imageUrl: imageUrl || '',
            sceneImages: [],
            designPoints: []
        };
        
        // 根据分类添加不同的材质信息
        if (category === 'seating') {
            highlight.fabricMaterial = row[fabricMaterialIndex]?.toString().trim() || '';
            highlight.legMaterial = row[legMaterialIndex]?.toString().trim() || '';
            highlight.spongeMaterial = row[spongeMaterialIndex]?.toString().trim() || '';
            highlight.frameMaterial = row[frameMaterialIndex]?.toString().trim() || '';
            highlight.function = row[functionIndex]?.toString().trim() || '';
        } else if (category === 'table') {
            highlight.panelMaterial = row[panelMaterialIndex]?.toString().trim() || '';
            highlight.legMaterial = row[legMaterialIndex]?.toString().trim() || '';
            highlight.function = row[functionIndex]?.toString().trim() || '';
        }
        
        highlights.push(highlight);
    }
    
    return highlights;
}

// 标准化产品卖点分类
function normalizeHighlightCategory(val) {
    if (!val) return 'seating';
    
    const normalized = val.toLowerCase().trim();
    if (normalized.includes('沙发') || normalized.includes('sofa') || 
        normalized.includes('椅子') || normalized.includes('chair') ||
        normalized.includes('坐具')) return 'seating';
    if (normalized.includes('桌子') || normalized.includes('table')) return 'table';
    
    return 'seating'; // 默认分类
}

// 构建产品卖点上传图片映射
function buildHighlightUploadedImageMap(imageFiles) {
    const map = {};
    
    imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            map[file.name.toLowerCase()] = e.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    return map;
}

// 处理产品卖点拖拽事件
function handleHighlightDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

function handleHighlightDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
}

function handleHighlightDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    
    // 模拟文件输入事件
    const event = {
        target: {
            files: files
        }
    };
    
    handleHighlightFileUpload(event);
}

// 预览编辑模态框中的场景图
function previewEditSceneImage() {
    const fileInput = document.getElementById('editSceneImageFile');
    const urlInput = document.getElementById('editSceneImageUrl');
    const preview = document.getElementById('editSceneImageImagePreview');
    const previewImg = document.getElementById('editSceneImageImagePreviewImg');
    
    // 优先使用本地文件
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else if (urlInput && urlInput.value.trim()) {
        // 如果没有本地文件，使用URL
        previewImg.src = urlInput.value.trim();
        preview.style.display = 'block';
    } else {
        // 都没有则隐藏预览
        preview.style.display = 'none';
        previewImg.src = '';
    }
}

// ==================== 办公椅配件页面逻辑 ====================
let ocItems = [];
let ocFiltered = [];
let ocCategoryFilter = 'all';
let ocSearchQuery = '';

function loadOcItems() {
    try { ocItems = JSON.parse(localStorage.getItem('officechair_parts_v1') || '[]'); } catch (_) { ocItems = []; }
    if (!ocItems || ocItems.length === 0) {
        ocItems = [
            { id: Date.now()+1, model: '可调头枕-HR01', category: 'headrest', features: ['可调','软垫'], imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop' },
            { id: Date.now()+2, model: '3D扶手-AR3D', category: 'armrest', features: ['可调','金属'], imageUrl: 'https://images.unsplash.com/photo-1582582429416-67fbd0bfcac7?q=80&w=800&auto=format&fit=crop' },
            { id: Date.now()+3, model: '人体工学靠背-BR02', category: 'backrest', features: ['网面'], imageUrl: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=800&auto=format&fit=crop' },
            { id: Date.now()+4, model: '记忆棉坐垫-CSM', category: 'cushion', features: ['软垫'], imageUrl: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=800&auto=format&fit=crop' }
        ];
        saveOcItems();
    }
}
function saveOcItems() {
    try { localStorage.setItem('officechair_parts_v1', JSON.stringify(ocItems)); } catch (_) {}
}

function openOcUploadModal() { 
    const modal = document.getElementById('ocUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    
    // 确保模态框内容可以滚动
    if (modalContent) {
        modalContent.style.overflowY = 'auto';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.height = 'auto';
    }
    
    // 阻止背景页面滚动
    preventBodyScroll();
}

function closeOcUploadModal() { 
    const modal = document.getElementById('ocUploadModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.pointerEvents = '';
    
    // 清理样式
    if (modalContent) {
        modalContent.style.overflowY = '';
        modalContent.style.maxHeight = '';
        modalContent.style.height = '';
    }
    
    // 恢复背景页面滚动
    allowBodyScroll();
}

function setOcCategoryFilter(cat, event) {
    ocCategoryFilter = cat;
    const buttons = document.querySelectorAll('#officechairPartsPage .category-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-category') === cat));
    applyOcFilters();
}

function handleOcSearch(e) { ocSearchQuery = (e.target.value || '').trim().toLowerCase(); applyOcFilters(); }

function applyOcFilters() {
    let list = [...ocItems];
    if (ocCategoryFilter !== 'all') list = list.filter(i => i.category === ocCategoryFilter);
    if (ocSearchQuery) {
        list = list.filter(i =>
            (i.model && i.model.toLowerCase().includes(ocSearchQuery)) ||
            (i.features && i.features.join(',').toLowerCase().includes(ocSearchQuery))
        );
    }
    ocFiltered = list;
    renderOcItems();
}

function renderOcItems() {
    const grid = document.getElementById('ocGrid');
    const noRes = document.getElementById('ocNoResults');
    if (!grid) return;
    if (!ocFiltered.length) {
        grid.innerHTML = '';
        if (noRes) noRes.style.display = 'block';
        return;
    }
    if (noRes) noRes.style.display = 'none';
    grid.innerHTML = ocFiltered.map(item => `
        <div class="material-card oc-card" data-id="${item.id}" onclick="openOcDetail(${item.id})">
            ${item.imageUrl ? `<div class="material-thumb"><img src="${item.imageUrl}" alt="${item.model || ''}" onerror="this.style.display='none'" /></div>` : ''}
            <h3>${item.model || '未命名'}</h3>
            ${item.subtype ? `<div class=\"form-help\" style=\"margin:4px 0 6px;color:#6c757d;\">${item.subtype}</div>` : ''}
            <div class="features">${(item.features || []).slice(0,4).map(f => `<span class="feature-tag">${f}</span>`).join('')}</div>
            <div class="fabric-info"><div class="fabric-color-code">${mapOcCategoryLabel(item.category)}</div></div>
            <div class="card-actions" style="margin-top:8px;display:flex;gap:8px;">
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();openOcDetail(${item.id})">查看/编辑</button>
            </div>
        </div>
    `).join('');
    // 兜底绑定点击事件
    try {
        grid.querySelectorAll('.oc-card').forEach(card => {
            if (card.__bound) return;
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id'));
                openOcDetail(id);
            });
            card.style.cursor = 'pointer';
            card.__bound = true;
        });
    } catch (_) {}
}

function mapOcCategoryLabel(cat) {
    const m = { headrest: '头枕', armrest: '扶手', backrest: '靠背', lumbar: '腰托', cushion: '坐垫', base: '底盘', fiveleg: '五星脚', caster: '椅轮' };
    return m[cat] || cat;
}

function setupOcUploadInteractions() {
    const area = document.getElementById('ocUploadArea');
    const input = document.getElementById('ocFileInput');
    if (input && !input.__bound) { input.addEventListener('change', handleOcFiles); input.__bound = true; }
    if (area && !area.__bound) {
        area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('dragover'); });
        area.addEventListener('dragleave', e => { e.preventDefault(); area.classList.remove('dragover'); });
        area.addEventListener('drop', e => { e.preventDefault(); area.classList.remove('dragover'); handleOcFiles({ target: { files: e.dataTransfer.files } }); });
        area.addEventListener('click', () => input && input.click());
        area.__bound = true;
    }
}

function inferOcCategoryByName(name) {
    const n = (name || '').toLowerCase();
    if (/headrest|头枕/.test(n)) return 'headrest';
    if (/armrest|扶手/.test(n)) return 'armrest';
    if (/backrest|靠背|背板|靠/.test(n)) return 'backrest';
    if (/lumbar|腰托|腰靠/.test(n)) return 'lumbar';
    if (/cushion|seat|坐垫|坐席/.test(n)) return 'cushion';
    if (/(base|底盘|底座)/.test(n)) return 'base';
    if (/(five|五星|五爪|五脚|五星脚)/.test(n)) return 'fiveleg';
    if (/(wheel|caster|滚轮|椅轮|脚轮)/.test(n)) return 'caster';
    return 'armrest';
}
function extractOcFeatures(name) {
    const n = (name || '').toLowerCase();
    const features = [];
    if (/可调|调节|adjust|升降/.test(n)) features.push('可调');
    if (/软垫|软包|padding/.test(n)) features.push('软垫');
    if (/网|mesh/.test(n)) features.push('网面');
    if (/金属|metal|钢|铝/.test(n)) features.push('金属');
    return [...new Set(features)];
}

function handleOcFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const readers = files.map((file, idx) => new Promise(resolve => {
        const r = new FileReader();
        r.onload = ev => resolve({ name: file.name, url: ev.target.result });
        r.onerror = () => resolve(null);
        r.readAsDataURL(file);
    }));
    Promise.all(readers).then(items => {
        const newItems = items.filter(Boolean).map((it, i) => {
            const base = decodeURI(it.name).split(/[\\/]/).pop();
            const model = base.replace(/\.[a-z0-9]+$/i, '');
            const category = inferOcCategoryByName(model);
            return {
                id: Date.now() + i,
                model,
                category,
                features: extractOcFeatures(model),
                imageUrl: it.url
            };
        });
        ocItems = [...ocItems, ...newItems];
        saveOcItems();
        closeOcUploadModal();
        applyOcFilters();
    });
}

// 扩展导航切换
const _origSwitchPage2 = typeof window.switchPage === 'function' ? window.switchPage : null;
window.switchPage = function(page) {
    if (_origSwitchPage2) _origSwitchPage2(page);
    // 显示/隐藏办公椅配件页面
    const ocPageEl = document.getElementById('officechairPartsPage');
    if (ocPageEl) ocPageEl.style.display = page === 'officechairParts' ? 'block' : 'none';
    if (page === 'officechairParts') {
        loadOcItems();
        setupOcUploadInteractions();
        const search = document.getElementById('ocSearchInput');
        if (search && !search.__bound) { search.addEventListener('input', handleOcSearch); search.__bound = true; }
        applyOcFilters();
        // 切换头部按钮组
        const header = document.getElementById('headerActions');
        let actions = document.getElementById('officechairPartsActions');
        if (!actions && header) {
            actions = document.createElement('div');
            actions.className = 'page-actions';
            actions.id = 'officechairPartsActions';
            actions.innerHTML = `<button class=\"btn btn-primary\" onclick=\"openOcUploadModal()\"><i class=\"fas fa-upload\"></i> 上传配件图片</button>`;
            header.appendChild(actions);
        }
        document.querySelectorAll('.page-actions').forEach(el => el.style.display = 'none');
        if (actions) actions.style.display = 'flex';

        // 文档级委托，兜底确保点击可用
        if (!window._ocDocClickHandler) {
            window._ocDocClickHandler = function(e) {
                // 检查是否在模态框内，如果是则不处理
                const modal = e.target && e.target.closest ? e.target.closest('.modal') : null;
                if (modal) {
                    return; // 在模态框内，不处理点击事件
                }
                
                const card = e.target && e.target.closest ? e.target.closest('.oc-card') : null;
                if (card) {
                    const id = parseInt(card.getAttribute('data-id'));
                    console.log('[OC] doc delegation ->', id, e.target);
                    if (!isNaN(id)) openOcDetail(id);
                }
            };
            document.addEventListener('click', window._ocDocClickHandler, true);
            console.log('[OC] document-level delegation attached');
        }
    }
};

// 工具：拆分Excel与图片（复用但单独变量）
function splitExcelAndImagesOc(files) {
    let excelFile = null;
    const imageFiles = [];
    for (const f of files) {
        if (/\.(xlsx|xls)$/i.test(f.name)) excelFile = f;
        else if (f.type && f.type.startsWith('image/')) imageFiles.push(f);
    }
    return { excelFile, imageFiles };
}

let uploadedOcImageMap = {};
function buildUploadedOcImageMap(imageFiles) {
    uploadedOcImageMap = {};
    const readers = imageFiles.map(img => new Promise((resolve) => {
        const filename = img.name;
        const lower = filename.toLowerCase();
        const noExt = lower.replace(/\.[a-z0-9]+$/, '');
        const compact = lower.replace(/\s+/g, '');
        const r = new FileReader();
        r.onload = () => {
            uploadedOcImageMap[lower] = r.result;
            uploadedOcImageMap[noExt] = r.result;
            uploadedOcImageMap[compact] = r.result;
            resolve();
        };
        r.onerror = () => resolve();
        r.readAsDataURL(img);
    }));
    return Promise.all(readers);
}

function normalizeOcCategory(v) {
    const s = (v || '').toString().trim().toLowerCase();
    if (!s) return '';
    if (/(headrest|头枕)/.test(s)) return 'headrest';
    if (/(armrest|扶手)/.test(s)) return 'armrest';
    if (/(back|backrest|靠背)/.test(s)) return 'backrest';
    if (/(lumbar|腰托|腰靠)/.test(s)) return 'lumbar';
    if (/(cushion|seat|坐垫|坐席)/.test(s)) return 'cushion';
    if (/(base|底盘|底座)/.test(s)) return 'base';
    if (/(five|五星|五爪|五脚)/.test(s)) return 'fiveleg';
    if (/(wheel|caster|滚轮|椅轮|脚轮)/.test(s)) return 'caster';
    return '';
}

function parseOcExcelData(data) {
    const added = [];
    const headers = (data[0] || []).map(h => (h || '').toString().trim());
    const findIdx = (kwArr) => headers.findIndex(h => kwArr.some(k => h.toLowerCase().includes(k)));
    const idx = {
        category: findIdx(['分类','category']),
        model: findIdx(['型号','model','名称','name']),
        features: findIdx(['特征','features']),
        image: findIdx(['图片','image','url']),
        subtype: findIdx(['子类','子类型','subtype'])
    };

    for (let i = 1; i < data.length; i++) {
        const row = data[i] || [];
        const get = (index) => index >= 0 ? (row[index] !== undefined ? row[index].toString().trim() : '') : '';
        const model = get(idx.model);
        if (!model) continue;
        const category = normalizeOcCategory(get(idx.category)) || inferOcCategoryByName(model);
        const featuresStr = get(idx.features);
        const imageCell = get(idx.image);
        let subtype = get(idx.subtype);
        if (!subtype) subtype = inferOcSubtype(category, model);

        let imageUrl = '';
        if (imageCell) {
            const raw = imageCell.toString().trim();
            const base = decodeURI(raw).split(/[\\/]/).pop().trim();
            const lower = base.toLowerCase();
            const noExt = lower.replace(/\.[a-z0-9]+$/, '');
            const compact = lower.replace(/\s+/g, '');
            for (const key of [lower, noExt, compact]) {
                if (uploadedOcImageMap[key]) { imageUrl = uploadedOcImageMap[key]; break; }
            }
            if (!imageUrl && (/^https?:\/\//i.test(raw) || raw.startsWith('data:'))) imageUrl = raw;
        }

        added.push({
            id: Date.now() + i,
            model,
            category,
            subtype,
            features: featuresStr ? featuresStr.split(/[,，]/).map(s => s.trim()).filter(Boolean) : extractOcFeatures(model),
            imageUrl
        });
    }
    return added;
}

async function handleOcFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const { excelFile, imageFiles } = splitExcelAndImagesOc(files);
    if (imageFiles.length) await buildUploadedOcImageMap(imageFiles);
    if (excelFile) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const data = new Uint8Array(ev.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const added = parseOcExcelData(jsonData);
                if (added.length) {
                    ocItems = [...ocItems, ...added];
                    saveOcItems();
                    closeOcUploadModal();
                    applyOcFilters();
                    alert(`成功导入 ${added.length} 个配件`);
                } else {
                    alert('Excel中没有有效数据');
                }
            } catch (err) {
                console.error(err); alert('Excel解析失败');
            }
        };
        reader.readAsArrayBuffer(excelFile);
    } else if (imageFiles.length) {
        const readers = imageFiles.map(file => new Promise(resolve => {
            const r = new FileReader();
            r.onload = ev => resolve({ name: file.name, url: ev.target.result });
            r.onerror = () => resolve(null);
            r.readAsDataURL(file);
        }));
        const items = (await Promise.all(readers)).filter(Boolean).map((it, i) => {
            const base = decodeURI(it.name).split(/[\\/]/).pop();
            const model = base.replace(/\.[a-z0-9]+$/i, '');
            return { id: Date.now() + i, model, category: inferOcCategoryByName(model), features: extractOcFeatures(model), imageUrl: it.url };
        });
        ocItems = [...ocItems, ...items];
        saveOcItems();
        closeOcUploadModal();
        applyOcFilters();
        alert(`成功添加 ${items.length} 个配件图片`);
    }
}

// 覆盖/增强拖拽交互（已在 setupOcUploadInteractions 中绑定）
function setupOcUploadInteractions() {
    const area = document.getElementById('ocUploadArea');
    const input = document.getElementById('ocFileInput');
    if (input && !input.__bound) { input.addEventListener('change', handleOcFiles); input.__bound = true; }
    if (area && !area.__bound) {
        area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('dragover'); });
        area.addEventListener('dragleave', e => { e.preventDefault(); area.classList.remove('dragover'); });
        area.addEventListener('drop', async e => {
            e.preventDefault(); area.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files || []);
            if (!files.length) return;
            const { excelFile, imageFiles } = splitExcelAndImagesOc(files);
            if (imageFiles.length) await buildUploadedOcImageMap(imageFiles);
            if (excelFile) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    try {
                        const data = new Uint8Array(ev.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                        const added = parseOcExcelData(jsonData);
                        if (added.length) {
                            ocItems = [...ocItems, ...added];
                            saveOcItems();
                            closeOcUploadModal();
                            applyOcFilters();
                            alert(`成功导入 ${added.length} 个配件`);
                        } else {
                            alert('Excel中没有有效数据');
                        }
                    } catch (err) {
                        console.error(err); alert('Excel解析失败');
                    }
                };
                reader.readAsArrayBuffer(excelFile);
            } else if (imageFiles.length) {
                // 纯图片，按文件名生成记录
                const readers = imageFiles.map(file => new Promise(resolve => {
                    const r = new FileReader();
                    r.onload = ev => resolve({ name: file.name, url: ev.target.result });
                    r.onerror = () => resolve(null);
                    r.readAsDataURL(file);
                }));
                const items = (await Promise.all(readers)).filter(Boolean).map((it, i) => {
                    const base = decodeURI(it.name).split(/[\\/]/).pop();
                    const model = base.replace(/\.[a-z0-9]+$/i, '');
                    return { id: Date.now() + i, model, category: inferOcCategoryByName(model), features: extractOcFeatures(model), imageUrl: it.url };
                });
                ocItems = [...ocItems, ...items];
                saveOcItems();
                closeOcUploadModal();
                applyOcFilters();
                alert(`成功添加 ${items.length} 个配件图片`);
            }
        });
    }
}

function inferOcSubtype(category, name) {
    const n = (name || '').toLowerCase();
    switch (category) {
        case 'armrest':
            if (/翻转|flip/.test(n)) return '翻转扶手';
            if (/可调|3d|4d|调节|adjust/.test(n)) return '可调节扶手';
            return '固定扶手';
        case 'headrest':
            if (/可调|调节|adjust/.test(n)) return '可调头枕';
            return '固定头枕';
        case 'backrest':
            if (/分体|分离|split/.test(n)) return '分体靠背';
            return '整背';
        case 'lumbar':
            if (/独立/.test(n)) return '独立腰托';
            return '常规腰托';
        case 'cushion':
            if (/海绵|foam/.test(n)) return '海绵坐垫';
            if (/网|mesh/.test(n)) return '网布坐垫';
            return '坐垫';
        case 'base':
            if (/倾仰|tilt/.test(n)) return '倾仰底盘';
            if (/原位|同步|锁定/.test(n)) return '多档锁定底盘';
            return '固定底盘';
        case 'fiveleg':
            if (/尼龙|nylon/.test(n)) return '尼龙脚';
            if (/铁|steel/.test(n)) return '铁脚';
            if (/铝|alloy|aluminium|aluminum/.test(n)) return '铝合金脚';
            return '五星脚';
        case 'caster':
            if (/pu/.test(n)) return 'PU轮';
            if (/pp/.test(n)) return 'PP轮';
            if (/尼龙/.test(n)) return '尼龙轮';
            return '椅轮';
        default:
            return '';
    }
}

// 渲染扩展：展示子类
function renderOcItems() {
    const grid = document.getElementById('ocGrid');
    const noRes = document.getElementById('ocNoResults');
    if (!grid) return;
    if (!ocFiltered.length) {
        grid.innerHTML = '';
        if (noRes) noRes.style.display = 'block';
        return;
    }
    if (noRes) noRes.style.display = 'none';
    grid.innerHTML = ocFiltered.map(item => `
        <div class="material-card">
            ${item.imageUrl ? `<div class="material-thumb"><img src="${item.imageUrl}" alt="${item.model || ''}" onerror="this.style.display='none'" /></div>` : ''}
            <h3>${item.model || '未命名'}</h3>
            ${item.subtype ? `<div class=\"form-help\" style=\"margin:4px 0 6px;color:#6c757d;\">${item.subtype}</div>` : ''}
            <div class="features">${(item.features || []).slice(0,4).map(f => `<span class="feature-tag">${f}</span>`).join('')}</div>
            <div class="fabric-info"><div class="fabric-color-code">${mapOcCategoryLabel(item.category)}</div></div>
        </div>
    `).join('');
}

function openOcDetail(id) {
    console.log('[OC] openOcDetail called with id:', id);
    const item = ocItems.find(i => i.id === id);
    if (!item) { console.warn('[OC] item not found for id:', id); return; }
    // 复用已存在且样式完备的面料详情弹窗
    const modal = document.getElementById('fabricModal');
    const title = document.getElementById('fabricModalTitle');
    const body = document.getElementById('fabricModalBody');
    if (!modal || !title || !body) { console.warn('[OC] fabricModal not found'); return; }

    title.textContent = item.model || '配件详情';
    body.setAttribute('data-oc-id', item.id);
    body.innerHTML = `
        ${item.imageUrl ? `
            <div class="material-image">
                <img src="${item.imageUrl}" alt="${item.model || ''}" data-image-src="${item.imageUrl||''}" onerror="this.style.display='none'" style="cursor: zoom-in;" />
            </div>
        ` : ''}
        <div class="fabric-detail">
            <h3>配件信息</h3>
            <p><strong>分类：</strong>${mapOcCategoryLabel(item.category)}</p>
            ${item.subtype ? `<p><strong>子类：</strong>${item.subtype}</p>` : ''}
            ${item.features && item.features.length ? `<p><strong>特征：</strong>${item.features.join('，')}</p>` : ''}
        </div>
        <div class="detail-section">
            <h4>编辑</h4>
            <form id="ocQuickEditForm">
                <div class="form-group"><label>型号</label><input type="text" id="ocQuickModel" value="${item.model || ''}"></div>
                <div class="form-group"><label>子类</label><input type="text" id="ocQuickSubtype" value="${item.subtype || ''}"></div>
                <div class="form-group"><label>特征（逗号分隔）</label><input type="text" id="ocQuickFeatures" value="${(item.features||[]).join(',')}"></div>
                <div class="form-group"><label>图片URL（可选）</label><input type="url" id="ocQuickImageUrl" value="${item.imageUrl || ''}"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" onclick="deleteOcItem(${item.id})"><i class="fas fa-trash"></i> 删除</button>
                    <button type="button" class="btn btn-primary" onclick="saveOcQuickEdit(${item.id})"><i class="fas fa-check"></i> 保存</button>
                </div>
            </form>
        </div>
    `;

    modal.classList.add('show');
    console.log('[OC] modal opened (fabricModal)');
}

function saveOcQuickEdit(id) {
    const itemIdx = ocItems.findIndex(i => i.id === id);
    if (itemIdx === -1) return;
    const model = document.getElementById('ocQuickModel').value.trim();
    const subtype = document.getElementById('ocQuickSubtype').value.trim();
    const featuresStr = document.getElementById('ocQuickFeatures').value.trim();
    const imageUrl = document.getElementById('ocQuickImageUrl').value.trim();
    ocItems[itemIdx] = {
        ...ocItems[itemIdx],
        model,
        subtype,
        features: featuresStr ? featuresStr.split(/[,，]/).map(s=>s.trim()).filter(Boolean) : [],
        imageUrl
    };
    saveOcItems();
    applyOcFilters();
    closeFabricModal();
    alert('保存成功');
}

function deleteOcItem(id) {
    if (!confirm('确定删除该配件吗？')) return;
    ocItems = ocItems.filter(i => i.id !== id);
    saveOcItems();
    applyOcFilters();
    closeOcDetailModal();
}

// 委托式点击打开详情（保证可点击）
(function bindOcGridClick() {
    const grid = document.getElementById('ocGrid');
    if (!grid || grid.__delegateBound) return;
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.oc-card');
        if (!card || !grid.contains(card)) return;
        const id = parseInt(card.getAttribute('data-id'));
        console.log('[OC] grid click -> card id:', id, 'target:', e.target);
        if (!isNaN(id)) openOcDetail(id);
    });
    grid.__delegateBound = true;
    console.log('[OC] click delegation bound on #ocGrid');
})();

function disableHiddenModalPointers() {
    document.querySelectorAll('.modal').forEach(m => {
        if (m.classList.contains('show')) {
            m.style.pointerEvents = 'auto';
        } else {
            m.style.pointerEvents = 'none';
        }
    });
}

// call on load
try { disableHiddenModalPointers(); } catch (_) {}

// Adjust in switches and open/close
function openOcDetail(id) {
    console.log('[OC] openOcDetail called with id:', id);
    const item = ocItems.find(i => i.id === id);
    if (!item) { console.warn('[OC] item not found for id:', id); return; }
    const modal = document.getElementById('ocDetailModal');
    const title = document.getElementById('ocModalTitle');
    const body = document.getElementById('ocModalBody');
    title.textContent = item.model;
    body.setAttribute('data-id', id);
    body.innerHTML = `
        ${item.imageUrl ? `<div class=\"material-image\"><img src=\"${item.imageUrl}\" alt=\"${item.model}\" data-image-src=\"${item.imageUrl||''}\" onerror=\"this.style.display='none'\" style=\"cursor: zoom-in;\" /></div>` : ''}
        <form id=\"ocEditForm\">
            <div class=\"form-group\">
                <label>分类</label>
                <select id=\"ocEditCategory\">
                    <option value=\"headrest\">头枕</option>
                    <option value=\"armrest\">扶手</option>
                    <option value=\"backrest\">靠背</option>
                    <option value=\"lumbar\">腰托</option>
                    <option value=\"cushion\">坐垫</option>
                    <option value=\"base\">底盘</option>
                    <option value=\"fiveleg\">五星脚</option>
                    <option value=\"caster\">椅轮</option>
                </select>
            </div>
            <div class=\"form-group\">
                <label>型号</label>
                <input type=\"text\" id=\"ocEditModel\" required>
            </div>
            <div class=\"form-group\">
                <label>子类</label>
                <input type=\"text\" id=\"ocEditSubtype\" placeholder=\"如：固定扶手/翻转扶手/可调节扶手\">
            </div>
            <div class=\"form-group\">
                <label>特征（逗号分隔）</label>
                <input type=\"text\" id=\"ocEditFeatures\">
            </div>
            <div class=\"form-group\">
                <label>图片URL（可选）</label>
                <input type=\"url\" id=\"ocEditImageUrl\" placeholder=\"https://...\">
            </div>
            <div class=\"form-group\">
                <label>本地图片（可选）</label>
                <input type=\"file\" id=\"ocEditImageFile\" accept=\"image/*\">
                <small class=\"form-help\">若同时填写URL并选择本地图片，将优先使用本地图片。</small>
            </div>
            <div class=\"modal-footer\">
                <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteOcItem(${id})\"><i class=\"fas fa-trash\"></i> 删除</button>
                <button type=\"button\" class=\"btn btn-secondary\" onclick=\"closeOcDetailModal()\">取消</button>
                <button type=\"submit\" class=\"btn btn-primary\"><i class=\"fas fa-check\"></i> 保存修改</button>
            </div>
        </form>`;

    document.getElementById('ocEditCategory').value = item.category || 'armrest';
    document.getElementById('ocEditModel').value = item.model || '';
    document.getElementById('ocEditSubtype').value = item.subtype || '';
    document.getElementById('ocEditFeatures').value = (item.features || []).join(',');
    document.getElementById('ocEditImageUrl').value = item.imageUrl || '';
    document.getElementById('ocEditImageFile').value = '';

    const form = document.getElementById('ocEditForm');
    form.onsubmit = handleOcEditSubmit;

    modal.classList.add('show');
    disableHiddenModalPointers();
    console.log('[OC] modal opened');
}
function closeOcDetailModal() { const m = document.getElementById('ocDetailModal'); if (m) { m.classList.remove('show'); disableHiddenModalPointers(); } }

function handleOcEditSubmit(e) {
    e.preventDefault();
    const body = document.getElementById('ocModalBody');
    const id = parseInt(body.getAttribute('data-id'));
    const category = document.getElementById('ocEditCategory').value;
    const model = document.getElementById('ocEditModel').value.trim();
    const subtype = document.getElementById('ocEditSubtype').value.trim() || inferOcSubtype(category, model);
    const featuresStr = document.getElementById('ocEditFeatures').value.trim();
    const imgUrlInput = document.getElementById('ocEditImageUrl');
    const imgFileInput = document.getElementById('ocEditImageFile');
    const hasLocal = !!(imgFileInput && imgFileInput.files && imgFileInput.files[0]);
    const imageUrlText = imgUrlInput.value.trim();

    if (!model) { alert('请填写型号'); return; }

    const finalize = (imageUrl) => {
        const idx = ocItems.findIndex(i => i.id === id);
        if (idx !== -1) {
            ocItems[idx] = { ...ocItems[idx], model, category, subtype, features: featuresStr ? featuresStr.split(/[,，]/).map(s=>s.trim()).filter(Boolean) : [], imageUrl };
            saveOcItems();
            applyOcFilters();
            closeOcDetailModal();
            alert('保存成功');
        }
    };

    if (hasLocal) {
        const file = imgFileInput.files[0];
        const reader = new FileReader();
        reader.onload = ev => finalize(ev.target.result);
        reader.onerror = () => finalize(imageUrlText);
        reader.readAsDataURL(file);
    } else {
        finalize(imageUrlText);
    }
}

function deleteOcItem(id) {
    if (!confirm('确定删除该配件吗？')) return;
    ocItems = ocItems.filter(i => i.id !== id);
    saveOcItems();
    applyOcFilters();
    closeOcDetailModal();
}

// 委托式点击打开详情（保证可点击）
(function bindOcGridClick() {
    const grid = document.getElementById('ocGrid');
    if (!grid || grid.__delegateBound) return;
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.oc-card');
        if (!card || !grid.contains(card)) return;
        const id = parseInt(card.getAttribute('data-id'));
        console.log('[OC] grid click -> card id:', id, 'target:', e.target);
        if (!isNaN(id)) openOcDetail(id);
    });
    grid.__delegateBound = true;
    console.log('[OC] click delegation bound on #ocGrid');
})();

function disableHiddenModalPointers() {
    document.querySelectorAll('.modal').forEach(m => {
        if (m.classList.contains('show')) {
            m.style.pointerEvents = 'auto';
        } else {
            m.style.pointerEvents = 'none';
        }
    });
}

// call on load
try { disableHiddenModalPointers(); } catch (_) {}

// Adjust in switches and open/close
function openOcDetail(id) {
    console.log('[OC] openOcDetail called with id:', id);
    const item = ocItems.find(i => i.id === id);
    if (!item) { console.warn('[OC] item not found for id:', id); return; }
    const modal = document.getElementById('ocDetailModal');
    const title = document.getElementById('ocModalTitle');
    const body = document.getElementById('ocModalBody');
    title.textContent = item.model;
    body.setAttribute('data-id', id);
    // ... existing innerHTML ...
    modal.classList.add('show');
    disableHiddenModalPointers();
    console.log('[OC] modal opened');
}
function closeOcDetailModal() { const m = document.getElementById('ocDetailModal'); if (m) { m.classList.remove('show'); disableHiddenModalPointers(); } }

// also when switching to page, ensure hidden modals don't capture
window.switchPage = (function(prev){
    return function(page){
        if (prev) prev(page);
        const ocPageEl = document.getElementById('officechairPartsPage');
        if (ocPageEl) ocPageEl.style.display = page === 'officechairParts' ? 'block' : 'none';
        if (page === 'officechairParts') {
            disableHiddenModalPointers();
            // ... rest preserved below ...
        }
    };
})(typeof window.switchPage==='function'?window.switchPage:null);

// Fallback: ensure global switchPage exists for nav buttons
if (typeof window.switchPage !== 'function') {
    window.switchPage = function(page) {
        try { currentPage = page; } catch (_) {}
        try { document.getElementById('materialsPage').style.display = page === 'materials' ? 'block' : 'none'; } catch (_) {}
        try { document.getElementById('fabricsPage').style.display = page === 'fabrics' ? 'block' : 'none'; } catch (_) {}
        try { document.getElementById('colorboardPage').style.display = page === 'colorboard' ? 'block' : 'none'; } catch (_) {}
        try { document.getElementById('highlightsPage').style.display = page === 'highlights' ? 'block' : 'none'; } catch (_) {}
        try { document.getElementById('optionsPage').style.display = page === 'options' ? 'block' : 'none'; } catch (_) {}
        try { const oc = document.getElementById('officechairPartsPage'); if (oc) oc.style.display = page === 'officechairParts' ? 'block' : 'none'; } catch (_) {}
        console.warn('[fallback] switchPage executed for:', page);
    };
}
