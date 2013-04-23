
/*
 * Uploading images.
 */
var fs = require('fs'),
    path = require('path'),
    //用来产生文件名，以防止覆盖
    randUtil = require('../Util/generateRandom'),
    //数据库操作类
    dbUtil = require('../Util/mysql.js');

module.exports = {
    show: function(req, res){
        res.render('upload', { title: '上传你的图片' });
    },
    uploadFile: function(req, res){
        var filePath = req.files.displayImage.path;
        var extName = path.extname(req.files.displayImage.name);
        var image = randUtil.getRandom(32) + extName;
        var imageUrl = "/images/" + image;
        var newPath = __dirname + "/../public" + imageUrl;

        //把图片从临时文件夹复制到目的文件夹，还要删除临时文件
        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.send(err);
                return;
            }

            fs.writeFile(newPath, data, function (err) {
                if (!err) {
                    //删除临时文件夹中的内容
                    fs.unlink(filePath, function(err){
                        console.log('Deleted'+filePath);
                    });
                    //写入数据库
                    dbUtil.insert('waterfall',[{key:'tags',value:'"'+req.body.tags+'"'},{key:'imgURL',value:'"'+image+'"'}]);
                   res.json({uploaded: true});
                } else {
                    res.send(err);
                }
            });
        });

    }
};