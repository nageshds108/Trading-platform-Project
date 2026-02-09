export default function Education() {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col">
          {" "}
          <img
            style={{ width: "90%" }}
            src="media\education.svg"
            alt="ed-img"
          />
        </div>
        <div className="col">
          <h2 className="mb-5">Free and open market education</h2>
          <p className="mb-4">
            {" "}
            Varsity, the largest online stock market education book in India,
            covering everything from the basics to advanced trading.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            {" "}
            versity <i class="fa-solid fa-arrow-right-long"></i>
          </a>

          <p className="mt-5 mb-4">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a style={{ textDecoration: "none" }} href="">
            Trading Q&A <i class="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
