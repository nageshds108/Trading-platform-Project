function Hero() {
  return (
    <>
      <div className="container " > 

        <div className="row p-5 border-bottom mt-5 text-center">
          <h1>Pricing</h1>
          <h3 className="text-muted fs-4 mt-3 mb-5">
            Free equity investment and flat ₹20 traday and F&O trades
          </h3>
        </div>
        <div className="row mt-5 p-5 " >
          <div className="col text-center p-4">
            <img src="/media/pricing0.svg" alt="" />
            <h2 className="mt-4">Free equity delivery</h2>
            <p className="text-muted  mt-3">
              All equity delivery investments (NSE, BSE) are absolutely free —
              ₹0 brokerage.
            </p>
          </div>
          <div className="col text-center p-4">
            <img src="/media/intradayTrades.svg" alt="" />
            <h2 className="mt-4"> Intraday and F&O trades</h2>
            <p className="text-muted mt-3">
              Flat ₹20 or 0.03% (whichever is lower) per executed order on
              intraday trades across equity, currency, and commodity trades.
            </p>
          </div>
          <div className="col text-center p-4">
            <img src="/media/pricing0.svg" alt="" />
            <h2 className="mt-4">Free direct MF</h2>
            <p className="text-muted  mt-3">
              All direct mutual fund investments are absolutely free — ₹0
              commissions & DP charges.
            </p>
          </div>
        </div>

     
      </div>
    </>
  );
}

export default Hero;
