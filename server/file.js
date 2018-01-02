var formidable = require('formidable');
var fs = require('fs');

function saveFile(req, res, next) {
  var message = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public/upload/';     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
    }

    var filename = files.file.name;

    // 对文件名进行处理，以应对上传同名文件的情况
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length-1];
    var name = '';
    for(var i=0; i<nameArray.length-1; i++){
      name = name + nameArray[i];
    }
    var rand = Math.random()*100 + 900;
    var num = parseInt(rand, 10);

    var avatarName = name + num +  '.' + type;

    var newPath = form.uploadDir + avatarName ;
    fs.renameSync(files.file.path, newPath);  //重命名
    res.json({
      "fileId": avatarName,
      'fileName': avatarName,
      });
  });
}
//
//"serialNo": "mkd01111f",                 服务器端返回或默认值  隐藏
//  "docNessary": "必需",                   默认值
//  "needUploadDocName": "XXX合同",         默认值
//  "docName": "我设置的文件名",             上个借口
//  "fileSize": 1231,                      上个借口
//  "remark": "备注",                      上个借口
//  "uploadUser": "超级管理员",             服务器端返回
//  "uploadUserPartment": "市场营销部",     服务器端返回
//  "uploadTime": 1480949156000,    上个借口
//  "fileVersion": "v0.1",          服务器端返回
//  "filedId": "lalalalallala"      上个接口                    隐藏

function downloadFile(req, res, next) {
  console.log(req.param);
  var filePath = 'static/myDoc.pdf';
  var stats = fs.statSync(filePath);
  if(stats.isFile()){
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=myDoc.pdf',
      'Content-Length': stats.size
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.end(404);
  }
}

module.exports = {
  saveFile: saveFile,
  downloadFile: downloadFile
};