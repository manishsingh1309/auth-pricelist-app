import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pricelist.css';

function Pricelist() {
  const [language, setLanguage] = useState('en');
  const [products, setProducts] = useState([]);
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const updateProduct = async (id, field, value) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ field, value })
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p.id === id ? { ...p, [field]: value } : p
        ));
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const flagUrl = language === 'en' 
    ? 'https://storage.123fakturere.no/public/flags/GB.png'
    : 'https://storage.123fakturere.no/public/flags/SE.png';

  const userName = localStorage.getItem('userName') || 'John Andre';
  const userLocation = localStorage.getItem('userLocation') || 'Storfjord AS';

  return (
    <div className="pricelist-container">
      <div className="pricelist-header">
        <div className="user-info">
          <div className="user-avatar"></div>
          <div className="user-details">
            <div className="user-name">{userName}</div>
            <div className="user-location">{userLocation}</div>
          </div>
        </div>

        <div className="language-selector" onClick={() => switchLanguage(language === 'en' ? 'sv' : 'en')}>
          <span className="language-text">{language === 'en' ? 'English' : 'Norsk Bokmal'}</span>
          <img src={flagUrl} alt="Flag" className="flag" />
        </div>
      </div>

      <div className="menu-section">
        <h2 className="menu-title">Menu</h2>
        <nav className="menu-list">
          <a href="#" className="menu-item">Invoices</a>
          <a href="#" className="menu-item">Customers</a>
          <a href="#" className="menu-item">My Business</a>
          <a href="#" className="menu-item">Invoice Journal</a>
          <a href="#" className="menu-item active">Price List</a>
          <a href="#" className="menu-item">Multiple Invoicing</a>
          <a href="#" className="menu-item">Unpaid Invoices</a>
          <a href="#" className="menu-item">Offer</a>
          <a href="#" className="menu-item">Inventory Control</a>
          <a href="#" className="menu-item">Member Invoicing</a>
          <a href="#" className="menu-item">Import/Export</a>
          <a href="#" className="menu-item" onClick={handleLogout}>Log out</a>
        </nav>
      </div>

      <div className="pricelist-main">
        <div className="search-section">
          <div className="search-group">
            <input
              type="text"
              placeholder="Search Article No..."
              value={searchArticle}
              onChange={(e) => setSearchArticle(e.target.value)}
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>

          <div className="search-group">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn new-product">+ New Product</button>
          <button className="action-btn print-list">🖨️ Print List</button>
          <button className="action-btn advanced-mode">⚙️ Advanced mode</button>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Article No. ↕</th>
                <th>Product/Service ↕</th>
                <th>In Price</th>
                <th>Price</th>
                <th>Unit</th>
                <th>In Stock</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="text"
                      value={product.article_no}
                      onChange={(e) => updateProduct(product.id, 'article_no', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.product_service}
                      onChange={(e) => updateProduct(product.id, 'product_service', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.in_price}
                      onChange={(e) => updateProduct(product.id, 'in_price', e.target.value)}
                      className="table-input number-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                      className="table-input number-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.unit}
                      onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.in_stock}
                      onChange={(e) => updateProduct(product.id, 'in_stock', e.target.value)}
                      className="table-input number-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <button className="more-btn">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pricelist;
