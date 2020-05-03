const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect("mongodb://localhost:27017/countryDB", { useNewUrlParser: true, useUnifiedTopology: true });

const countrySchema = {
    countryName: String,
    countryCode: String
};

const Country = mongoose.model("Country", countrySchema);

app.get("/allCountries", function(req, res) {
    // body... 
    Country.find({},{_id:0,countryName:1 ,countryCode:1},function(err, Countries) {
        if (!err) {
            res.send(Countries);
        } else {
            res.send(err);
        }


    })
});

app.post("/putCountry",function (req,res) {
    // body... 
    const newCountry=new Country({
        countryName:req.body.name,
        countryCode:req.body.code
    });
    newCountry.save(function(err) {
        if (!err) {
            res.send("successfully added country to database" +newCountry);
        } else {
            res.send(err);
        }
    });

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});