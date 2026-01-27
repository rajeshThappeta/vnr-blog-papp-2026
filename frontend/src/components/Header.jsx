import { SignedOut, SignInButton, SignedIn, UserButton,useUser } from "@clerk/clerk-react";

function Header() {


    let {user}=useUser()

    console.log("user :",user)
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Header;
