/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-20
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    dbUtil = require('../util/mysql.js'),
    randUtil = require('../Util/generateRandom');

var imagePath = '../public/images';
var tags = ['可爱','萌翻了','宠物','毛绒绒','美丽','调皮','乖','忠心','眼神','销魂'];

fs.readdir(imagePath, function(err, files){
    var tagArr = [],
        len,index,tagIndex,
        params;


    files.forEach(function(file){
        var tagsParam = '';

        tagArr = [];
        len = randUtil.getIntRandom(1);
        for(index=0;index<len;index++){
            tagIndex = randUtil.getIntRandom(1);
            tag = tags[tagIndex];
            if(tagArr.indexOf(tag) < 0){
                tagArr.push(tag);
            }
        }
        if(tagArr.length){
            tagsParam ='"'+tagArr.join(' ')+'"';
        }
        dbUtil.insert('waterfall',[{key:'tags',value:tagsParam},{key:'imgURL',value:'"'+file+'"'}]);
    });
});
