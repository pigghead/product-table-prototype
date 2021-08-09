import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;

    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? 
      product.name :
      <span style={{color:"red"}}>
        {product.name}
      </span>

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if(product.name.indexOf(filterText) === -1) {
        return;
      }

      if(product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow 
            category={product.category}
            key={product.category } />
        );
      }

      if (inStockOnly && !product.stocked) {
        return;
      }

      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      )
      lastCategory=product.category;
    });

    return (
      <table>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </tbody>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

// State
class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <div>
        <input 
          type="text" 
          placeholder="Search..."
          onChange={this.handleFilterTextChange}></input>
        <button type="submit">Search</button>
        <div>
          <input 
            type="checkbox"
            checked={this.props.inStockOnly} 
            onChange={this.handleInStockChange}/>
          <label>In stock only</label>
        </div>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);

    this.state = {filterText: '', inStockOnly: false}
  }

  handleInStockChange(inStockOnly) {
    this.setState({inStockOnly: inStockOnly});
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText})
  }

  render() {
    const products = this.props.products;
    const filterText = this.state.filterText;
    const inStockOnly = this.state.inStockOnly;

    return (
      <div>
        <SearchBar 
          filterText={filterText} 
          inStockOnly={inStockOnly} 
          onInStockChange={this.handleInStockChange}
          onFilterTextChange={this.handleFilterTextChange} />

        <ProductTable 
          products={products} 
          filterText={filterText} 
          inStockOnly={inStockOnly} />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
