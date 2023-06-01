export const getCurrentSession = ()=>{
    if (localStorage.getItem('session')) {
        const sessionString: any = localStorage.getItem('session');
        return JSON.parse(sessionString);
      }else{
        return null;
      }
}