import path from "path"
import express from "express"
import multer from "multer";
const app =express();
const PORT=8001;

const storage =multer.diskStorage({
    destination:function (req,file,cb){
        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload=multer({storage:storage})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("homepage")
})
app.post('/upload',upload.fields([{name:"profileImage"},{name:"coverImage"}]),(req,res)=>{
    console.log(req.files);
    console.log(req.body);

    return res.redirect("/")
})
app.listen(PORT,()=>console.log(`server litsen on port:${PORT}`))