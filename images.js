
module.exports = (app) => {
  // Gets Images from Unsplash
  const getImage = async (search) => {
    const response = await fetch(`https://api.unsplash.com/photos/?client_id=LaLRbCj9nu7xOtOcHBMN4NRubShAEvTsX-oMe1cP7XQ&query=${search}`);
    const unsplashJSON = await response.json(); //extract JSON from the http response
    return unsplashJSON;
  }

  const sendImage = async (req, res, next) => {
  try {
    const body = {}
    const urls = [];
    let url;
    url = await getImage(req.query.search);
    urls.push(url[0].urls.regular);
    
    if (urls.length == 0) {
      const err = new Error('Images not found');
      err.status = 404;
      throw err;
    }

    body["urls"] = urls;
    res.json(body);
  } 
  catch (e) {
    next(e);
  }
  };

  //Routes 
  app.get("/api/v1/images/:keyword", sendImage);

  app.get("/", (req, res) =>{
    res.send("Hello, please use /api/v1/images/<keyword> ");
  });

}

