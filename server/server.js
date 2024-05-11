const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC", "Keypad", "Bluetooth"];

const fetchData = async (company, category) => {
  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1NDI3NTk4LCJpYXQiOjE3MTU0MjcyOTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImY1MGQxZGZlLWEzN2MtNGFlMy1hMDgxLTA0MjI0NDM3OTlmMiIsInN1YiI6InRhbWlsc2VsdmFuNzcwODI2QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6Ik5HUElUIiwiY2xpZW50SUQiOiJmNTBkMWRmZS1hMzdjLTRhZTMtYTA4MS0wNDIyNDQzNzk5ZjIiLCJjbGllbnRTZWNyZXQiOiJnQWVvS09iT2lFc2NWYUFxIiwib3duZXJOYW1lIjoiVGFtaWxzZWx2YW4iLCJvd25lckVtYWlsIjoidGFtaWxzZWx2YW43NzA4MjZAZ21haWwuY29tIiwicm9sbE5vIjoiNzEwNzIxMjA1MDU1In0._KJbKKusnuWwqw3eGtWvKYQW1kz710jjQ5SiIjwJFxs'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${company}/${category}:`, error.message);
    return [];
  }
};

app.get('/products', async (req, res) => {
  const allData = {};
  try {
    for (const company of companies) {
      for (const category of categories) {
        if (!allData[company]) {
          allData[company] = {};
        }
        allData[company][category] = await fetchData(company, category);
      }
    }
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
