module.exports =(app) =>{
    //Home Page
    app.get("/", (req, res) => {
        res.render("index", {});
      });
}