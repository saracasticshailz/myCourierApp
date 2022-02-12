import React, { useState } from 'react'

const LoginContext=React.createContext();
const [city,_setCity]=useState();
const [mobNo,setMobNo]=useState();
const [tokenL,setTokenL]=useState();
const setCity=((param)=>{
_setCity(param);
});
const loginDetails = {
    firstname:"shreesha",
    lastname:"",
    mobilenumber:mobNo,
    email:"",
    password:"",
    fcmtoken:"",
    lat:"",
    long:"",
    city:city,
    country:"",
    Device_lang:"",
    deviceid:"",
    deviceMake:"",
    deviceModel:"",
    appversion:"",
    isLoggedIn: false,
    loginToken:""

    };


export const LoginProvider=({children})=>{
return <LoginContext.Provider 
value={{data:loginDetails,setCity}}>
    {children}
</LoginContext.Provider>
};

export default LoginContext;



