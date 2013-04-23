define(['models/images','views/MainView'], function (ImageCollection,MainView) {
    var IndexRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            'index': 'index'
        },

        changeView: function (view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },

        index: function () {
            var that = this,
                requestTimes = 1,
                mainView;

            var imageCollection = new ImageCollection();
            imageCollection.fetch();
            //当发生初始化，或者重置collection的时候发生下面的事件
            imageCollection.on('reset', function(){
                mainView = new MainView({collection:imageCollection});
                that.changeView(mainView);
            });
            imageCollection.on('add', function(model){
                mainView.addImage(model);
            });

            // 防止弹跳，避免scroll时频繁调用
            function debounce(fn, wait) {
                var timer
                return function() {
                    var later = function() {
                        timer = null
                        fn(arguments)
                    }
                    clearTimeout(timer)
                    timer = setTimeout(later, wait)
                }
            }
            //waterFall主程序
            var scrollFn= function(){
                var $doc = $(document),
                    docHeight = $doc.height(),
                    docTop = $doc.scrollTop(),
                    winHeight = $(window).height();

                // 拖动到最后一行图片时
                if (docHeight - docTop < winHeight +200) {
                    $.getJSON('/getImages/'+mainView.getCount()+'/'+ requestTimes,function(response){
                        imageCollection.add(response);
                        requestTimes++;
                        if(response.length){
                         $(window).bind('scroll',scrollFn);
                        }
                    });

                    $(window).unbind('scroll');
                }
            };

            $(window).bind('scroll',debounce(scrollFn,100));
            $(window).resize(function(){
                mainView.reRender();
            });
        }
    });

    return new IndexRouter();
});

