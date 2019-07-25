var fs = require('fs');
var path = require('path');
var filePath = path.resolve('E:/desk/rename-exif');
var ExifImage = require('exif').ExifImage;
fs.readdir(filePath,function(err,files){
    if(err){
        console.warn(err)
    }else{
        //遍历读取到的文件列表
        files.forEach(function(filename){
          var oldPath = path.join(filePath,filename);
          var fileInfo = path.parse(filename);
          try {
            new ExifImage({ image : path.join(filePath,filename) }, function (error, exifData) {
                if (error)
                    console.log('Error: '+error.message);
                else{
                  var dateName = dateToFileName(exifData.exif.CreateDate);
                  var newPath = path.join(filePath, dateName + fileInfo.ext);
                  fs.rename(oldPath, newPath, (err) => {
                    console.log('success:', filename);
                    if (err) throw err;
                  });
                }
            });
          } catch (error) {
            console.log('Error: ' + error.message);
          }
        });
    }
});

function dateToFileName(dateString){
  //2017:04:27 19:26:12
  return dateString.replace(' ', '_').replace(/:/g, '');
}
