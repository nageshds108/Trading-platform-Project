import { Link } from "react-router-dom";

function Universe() {
  return (


    <div className="container p-5 text-center">
      <h1 className="mt-5  ">The Zerodha Universe</h1>
      <p className="text-muted mb-5 mt-4">
        Extend your trading and investment experience even further with our partner platforms
      </p>

      <div className="row mt-5">
        <div className="col-4 mb-4">
          <img src="/media/smallcaseLogo.png" alt="Smallcase"  style={{width:"40%" , height:"40%"}} />
          <p className="text-muted small mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-4 mb-4">
          <img src="/media/streakLogo.png" alt="Streak"  style={{width:"40%", height:"45%" }} />
          <p className="text-muted small mt-3">
            Algo & strategy platform
          </p>
        </div>

        <div className="col-4 mb-4">
          <img src="/media/sensibullLogo.svg" alt="Sensibull"  style={{width:"40%" , height:"40%"}}/>
          <p className="text-muted small mt-3">
            Options trading platform
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4 mb-4">
          <img src="/media/zerodhaFundhouse.png" alt="Zerodha Fund House"  style={{width:"40%", height:"40%"}} />
          <p className="text-muted small mt-3">
            Asset management
          </p>
        </div>


        <div className="col-4 mb-4">
          <img src="/media/goldenpiLogo.png" alt="GoldenPi"  style={{width:"40%" , height:"40%"}} />
          <p className="text-muted small mt-3">
            Bonds trading platform
          </p>
        </div>

        <div className="col-4 mb-4">
          <img src="/media/dittoLogo.png" alt="Ditto"  style={{width:"40%" , height:"45%"}} />
          <p className="text-muted small mt-3">
            Insurance advisory
          </p>
        </div>

        
      </div>
      <div>
        <Link className="p-2 btn btn-primary fs-5 mt-5 mb-5" style={{ width: "20%", margin: " 0 auto" }} to="/signup">
          Signup now
        </Link>

      </div>
    </div>
  );
}

export default Universe;
