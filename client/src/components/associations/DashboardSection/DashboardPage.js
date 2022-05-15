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
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <LinearDashboardCard title={'Likes'} data={likesBi}/>
            <LinearDashboardCard title={'Take Me Home Requests'} data={takeMeBi}/>
            <PieDashboardCard title={'Dashboard'} data={likesRatioBi}/>
            <LinearDashboardCard title={'Dashboard'}/>
            </div>
            <div style={{width: '20%', margin: 20}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </div>
        </div>
    );
}

export default DashboardPage;