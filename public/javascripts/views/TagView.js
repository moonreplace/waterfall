/**
 * Created with JetBrains WebStorm.
 * User: daihuiming
 * Date: 13-4-24
 * Time: 上午9:19
 * To change this template use File | Settings | File Templates.
 */
define(['text!templates/tags.htm'], function (tagTemplate) {
    var TagView = Backbone.View.extend({
        tagName:'div',
        className:'tagItems',
        template: _.template(tagTemplate),
        parentContainer: null,

        events:{
            "click .hot-tag a":"filterContent"
        },

        filterContent: function(e){
            var $target = $(e.target),
                parentContainer = this.parentContainer,
                collection = parentContainer.collection,
                url = '/getImages';
            if($target.hasClass('all')){

            }else{
                url +="/"+$target.text();
            }
            collection.url = url;
            this.parentContainer.reRender();
            collection.fetch();
            $target.siblings().removeClass('current');
            $target.addClass('current');
            e.preventDefault();
            e.stopPropagation();
        },

        render: function(){
            this.$el.html(this.template());
            return this.$el;
        }
    });

    return TagView;
});