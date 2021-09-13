import React from "react"
import { Input as AntInput } from "antd"

import "./styles.scss"

const { Search } = AntInput

const SearchBar = ({ onSearch }) => (
  <div className="searchBar">
    <Search placeholder="input search" onSearch={onSearch} enterButton />
  </div>
)

export default SearchBar
