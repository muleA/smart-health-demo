export const getCurrentSession = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('session')) {
    const sessionString = localStorage.getItem('session');
    console.log("sessionString",sessionString)
    return JSON.parse(sessionString??"");
  } else {
    return null;
  }
};
