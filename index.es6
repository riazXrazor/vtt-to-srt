import through from  'through2';
import split from 'split2';
import pumpify from 'pumpify';

module.exports = function() {

  let count = 0;
  const write = (line, enc, cb) => {

      if(!line.trim()) return cb();
      if(line.match(/(\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2})\.(\d{3}\s*)/g))
      {
        let vttComp = line.split('-->')
        let vttLine = vttComp.map(function(item){
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
        let vttComp = line.split('-->')
        let vttLine = vttComp.map(function(item){
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
        let vttLine = line.replace(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g, '')
      }
      else
      {
        let vttLine = line+"\r\n";
      }    

      if(!vttLine.trim()) return cb();
      
            if (/^Kind:|^Language:/m.test(vttLine)) {
                return cb();
              }
        
              if (/^[0-9]+:/m.test(vttLine)) {
                if (count === 0) {
                  vttLine = `${++count}\r\n${vttLine}`;
                } else {
                  vttLine = `\r\n${++count}\r\n${vttLine}`;
                }
              }

      cb(null, vttLine);
    
  };

  return pumpify(split(), through.obj(write));

};
