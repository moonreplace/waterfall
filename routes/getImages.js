/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-21
 * Time: 上午11:08
 * To change this template use File | Settings | File Templates.
 */

var config = require('../config.js'),
    dbUtil = require('../Util/mysql.js'),
    imagesArr = [],
    loadLines = parseInt(config.linesOneTimeLoad),
    initImagesLen = parseInt(config.initialImages),
    getImages= function(callback){
        var getImageCallback = function(err, results, fields){
            if(!err){
                imagesArr = [];
                results.forEach(function(elem){
                    elem.imgURL =config.imageConfig.urlRoot + elem.imgURL;
                    imagesArr.push(elem);
                });
            }
            callback(imagesArr);
        };
        dbUtil.select('waterfall','','',getImageCallback);
    };


module.exports ={
    images: imagesArr,
    getALLImages : function(req, res){
        /*
         * 处理查询到的数据函数
         * params:err, results, fields
         * return:json{id:, tags:, imageURL}
         * */
        if(imagesArr.length<=0){
            getImages(function(images){
                res.json(images);
            });
        }else{
            res.json(imagesArr);
        }
    },
    getInitialImages: function(req,res){
        getImages(function(images){
            if(images.length<initImagesLen){
                res.json(images);
            }else{
                res.json(images.slice(0,initImagesLen));
            }
        });
    },

    getRestImages: function(req,res){
        var columns = req.params.columns,
            times =  req.params.times,
            imageNumbers,
            startIndex;

        if(!(columns||times)){
            res.json({'exception':'parameter is wrong'});
        }else{
            imageNumbers = columns * loadLines;
            startIndex = initImagesLen + imageNumbers * (times-1);
            if(startIndex>imagesArr.length){
                res.json([]);
            }else{
                if(startIndex + imageNumbers>imagesArr.length){
                    res.json(imagesArr.slice(startIndex));
                }else{
                    res.json(imagesArr.slice(startIndex,startIndex+imageNumbers));
                }
            }
        }
    }
};