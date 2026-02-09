function Brokerage() {

    return ( 
    
    <>


    <div className="container">
           <div className="row  p-5 mt-5 text-muted  border-top">
          <div className="col-8 p-5">
            <h3 style={{color:"#387ED1"}} className="fs-5 text-center" >Brokerage calculator</h3>
            <ul className="mt-4 ms-5" style={{lineHeight:"2.7",fontSize:"14px"}}>
              <li>
                Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
                GST per order.
              </li>

              <li>Digital contract notes will be sent via e-mail.</li>
              <li>
                Physical copies of contract notes, if required, shall be charged
                ₹20 per contract note. Courier charges apply.
              </li>
              <li>
                For NRI account (non-PIS), 0.5% or ₹100 per executed order for
                equity (whichever is lower).
              </li>

              <li>
                For NRI account (PIS), 0.5% or ₹200 per executed order for
                equity (whichever is lower).
              </li>
              <li>
                If the account is in debit balance, any order placed will be
                charged ₹40 per executed order instead of ₹20 per executed
                order.
              </li>
            </ul>
          </div>
          <div className="col-4 p-5">
            <h3 className="fs-5 text-center"  style={{color:"#387ED1"}}>List of charges</h3>
          </div>
        </div>
        
        
         </div>
    
    
    </>  );
}

export default Brokerage;