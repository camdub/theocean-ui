module.exports = function(server) {

    // see README in this directory for an example
    // TODO: Talk with brian re inconsistancies btwn project.experince and person.experience
    var people = {
      'aaron-boswell' : {
        id: "aaron-boswell",
        url: "/people/aaron-boswell",
        firstName: "Aaron",
        lastName: "Boswell",
        pictureUrl: "/people/aaron-boswell/image",
        level: "V11",
        location: "Dallas",
        active: true,
        phone: "214.777.4604",
        // mentor: {
        //   id: "hector-martinez",
        //   url: "/people/hector-martinez",
        //   firstName: "Hector",
        //   lastName: "Martinez"
        // },
        hireDate: "2004-09-01T00:00:00",
        termDate: null,
        email: "aaron.boswell@parivedasolutions.com",
        birthday: "12/15",
        school: "University of Texas at Arlington",
        about: "<div>&nbsp;</div>",
        industries: null,
        skills: null,
        experiences: [
          {
            id: 17010,
            url: "/people/abbas-lotia/experience/17010",
            role: null,
            start: "2013-09-03T00:00:00",
            end: "2014-05-23T00:00:00",
            type: "ClientProject",
          }
        ]
      },
      'abbas-lotia' : {
        id: "abbas-lotia",
        url: "/people/abbas-lotia",
        firstName: "Abbas",
        lastName: "Lotia",
        pictureUrl: "/people/abbas-lotia/image",
        level: "M1",
        location: "Dallas",
        active: true,
        phone: "817.487.5269",
        // mentor: {
        // id: "jeffrey-townes",
        // url: "/people/jeffrey-townes",
        // firstName: "Jeffrey",
        // lastName: "Townes"
        // },
        hireDate: "2007-02-12T00:00:00",
        termDate: null,
        email: "abbas.lotia@parivedasolutions.com",
        birthday: "",
        school: "The University of Texas at Austin",
        about: "",
        industries: null,
        skills: null
      }
    };

    server.namespace('/api', function() {
      server.get('/people/:id', function(req, res) {
        console.log(req.params['id']);
        var person = {'person':{}};
        person['person'] = people[req.params['id']];
        res.send(person);
      });


      server.get('/people', function(req, res) {
        res.send({
          'people' : [
            {"id":"aaron-boswell","url":"/people/aaron-boswell","firstName":"Aaron","lastName":"Boswell","pictureUrl":"/people/aaron-boswell/image","level":"V11","location":"Dallas"},{"id":"abbas-lotia","url":"/people/abbas-lotia","firstName":"Abbas","lastName":"Lotia","pictureUrl":"/people/abbas-lotia/image","level":"M1","location":"Dallas"},{"id":"abhay-shah","url":"/people/abhay-shah","firstName":"Abhay","lastName":"Shah","pictureUrl":"/people/abhay-shah/image","level":"M2","location":"Dallas"},{"id":"adrian-thomas","url":"/people/adrian-thomas","firstName":"Adrian","lastName":"Thomas","pictureUrl":"/people/adrian-thomas/image","level":"M1","location":"Dallas"},{"id":"alan-volk","url":"/people/alan-volk","firstName":"Alan","lastName":"Volk","pictureUrl":"/people/alan-volk/image","level":"M2","location":"Dallas"},{"id":"allison-grindle","url":"/people/allison-grindle","firstName":"Allison","lastName":"Grindle","pictureUrl":"/people/allison-grindle/image","level":"C1","location":"Dallas"},{"id":"basudeb-chatterjee","url":"/people/basudeb-chatterjee","firstName":"Basudeb","lastName":"Chatterjee","pictureUrl":null,"level":"A2","location":"Dallas"},{"id":"ben-knust","url":"/people/ben-knust","firstName":"Ben","lastName":"Knust","pictureUrl":"/people/ben-knust/image","level":"M1","location":"Dallas"},{"id":"benjamin-pittner","url":"/people/benjamin-pittner","firstName":"Benjamin","lastName":"Pittner","pictureUrl":"/people/benjamin-pittner/image","level":"C2","location":"Dallas"},{"id":"benjamin-reyes","url":"/people/benjamin-reyes","firstName":"Benjamin","lastName":"Reyes","pictureUrl":"/people/benjamin-reyes/image","level":"P1","location":"Dallas"},{"id":"blake-smith","url":"/people/blake-smith","firstName":"Blake","lastName":"Smith","pictureUrl":"/people/blake-smith/image","level":"A1","location":"Dallas"},{"id":"brad-twitty","url":"/people/brad-twitty","firstName":"Brad","lastName":"Twitty","pictureUrl":"/people/brad-twitty/image","level":"A2","location":"Dallas"},{"id":"brad-werner","url":"/people/brad-werner","firstName":"Brad","lastName":"Werner","pictureUrl":"/people/brad-werner/image","level":"A2","location":"Dallas"}
          ],
          'meta' : {
            total: 300
          }
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
