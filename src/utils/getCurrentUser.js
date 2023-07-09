// export const getCurrentUser = ()=>{
//     const { user } = JSON.parse(localStorage.getItem('auth'))
//     return user.user
// }

export const getCurrentUser = ()=>{
    const userJson = JSON.parse(localStorage.getItem('auth'))
    if(!userJson){
        window.location.href='/'
        return ;
    }
    return userJson.user.user
}