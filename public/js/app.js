const App = () => {
  const [products, setProducts] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
  });

  React.useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  function handleChange(e, value) {
    setFormData({
      ...formData,
      [value]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      return;
    }
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
          setFormData({
              name: '',
              price: ''
          })
        setProducts([...products, data]);
      });
  }

  function deleteProduct(productId) {
      fetch(`/api/products/${productId}`, {
          method: 'DELETE'
      }).then(res => res.json())
      .then(data => {
        fetchProducts();
      })
  }

  function generateList() {
    return products.map((item) => {
      return (
        <li
          className="list-group-item-primary list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
        >
          <div>
            <strong>{item.name} </strong>${item.price}
          </div>
          <button className="btn" onClick={() => deleteProduct(item.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </li>
      );
    });
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Add a product</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Product name"
                value={formData.name}
                onChange={() => handleChange(event, "name")}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="price">Product Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Product price"
                value={formData.price}
                onChange={() => handleChange(event, "price")}
              />
            </div>
            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
      <ul className="list-group mt-3">{generateList()}</ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
