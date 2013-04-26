define(['views/ImageView'], function (ImageView) {
    var ItemView = Backbone.View.extend({
        tagName: 'li',

        render: function () {
            var image = new ImageView({model: this.model});
            this.$el.html(image.render());
            return this.$el;
        }
    });

    return ItemView;
});
