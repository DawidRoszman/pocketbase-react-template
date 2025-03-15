import { Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/button';

const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="bg-primary text-primary-foreground flex justify-between px-10 py-2">
      <div>
        <Link to="/">Home</Link>
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
  );
};

export default Navbar;
