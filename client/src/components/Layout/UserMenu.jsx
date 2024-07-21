import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div>
        <div className="text-center">
        <h1 className="m-3">Dashboard</h1>
        <div className="list-group">
          <NavLink
            to="/dashboard/user"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
      </div>
      </div>
    </div>
  )
}

export default UserMenu