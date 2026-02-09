

import { Link } from "react-router-dom";

export default function OpenAccount() {
    return (
        <div className="container ">
            <div className="row  text-center p-5">
                <h1 className="mt-5">Open a Zerodha account</h1>
                <p>Modern platforms and apps, ₹0 investmentsb , and flat ₹20 intraday and F&O trades </p>
                <Link className="p-2 btn btn-primary fs-5 mt-1" style={{ width: "20%", margin: " 0 auto" }} to="/signup">
                    Signup now
                </Link>
            </div>

        </div>
    );
}
