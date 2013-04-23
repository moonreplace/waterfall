define(['views/ImageView'], function (ImageView) {
    var ItemView = Backbone.View.extend({
        tagName: 'li',

        render: function () {
            var image = new ImageView({model: this.model});
            this.$el.html(image.render().$el);
            this.$el.fadeIn(100);
            return this;
        }
    });

    return ItemView;
});
