'use client'

import { useProfile } from '@/src/hooks/useProfile';

interface UserInfoProps {

}

const UserInfo = ({} :UserInfoProps ) => {
  const { user, isLoading} = useProfile()

  return (
  <div>
    {isLoading ? 'Loading...' : (
      <>
        <h1>{user.id}</h1>
        <h1>{user.email}</h1>
        <h1>{user.firstName}</h1>
        <h1>{user.lastName}</h1>
        <h1>{user.moderator}</h1>
      </>
    )}
  </div>
 );
};

export default UserInfo;