import { useEffect, useState } from 'react';


const UseAuth = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                setLoading(true);
                const fatchUser = await fetch('http://localhost:8000/api/auth/check', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'    
                })
    
                const data = await fatchUser.json();
                setUser(data.user);
                console.log(data);
            } catch (error) {
                console.log(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }; 
        checkUser();
    }, []);

    const logout = async () => {
        try {
            setLoading(true);
            await fetch('http://localhost:8000/api/auth/logout', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'    
            })
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, logout};
};

export default UseAuth;