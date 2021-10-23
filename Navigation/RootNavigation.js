import React, { useState, useEffect } from 'react'
import { store } from '../store';
import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainNavigation'
import { useSelector } from 'react-redux';

const RootNavigation = () => {
    const { token } = useSelector(state => state.user)
    const [logged, setLogged] = useState(token ? true : false);

    useEffect(() => {
        isLogged();
    }, [token]);

    const isLogged = () => {
        token ? setLogged(true) : setLogged(false);
    };

    return (
        logged ?
            <MainNavigation />
            :
            <AuthNavigation />
    )
}

export default RootNavigation;
