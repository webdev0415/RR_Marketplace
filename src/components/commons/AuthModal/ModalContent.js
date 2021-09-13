import React from "react"

const StepOne = React.lazy(() => import("./StepOne"))
const StepTwo = React.lazy(() => import("./StepTwo"))
const StepThree = React.lazy(() => import("./StepThree"))
const CodeModal = React.lazy(() => import("./CodeModal"))
const RegistrationComplete = React.lazy(() => import("./RegComplete"))
const CompleteProfile = React.lazy(() => import("./CompleteProfile"))
const Congratulations = React.lazy(() => import("./Congratulations"))

const ModalContent = ({ step, setStep, setLoading, onClose }) => {
  switch (step) {
    case 1:
      return <StepOne setStep={setStep} setLoading={setLoading} />
    case 2:
      return <StepTwo setStep={setStep} setLoading={setLoading} />
    case 3:
      return <StepThree setStep={setStep} setLoading={setLoading} />
    case 4:
      return <CodeModal setStep={setStep} />
    case 5:
      return <RegistrationComplete setStep={setStep} setLoading={setLoading} />
    case 6:
      return <CompleteProfile setStep={setStep} setLoading={setLoading} />
    case 7:
      return <Congratulations closeModal={onClose} />
    default:
      return ""
  }
}

export default ModalContent
