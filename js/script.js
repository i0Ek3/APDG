// DOM元素
const addressTypeRadios = document.querySelectorAll('input[name="addressType"]');
const customAddressContainer = document.getElementById('customAddressContainer');
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const previewContainer = document.getElementById('previewContainer');
const documentPreview = document.getElementById('documentPreview');
const documentContent = document.getElementById('documentContent');
const notification = document.getElementById('notification');
const notificationIcon = document.getElementById('notificationIcon');
const notificationText = document.getElementById('notificationText');
const languageSelect = document.getElementById('languageSelect');
const fullnameInput = document.getElementById('fullname');
const addressInput = document.getElementById('address');

// 设置默认日期为今天
document.getElementById('issueDate').valueAsDate = new Date();

// 预设的随机地址数据
const addressData = {
  cn: [
    "北京市朝阳区建国路88号现代城5号楼1203室",
    "上海市浦东新区张江高科技园区博云路2号浦软大厦10层",
    "广州市天河区珠江新城冼村路5号凯华国际中心2307房",
    "深圳市南山区科技园南区科苑路8号讯美科技广场3栋5层",
    "杭州市西湖区文三路90号东部软件园创新大厦A座802室"
  ],
  us: [
    "1234 Main Street, Apt 5B, New York, NY 10001",
    "456 Oak Avenue, Los Angeles, CA 90001",
    "789 Pine Road, Chicago, IL 60601",
    "321 Maple Drive, Miami, FL 33101",
    "654 Birch Lane, Seattle, WA 98101"
  ],
  uk: [
    "123 Oxford Street, London, W1D 1AN",
    "456 Princess Road, Manchester, M1 4EX",
    "789 Castle Street, Edinburgh, EH2 3AH",
    "321 Church Road, Birmingham, B1 1AA",
    "654 River Lane, Liverpool, L1 8JQ"
  ],
  ca: [
    "123 Yonge Street, Toronto, ON M5E 1W7",
    "456 Robson Street, Vancouver, BC V6B 2B7",
    "789 Peel Street, Montreal, QC H3C 3A1",
    "321 8th Avenue, Calgary, AB T2P 1G1",
    "654 Portage Avenue, Winnipeg, MB R3B 2E7"
  ],
  au: [
    "123 George Street, Sydney, NSW 2000",
    "456 Bourke Street, Melbourne, VIC 3000",
    "789 Adelaide Street, Brisbane, QLD 4000",
    "321 King William Street, Adelaide, SA 5000",
    "654 Hay Street, Perth, WA 6000"
  ],
  jp: [
    "東京都中央区銀座3-2-1 銀座ビル 5階",
    "大阪府大阪市中央区道顿堀1-6-18 道顿堀ビル 3階",
    "愛知県名古屋市中区栄3-29-1 栄センタービル 7階",
    "北海道札幌市中央区南1条西3丁目 札幌ビル 2階",
    "福岡県福岡市博多区博多駅前1-1 博多シティセンター 10階"
  ],
  de: [
    "Marienplatz 12, 80331 München",
    "Kurfürstendamm 45, 10707 Berlin",
    "Hauptstraße 78, 50667 Köln",
    "Neuhauser Straße 36, 80331 München",
    "Jungfernstieg 20, 20354 Hamburg"
  ],
  fr: [
    "123 Rue de Rivoli, 75001 Paris",
    "456 Avenue de la République, 69001 Lyon",
    "789 Rue Saint-Paul, 13001 Marseille",
    "321 Boulevard Haussmann, 75009 Paris",
    "654 Rue de la Paix, 69002 Lyon"
  ]
};

// 证明类型信息 - 按国家定制
const documentTypes = {
  electricity: {
    name: {
      cn: "电费账单",
      us: "Electricity Bill",
      uk: "Electricity Bill",
      ca: "Electricity Bill",
      au: "Electricity Bill",
      jp: "電気料金請求書",
      de: "Stromrechnung",
      fr: "Facture d'électricité"
    },
    company: {
      cn: "国家电网有限公司",
      us: "Pacific Gas and Electric Company",
      uk: "British Gas",
      ca: "Hydro One",
      au: "EnergyAustralia",
      jp: "東京電力",
      de: "E.ON",
      fr: "EDF"
    },
    icon: "fa-bolt"
  },
  water: {
    name: {
      cn: "水费账单",
      us: "Water Bill",
      uk: "Water Bill",
      ca: "Water Bill",
      au: "Water Bill",
      jp: "水道料金請求書",
      de: "Wasserrechnung",
      fr: "Facture d'eau"
    },
    company: {
      cn: "城市自来水公司",
      us: "American Water",
      uk: "Thames Water",
      ca: "Toronto Water",
      au: "Sydney Water",
      jp: "東京都水道局",
      de: "Berlin Wasser",
      fr: "Suez Environnement"
    },
    icon: "fa-tint"
  },
  gas: {
    name: {
      cn: "燃气账单",
      us: "Gas Bill",
      uk: "Gas Bill",
      ca: "Gas Bill",
      au: "Gas Bill",
      jp: "ガス料金請求書",
      de: "Gasrechnung",
      fr: "Facture de gaz"
    },
    company: {
      cn: "中国燃气控股有限公司",
      us: "Kinder Morgan",
      uk: "National Grid",
      ca: "Enbridge Gas",
      au: "AGL Energy",
      jp: "東京ガス",
      de: "Gasag",
      fr: "Engie"
    },
    icon: "fa-fire"
  },
  internet: {
    name: {
      cn: "网络服务账单",
      us: "Internet Service Bill",
      uk: "Internet Service Bill",
      ca: "Internet Service Bill",
      au: "Internet Service Bill",
      jp: "インターネットサービス請求書",
      de: "Internetservice-Rechnung",
      fr: "Facture de service Internet"
    },
    company: {
      cn: "中国电信股份有限公司",
      us: "Comcast",
      uk: "BT Group",
      ca: "Rogers Communications",
      au: "Telstra",
      jp: "NTTコミュニケーションズ",
      de: "Deutsche Telekom",
      fr: "Orange S.A."
    },
    icon: "fa-wifi"
  },
  phone: {
    name: {
      cn: "电话账单",
      us: "Phone Bill",
      uk: "Phone Bill",
      ca: "Phone Bill",
      au: "Phone Bill",
      jp: "電話料金請求書",
      de: "Telefonrechnung",
      fr: "Facture de téléphone"
    },
    company: {
      cn: "中国移动通信集团",
      us: "AT&T",
      uk: "Vodafone",
      ca: "Bell Canada",
      au: "Optus",
      jp: "日本電信電話",
      de: "Vodafone Germany",
      fr: "SFR"
    },
    icon: "fa-phone"
  },
  bank: {
    name: {
      cn: "银行对账单",
      us: "Bank Statement",
      uk: "Bank Statement",
      ca: "Bank Statement",
      au: "Bank Statement",
      jp: "銀行明細書",
      de: "Bankauszug",
      fr: "Relevé bancaire"
    },
    company: {
      cn: "中国工商银行",
      us: "Bank of America",
      uk: "HSBC",
      ca: "Royal Bank of Canada",
      au: "Commonwealth Bank",
      jp: "三菱UFJ銀行",
      de: "Deutsche Bank",
      fr: "BNP Paribas"
    },
    icon: "fa-university"
  },
  creditcard: {
    name: {
      cn: "信用卡账单",
      us: "Credit Card Bill",
      uk: "Credit Card Bill",
      ca: "Credit Card Bill",
      au: "Credit Card Bill",
      jp: "クレジットカード請求書",
      de: "Kreditkartenrechnung",
      fr: "Facture de carte de crédit"
    },
    company: {
      cn: "招商银行信用卡中心",
      us: "Chase",
      uk: "Barclaycard",
      ca: "CIBC",
      au: "ANZ",
      jp: "三井住友カード",
      de: "DKB",
      fr: "Crédit Agricole"
    },
    icon: "fa-credit-card"
  }
};

// 国家名称映射
const countryNames = {
  cn: { cn: "中国", en: "China" },
  us: { cn: "美国", en: "United States" },
  uk: { cn: "英国", en: "United Kingdom" },
  ca: { cn: "加拿大", en: "Canada" },
  au: { cn: "澳大利亚", en: "Australia" },
  jp: { cn: "日本", en: "Japan" },
  de: { cn: "德国", en: "Germany" },
  fr: { cn: "法国", en: "France" }
};

// 初始化语言
function initLanguage() {
  const lang = languageSelect.value;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  // 更新占位符
  fullnameInput.placeholder = lang === 'zh' ? '请输入您的姓名' : 'Please enter your full name';
  addressInput.placeholder = lang === 'zh' ? '请输入详细地址' : 'Please enter detailed address';
  
  // 如果已有生成的文档，更新文档内容
  if (!documentPreview.classList.contains('hidden')) {
    generateDocument(true); // 传入true表示刷新现有文档
  }
}

// 地址类型切换
addressTypeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'custom') {
      customAddressContainer.classList.remove('hidden');
      customAddressContainer.classList.add('animate-fadeIn');
    } else {
      customAddressContainer.classList.add('hidden');
    }
  });
});

// 语言切换事件
languageSelect.addEventListener('change', initLanguage);

// 生成文档
generateBtn.addEventListener('click', () => generateDocument(false));

// 保存PDF
saveBtn.addEventListener('click', saveAsPDF);

// 生成文档函数
function generateDocument(refresh = false) {
  // 获取表单数据
  const fullname = document.getElementById('fullname').value.trim();
  const country = document.getElementById('country').value;
  const addressType = document.querySelector('input[name="addressType"]:checked').value;
  let address = '';
  
  if (addressType === 'custom') {
    address = document.getElementById('address').value.trim();
  } else {
    // 随机选择一个地址
    const addresses = addressData[country] || addressData.cn;
    address = addresses[Math.floor(Math.random() * addresses.length)];
  }
  
  const documentType = document.getElementById('documentType').value;
  const issueDate = document.getElementById('issueDate').value;
  const lang = languageSelect.value;

  // 验证表单 (如果不是刷新操作)
  if (!refresh && (!fullname || !country || !documentType || !issueDate || (addressType === 'custom' && !address))) {
    showNotification(translations[lang].required_fields, 'error');
    return;
  }

  // 格式化日期 - 按国家格式
  const date = new Date(issueDate);
  const formattedDate = date.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', dateFormatOptions[country] || dateFormatOptions.cn);

  // 获取文档类型信息
  const docInfo = documentTypes[documentType];
  const companyName = docInfo.company[country] || docInfo.company.cn;
  const documentName = docInfo.name[country] || docInfo.name.cn;
  const countryName = countryNames[country] ? countryNames[country][lang] : country;

  // 生成随机金额
  const amount = (Math.random() * 1000 + 50).toFixed(2);
  const currency = currencySymbols[country] || "¥";

  // 获取服务周期
  const lastMonth = new Date(date);
  lastMonth.setMonth(date.getMonth() - 1);
  let servicePeriod;
  
  if (formatServicePeriod[country]) {
    servicePeriod = formatServicePeriod[country](lastMonth, date);
  } else {
    servicePeriod = formatServicePeriod.default(lastMonth, date);
  }

  // 生成文档内容
  const documentHTML = `
    <div class="p-8">
      <!-- 头部 -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <h2 class="text-2xl font-bold text-primary mb-1">${companyName}</h2>
          <p class="text-gray-600 text-sm">${documentName}</p>
        </div>
        <div class="text-right">
          <div class="bg-primary/10 text-primary p-3 rounded-lg inline-block">
            <i class="fa ${docInfo.icon} text-3xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 账单信息 -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">${translations[lang].bill_number}</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-gray-500">${translations[lang].bill_number}</p>
            <p class="font-medium">${generateRandomId()}</p>
          </div>
          <div>
            <p class="text-gray-500">${translations[lang].issue_date_label}</p>
            <p class="font-medium">${formattedDate}</p>
          </div>
          <div>
            <p class="text-gray-500">${translations[lang].service_period}</p>
            <p class="font-medium">${servicePeriod}</p>
          </div>
          <div>
            <p class="text-gray-500">${translations[lang].amount}</p>
            <p class="font-medium text-primary">${currency}${amount}</p>
          </div>
        </div>
      </div>
      
      <!-- 客户信息 -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">${translations[lang].customer_info}</h3>
        <div class="text-sm">
          <p class="mb-1"><span class="text-gray-500">${translations[lang].fullname}：</span><span class="font-medium">${fullname}</span></p>
          <p class="mb-1"><span class="text-gray-500">${translations[lang].country_region}：</span><span class="font-medium">${countryName}</span></p>
          <p><span class="text-gray-500">${translations[lang].address}：</span><span class="font-medium">${address}</span></p>
        </div>
      </div>
      
      <!-- 底部信息 -->
      <div class="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p class="mb-2">${translations[lang].footer_note}</p>
        <p>${translations[lang].customer_service}</p>
      </div>
    </div>
  `;

  // 显示文档预览
  documentContent.innerHTML = documentHTML;
  documentPreview.classList.remove('hidden');
  documentPreview.classList.add('animate-fadeIn');
  
  // 隐藏初始提示
  const emptyState = previewContainer.querySelector('.text-center');
  if (emptyState) {
    emptyState.classList.add('hidden');
  }

  // 启用保存按钮
  saveBtn.disabled = false;
  saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  
  // 如果不是刷新操作，显示成功通知
  if (!refresh) {
    showNotification(translations[lang].document_generated, 'success');
    
    // 滚动到预览区域（在移动设备上）
    if (window.innerWidth < 1024) {
      documentPreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// 保存为PDF
function saveAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const lang = languageSelect.value;
  
  // 显示加载通知
  showNotification(translations[lang].generating_pdf, 'info');
  
  html2canvas(documentContent, {
    scale: 2,
    useCORS: true,
    logging: false
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgWidth = 210; // A4宽度，单位mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    const docType = document.getElementById('documentType').value;
    const docInfo = documentTypes[docType];
    const country = document.getElementById('country').value;
    const documentName = docInfo.name[country] || docInfo.name.cn;
    const filename = `${documentName}_${new Date().getTime()}.pdf`;
    doc.save(filename);
    
    // 显示成功通知
    showNotification(translations[lang].pdf_saved, 'success');
  }).catch(error => {
    console.error('PDF生成失败:', error);
    showNotification(translations[lang].pdf_error, 'error');
  });
}

// 显示通知
function showNotification(message, type) {
  // 设置通知类型
  let iconClass, bgColor;
  
  switch(type) {
    case 'success':
      iconClass = 'fa-check-circle text-green-500';
      bgColor = 'bg-green-50 text-green-800';
      break;
    case 'error':
      iconClass = 'fa-exclamation-circle text-red-500';
      bgColor = 'bg-red-50 text-red-800';
      break;
    case 'info':
      iconClass = 'fa-info-circle text-blue-500';
      bgColor = 'bg-blue-50 text-blue-800';
      break;
    default:
      iconClass = 'fa-info-circle text-gray-500';
      bgColor = 'bg-gray-50 text-gray-800';
  }
  
  // 设置通知内容
  notificationIcon.className = `fa ${iconClass}`;
  notificationText.textContent = message;
  notification.className = `fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-300 flex items-center z-50 ${bgColor}`;
  
  // 3秒后隐藏通知
  setTimeout(() => {
    notification.className = 'fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 flex items-center z-50';
  }, 3000);
}

// 生成随机ID
function generateRandomId() {
  const prefix = Math.random().toString(36).substring(2, 5).toUpperCase();
  const number = Math.floor(Math.random() * 900000 + 100000);
  return `${prefix}-${number}`;
}

// 页面滚动时改变导航栏样式
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('py-2', 'shadow');
    header.classList.remove('py-4', 'shadow-sm');
  } else {
    header.classList.add('py-4', 'shadow-sm');
    header.classList.remove('py-2', 'shadow');
  }
});

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  
  // 修复自定义地址输入框显示问题
  const customRadio = document.querySelector('input[name="addressType"][value="custom"]');
  if (customRadio.checked) {
    customAddressContainer.classList.remove('hidden');
  }
});