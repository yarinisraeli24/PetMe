import { UserDataContext } from "../../contexts/UserDataContext";
import { getUserDetails } from '../../common/serverApi';
import React, { useContext, useEffect, useState} from "react";
 
 const ProfileDetailsPage=()=>{
    const { id } = useContext(UserDataContext)
    const [userDetails, setUserDetails] = useState([])

    useEffect(()=>{
        const setUserDetails = async (userId) => {
            const data = await getUserDetails(userId);
            setUserDetails(data)
        }
        setUserDetails(id);
    }, [])
  return (
    <div>
        {userDetails}
    </div>
  );

  }
export default ProfileDetailsPage;
