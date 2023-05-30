export const getCurrentUser = ()=>{
    const { user } = JSON.parse(localStorage.getItem('auth'))
    return user.user
}