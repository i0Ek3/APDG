// 内置模板定义 - 按国家和文档类型区分
const templates = {
  // 中国模板
  cn: {
    electricity: {
      name: "中国电网电费单",
      class: "china-utility",
      generate: (data) => `
        <div class="p-6 china-utility">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold mb-1">${data.companyName}</h1>
            <p class="text-gray-600">电费缴费通知单</p>
          </div>
          
          <div class="mb-6 border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3">用户信息</h3>
            <table class="w-full text-sm">
              <tr class="border-b border-gray-100">
                <td class="py-2 w-1/3 text-gray-500">户名：</td>
                <td class="py-2 font-medium">${data.fullname}</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2 text-gray-500">地址：</td>
                <td class="py-2 font-medium">${data.address}</td>
              </tr>
              <tr>
                <td class="py-2 text-gray-500">用户编号：</td>
                <td class="py-2 font-medium">${generateCustomerNumber(10)}</td>
              </tr>
            </table>
          </div>
          
          <div class="mb-6 border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3">本期电费</h3>
            <table class="w-full text-sm">
              <tr class="border-b border-gray-100">
                <td class="py-2 w-1/3 text-gray-500">计费周期：</td>
                <td class="py-2 font-medium">${data.servicePeriod}</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2 text-gray-500">抄表日期：</td>
                <td class="py-2 font-medium">${data.formattedDate}</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2 text-gray-500">本期用电量：</td>
                <td class="py-2 font-medium">${Math.floor(Math.random() * 300 + 50)} 千瓦时</td>
              </tr>
              <tr>
                <td class="py-2 text-gray-500">本期应缴金额：</td>
                <td class="py-2 font-medium text-red-600">${data.currency}${data.amount}</td>
              </tr>
            </table>
          </div>
          
          <div class="text-sm text-gray-500 mt-8">
            <p class="mb-1">缴费截止日期：${getDueDate(data.issueDate)}</p>
            <p class="mb-1">缴费方式：银行代扣 / 网上缴费 / 营业厅缴费</p>
            <p>客服热线：95598</p>
          </div>
          
          <div class="mt-8 text-right">
            <p class="text-sm">${data.companyName} 营业厅</p>
            <p class="text-sm text-gray-500">${data.formattedDate}</p>
          </div>
        </div>
      `
    },
    bank: {
      name: "中国工商银行对账单",
      class: "bank-statement",
      generate: (data) => `
        <div class="p-6 bank-statement">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-2xl font-bold mb-1">中国工商银行</h1>
              <p class="text-gray-600">个人银行账户对账单</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium">账单编号：${data.billId}</p>
              <p class="text-sm text-gray-500">生成日期：${data.formattedDate}</p>
            </div>
          </div>
          
          <div class="mb-6 border-t border-b border-gray-200 py-4">
            <table class="w-full text-sm">
              <tr class="mb-2">
                <td class="w-1/4 text-gray-500">客户姓名：</td>
                <td class="font-medium">${data.fullname}</td>
              </tr>
              <tr class="mb-2">
                <td class="text-gray-500">账户号码：</td>
                <td class="font-medium">**** **** **** ${Math.floor(Math.random() * 10000)}</td>
              </tr>
              <tr>
                <td class="text-gray-500">开户网点：</td>
                <td class="font-medium">工商银行${getRandomCity()}分行</td>
              </tr>
            </table>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">账户明细 ${data.servicePeriod}</h3>
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="bg-gray-50">
                  <th class="border border-gray-200 px-2 py-2 text-left">日期</th>
                  <th class="border border-gray-200 px-2 py-2 text-left">交易描述</th>
                  <th class="border border-gray-200 px-2 py-2 text-right">收入</th>
                  <th class="border border-gray-200 px-2 py-2 text-right">支出</th>
                  <th class="border border-gray-200 px-2 py-2 text-right">余额</th>
                </tr>
              </thead>
              <tbody>
                ${generateBankTransactions(5)}
              </tbody>
            </table>
          </div>
          
          <div class="text-xs text-gray-500 mt-8">
            <p class="mb-1">地址：${data.address}</p>
            <p>客服热线：95588 | 网站：www.icbc.com.cn</p>
          </div>
        </div>
      `
    }
  },
  
  // 美国模板
  us: {
    electricity: {
      name: "PG&E 电费单",
      class: "us-utility",
      generate: (data) => `
        <div class="p-6 us-utility">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-2xl font-bold text-blue-800 mb-1">${data.companyName}</h1>
              <p class="text-gray-600">Electric Service Bill</p>
            </div>
            <div class="text-right">
              <img src="https://picsum.photos/id/20/80/40" alt="Company Logo" class="h-10 mb-1">
              <p class="text-xs text-gray-500">www.pge.com</p>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row gap-6 mb-6">
            <div class="flex-1">
              <p class="text-sm font-semibold mb-1">TO:</p>
              <p class="font-medium">${data.fullname}</p>
              <p class="text-gray-700">${data.address}</p>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold mb-1">ACCOUNT NUMBER</p>
              <p class="font-medium">${generateCustomerNumber(12)}</p>
              <p class="text-sm text-gray-600 mt-2">Bill Date: ${data.formattedDate}</p>
              <p class="text-sm text-gray-600">Due Date: ${getDueDate(data.issueDate, 'us')}</p>
            </div>
          </div>
          
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div class="flex justify-between items-center">
              <p class="font-semibold">AMOUNT DUE</p>
              <p class="text-2xl font-bold text-blue-800">${data.currency}${data.amount}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold mb-2 border-b border-gray-200 pb-1">SERVICE SUMMARY</h3>
            <table class="w-full text-sm">
              <tr class="border-b border-gray-100">
                <td class="py-2 w-1/2">Service Period</td>
                <td class="py-2 font-medium">${data.servicePeriod}</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2">Meter Reading (Start)</td>
                <td class="py-2 font-medium">${Math.floor(Math.random() * 10000)}</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2">Meter Reading (End)</td>
                <td class="py-2 font-medium">${Math.floor(Math.random() * 10000) + 100}</td>
              </tr>
              <tr>
                <td class="py-2">Total Usage (kWh)</td>
                <td class="py-2 font-medium">${Math.floor(Math.random() * 500) + 100}</td>
              </tr>
            </table>
          </div>
          
          <div class="text-xs text-gray-500 mt-8">
            <p class="mb-1">Customer Service: 1-800-743-5000</p>
            <p>Payment options: Online, By phone, By mail, In person</p>
          </div>
        </div>
      `
    },
    creditcard: {
      name: "Chase 信用卡账单",
      class: "us-utility",
      generate: (data) => `
        <div class="p-6 us-utility">
          <div class="flex justify-between items-center mb-8">
            <div>
              <h1 class="text-2xl font-bold text-blue-900 mb-1">Chase Credit Card</h1>
              <p class="text-gray-600">Monthly Statement</p>
            </div>
            <div>
              <img src="https://picsum.photos/id/21/100/50" alt="Chase Bank" class="h-12">
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row gap-8 mb-8">
            <div>
              <p class="font-medium mb-1">${data.fullname}</p>
              <p class="text-gray-700">${data.address}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Statement Date: ${data.formattedDate}</p>
              <p class="text-sm text-gray-500">Payment Due Date: ${getDueDate(data.issueDate, 'us')}</p>
              <p class="text-sm text-gray-500 mt-1">Account Number: **** **** **** ${Math.floor(Math.random() * 10000)}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500">Previous Balance</p>
              <p class="text-xl font-bold">${data.currency}${(Math.random() * 800 + 200).toFixed(2)}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500">New Balance</p>
              <p class="text-xl font-bold text-red-600">${data.currency}${data.amount}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500">Minimum Payment Due</p>
              <p class="text-xl font-bold">${data.currency}${(data.amount * 0.1).toFixed(2)}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500">Available Credit</p>
              <p class="text-xl font-bold text-green-600">${data.currency}${(Math.random() * 5000 + 5000).toFixed(2)}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-semibold mb-3 border-b border-gray-200 pb-1">TRANSACTIONS</h3>
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-50">
                  <th class="text-left py-2">Date</th>
                  <th class="text-left py-2">Description</th>
                  <th class="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${generateCreditCardTransactions(6)}
              </tbody>
            </table>
          </div>
          
          <div class="text-xs text-gray-500 mt-8">
            <p class="mb-1">Customer Service: 1-800-432-3117</p>
            <p>Visit us online at chase.com</p>
          </div>
        </div>
      `
    }
  },
  
  // 通用模板 - 当特定国家/类型没有专用模板时使用
  default: {
    generate: (data) => `
      <div class="p-8">
        <!-- 头部 -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <h2 class="text-2xl font-bold text-primary mb-1">${data.companyName}</h2>
            <p class="text-gray-600 text-sm">${data.documentName}</p>
          </div>
          <div class="text-right">
            <div class="bg-primary/10 text-primary p-3 rounded-lg inline-block">
              <i class="fa ${data.icon} text-3xl"></i>
            </div>
          </div>
        </div>
        
        <!-- 账单信息 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">${data.lang === 'zh' ? '账单信息' : 'Bill Information'}</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-500">${data.lang === 'zh' ? '账单编号' : 'Bill Number'}</p>
              <p class="font-medium">${data.billId}</p>
            </div>
            <div>
              <p class="text-gray-500">${data.lang === 'zh' ? '开具日期' : 'Issue Date'}</p>
              <p class="font-medium">${data.formattedDate}</p>
            </div>
            <div>
              <p class="text-gray-500">${data.lang === 'zh' ? '服务周期' : 'Service Period'}</p>
              <p class="font-medium">${data.servicePeriod}</p>
            </div>
            <div>
              <p class="text-gray-500">${data.lang === 'zh' ? '金额' : 'Amount'}</p>
              <p class="font-medium text-primary">${data.currency}${data.amount}</p>
            </div>
          </div>
        </div>
        
        <!-- 客户信息 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">${data.lang === 'zh' ? '客户信息' : 'Customer Information'}</h3>
          <div class="text-sm">
            <p class="mb-1"><span class="text-gray-500">${data.lang === 'zh' ? '姓名' : 'Name'}：</span><span class="font-medium">${data.fullname}</span></p>
            <p class="mb-1"><span class="text-gray-500">${data.lang === 'zh' ? '国家/地区' : 'Country/Region'}：</span><span class="font-medium">${data.countryName}</span></p>
            <p><span class="text-gray-500">${data.lang === 'zh' ? '地址' : 'Address'}：</span><span class="font-medium">${data.address}</span></p>
          </div>
        </div>
        
        <!-- 底部信息 -->
        <div class="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-500">
          <p class="mb-2">${data.footerNote}</p>
          <p>${data.customerService}</p>
        </div>
      </div>
    `
  }
};

// 生成辅助函数
function generateCustomerNumber(length) {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getDueDate(issueDate, country = 'cn') {
  const date = new Date(issueDate);
  date.setDate(date.getDate() + 15); // 15天后到期
  
  if (country === 'us') {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getRandomCity() {
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '武汉'];
  return cities[Math.floor(Math.random() * cities.length)];
}

function generateBankTransactions(count) {
  const transactionTypes = [
    { type: '存款', desc: '工资入账', in: true },
    { type: '消费', desc: '超市购物', in: false },
    { type: '消费', desc: '餐饮消费', in: false },
    { type: '转账', desc: '转账收入', in: true },
    { type: '转账', desc: '转账支出', in: false },
    { type: 'ATM', desc: 'ATM取款', in: false }
  ];
  
  let balance = Math.floor(Math.random() * 10000) + 5000;
  let html = '';
  let date = new Date();
  
  for (let i = 0; i < count; i++) {
    date.setDate(date.getDate() - Math.floor(Math.random() * 5 + 1));
    const trans = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const amount = Math.floor(Math.random() * 1000) + 100;
    
    if (trans.in) {
      balance += amount;
      html += `
        <tr>
          <td class="border border-gray-200 px-2 py-2">${date.toLocaleDateString()}</td>
          <td class="border border-gray-200 px-2 py-2">${trans.desc}</td>
          <td class="border border-gray-200 px-2 py-2 text-right text-green-600">¥${amount}</td>
          <td class="border border-gray-200 px-2 py-2 text-right">-</td>
          <td class="border border-gray-200 px-2 py-2 text-right">¥${balance}</td>
        </tr>
      `;
    } else {
      balance -= amount;
      html += `
        <tr>
          <td class="border border-gray-200 px-2 py-2">${date.toLocaleDateString()}</td>
          <td class="border border-gray-200 px-2 py-2">${trans.desc}</td>
          <td class="border border-gray-200 px-2 py-2 text-right">-</td>
          <td class="border border-gray-200 px-2 py-2 text-right text-red-600">¥${amount}</td>
          <td class="border border-gray-200 px-2 py-2 text-right">¥${balance}</td>
        </tr>
      `;
    }
  }
  
  return html;
}

function generateCreditCardTransactions(count) {
  const merchants = [
    'Amazon.com', 'Walmart', 'Target', 'Starbucks', 'Uber', 
    'Netflix', 'Restaurant', 'Gas Station', 'Grocery Store', 'Pharmacy'
  ];
  
  let html = '';
  let date = new Date();
  
  for (let i = 0; i < count; i++) {
    date.setDate(date.getDate() - Math.floor(Math.random() * 7 + 1));
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const amount = (Math.random() * 200 + 10).toFixed(2);
    
    html += `
      <tr class="border-b border-gray-100">
        <td class="py-2">${date.toLocaleDateString('en-US')}</td>
        <td class="py-2">${merchant}</td>
        <td class="py-2 text-right">-$${amount}</td>
      </tr>
    `;
  }
  
  // 添加一笔还款记录
  date.setDate(date.getDate() - Math.floor(Math.random() * 7 + 1));
  const payment = (Math.random() * 500 + 100).toFixed(2);
  html += `
    <tr class="border-b border-gray-100">
      <td class="py-2">${date.toLocaleDateString('en-US')}</td>
      <td class="py-2">Payment Received</td>
      <td class="py-2 text-right text-green-600">+$${payment}</td>
    </tr>
  `;
  
  return html;
}

// 模板预览图
const templatePreviews = {
  'cn-electricity': {
    name: '中国电网电费单',
    image: 'https://picsum.photos/id/1025/300/200'
  },
  'cn-bank': {
    name: '工商银行对账单',
    image: 'https://picsum.photos/id/1026/300/200'
  },
  'us-electricity': {
    name: 'PG&E 电费单',
    image: 'https://picsum.photos/id/1027/300/200'
  },
  'us-creditcard': {
    name: 'Chase 信用卡账单',
    image: 'https://picsum.photos/id/1028/300/200'
  },
  'default-electricity': {
    name: '通用电费单',
    image: 'https://picsum.photos/id/1029/300/200'
  },
  'default-bank': {
    name: '通用银行账单',
    image: 'https://picsum.photos/id/1030/300/200'
  }
};