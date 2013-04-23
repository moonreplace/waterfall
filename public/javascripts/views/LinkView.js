define(['LandingView', 'text!templates/image.htm'], function (LandingView,linkitemTemplate) {
    var LinkView = LandingView.extend({
        tagName: 'a',
        template: _.template(linkitemTemplate),

        render: function () {
            this.$el.html(this.template(this.model));           
            return this;
        }
    });

    return LinkView;
});
