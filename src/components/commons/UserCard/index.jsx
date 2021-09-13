import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import {
  getUserSelector,
  getProfilePictureSelector,
} from "store/redux/auth/selectors"

import "./styles.scss"

const UserCard = () => {
  const user = useSelector(getUserSelector)
  const userPic = useSelector(getProfilePictureSelector)
  if (!user) {
    return null
  }
  return (
    <div className="user_details">
      <img src={userPic} alt="" />
      <Link to="/dashboard/overview">
        <div className="myAccount">My Account</div>
      </Link>
      <div className="date">
        Since {dayjs(user.createdAt).format("MMMM, YYYY")}
      </div>
    </div>
  )
}

export default UserCard
