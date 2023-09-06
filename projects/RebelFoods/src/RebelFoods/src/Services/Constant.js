// For remove token form Local storage
export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("img");
    
  };
// For Logout 
  export const logoutApi = () => {
    removeToken();
    
  };
// For Page Refresh
  export const  pagereload=()=>{
    window.location.reload(false);
  }