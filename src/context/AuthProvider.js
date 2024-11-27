import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userphoto, setUserPhoto] = useState('');
    const [username, setUserName] = useState('');

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpire = localStorage.getItem('tokenExpire');
    const now = new Date();
    if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
        console.log("Token expired or not found.");
        setIsAuth(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
    } else {
        setIsAuth(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, userphoto, setUserPhoto, username, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



// import { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [Auth, setAuth] = useState(false);
//     const [userphoto, setUserPhoto] = useState('');
//     const [username, setUserName] = useState('');

//     const checkAuthStatus = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         const tokenExpire = localStorage.getItem('tokenExpire');
//         const now = new Date();
//         if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
//             setAuth(false);
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('tokenExpire');
//         } else {
//             setAuth(true);
//         }
//       };
    
//       useEffect(() => {
//         checkAuthStatus();
//       }, []);

//     return (
//         <AuthContext.Provider value={{ Auth, setAuth, userphoto, setUserPhoto, username, setUserName, checkAuthStatus}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default useAuth = () => useContext(AuthContext);