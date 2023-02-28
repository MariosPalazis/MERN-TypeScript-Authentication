import React from 'react';
import { useGlobalContext } from '../Wrappers/useUserContext';

interface LandingProps {
    
}

const Landing = () => {
    const { user } = useGlobalContext()

    return (
        <div>
            landing
            <div>{user.username}</div>
        </div>
    );
};

export default Landing;