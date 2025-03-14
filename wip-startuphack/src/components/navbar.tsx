import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="flex justify-between bg-primary text-primary-foreground px-10 py-2">
        <div>
            <p>Navbar</p>
        </div>
        <div>
            {auth.isLoggedIn ? (
                <Button onClick={() => auth.logout()}>Logout</Button>
            ) : (
                <div className="flex gap-2">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </div>
            )}
        </div>

    </div>
  )
}

export default Navbar;