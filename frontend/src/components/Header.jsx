import { SignedIn, SignedOut, SignInButton, UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isSignedIn, getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  //Navigate to Dashboard after Login

  useEffect(() => {
    //check user signin is success
    if (!isSignedIn || !isLoaded) return;

    //check user in backend
    const checkUserAndNavigate = async () => {
      try {
        //get token shared by clerk
        let token = await getToken();
        console.log("token :", token);
        //make HTTP GET req to read user from API
        let res = await fetch("http://localhost:4000/user-api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
        let data = await res.json();
        console.log("data :",data)
        //first time user login
        if (data.firstLogin === true) {
          //navigate to role selection component
          navigate("/role-selection");
          return;
        }

        //get role of existing user
        let role = data.payload.role;
        console.log("role in header :",role)
        //if role is USER
        if (role === "USER") {
          //navigate to User dashboard
          navigate("/user-dashboard");
        } //if role is AUTHOR
        else {
          //navigate to Author dashbioard
          navigate("/author-dashboard");
        }
      } catch (err) {}
    };

    checkUserAndNavigate()
  }, [isSignedIn,isLoaded,navigate]);

  return (
    <nav className="navbar navbar-light bg-light px-4">
      {/* Left: Logo */}
      <a className="navbar-brand fw-bold" href="/">
        BlogApp
      </a>

      {/* Right: Auth buttons */}
      <div className="ms-auto">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
