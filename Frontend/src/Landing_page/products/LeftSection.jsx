function LeftSection({imgURL,title,content,link1,link2,PlaystoreLink,AppstoreLink}) {
    return ( 
    <div className="container ">
        <div className="row p-5">
            <div className="col-5">
                <img src={imgURL} alt="img" />
            </div>
            <div className="col-2"></div>
            <div className="col-5 p-5">
                <h1>{title}</h1>
                <p className="text-muted">{content}</p>
                <div className="mt-4 mb-4">
                <a href={"link1"} className="anchor">Try demo <i class="fa-solid fa-arrow-right-long"></i></a> &nbsp; &nbsp;
                <a href={"link2"} className="anchor">Learn More  <i class="fa-solid fa-arrow-right-long"></i></a>
                </div>
                <div>
                <a className="anchor" href=""><img src="/media/googlePlayBadge.svg" alt="img" /></a>
                <a  className="anchor ms-3" href=""> <img src="/media/appstoreBadge.svg" alt="img" /></a>
                </div>
                
                

            </div>

        </div>

    </div> );
}

export default LeftSection;