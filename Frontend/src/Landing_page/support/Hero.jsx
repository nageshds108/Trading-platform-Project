function Hero() {
  return (
      <div className="Hero-div">
        <div
          className="container">
            <div className="wrapper">
              <p className="fs-4 mt-5">Support Portal </p>
               <a href=""  className="mt-5 fs-5" style={{ color: "white" }}>
                Track Tickets
              </a>


            </div>
          <div className="row p-5">
            <div className="col-5 offset-1">
              <p className="fs-4">
                Search for an answer or browse help topics to create a ticket
              </p>
              <input
                type="text"
                className="p-4 mb-4 mt-4"
                style={{
                  display: "block",
                  width: "100%",
                  height: "35%",
                  borderRadius: "5px",
                  border:"none"
                }}
                placeholder="Eg: how do i activate F&O, why is my order getting rejected.."
              />
              <a href="" style={{ color: "white" }}>
                Track account opening
              </a> &nbsp;&nbsp;&nbsp;
              <a href="" style={{ color: "white" }}>
                Track segment activation
              </a>&nbsp;&nbsp;&nbsp;
              <a href="" style={{ color: "white" }}>
                Intraday margins
              </a>&nbsp;&nbsp;&nbsp;
              <a href="" style={{ color: "white" }}>
                Kite user manual
              </a>
            </div>
            <div className="col-1"></div>
            <div className="col-5 ">
             
              <p className="fs-4">Featured</p>
              <ol style={{ lineHeight: "2.7" }}>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Current Takeovers and Delisting – January 2024
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Latest Intraday leverages – MIS & CO
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Hero;
