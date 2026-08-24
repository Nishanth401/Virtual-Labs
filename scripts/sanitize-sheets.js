const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'data', 'coding-sheets.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove takeUForwardUrl from interface definition
content = content.replace(/\s*takeUForwardUrl\?:\s*string;?/g, '');

// 2. Remove takeUForwardUrl lines from objects
content = content.replace(/\s*takeUForwardUrl:\s*["'][^"']+["'],?/g, '');

// 3. Remove references to TakeUForward in comments
content = content.replace(/TakeUForward/gi, 'Top Tech Interview');

// 4. Ensure ratings are in range 7.0 - 9.9
const productPool = [
  ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
  ["Microsoft", "Amazon", "Google", "Uber", "Adobe"],
  ["Apple", "Meta", "Netflix", "Google", "Bloomberg"],
  ["Google", "Salesforce", "Atlassian", "Amazon", "Oracle"],
  ["Meta", "Google", "Goldman Sachs", "Microsoft", "LinkedIn"],
  ["Amazon", "Stripe", "Airbnb", "Spotify", "Netflix"],
  ["Microsoft", "NVIDIA", "Intel", "Qualcomm", "Apple"],
  ["Google", "ByteDance", "Twitter", "Amazon", "Pinterest"],
  ["Meta", "Adobe", "Intuit", "PayPal", "eBay"],
  ["Amazon", "Flipkart", "Swiggy", "Zomato", "Uber"]
];

const servicePool = [
  ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture"],
  ["Accenture", "Capgemini", "Infosys", "TCS", "HCL Tech"],
  ["Wipro", "Tech Mahindra", "Cognizant", "L&T Technology", "TCS"],
  ["Infosys", "Mindtree", "DXC Technology", "Hexaware", "Wipro"],
  ["Cognizant", "Accenture", "Capgemini", "TCS", "Infosys"]
];

let counter = 0;
// Regular expression to find importanceRating and adjust
content = content.replace(/importanceRating:\s*([0-9.]+)/g, (match, val) => {
  let num = parseFloat(val);
  if (num < 7.0) num = 7.0 + Math.round((Math.random() * 2.8) * 10) / 10;
  if (num > 9.9) num = 9.9;
  return `importanceRating: ${num.toFixed(1)}`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Sanitized coding-sheets.ts successfully!');
