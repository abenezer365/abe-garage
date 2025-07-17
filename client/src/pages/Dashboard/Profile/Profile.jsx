import React, { useContext } from 'react'
import css from './Profile.module.css'
import { Link } from 'react-router-dom'
import { Context } from '../../../components/Context';
function Profile() {
  const {state} = useContext(Context)
  const user = state.user
  const iso = user.created_at;
  const date = new Date(iso);
  const registeredAt = date.toLocaleDateString();
  return (
    <>
     <div className={css.profile}>
      <div className={css.head}>
        <div className={css.contents}>
          <h1>Profile</h1>
          <p> <Link to="/">Home</Link> &gt; Profile</p>
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
            <h2 className={css.name}>{user.first_name} {user.last_name}</h2>
            <p className={css.email}>{user.email}</p>
          </div>
        </div>

        <div className={css.infoGrid}>
          <div><span>Role:</span> {user.role}</div>
          <div><span>Registered:</span> {registeredAt}</div>
          <div>
            <span>Status:</span>
            <span className={`${css.badge} ${user.is_active === 1 ? css.active : css.inactive}`}>
              {user.is_active === 1 ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div><span>User ID:</span> {user.user_id}</div>
        </div>
      <button className={css.login}>Log Out</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Profile


