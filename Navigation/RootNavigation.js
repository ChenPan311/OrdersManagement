import React, { useState, useEffect } from 'react'
import { store } from '../store';
import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainNavigation'
import { connect } from 'react-redux';

const RootNavigation = () => {
    const [logged, setLogged] = useState(store.getState().user.token);

    useEffect(() => {
        console.log("called");
        isLogged();
    }, []);

    const isLogged = () => {
        store.getState().user.token ? setLogged(true) : setLogged(false);
    };

    return (
        logged ?
            <MainNavigation />
            :
            <AuthNavigation />
    )
}

export default connect()(RootNavigation);
