export default Em.Mixin.create({
  grid: function() {
    var result = [], temp = [],
        perCol = this.get('perPage') / 2;

    this.get('paginatedContent').forEach( function ( elem, i ) {
        if ( i > 0 && i % perCol === 0 ) {
            result.push( temp );
            temp = [];
        }
        temp.push( elem );
    });
    if ( temp.length > 0 ) {
        result.push( temp );
    }
    return result;
  }.property('paginatedContent')
});
