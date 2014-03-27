module.exports = function(server) {

    // see README in this directory for an example

    server.namespace('/api', function() {
      server.get('/people/:id', function(req, res) {
        res.send({
          'person' : {
            'id': "cameron-woodmansee",
            'url': "/people/cameron-woodmansee",
            'firstName': "Cameron",
            'lastName': "Woodmansee",
            'pictureUrl': null,
            'level': "C2",
            'location': "New York",
            'active': true,
            'phone': "646.942.3798",
            'hireDate': "2012-05-14T00:00:00",
            'termDate': null,
            'email': "Cameron.Woodmansee@parivedasolutions.com",
            'birthday': "",
            'school': "",
            'about': "",
            'industries': null,
            'skills': null
          }
        });
      });

      server.get('/people', function(req, res) {
        res.send({
          'people' : [
            {
              id: "aaron-boswell",
              url: "/people/aaron-boswell",
              firstName: "Aaron",
              lastName: "Boswell",
              pictureUrl: "/people/aaron-boswell/image",
              level: "V11",
              location: "Dallas"
            },
            {
              id: "abbas-lotia",
              url: "/people/abbas-lotia",
              firstName: "Abbas",
              lastName: "Lotia",
              pictureUrl: "/people/abbas-lotia/image",
              level: "M1",
              location: "Dallas"
            }
          ]
        });
      });

    });
};
