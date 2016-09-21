
var TEMPITEMS = [
    { tileid: 35, name: "Camme Pipps", img: "persons/1.png", smallimg:"persons/1head.png", color: "#6ED2FA", energy: 100, playerid: 1, itemid: 1000, mapid: 10, type: "person", persontype:"lanare",  invehicle: true, persontype: "ragger"  },
    { tileid: 35, name: "Berra Blonde", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 100, playerid: 1, itemid: 1001, mapid: 10, type: "person",persontype:"lanare",  invehicle: true, persontyp: "fjortis"  },
{ tileid: 90, name: "Biggie Blackie", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 60, playerid: 1, itemid: 1002, mapid: 10, type: "person",persontype:"lanare", invehicle: false, persontype: "thug"  },
    { tileid: 91, name: "Snickar- boan", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 40, playerid: 1, itemid: 1003, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
     { tileid: 46, name: "Katten Jansson", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 100, playerid: 1, itemid: 1010, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
    { tileid: 46, name: "Svikarn", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 90, playerid: 1, itemid: 1012, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
    { tileid: 46, name: "Frank Hvam", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 40, playerid: 1, itemid: 1013, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
    { tileid: 104, name: "Charlie Sheen", img: "persons/1.png", smallimg: "persons/1head.png", color: "#6ED2FA", energy: 70, playerid: 1, itemid: 1056, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
    { tileid: 38, name: "Bosse Boobdoktor", img: "persons/1.png", smallimg: "persons/1head.png", color: "#02ff2c", energy: 70, playerid: 10, itemid: 1006, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
    { tileid: 7, name: "Hektor Sandfalt", img: "persons/1.png", smallimg: "persons/1head.png", color: "#02ff2c", energy: 60, playerid: 10, itemid: 1004, mapid: 10, type: "person", persontype: "lanare", invehicle: false, persontype: "thug"  },
    { tileid: 35, name: "saab 900 knack", img: "vehicles/saab900.png", color: "#6ED2FA", energy: 50, playerid: 1, itemid: 2000, mapid: 10, type: "vehicle",vehicletype:"car", seats: 5, passengers: [1000, 1001], fueltank: 60  },
      { tileid: 35, name: "900 loose can edt", img: "vehicles/saab900.png", color: "#6ED2FA", energy: 50, playerid: 1, itemid: 2020, mapid: 10, type: "vehicle",vehicletype:"car", seats: 5, passengers: [], fueltank: 60  },
       { tileid: 35, name: "900 tjuv edt", img: "vehicles/saab900.png", color: "#6ED2FA", energy: 50, playerid: 1, itemid: 2021, mapid: 10, type: "vehicle", seats: 5,vehicletype:"car", passengers: [], fueltank: 60  },
        { tileid: 35, name: "saab 900 megamaxi", img: "vehicles/saab900.png", color: "#6ED2FA", energy: 50, playerid: 1, itemid: 2022, mapid: 10, type: "vehicle", seats: 5,vehicletype:"car", passengers: [], fueltank: 60  }
     ]




var TEMPPERSONATTRIBUTES = [
{strength:10,mobility:5,intelligence:7,leadership:4, weaponhandling:5, influence:1, currage:8, drugtolerance:4, workmoral:2, alcoholtolerant:4},
{strength:1,mobility:4,intelligence:2,leadership:3, weaponhandling:7, influence:8, currage:3, drugtolerance:9, workmoral:5, alcoholtolerant:9},
{strength:6,mobility:5,intelligence:3,leadership:4, weaponhandling:5, influence:3, currage:4, drugtolerance:4, workmoral:6, alcoholtolerant:4},
{strength:10,mobility:1,intelligence:6,leadership:2, weaponhandling:1, influence:3, currage:7, drugtolerance:2, workmoral:8, alcoholtolerant:6},
{strength:7,mobility:9,intelligence:10,leadership:9, weaponhandling:8, influence:8, currage:1, drugtolerance:2, workmoral:9, alcoholtolerant:7},
{strength:10,mobility:6,intelligence:8,leadership:7, weaponhandling:8, influence:9, currage:1, drugtolerance:6, workmoral:10, alcoholtolerant:9},
{strength:6,mobility:8,intelligence:3,leadership:4, weaponhandling:9, influence:10, currage:9, drugtolerance:8, workmoral:10, alcoholtolerant:10},
{strength:10,mobility:5,intelligence:1,leadership:1, weaponhandling:4, influence:1, currage:10, drugtolerance:4, workmoral:2, alcoholtolerant:2},
{strength:10,mobility:5,intelligence:1,leadership:1, weaponhandling:4, influence:1, currage:9, drugtolerance:4, workmoral:4, alcoholtolerant:2},
{strength:6,mobility:4,intelligence:4,leadership:1, weaponhandling:9, influence:10, currage:5, drugtolerance:7, workmoral:7, alcoholtolerant:2}
];

tempfunctions = {
  addAttribute: function(items)
  {
      $.each(items,function(index,item){

          if(item.type == "person")
          {
            var rnd = Math.floor((Math.random() * 10));
            item.attributes = TEMPPERSONATTRIBUTES[rnd];
          }

      });

  }


}


var TEMPWEAPONS = [
    { name: "Påk i trä", img: "weapons/1.gif", playerid: 1, weaponid: 321685822, personid:1056, type: "bat", value: 300  },
    { name: "Turtles trådar", img: "weapons/2.gif", playerid: 1, weaponid: 675896022, personid:1010, type: "bat", value: 300  },
    { name: "Yxfix med fjärrkontroll", img: "weapons/5.gif", playerid: 10, weaponid: 477837022, personid:1006, type: "axe", value: 300  },
    { name: "Maxad TNT (170km/tim)", img: "weapons/6.gif", playerid: 10, weaponid: 34008022, personid:1004, type: "bomb", value: 300  }
        ]
