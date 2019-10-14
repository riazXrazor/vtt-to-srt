import through from  'through2';
import split from 'split2';
import pumpify from 'pumpify';
import { EOL } from 'os';

module.exports = function() {

  let count = 0;
  const reg = new RegExp(`(WEBVTT\s*(FILE)?.*)(${EOL})*`, 'g' )
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
        vttLine = vttLine+EOL
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
        vttLine = EOL+vttLine+EOL
      }
      else if(line.match(reg)
      {
        let vttLine = line.replace(reg , '')
      }
      else
      {
        let vttLine = line+EOL;
      }    

      if(!vttLine.trim()) return cb();
      
            if (/^Kind:|^Language:/m.test(vttLine)) {
                return cb();
              }
        
              if (/^[0-9]+:/m.test(vttLine)) {
                if (count === 0) {
                  vttLine = `${++count}${EOL}${vttLine}`;
                } else {
                  vttLine = `${EOL}${++count}${EOL}{vttLine}`;
                }
              }

      cb(null, vttLine);
    
  };

  return pumpify(split(), through.obj(write));

};
