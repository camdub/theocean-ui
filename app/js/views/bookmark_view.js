App.BookmarkView = Em.View.extend({
	isBookmarked: false,
	url1: 'https://theocean.blob.core.windows.net/images/icon-yellow-star.png',
	url2: 'https://theocean.blob.core.windows.net/images/icon-star.png', 

	click: function(evt) {
		this.toggleProperty('isBookmarked');
	}
});
