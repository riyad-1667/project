import React, { useEffect, useState } from "react";

const PurchaseInvoice = () => {
    const baseUrl= "http://riyad.intelsofts.com/projects/Retail_&_Distibutor_Shop/api/";
    const company={
        logo:'',
        name:'Company Name',
        city:'',
        area:'',
        street_address:''

    }
    const products=[
        {id:1,name:'pd name'}
    ]
    const customers=[
        {id:1,name:'c Name'}
    ]
  const [cart, setCart] = useState([]);
  const [unit, setUnit] = useState(1);
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [customerId, setCustomerId] = useState(customers[0]?.id || "");
  const [companies,setCompanies]=useState([]);
  const [allProducts,setAllProducts]=useState([]);
  useEffect(()=>{
    fetch('http://riyad.intelsofts.com/projects/Retail_&_Distibutor_Shop/api/product')
    .then(res=>res.json())
    .then(data=>setAllProducts(data.products))
  },[])
//   console.log(allroducts);
  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const addItem = () => {
    const product = allProducts.find((p) => p.id === productId);
    const lineTotal = unit * price;
    const newItem = {
      id: cart.length + 1,
      desc: product?.name,
      product_id: productId,
      qty: unit,
      price: price,
      discount: 0,
      vat: 0,
      lineTotal,
    };
    setCart([...cart, newItem]);
  };

  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);

  const createInvoice = async () => {
    if (!window.confirm("Are you sure?")) return;

    const invoiceData = {
      created_at: date,
      updated_at: date,
      customer_id: customerId,
      remark: "Na",
      payment_term: "CASH",
      invoice_total: subtotal,
      paid_total: subtotal,
      previous_due: 0,
      items: cart,
    };

    const response = await fetch(`${baseUrl}/invoice/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    const result = await response.json();
    console.log(result);
    setCart([]);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center text-center mb-3">
          <div className="col-sm-6 text-sm-start">
            <img
              src={`${baseUrl}/img/${company.logo}`}
              width="100"
              alt="Company Logo"
            />
          </div>
          <div className="col text-sm-end mt-3 mt-sm-0">
            <h2 className="mb-3">Invoice</h2>
            <h5>{company.name}</h5>
            <p className="fs--1 mb-0">
              {company.street_address}
              <br />
              {company.area}, {company.city}
            </p>
          </div>
          <div className="col-12">
            <hr />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col">
            <h6 className="text-500">Invoice to</h6>
            <select
              className="form-select"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <p className="fs--1">
              1250 dhaka,road-125
              <br />
              Good customer
              <br />
              Bangladesh
            </p>
            <p className="fs--1">
              <a href="mailto:customer@gmail.com">customer@gmail.com</a>
              <br />
              <a href="tel:+88017">+88 017********</a>
            </p>
          </div>
          <div className="col-sm-auto ms-auto">
            <table className="table table-sm table-borderless fs--1">
              <tbody>
                <tr>
                  <th className="text-sm-end">Invoice No:</th>
                  <td>{12345}</td>
                </tr>
                <tr>
                  <th className="text-sm-end">Invoice Date:</th>
                  <td>{date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-responsive scrollbar mt-4 fs--1">
          <table className="table table-striped border-bottom">
            <thead className="light">
              <tr className="bg-primary text-white dark__bg-1000">
                <th>Products</th>
                <th className="text-center">Quantity</th>
                <th className="text-end">Rate</th>
                <th className="text-end">Amount</th>
                <th className="text-end"></th>
              </tr>
              <tr className="text-white dark__bg-1000">
                <th>
                  <select
                    className="form-select"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  >
                    {allProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="text-center">
                  <input
                    type="number"
                    className="form-control"
                    value={unit}
                    onChange={(e) => setUnit(Number(e.target.value))}
                  />
                </th>
                <th className="text-end">
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </th>
                <th className="text-end"></th>
                <th className="text-end">
                  <button className="btn btn-primary w-100" onClick={addItem}>
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <h6 className="mb-0 text-nowrap">{item.desc}</h6>
                    {/* <p className="mb-0">{item.id}</p> */}
                  </td>
                  <td className="align-middle text-center">{item.qty}</td>
                  <td className="align-middle text-end">{item.price}</td>
                  <td className="align-middle text-end">{item.lineTotal}</td>
                  <td className="align-middle text-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row justify-content-end">
          <div className="col-auto">
            <table className="table table-sm table-borderless fs--1 text-end">
              <tbody>
                <tr>
                  <th className="text-900">Subtotal:</th>
                  <td className="fw-semi-bold">${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <th className="text-900">Tax:</th>
                  <td className="fw-semi-bold">$0.00</td>
                </tr>
                <tr className="border-top">
                  <th className="text-900">Total:</th>
                  <td className="fw-semi-bold">${subtotal.toFixed(2)}</td>
                </tr>
                <tr className="border-top border-top-2 fw-bolder text-900">
                  <th>Amount Due:</th>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button className="btn btn-primary" onClick={createInvoice}>
                      Create Invoice
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card-footer bg-light">
        <p className="fs--1 mb-0">
          <strong>Notes: </strong>We really appreciate your business and if
          there’s anything else we can do, please let us know!
        </p>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
