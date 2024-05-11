import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        Object.entries(products).map(([company, companyData]) => (
          <div key={company}>
            <h2>{company}</h2>
            {Object.entries(companyData).map(([category, categoryProducts]) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {categoryProducts.map((product, index) => (
                    <li key={index}>
                      <p>Name: {product.productName}</p>
                      <p>Price: {product.price}</p>
                      <p>Rating: {product.rating}</p>
                      <p>Discount: {product.discount}</p>
                      <p>Availability: {product.availability}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
