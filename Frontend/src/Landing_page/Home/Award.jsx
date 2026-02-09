import React from 'react';


export default  function  Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row '>
                <div className='col p-5'>
                    <img src="media\largestBroker.svg" alt="brokr Img" />
                </div>
                <div className='col p-5 mt-3'>
                    <h1>Largest Stock Broker In India</h1>
                    <p className='mb-5 mt-1'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                    <div className='row'>
                        <div className='col'>
                            <ul>
                                <p><li>Futures and Options</li></p>
                                <p><li>Comodity derivatives</li></p>
                                <p><li>Currency derivatives</li></p>

                            </ul>
                        </div>
                        <div className='col'>
                            <ul>
                               <p><li>Stocks and IPOs</li></p>
                                <p><li>Direct mutual funds </li></p>
                                <p><li>Bonds and Govt. securities</li></p>
                            </ul>
                        </div>
                        <img src="media\pressLogos.png" alt="press img" style={{width:"90%"}}  className='mt-4'/>
                    </div>
                </div>
            </div>


        </div>
    );
}