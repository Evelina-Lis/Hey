const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
const multer = require("multer");
const upload = multer ({dest: "files"});
   
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layout", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
  
app.use("/views/contact.hbs", function(_, response){
       
    response.render("contact.hbs", {
        title: "Мои контакты",
        email: "Yurchenko@vvsu.ithub.com",
        phone: "+1234567890"
    });
}); 
  
app.get("/views/archive.hbs", function(request, response){
    response.render("archive.hbs", {
        title:"Archive",
        btnName : "Загрузить"
    });
});

app.post("/views/archive.hbs", upload.single("filedata"), function(request, response, next){
    let filedata = request.file;
    if(!filedata) response.send("Ошибка при загрузке");
    else
    response.render("archive.hbs", {
        title:"Archive",
        btnName : "Загрузить"
    });
});


app.use("/", function(_, response){

    response.render("home.hbs");
});
app.listen(3000);