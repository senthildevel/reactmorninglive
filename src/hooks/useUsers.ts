
import { useState, useEffect } from "react";
import UserService, { User, CanceledError } from "../services/user-service";
const useUsers = () => {
  
    const [users, setUsers] = useState<User[]>([]);

    const [error, setError] = useState("");
  
    const [isLoading, setLoading] = useState(true);
   

    useEffect(() => {      
        setLoading(true);      
        const { apiresponse, cancel } = UserService.getList<User>();
        apiresponse
          .then((response) => {
            console.log(response.data);
    
            setUsers(response.data);
            setError("");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.message);
            console.log(error);
            // person instanceof Person
            if (error instanceof CanceledError) return;
    
            setError(error.message);
            setUsers([]);
            setLoading(false);
          });  
    
        return () => cancel();
      }, []);


      return {users, setUsers, error, setError, isLoading, setLoading}
}

export default useUsers