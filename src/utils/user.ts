export const setUserDetails = (username: string, email: string) =>{
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
}

export const getUserDetails = (): {username: string; email: string;} | null =>{
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email){
        return {username, email};
    }
    return null;
};


export const removeUserDetails = () =>{
    localStorage.removeItem("username");
    localStorage.removeItem("email");

}