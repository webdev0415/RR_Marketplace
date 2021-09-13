import React, { Component } from "react"
import { withTranslation } from "react-i18next"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    const { children, t } = this.props
    return hasError ? <h2>{t("apologize")}</h2> : children
  }
}

export default withTranslation()(ErrorBoundary)
