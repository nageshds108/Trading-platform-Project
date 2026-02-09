

import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div className="container ">
            <div className="row  text-center p-5">
                <img src="media/homeHero.png" alt="Hero Img" className="mb-3" />
                <h1 className="mt-5">Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds and more </p>
                <Link className="p-2 btn btn-primary fs-5 mt-3" style={{ width: "20%", margin: " 0 auto" }} to="/signup">
                    Signup now
                </Link>
            </div>

        </div>
    );
}

