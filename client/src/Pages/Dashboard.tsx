import React from 'react';
import { useGlobalContext } from '../Wrappers/useUserContext';
import { useAuth } from '../hooks/useAuth';
interface DashboardProps {
    
}

const Dashboard = () => {
    const { stored } = useAuth()

    return (
        <div>
            dashboard
            <div>{stored.username}</div>
        </div>
    );
};

export default Dashboard;