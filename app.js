var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var models  = require('./models');

var index = require('./routes/index');
var templates = require('./routes/templates');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/templates', templates);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});


var jsonExampleTemplate = {
    form : {
      form:"Mobil Form",
      fields:[
        {
          id:"nombre",
          label:"Nombre",
          type:"text",
          value:"",
          onChange:"console.log('Inline function 1',param,index)"
        },
        {
          id:"password",
            label:"Password",
          type:"password",
          value:"",
          onChange:"console.log('Inline function 2',param,index)"
        },
        {
            id:"birthday",
            type:"date",
            value:"2016-05-15",
            onChange:"console.log('Accept terms',param,index)"
        } ,
        {
            id:"terms",
            type:"checkbox",
            label:"Eres mayor de edad?",
            value:false,
            onChange:"console.log('Accept terms',param,index)"
        } ,
        {
            id:"city",
            type:"select",
            data:['Medellin', 'Berlin'],
            onChange:"console.log('City selected',param,index)"
        } ,
        {
          id:"signature",
          type:"signature",
          label:"Please put your signature"
        }
      ]
    }
  };


// force: true will drop the table if it already exists
models.Template.sync({force: true}).then(() => {
  // Table created
  return models.Template.create({
      title: "Test template",
    templateJson: JSON.stringify(jsonExampleTemplate)
  });
});


app.listen(3000);

module.exports = app;
