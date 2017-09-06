var express = require('express');
var Dropbox = require('dropbox');
var fs = require('fs');
var models = require('../models');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    models.Template.findAll({}).then(function (templates) {
        console.log("templates",templates);
        res.json(templates);
    }).catch(function(err){
        console.log(err)
        res.status(500).json({
            message: "Error creating template"
        });
    });
});

router.post('/', function (req, res, next) {
    try {
        console.log(req.body)
        let newRecord = req.body;

        models.Template.upsert({
            id:newRecord.id,
            title:newRecord.title,
            templateJson: newRecord.templateJson
        }).then(function(test){
            res.json({
                message: "Template created"
            });
        }).catch(function(err){
            console.log(err)
            res.status(500).json({
                message: "Error creating template"
            });
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error creating template"
        });
    }

});

router.get('/:templateId', function (req, res, next) {
    try {
        models.Template.findById(req.params.templateId).then(function (template) {
            res.json(template);
        }).catch(function () {
            res.json({
                message: "Error retrieving the template"
            });
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: "Error retrieving the template"
        });
    }
});

router.put('/:templateId', function (req, res, next) {
    models.Template.update(
        {templateJson: JSON.stringify(req.body)},
        {where: {id: req.params.templateId}}
    ).then(function () {
        res.send("Project with id =1 updated successfully!");
    }).catch(function (err) {
        console.log(err);
        res.send("Project update failed !");
    });
});

router.delete('/:templateId', function (req, res) {
    models.Template.destroy({
        where: {
            id: req.params.templateId
        }
    }).then(function () {
        res.send('respond with a resource save');
    });
});

router.post('/pdf', function(req, res, next) {

    console.log(req.body)
    let newRecord = req.body;

    var dbx = new Dropbox({ accessToken: '1vQezs6RP20AAAAAAAAaxQFsg6n-CP_OYmTcHOlLxkKNct9HQKot9h_UQAQ8Kr7x' });


    var stream = fs.createWriteStream("my_file.txt");
    stream.once('open', function(fd) {
        stream.write("My first row\n");
        stream.write("My second row\n");
        stream.end();

        dbx.filesUpload({path: '/' + 'test.txt', contents: 'adsf'})
            .then(function(response) {
                console.log("response", response);
                res.json({
                    message: "Pdf generated"
                });
            })
            .catch(function(error) {
                console.error("error", error);
            });


    });





});


module.exports = router;
