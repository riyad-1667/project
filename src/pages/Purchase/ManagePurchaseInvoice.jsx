import { useEffect, useState } from "react";

const ManagePurchaseInvoice = () => {
  const [purchaseInvoices, setPurchaseInvoices] = useState([]);
  useEffect(() => {
    fetch("http://riyad.intelsofts.com/projects/Retail_&_Distibutor_Shop/api/invoice")
      .then((res) => res.json())
      .then((data) => setPurchaseInvoices(data.invoices));
  }, []);
  return (
    <div className="container mt-2 card p-3">
      <h3 className="mx-2">Invoice List</h3>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Invoice Total</th>
            <th>Paid Total</th>
            <th>Previous Due</th>
            <th>Payment Term</th>
            <th>Remark</th>
            <th className="text-center">Actions</th>

          </tr>
        </thead>
        <tbody>
          {purchaseInvoices.length > 0 ? (
            purchaseInvoices.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.customer_id}</td>
                <td>{item.invoice_total}</td>
                <td>{item.paid_total}</td>
                <td>{item.previous_due}</td>
                <td>{item.payment_term}</td>
                <td>{item.remark}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-info">View</button>
                  <button className="btn btn-sm btn-primary">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ManagePurchaseInvoice;
