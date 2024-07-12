import React, { useState, useEffect } from "react";
import { fetchData } from "./services/api";
import CustomerTable from "./components/customerTable";
import TransactionChart from "./components/transactionChart";
import "./App.css";

const App = () => {
  const [data, setData] = useState({ customers: [], transactions: [] });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filter, setFilter] = useState({ name: "", minAmount: 0 });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    };

    getData();
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const filteredTransactions = data.transactions.filter(
    (tx) => tx.customer_id === selectedCustomer
  );

  return (
    <div className="app-container">
      <h1>Customer Transactions</h1>
      <CustomerTable
        customers={data.customers}
        transactions={data.transactions}
        filter={filter}
        setFilter={setFilter}
        onSelectCustomer={handleCustomerSelect}
      />
      {selectedCustomer && filteredTransactions.length > 0 && (
        <TransactionChart transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default App;
