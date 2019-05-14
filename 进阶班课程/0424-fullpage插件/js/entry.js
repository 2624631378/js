$('.wrapper').myFullPage({
    colorArray: ['red', 'yellow', 'blue'],
    onLeave: function (index, direction) {
       $('.section').eq(index).find('.component').fade
    },
    afterLoad: function (index, direction) {
        $('.section').eq(index)
    }
});