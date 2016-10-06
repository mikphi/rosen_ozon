var UOffice = {
    unemployedPersons: null,
    personinfocus:undefined,
    init: function()
    {
        this.unemployedPersons = this.functions.fetchAvalibleUnemployed(Map.mapId);
        $("#recruit").on('click', function(){
          UOffice.functions.recruit(UOffice.personinfocus)
        })
    }
}

UOffice.functions = {

    renderUOffice: function () {

        var unemployed = UOffice.unemployedPersons;
          UOffice.functions.renderFocusUnemployed(unemployed[0]);

          //generate list
          var options = { islinkable: true,displayheader: true, appendelement: "#menu-uoffice-unemployed-list", linkfunction: this.renderFocusUnemployed, oddcolor:"white" };
          var propertiestorender = ["smallimg", "name", "quote", "persontype", "dailycost"];
          var columns = [
              { name: "", width: "10%" },
              { name: "namn", width: "20%" },
              { name: "motto", width: "50%" },
              { name: "typ", width: "10%" },
              { name: "lönekrav", width: "10%" }];
          var list = new List(unemployed, propertiestorender, options,columns);
        $("#menu-uoffice").show();
        $("#uofficeopeninghours").text(`${UOffice.constants.OPENS} - ${UOffice.constants.CLOSES}`)


    },
    recruit: function(person){
      Map.items.push(person)
      person.playerid = Player.player.id
      Player.functions.renderPlayerInfo()
      Item.functions.renderItem(person, false)
      UOffice.unemployedPersons = _.reject(UOffice.unemployedPersons, person)
      //UOffice.personinfocus = null;
      this.renderUOffice();
    },
    renderFocusUnemployed: function (personinfocus)
    {
      if(personinfocus != undefined){
          $("#menu-uoffice-focus").show();
        $("#menu-uoffice-focus-img").attr("src", "images/" + personinfocus.img);
        $("#menu-uoffice-quote").text('"'+personinfocus.quote+'"');
        $("#menu-uoffice-name").text(personinfocus.name);
        UOffice.personinfocus = personinfocus
      }
      else{
        $("#menu-uoffice-focus").hide();
      }
    },

    fetchAvalibleUnemployed: function (mapid)
    {
        return UOffice.temppersons;
    }
}

UOffice.constants = {
    OPENS: "10:00",
    CLOSES: "18:00"
}

UOffice.temppersons = [
{
  tileid: 35,
  itemid:12392,
  tileid:90,
  type:"person",
  name: "Tobias Ohlsson",
  img: "persons/1.png",
  smallimg:"persons/1head.png",
  quote: "Xtreme Programming for life, bitches",
  color: "",
  persontype: "lanare",
  dailycost:10,
  energy: 100,
  attributes: {strenght:6,mobility:4,intelligence:4,leadership:1, weaponhandling:9, influence:10, currage:5, drugtolerance:7, workmoral:7, alcoholtolerant:2},energytomove: 20  },
{ tileid: 35, itemid: 1292,  tileid:70,type:"person",name: "Raven", img: "persons/1.png", smallimg: "persons/1head.png", quote: "Life is pain, and so is unemployment", color: "", persontype: "gothare", dailycost: 10, attributes: {strenght:6,mobility:8,intelligence:3,leadership:4, weaponhandling:9, influence:10, currage:9, drugtolerance:8, workmoral:10, alcoholtolerant:10},energytomove: 20 },
{ tileid: 35, itemid: 122, tileid:103, type:"person",name: "Felix Reinfeldt", img: "persons/1.png", smallimg: "persons/1head.png", quote: "privatisera arbetsförmedlingen.", color: "", persontype: "adeln", dailycost: 10, attributes: {strenght:10,mobility:5,intelligence:1,leadership:1, weaponhandling:4, influence:1, currage:10, drugtolerance:4, workmoral:2, alcoholtolerant:2},energytomove: 20  }
]
