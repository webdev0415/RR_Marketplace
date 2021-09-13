import React from "react"
import { Header, Footer } from "components/commons"
import AuthModal from "components/commons/AuthModal"
import "./styles.scss"

const DefaultLayout = ({ children, className }) => (
  <div className={`home_banner ${className || ""}`}>
    <Header />
    <div className="content">{children}</div>
    <Footer />
    <AuthModal />
  </div>
)

export default DefaultLayout
