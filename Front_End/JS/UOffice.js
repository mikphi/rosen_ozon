﻿var UOffice = {
    unemployedPersons: null,

    init: function()
    {
        this.unemployedPersons = this.functions.fetchAvalibleUnemployed(Map.mapId);
    }
}

UOffice.functions = {
    renderUOffice: function () {
      
        var unemployed = UOffice.unemployedPersons;

        this.renderFocusUnemployed(unemployed[0]);

        //generate list
        var options = { islinkable: true,displayheader: true, appendelement: "#menu-uoffice-unemployed-list", linkfunction: this.renderFocusUnemployed };
        var propertiestorender = ["smallimg", "name", "quote", "persontype", "dailycost"];
        var columns = [
            { name: "", width: "10%" },
            { name: "namn", width: "20%" },
            { name: "motto", width: "50%" },
            { name: "typ", width: "10%" },
            { name: "lönekrav", width: "10%" }];
        List.init(unemployed, propertiestorender, options,columns);

        $("#menu-uoffice").show();

    },

    renderFocusUnemployed: function (personinfocus)
    {
        
        $("#menu-uoffice-focus-img").attr("src", "images/" + personinfocus.img);
        $("#menu-uoffice-quote").text('"'+personinfocus.quote+'"');
        $("#menu-uoffice-name").text(personinfocus.name);
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
{ tileid: 35,itemid:12392, name: "Tobias Ohlsson", img: "persons/1.png", smallimg:"persons/1head.png", quote: "Xtreme Programming for life, bitches", color: "",persontype: "lanare", dailycost:10, attributes: { strength: 10, drugtolerance: 19 } },
{ tileid: 35, itemid: 1292, name: "Raven", img: "persons/1.png", smallimg: "persons/1head.png", quote: "Life is pain, and so is unemployment", color: "", persontype: "gothare", dailycost: 10, attributes: { strength: 11, drugtolerance: 13 } },
{ tileid: 35, itemid: 122, name: "Felix Reinfeldt", img: "persons/1.png", smallimg: "persons/1head.png", quote: "privatisera arbetsförmedlingen.", color: "", persontype: "adeln", dailycost: 10, attributes: { strength: 13, drugtolerance: 15 } }
]
    