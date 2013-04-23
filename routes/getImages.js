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
    getImages= function(callback,tag){
        var getImageCallback = function(err, results, fields){
            if(!err){
                imagesArr = [];
                imagesArr[tag] = [];
                results.forEach(function(elem){
                    elem.imgURL =config.imageConfig.urlRoot + elem.imgURL;
                    if(tag){
                       if(elem.tags.indexOf(tag)>=0){
                           imagesArr[tag].push(elem);
                       }
                    }else{
                        imagesArr.push(elem);
                    }
                });
            }
            if(tag){
                callback(imagesArr[tag]);
            }else{
                callback(imagesArr)
            }
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
        var tag = req.params.tag;
        getImages(function(images){
            if(images.length<initImagesLen){
                res.json(images);
            }else{
                res.json(images.slice(0,initImagesLen));
            }
        }, tag);
    },

    getRestImages: function(req,res){
        var columns = req.params.columns,
            times =  req.params.times,
            tag = req.params.tag,
            imageNumbers,
            startIndex,
            images;

        if(!(columns||times)){
            res.json({'exception':'parameter is wrong'});
        }else{
            imageNumbers = columns * loadLines;
            startIndex = initImagesLen + imageNumbers * (times-1);
            if(tag){
              images =imagesArr[tag];
            }else{
                images = imagesArr;
            }
            if(startIndex>images.length){
                res.json([]);
            }else{
                if(startIndex + imageNumbers>images.length){
                    res.json(images.slice(startIndex));
                }else{
                    res.json(images.slice(startIndex,startIndex+imageNumbers));
                }
            }
        }
    }
};