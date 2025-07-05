import React, { use } from 'react'

const userContext = () => {
    const useProvider = () => {
        const [user, setUser] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        
        useEffect(() => {
            if (user) return;
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setLoading(false);
                return;
            }
            const fetchUser = async () => {
        }, []);
  return (
    <div>

    </div>
  )
}

export default userContext