} from "../firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextProps {
user: User | null;
loading: boolean;
}


const AuthContext = createContext<AuthContextProps>({ user: null, loading: true });


export default function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
const unsub = onAuthStateChanged(auth, (currentUser) => {
setUser(currentUser);
setLoading(false);
});
return () => unsub();
}, []);


return (
<AuthContext.Provider value={{ user, loading }}>
{children}
</AuthContext.Provider>
);
}


export const useAuth = () => useContext(AuthContext);