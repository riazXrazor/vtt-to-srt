'use strict';

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _split = require('split2');

var _split2 = _interopRequireDefault(_split);

var _pumpify = require('pumpify');

var _pumpify2 = _interopRequireDefault(_pumpify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {

  var count = 0;

  var write = function write(line, enc, cb) {

    if (!line.trim()) return cb();
    
    if(line.match(/(\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2})\.(\d{3}\s*)/g))
    {
      var vttComp = line.split('-->')
      var vttLine = vttComp.map(function(item){
        item = item.replace('.',',');
        if(item.split(":").length < 3)
        {
          item = '00:'+item.trim(); 
        }  
        return item;
      }).join(' --> ');
      vttLine = vttLine+"\r\n"
    }
    else if(line.match(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g))
    {
      var vttComp = line.split('-->')
      var vttLine = vttComp.map(function(item){
        item = item.replace('.',',');
        if(item.split(":").length < 3)
        {
          item = '00:'+item.trim(); 
        }  
        return item;
      }).join(' --> ');
      vttLine = "\r\n"+vttLine+"\r\n"
    }
    else if(line.match(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g))
    {
      var vttLine = line.replace(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g, '')
    }
    else
    {
      var vttLine = line+"\r\n";
    }     
                  

                  


    if (!vttLine.trim()) return cb();

        if (/^Kind:|^Language:/m.test(vttLine)) {
            return cb();
          }
      
         if (/^[0-9]+:/m.test(vttLine)) {
            if (count === 0) {
              vttLine = ++count + '\r' + vttLine;
            } else {
              vttLine = '\r\n' + ++count + '\r' + vttLine;
            }
          }

    cb(null, vttLine);
  };

  return (0, _pumpify2.default)((0, _split2.default)(), _through2.default.obj(write));
};

