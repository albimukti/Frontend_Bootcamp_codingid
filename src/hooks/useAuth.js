import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function useAuth(){
    const { payload, isLoggedIn, login, logout } = useContext(AuthContext)
    
    return {
        payload,
        isLoggedIn,
        login,
        logout
    }
}