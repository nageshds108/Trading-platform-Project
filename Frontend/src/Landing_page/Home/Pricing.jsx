export default function Pricing() {
  return (
    <div className="container p-5">
      <div className="row p-5">
        <div className="col-4">
          <h1>Unbeatable pricing</h1>
          <p className="mt-4 mb-2">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See pricing <i class="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <div className=" row text-center">
            <div className=" col border p-5">
              {" "}
              <h1 className="mb-3">₹0</h1> Free equity delivery and direct
              mutual funds
            </div>
            <div className=" col border p-5">
              {" "}
              <h1 className="mb-3">₹20</h1> Inraday and F&O{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
