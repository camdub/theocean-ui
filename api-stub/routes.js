module.exports = function(server) {

    // see README in this directory for an example
    var people_search = '[{"id":"aaron-boswell","url":"/people/aaron-boswell","firstName":"Aaron","lastName":"Boswell","pictureUrl":"/people/aaron-boswell/image","level":"V6","location":"Dallas"},{"id":"aaron-fisher","url":"/people/aaron-fisher","firstName":"Aaron","lastName":"Fisher","pictureUrl":"/people/aaron-fisher/image","level":"A1","location":"Atlanta"},{"id":"aaron-munger","url":"/people/aaron-munger","firstName":"Aaron","lastName":"Munger","pictureUrl":"/people/aaron-munger/image","level":"A1","location":"Seattle"},{"id":"aashish-parekh","url":"/people/aashish-parekh","firstName":"Aashish","lastName":"Parekh","pictureUrl":"/people/aashish-parekh/image","level":"M3","location":"Houston"},{"id":"abbas-lotia","url":"/people/abbas-lotia","firstName":"Abbas","lastName":"Lotia","pictureUrl":"/people/abbas-lotia/image","level":"M1","location":"Dallas"},{"id":"abhay-shah","url":"/people/abhay-shah","firstName":"Abhay","lastName":"Shah","pictureUrl":"/people/abhay-shah/image","level":"M2","location":"Dallas"},{"id":"adam-berrio","url":"/people/adam-berrio","firstName":"Adam","lastName":"Berrio","pictureUrl":null,"level":"A1","location":"Seattle"},{"id":"adnan-sohail","url":"/people/adnan-sohail","firstName":"Adnan","lastName":"Sohail","pictureUrl":"/people/adnan-sohail/image","level":"A2","location":"Seattle"},{"id":"adrian-thomas","url":"/people/adrian-thomas","firstName":"Adrian","lastName":"Thomas","pictureUrl":"/people/adrian-thomas/image","level":"M1","location":"Dallas"},{"id":"akhil-patel","url":"/people/akhil-patel","firstName":"Akhil","lastName":"Patel","pictureUrl":"/people/akhil-patel/image","level":"M3","location":"Seattle"},{"id":"alan-hsu","url":"/people/alan-hsu","firstName":"Alan","lastName":"Hsu","pictureUrl":null,"level":"M1","location":"Seattle"},{"id":"alan-volk","url":"/people/alan-volk","firstName":"Alan","lastName":"Volk","pictureUrl":"/people/alan-volk/image","level":"M2","location":"Dallas"},{"id":"alex-brodsky","url":"/people/alex-brodsky","firstName":"Alex","lastName":"Brodsky","pictureUrl":"/people/alex-brodsky/image","level":"C2","location":"Los Angeles"},{"id":"alex-tai","url":"/people/alex-tai","firstName":"Alex","lastName":"Tai","pictureUrl":"/people/alex-tai/image","level":"A2","location":"Houston"},{"id":"alexandre-minssieux","url":"/people/alexandre-minssieux","firstName":"Alexandre","lastName":"Minssieux","pictureUrl":"/people/alexandre-minssieux/image","level":"M1","location":"Seattle"}]';
    var people = {
      'aaron-boswell' : { person: {
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
        experiences: [ 16812 ]},
        experiences: [
          {
            id: 16812,
            url: "/people/aaron-boswell/experience/16812",
            role: null,
            start: "2013-08-15T00:00:00",
            end: "2013-11-18T00:00:00",
            title: null,
            skills: [ ],
            experience: null,
            summary: null,
            type: "ClientProject",
            project: {
              id: "rpfg002-ecommerce-platform-implementation",
              url: "/projects/rpfg002-ecommerce-platform-implementation",
              name: "eCommerce Platform Implementation",
              client: {
                id: "roundpoint-financial-group",
                url: "/clients/roundpoint-financial-group",
                name: "RoundPoint Financial Group"
              }
            }
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
        res.send(people[req.params['id']]);
      });


      server.get('/people', function(req, res) {
       var people = JSON.parse(people_search);
       var filtered = people.filter(function(el) {
         var f = req.query.filter;
         return (el.location.toLowerCase() === f ||
                 el.level.toLowerCase() === f);
       });
        res.send({
          'people' : filtered,
          'total': filtered.length,
          'offset': 0,
          'limit': 0
        });
      });

      server.get('/clients', function(req, res) {
        res.send({
          'total' : 4,
          'offset': 0,
          'limit': 0,
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
