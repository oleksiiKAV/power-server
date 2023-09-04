export const generateAddProd = async() =>{
const path = require("path");
const fs = require("fs/promises");
const prodPath = path.join(__dirname, "../../data/products.json");
const prod = await fs.readFile(prodPath);
  
const productsData = JSON.parse(prod);

const randomIndex = Math.floor(Math.random() * productsData.length);
const selectedProduct = productsData[randomIndex];
const productId = selectedProduct._id.$oid;
const randomAmount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
const calories = selectedProduct.calories
const formattedDate = formatDate(new Date());
const obj= {
  "date": formattedDate.toString(),
  "product": productId.toString(),
  "amount": randomAmount
};
return[obj, calories]
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }