

export default function Footer () {
    return (
        <footer className="border-top" style={{backgroundColor:"rgb(250,250,250)" }}>
        <div className="container " >
            <div className="row mt-5">
            <div className="col">
                <img src="media\logo.svg" alt="logo-img" style={{width:"40%"}} />
                <p>© 2010 – 2024, Not Zerodha Broking Ltd.
All rights reserved.</p>
            </div>
            <div className="col">
                <ul>
                    <li>Company</li>
                    <li  className="text-muted footer-list">About</li>
                    <li className="text-muted footer-list">Products</li>
                    <li className="text-muted footer-list">Pricing</li>
                    <li className="text-muted footer-list">Referral programme</li>
                    <li className="text-muted footer-list">Careers</li>
                    <li className="text-muted footer-list">Zerodha.tech</li>
                    <li className="text-muted footer-list">Press & media</li>
                    <li className="text-muted footer-list">Zerodha cares (CSR)</li>
                </ul>
                </div>
            <div className="col">
                <ul>
                    <li>Contact</li>
                    <li   className="text-muted footer-list">Support portal</li>
                    <li  className="text-muted footer-list">Z-Connect blog</li>
                    <li  className="text-muted footer-list">List of charges</li>
                    <li  className="text-muted footer-list">Downloads & resources</li>
                </ul>


            </div>
            <div className="col">
                <ul>
                    <li>Account</li>
                    <li  className="text-muted footer-list">Fund transfer</li>
                    <li  className="text-muted footer-list"> 60 days challenge</li>
                    <li  className="text-muted footer-list">Open an account</li>
                </ul>
            </div>

            <div className="mt-5 text-muted" style={{fontSize:"14px"}}>
                <p>Zerodha Broking Ltd.: Member of NSE & BSE – SEBI Registration no.: INZ000031633 CDSL: Depository services through Zerodha Securities Pvt. Ltd. – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru – 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com
, for DP related complaints write to dp@zerodha.com
. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF.</p>
                <p>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.</p>
                <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
                <p>Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets – once KYC is done through a SEBI registered intermediary you need not undergo the same process again when you approach another intermediary.” Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non-allotment the funds will remain in your bank account.</p>
            </div>
            </div>

        </div>
        <div className="p-5 text-center">
            <a href="" className="footer-base-list">NSE</a>
            <a href="" className="footer-base-list"> BSE</a>
            <a href="" className="footer-base-list"> MCX</a>
            <a href="" className="footer-base-list">Terms & conditions </a>
            <a href="" className="footer-base-list"> Policies & procedures </a>
            <a href="" className="footer-base-list"> Privacy policy </a>
            <a href="" className="footer-base-list"> Disclosure</a>
        </div>
        </footer>
      );
}
