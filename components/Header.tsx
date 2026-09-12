import Link from "next/link";
import { getProfile } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";

export async function Header() {
  const { user, profile } = await getProfile();
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand"><span className="brand-mark">A</span><span>AxomPrep <b>Pro</b></span></Link>
        <nav className="nav-links">
          <Link href="/notes">Notes</Link>
          <Link href="/tests">Mock Tests</Link>
          <Link href="/gk">Assam GK</Link>
          <Link href="/current-affairs">Current Affairs</Link>
        </nav>
        <div className="nav-actions">
          {user ? <><Link className="btn ghost" href={profile?.role === "admin" ? "/admin" : "/dashboard"}>{profile?.role === "admin" ? "Admin" : "Dashboard"}</Link><LogoutButton /></> :
          <><Link className="btn ghost" href="/login">Login</Link><Link className="btn primary" href="/signup">Get Started</Link></>}
        </div>
      </div>
    </header>
  );
}
