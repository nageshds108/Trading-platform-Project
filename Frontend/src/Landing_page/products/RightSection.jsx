function Rightsection({title,content,imgURL,}) {
    return ( 
        <div className="container">
        <div className="row p-5">
             <div className="col-5 p-5 mt-5">
                <h1>{title}</h1>
                <p className="text-muted">{content}</p>
                <a href="#" className="anchor">Learn More <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            <div className="col-1"></div>
            <div className="col-5 ">
                <img src={imgURL} alt="img" />
            </div>

        </div>

    </div>
     );
}

export default Rightsection;