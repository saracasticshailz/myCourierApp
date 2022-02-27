const reducer =(state='',action)=>{
if(action.type == 'INSERTDATA'){
return state + action.payload
}else if(action.type == 'GETDATA'){
return '';
}else{
    return state;
}
}

export default reducer;