import React, { FC } from 'react'
import Chatspace from './components/Chatspace'
import Profile from './components/Profile'

interface SidebarProps {
  user: any
  mutateUser: () => void
}

const Sidebar: FC<SidebarProps> = ({ user, mutateUser }) => {

  return (
    <>
      <Chatspace user={user} />
      <Profile mutateUser={mutateUser} user={user} />
    </>
  )
}

export default Sidebar