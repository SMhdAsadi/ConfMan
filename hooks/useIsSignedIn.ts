import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

function useIsSignedIn() {
	return useContext(AuthContext);
}

export default useIsSignedIn;
