import React from 'react';
import { useGlobalContext } from '../Wrappers/useUserContext';

interface DashboardProps {
    
}

const Dashboard = () => {
    const { user } = useGlobalContext()

    return (
        <div>
            dashboard
            <div>{user.username}</div>
        </div>
    );
};

export default Dashboard;