import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

function useIsSignedOut() {
	return !useContext(AuthContext);
}

export default useIsSignedOut;
