import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchUsers } from "../services/UserService";
import { useUserStore } from "../store/UseUserStore";

export const UseFetchAndUpdate = () => {
    const { data: users, isLoading } = useQuery('users', fetchUsers);
    const setUsers = useUserStore(state => state.setUsers);

    useEffect(() => {
        if(users)
        {
            setUsers(users)
        }
    }, [users, setUsers])

    return { isLoading };
}