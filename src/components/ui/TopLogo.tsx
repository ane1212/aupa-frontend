import React from 'react';
import logo from '../../assets/logo-trimmed.png'

export const TopLogo: React.FC = () => {
    return (
        <>
            <img className="logo" src={logo} alt="Logo" /><br />
        </>
    );
};

export default TopLogo;