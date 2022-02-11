import React,{useState} from "react";


const UserDetailsContext=React.createContext();

export const UserDetailsProvider =({children})=>{

  const [city,setCity]=useState('');
  const [token,setmyToken]=useState('');

 const setTokentoContext=()=>{
// setmyToken([
    

// ]);

console.log('setTokentoContext');
  };

    return(
        <UserDetailsContext.Provider
        value={{
            city:city,
            token:token
        }}
        >
                {children}
        </UserDetailsContext.Provider>
    );


};
export default UserDetailsContext;