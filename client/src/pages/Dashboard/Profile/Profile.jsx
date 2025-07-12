import React from 'react'
import css from './Profile.module.css'
import { Link } from 'react-router-dom'
function Profile() {
  const user = {
  firstName: "Abenezer",
  lastName: "Zewge",
  email: "abenezer@zewge.com",
  role: "Admin",
  registeredAt: "2025-07-11",
  active: true,
  id: "U-8741"
};

  return (
    <>
     <div className={css.profile}>
      <div className={css.head}>
        <div className={css.contents}>
          <h1>Profile</h1>
          <p> <Link to="/">Home</Link> &gt; <Link to="/dashboard">Dashboard</Link> &gt; Profile</p>
        </div>
      </div>
       <div className={css.container}>
      <div className={css.card}>
        <div className={css.header}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt="User avatar"
            className={css.avatar}
          />
          <div>
            <h2 className={css.name}>{user.firstName} {user.lastName}</h2>
            <p className={css.email}>{user.email}</p>
          </div>
        </div>

        <div className={css.infoGrid}>
          <div><span>Role:</span> {user.role}</div>
          <div><span>Registered:</span> {user.registeredAt}</div>
          <div>
            <span>Status:</span>
            <span className={`${css.badge} ${user.active ? css.active : css.inactive}`}>
              {user.active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div><span>User ID:</span> {user.id}</div>
        </div>
      <button className={css.login}>Log Out</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Profile


