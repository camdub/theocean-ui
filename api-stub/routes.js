module.exports = function(server) {

    // see README in this directory for an example

    server.namespace('/api', function() {
      server.get('/people/:person_id', function(req, res) {
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
              id: "cameron-woodmansee",
              url: "/people/cameron-woodmansee",
              firstName: "Cameron",
              lastName: "Woodmansee",
              pictureUrl: "",
              level: "C2",
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

      server.get('/clients', function(req, res) {
        res.send({
          'clients' : [{
            id: "2020-companies",
            url: "/clients/2020-companies",
            name: "20/20 Companies"
          },
          {
            id: "3degrees",
            url: "/clients/3degrees",
            name: "3Degrees"
          },
          {
            id: "3won",
            url: "/clients/3won",
            name: "3WON"
          },
          {
            id: "7-eleven-inc",
            url: "/clients/7-eleven-inc",
            name: "7-Eleven, Inc."
          }]
        });
      });

    });
};
