import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched or if there's an error
      }
    };

    // Fetch the user's profile if the user is not already set
    if (!user) {
      fetchUser();
    } else {
      setLoading(false); // If the user is already set, set loading to false immediately
    }
  }, [user]);

  const logout = async () => {
    await axios.post('/logout');
    setUser(null);
  };

  

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
