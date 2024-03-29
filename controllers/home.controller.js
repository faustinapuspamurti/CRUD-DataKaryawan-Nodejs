const fs = require('fs');

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index.ejs', {
            title: "Welcome to PT.Sinar Tambang",
            players: result
        });
    });
};
exports.getAboutPage = (req, res) => {

    res.render('about', {
        title: "Welcome to PT.Sinar Tambang",
        players: result
    });

};