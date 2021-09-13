import React from "react"
import RioTable from "components/commons/Table"

const dataSource = [
  {
    key: 0,
    event: "Sales",
    price: "0.045 ETH",
    from: "Riotracers",
    to: "A5B2R5",
    date: "19 days ago",
  },
  {
    key: 1,
    event: "Transfer",
    price: "0.045 ETH",
    from: "Riotracers",
    to: "A5B2R5",
    date: "19 days ago",
  },
  {
    key: 2,
    event: "Sales",
    price: "0.015 ETH",
    from: "Riotracers",
    to: "B32344",
    date: "21 days ago",
  },
  {
    key: 3,
    event: "Transfer",
    price: "0.015 ETH",
    from: "Riotracers",
    to: "B32344",
    date: "23 days ago",
  },
]

const columns = [
  {
    title: "Event",
    dataIndex: "event",
    key: "event",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Form",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
]

const SalesTable = () => (
  <RioTable
    title="Sales Histories"
    className="sales-histories"
    source={dataSource}
    columns={columns}
  />
)

export default SalesTable
