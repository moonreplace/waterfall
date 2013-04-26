/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-22
 * Time: 下午8:04
 * To change this template use File | Settings | File Templates.
 */
define(['views/ItemView'], function (ItemView) {
    var ListView = Backbone.View.extend({
        tagName: 'ul',

        className: 'col c fl',

        append: function () {
            var item = new ItemView({model: this.model});
            this.$el.append(item.render());
            return this.$el;
        }
    });

    return ListView;
});
