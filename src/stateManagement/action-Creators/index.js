export const insertData=(data)=>{

    return(dispatch)=>{
         dispatch({
              type:'insertData',
              payload:data
         })
    }

}

export const getData=(data)=>{
    return(dispatch)=>{
        dispatch({
             type:'getData',
             payload:data
        })
   }
}