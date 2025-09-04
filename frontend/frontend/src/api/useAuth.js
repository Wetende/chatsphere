import { useAuth as useAuthFromProvider } from "../Components/auth/AuthProvider";

const useAuth = () => {
    return useAuthFromProvider();
}

export default useAuth; 