import React from "react";
import "./customerTable.css";

const CustomerTable = ({
  customers,
  transactions,
  filter,
  setFilter,
  onSelectCustomer,
}) => {
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.name.toLowerCase())
  );

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.amount >= filter.minAmount
  );

  return (
    <div className="table-container">
      <input
        type="text"
        className="input"
        placeholder="Filter by customer name"
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <input
        type="number"
        className="input"
        placeholder="Filter by transaction amount"
        value={filter.minAmount}
        onChange={(e) =>
          setFilter({ ...filter, minAmount: parseInt(e.target.value, 10) || 0 })
        }
      />
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} onClick={() => onSelectCustomer(customer.id)}>
              <td>{customer.name}</td>
              <td>
                {filteredTransactions
                  .filter(
                    (transaction) => transaction.customer_id === customer.id
                  )
                  .map((transaction) => (
                    <div key={transaction.id}>
                      {transaction.date}: ${transaction.amount}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
