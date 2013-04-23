/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-21
 * Time: 下午3:56
 * To change this template use File | Settings | File Templates.
 */
define(['text!templates/image.htm'], function (imageTemplate) {
   var ImageView = Backbone.View.extend({
        tagName:'div',
       className:'img-wrap',
       template: _.template(imageTemplate),

       render: function(){
           this.$el.html(this.template(this.model.attributes));
           return this;
       }
   });

    return ImageView;
});