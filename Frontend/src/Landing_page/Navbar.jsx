import {Link} from "react-router-dom"

export default function Navbar () {
    return (
        <div>
            <nav className="navbar border-bottom navbar-expand-lg bg-body-tertiary">
  <div className="container p-1 ">
    <Link className="navbar-brand ms-5" to="/"><img style={{width:"25%"}} src="media\logo.svg" alt="logo-img" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/signup" >Signup</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link active"  to="/about">About</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link active" to="/products">Products</Link>
        </li>
        <li className="nav-item "  >
          <Link className="nav-link active" to="/pricing" >Pricing</Link>
        </li>
         <li className="nav-item "  >
          <Link className="nav-link  active" to="/support" >Support</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

        </div>
      );
}
