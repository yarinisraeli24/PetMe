import { useEffect, useState, useContext } from "react";
import { getBiEvents } from "../../../common/serverApi";
import {UserDataContext} from '../../../contexts/UserDataContext'
import LinearDashboardCard from "./LinearDashboardCard";
import PieDashboardCard from "./PieDashboardCard";


const DashboardPage = () => {
    const [likesBi, setLikesBi] = useState();
    const [likesRatioBi, setLikesRatioBi] = useState();

    const [takeMeBi, setTakeMeBi] = useState();

    const {userData} = useContext(UserDataContext)

    const getLikes = async () => {
        const {typeData} = await getBiEvents('Likes', userData.id)
        setLikesBi(typeData);
    }
    const getLikesRatio = async () => {
        const {ratio} = await getBiEvents('Likes', userData.id, 'true')
        setLikesRatioBi(ratio);
    }

    const getTakeMeHome = async () => {
        const {typeData} = await getBiEvents('takeMeHome', userData.id)
        setTakeMeBi(typeData);
    }

    useEffect(()=>{
        if(userData) {
            getLikes()
            getTakeMeHome()
            getLikesRatio()
        }
    },[userData])
    return (
        <div style={{display: 'flex'}}>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <LinearDashboardCard title={'Likes'} data={likesBi}/>
            <LinearDashboardCard title={'Take Me Home Requests'} data={takeMeBi}/>
            <PieDashboardCard title={'Female Male Ratio (Likes)'} data={likesRatioBi}/>
            {/* <LinearDashboardCard title={'Dashboard'}/> */}
            </div>
        </div>
    );
}

export default DashboardPage;