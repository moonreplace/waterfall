require.config({
    baseUrl: '/javascripts',
    paths: {
        jQuery: 'libs/jquery',
        Underscore: 'libs/underscore',
        Backbone: 'libs/backbone',
        text: 'libs/text',
        templates: 'templates',
        models:'models',
        views: 'views'
    },

    shim: {
        'Backbone': ['Underscore', 'jQuery'],        
        'index': ['Backbone']
    }
});

require(['index'], function (index) {
    index.initialize();
});
