import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Header } from "components/commons"
import Sidebar from "components/commons/Sidebar"
import useWindowDimensions from "hooks/useWindowDimensions"
import { IPAD_PORTRAIT } from "constants/breakPoints"
import AuthModal from "components/commons/AuthModal"
import "./styles.scss"

const DashboardLayout = ({ children }) => {
  const { width } = useWindowDimensions()
  const isSmallDevice = width <= IPAD_PORTRAIT

  const ContentWrapper = isSmallDevice ? React.Fragment : PerfectScrollbar

  return (
    <div className="RioDashboardContainer">
      <Header />
      <div className="DashboardInner">
        {!isSmallDevice && <Sidebar />}
        <div className="DashboardContent">
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </div>
      <AuthModal />
    </div>
  )
}

export default DashboardLayout
