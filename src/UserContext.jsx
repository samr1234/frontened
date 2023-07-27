import { createContext,useState,useEffect } from 'react';
import axios from 'axios';
export const UserContext = createContext({});

export  function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
        useEffect(() => {
          if(!user){
            axios.get('/profile').then(({data})=>{
                    setUser(data);
                    setLoading(true);
              })
            }

            console.log(user)


      },[]);
 
    return (
        <>
        <UserContext.Provider value={{user, setUser,loading}}>
        {children}
        </UserContext.Provider>
        </>
    )
}