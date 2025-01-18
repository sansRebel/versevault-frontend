import apiClient from "./axiosClient";

export const updateUser = async(data: {username?:string; email?: string; password?: string}) =>{
    try{
        const response = await apiClient.put("/api/user", data);
        return response.data;
    }catch(error){
        console.error("Error updating user: ", error);
    }


};


export const deleteUser = async() =>{
    try {
        const response = await apiClient.delete("/api/user");
        return response.data;
    } catch (error) {
        console.error("Error deleting account", error)
    }
}