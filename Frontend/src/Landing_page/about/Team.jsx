function Team() {
    return ( 
    <div>

        <div className=" container text-center border-top p-5">
            <h1>People</h1>
            <div className="row text-center text-muted mt-5" style={{ lineHeight:'1.8',fontSize:"1.2em"}}>
                <div className="col-6 p-5">
                    <img src="./media/nithinKamath.jpg" alt="img" style={{borderRadius:"100%" , width:"50%"}} />
                    <h4 className="mt-5">Nithin Kamath</h4>
                    <h6> Founder, CEO</h6>
                </div>
                <div className="col-6 p-5" style={{textAlign:"justify"}}>
                    <p>
                        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry. 
                        </p>
                         <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC). </p>
                         <p>Playing basketball is his zen. 
                           </p>  <p className="team-a"> <a href="#">Connect on Homepage</a> / <a href="#">TradingQnA</a>  /  <a href="#">Twitter </a> </p>

                </div>
            </div>

        </div>
        

    </div> );
}

export default Team;