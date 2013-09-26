window.OAuth = {

  callback: 'http://localhost:8000?key=[key]',
  authBase: 'https://pariveda-access.azurewebsites.net/key?app=TheOcean',

  authURL: function() {
    return this.authBase + '&callback=' + window.encodeURIComponent(this.callback);
  },
  authorize: function() {
    this.dialog = window.open(this.authURL(), 'Authorize', 'height=600, width=450');
    if (window.focus) this.dialog.focus();
  },
  done: function() { alert('logged in'); }
};

export default OAuth;
