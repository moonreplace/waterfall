/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-22
 * Time: 下午8:05
 * To change this template use File | Settings | File Templates.
 */
define(['views/TagView','views/ListView'], function (TagView,ListView) {
    var MainView = Backbone.View.extend({
        el:'#imgs_container',
        listViews: [],
        getCount: function(){
            return Math.floor(this.calcWidth()/243);
        },
        initializeListViews: function(){
            var count = this.getCount();
            for(var i=0;i<count;i++){
                this.listViews.push(new ListView());
            }
        },
        initialize: function(){
            var tagView = new TagView();
            tagView.parentContainer = this;
            this.$el.append(tagView.render());
            this.initializeListViews();
        },
        //计算整个列的宽度，来确定我们应该有多少个数
        calcWidth: function(){
            var $win = $(window),
                contentWidth = $win.width()-120;
            return contentWidth;
        },
        /*比较各个ul的高度，然后选出最小的那个把他们加入到其中*/
        sort:function(listViews){
            listViews.sort(function(a, b) {
               if( a.$el.height()> b.$el.height()){
                   return 1;
               }else {
                   return -1;
               }
            });
        },

        addImage: function(model){
            var that = this;
            if(!model){
            _.each(that.collection.models,function(model,index){
                that.sort(that.listViews);
                that.listViews[0].model = model;
                that.listViews[0].append();
            });
            } else{
                that.sort(that.listViews);
                that.listViews[0].model = model;
                that.listViews[0].append();
            }
        },

        render: function(){
            var that = this;
            _.each(that.listViews,function(elem){
                that.$el.append(elem.$el);
            });
            this.addImage();
        },
        reRender: function(){
           this.listViews=[];
           this.$el.find('ul').remove();
           this.initializeListViews();
        }
    });

    return MainView;
});
