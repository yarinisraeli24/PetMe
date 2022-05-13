import { useEffect, useState, useContext } from "react";
import { getBiEvents } from "../../../common/serverApi";
import {UserDataContext} from '../../../contexts/UserDataContext'
import DashboardCard from "./DashboardCard";

const DashboardPage = () => {
    const [biData, setBiData] = useState();
    const {userData} = useContext(UserDataContext)
    useEffect(()=>{
        const getBiData = async () => {
            const bis = await getBiEvents('Likes', userData.id)
            setBiData(bis);
        }
        getBiData()
    },[userData])
    return (
        <div style={{display: 'flex'}}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <DashboardCard title={'Dashboard'}/>
            <DashboardCard title={'Dashboard'}/>
            <DashboardCard title={'Dashboard'}/>
            <DashboardCard title={'Dashboard'}/>
            </div>
            <div style={{width: '20%', margin: 20}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </div>
        </div>
    );
}

export default DashboardPage;