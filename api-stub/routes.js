module.exports = function(server) {

    // see README in this directory for an example
    // TODO: Talk with brian re inconsistancies btwn project.experince and person.experience
    var people = {
      'aaron-boswell' : {
        id: "aaron-boswell",
        url: "/people/aaron-boswell",
        firstName: "Aaron",
        lastName: "Boswell",
        pictureUrl: "",
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
        var person = {'person':{}};
        person['person'] = people[req.params['id']];
        res.send(person);
      });


      server.get('/people', function(req, res) {
       console.log(req.query);
        res.send({
          'people' : [
//            {"id":"aaron-boswell","url":"/people/aaron-boswell","firstName":"Aaron","lastName":"Boswell","pictureUrl":"","level":"V11","location":"Dallas"},{"id":"abbas-lotia","url":"/people/abbas-lotia","firstName":"Abbas","lastName":"Lotia","pictureUrl":"/people/abbas-lotia/image","level":"M1","location":"Dallas"},{"id":"abhay-shah","url":"/people/abhay-shah","firstName":"Abhay","lastName":"Shah","pictureUrl":"/people/abhay-shah/image","level":"M2","location":"Dallas"},{"id":"adrian-thomas","url":"/people/adrian-thomas","firstName":"Adrian","lastName":"Thomas","pictureUrl":"/people/adrian-thomas/image","level":"M1","location":"Dallas"},{"id":"alan-volk","url":"/people/alan-volk","firstName":"Alan","lastName":"Volk","pictureUrl":"/people/alan-volk/image","level":"M2","location":"Dallas"}
              {"id":"aaron-boswell","url":"/people/aaron-boswell","firstName":"Aaron","lastName":"Boswell","pictureUrl":"/people/aaron-boswell/image","level":"V11","location":"Dallas"},{"id":"abbas-lotia","url":"/people/abbas-lotia","firstName":"Abbas","lastName":"Lotia","pictureUrl":"/people/abbas-lotia/image","level":"M1","location":"Dallas"},{"id":"abhay-shah","url":"/people/abhay-shah","firstName":"Abhay","lastName":"Shah","pictureUrl":"/people/abhay-shah/image","level":"M2","location":"Dallas"},{"id":"adrian-thomas","url":"/people/adrian-thomas","firstName":"Adrian","lastName":"Thomas","pictureUrl":"/people/adrian-thomas/image","level":"M1","location":"Dallas"},{"id":"alan-volk","url":"/people/alan-volk","firstName":"Alan","lastName":"Volk","pictureUrl":"/people/alan-volk/image","level":"M2","location":"Dallas"},{"id":"allison-grindle","url":"/people/allison-grindle","firstName":"Allison","lastName":"Grindle","pictureUrl":"/people/allison-grindle/image","level":"C2","location":"Dallas"},{"id":"basudeb-chatterjee","url":"/people/basudeb-chatterjee","firstName":"Basudeb","lastName":"Chatterjee","pictureUrl":null,"level":"A2","location":"Dallas"},{"id":"ben-knust","url":"/people/ben-knust","firstName":"Ben","lastName":"Knust","pictureUrl":"/people/ben-knust/image","level":"M1","location":"Dallas"},{"id":"benjamin-pittner","url":"/people/benjamin-pittner","firstName":"Benjamin","lastName":"Pittner","pictureUrl":"/people/benjamin-pittner/image","level":"C2","location":"Dallas"},{"id":"benjamin-reyes","url":"/people/benjamin-reyes","firstName":"Benjamin","lastName":"Reyes","pictureUrl":"/people/benjamin-reyes/image","level":"P1","location":"Dallas"},{"id":"blake-smith","url":"/people/blake-smith","firstName":"Blake","lastName":"Smith","pictureUrl":"/people/blake-smith/image","level":"A1","location":"Dallas"},{"id":"brad-twitty","url":"/people/brad-twitty","firstName":"Brad","lastName":"Twitty","pictureUrl":"/people/brad-twitty/image","level":"A2","location":"Dallas"},{"id":"brad-werner","url":"/people/brad-werner","firstName":"Brad","lastName":"Werner","pictureUrl":"/people/brad-werner/image","level":"A2","location":"Dallas"},{"id":"brett-grosvenor","url":"/people/brett-grosvenor","firstName":"Brett","lastName":"Grosvenor","pictureUrl":"/people/brett-grosvenor/image","level":"M2","location":"Dallas"},{"id":"cameron-buescher","url":"/people/cameron-buescher","firstName":"Cameron","lastName":"Buescher","pictureUrl":null,"level":"C2","location":"Dallas"},{"id":"carole-cox","url":"/people/carole-cox","firstName":"Carole","lastName":"Cox","pictureUrl":"/people/carole-cox/image","level":"C2","location":"Dallas"},{"id":"charles-knight","url":"/people/charles-knight","firstName":"Charles","lastName":"Knight","pictureUrl":null,"level":"M3","location":"Dallas"},{"id":"chris-shal","url":"/people/chris-shal","firstName":"Chris","lastName":"Shal","pictureUrl":"/people/chris-shal/image","level":"A1","location":"Dallas"},{"id":"clement-yu","url":"/people/clement-yu","firstName":"Clement","lastName":"Yu","pictureUrl":"/people/clement-yu/image","level":"C2","location":"Dallas"},{"id":"clint-boswell","url":"/people/clint-boswell","firstName":"Clint","lastName":"Boswell","pictureUrl":"/people/clint-boswell/image","level":"M3","location":"Dallas"},{"id":"craig-nelson","url":"/people/craig-nelson","firstName":"Craig","lastName":"Nelson","pictureUrl":"/people/craig-nelson/image","level":"C2","location":"Dallas"},{"id":"craig-smitham","url":"/people/craig-smitham","firstName":"Craig","lastName":"Smitham","pictureUrl":"/people/craig-smitham/image","level":"A1","location":"Dallas"},{"id":"daniel-lozano","url":"/people/daniel-lozano","firstName":"Daniel","lastName":"Lozano","pictureUrl":"/people/daniel-lozano/image","level":"C2","location":"Dallas"},{"id":"danny-bakker","url":"/people/danny-bakker","firstName":"Danny","lastName":"Bakker","pictureUrl":"/people/danny-bakker/image","level":"C2","location":"Dallas"},{"id":"david-engfer","url":"/people/david-engfer","firstName":"David","lastName":"Engfer","pictureUrl":null,"level":"M2","location":"Dallas"},{"id":"david-romeo","url":"/people/david-romeo","firstName":"David","lastName":"Romeo","pictureUrl":"/people/david-romeo/image","level":"A2","location":"Dallas"},{"id":"drew-jannati","url":"/people/drew-jannati","firstName":"Drew","lastName":"Jannati","pictureUrl":"/people/drew-jannati/image","level":"M1","location":"Dallas"},{"id":"edward-godinez","url":"/people/edward-godinez","firstName":"Edward","lastName":"Godinez","pictureUrl":"/people/edward-godinez/image","level":"C2","location":"Dallas"},{"id":"erin-vorland","url":"/people/erin-vorland","firstName":"Erin","lastName":"Vorland","pictureUrl":null,"level":"C1","location":"Dallas"},{"id":"fenil-sevak","url":"/people/fenil-sevak","firstName":"Fenil","lastName":"Sevak","pictureUrl":"/people/fenil-sevak/image","level":"C2","location":"Dallas"},{"id":"gary-cuppett","url":"/people/gary-cuppett","firstName":"Gary","lastName":"Cuppett","pictureUrl":"/people/gary-cuppett/image","level":"A1","location":"Dallas"},{"id":"gavyn-kearns","url":"/people/gavyn-kearns","firstName":"Gavyn","lastName":"Kearns","pictureUrl":"/people/gavyn-kearns/image","level":"A2","location":"Dallas"},{"id":"jack-djeu","url":"/people/jack-djeu","firstName":"Jack","lastName":"Djeu","pictureUrl":null,"level":"A1","location":"Dallas"},{"id":"james-burkett","url":"/people/james-burkett","firstName":"James","lastName":"Burkett","pictureUrl":"/people/james-burkett/image","level":"M2","location":"Dallas"},{"id":"jarom-prestwich","url":"/people/jarom-prestwich","firstName":"Jarom","lastName":"Prestwich","pictureUrl":"/people/jarom-prestwich/image","level":"C2","location":"Dallas"},{"id":"jason-carter","url":"/people/jason-carter","firstName":"Jason","lastName":"Carter","pictureUrl":"/people/jason-carter/image","level":"M3","location":"Dallas"},{"id":"jeff-hilliard","url":"/people/jeff-hilliard","firstName":"Jeff","lastName":"Hilliard","pictureUrl":"/people/jeff-hilliard/image","level":"V11","location":"Dallas"}
          ],
          'total': 38,
          'offset': 0,
          'limit': 0
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
