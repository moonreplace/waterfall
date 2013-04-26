define(['models/images','views/MainView'], function (ImageCollection,MainView) {
    var IndexRouter = Backbone.Router.extend({
        currentView: null,
        routes: {
            '': 'index'
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
                mainView,
                tag='',
                imageCollection = new ImageCollection(),
                url = '/getImages/',
                mainView = new MainView({collection:imageCollection});

            imageCollection.fetch();
            //当发生初始化，或者重置collection的时候发生下面的事件
            imageCollection.on('reset', function(){
                requestTimes = 1;
                $(window).bind('scroll',debounce(scrollFn,100));
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
            function scrollFn(){
                var $doc = $(document),
                    docHeight = $doc.height(),
                    docTop = $doc.scrollTop(),
                    winHeight = $(window).height(),
                    subUrl = '/getImages/'+mainView.getCount()+'/'+ requestTimes,
                    $cur = $(".current");


                // 拖动到最后一行图片时
                if (docHeight - docTop < winHeight +200) {
                    if($cur.hasClass('all')){
                        tag='';
                    }else{
                        tag = "/"+$cur.text();
                    }
                    $.getJSON(subUrl+tag,function(response){
                        imageCollection.add(response);
                        requestTimes++;
                        if(response.length){
                            $(window).bind('scroll',debounce(scrollFn,100));
                        }
                    });

                    $(window).unbind('scroll');
                }
            };

            /*$(window).resize(function(){
                mainView.reRender();
            });  */
        }
    });

    return new IndexRouter();
});

