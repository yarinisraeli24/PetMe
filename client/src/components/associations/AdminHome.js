import PetsSection from './PetsSection/PetsSection';
import TakeMeHomeSection from './TakeMeHomeSection/TakeMeHomeSection'
import DashboardSection from './DashboardSection/DashboardSection'
import './AdminHome.css'

const AdminHome = () => {
    return (
        <div className='homeContainer'>
            <PetsSection />
            <DashboardSection />
            <TakeMeHomeSection />
        </div>
    );
}

export default AdminHome;