import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { modalStateSelector } from "store/redux/modal/selectors"
import { closeModalAction } from "store/redux/modal/actions"

import useWindowDimensions from "hooks/useWindowDimensions"
import RioModal from "components/commons/Modal"
import ModalContent from "./ModalContent"
import ModalTitle from "./ModalTitle"
import Loader from "./Loader"
import { MEDIUM_MOBILE } from "constants/breakPoints"

import "./styles.scss"

const hasBack = [3]
function AuthModal() {
  const dispatch = useDispatch()
  const modalState = useSelector(modalStateSelector)
  const { width: windowWidth } = useWindowDimensions()

  const [step, setStep] = useState(2)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (modalState.step) {
      setStep(modalState.step)
    }
  }, [modalState])

  const onClose = () => {
    if (step === 7) {
      setStep(2)
    }
    dispatch(closeModalAction())
  }

  const backScreen = () => {
    setStep(step - 1)
  }

  const isFullModal = windowWidth <= MEDIUM_MOBILE && step === 7

  if (!modalState.isOpen) {
    return null
  }

  return (
    <RioModal
      closable={false}
      onCancel={step !== 7 ? onClose : undefined}
      title={hasBack.includes(step) && <ModalTitle goBack={backScreen} />}
      width="600px"
      height="520px"
      destroyOnClose
      className="auth_modal"
      isFull={isFullModal}
      hideClose={step === 7}
      visible={modalState.isOpen}
    >
      {loading ? (
        <Loader />
      ) : (
        <ModalContent
          step={step}
          setStep={setStep}
          setLoading={setLoading}
          onClose={onClose}
        />
      )}
    </RioModal>
  )
}

export default AuthModal
