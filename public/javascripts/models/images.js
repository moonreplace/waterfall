/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-21
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
define(['models/image'],function(Image){
    var Images = Backbone.Collection.extend({
        model: Image,
        url: '/getImages'//得到所有的数据
    });

    return Images;
});