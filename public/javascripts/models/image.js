/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-21
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports) {
    var Image = Backbone.Model.extend({
        /*这里边可以加入相应的代码，来初始化相应的操作*/
        idAttribute: "id"
    });

    return Image;
});
