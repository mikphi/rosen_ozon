var Shop = {
    iteminfocus : {},
    availableitems: [],
    contentitems: {},
    propertiestorender :{},
    columns : {},
    listoptions: {},

    init: function(tileid)
    {
        $("#shop-buy-item").off();
         $("#shop-buy-item").on('click', function(){
           Shop.functions.buyItem(Shop.iteminfocus)
         })
        Shop.listoptions = Shop.functions.fetchListOptions(tileid);
        Shop.availableitems = Shop.functions.fetchAvailableItems(tileid);
        Shop.contentitems = _.findWhere(Shop.temps.contents, { tileid: tileid });
        Shop.propertiestorender = Shop.functions.fetchListProperties(tileid);
        Shop.columns = Shop.functions.fetchListColumns(tileid);
        Shop.functions.renderShop();
    }
}

Shop.functions = {

    renderShop: function () {

      $(".shop").show();
        $(".shop").removeClass("uoffice-shop weapon-shop vehicle-shop");
      $(".shop").addClass(Shop.contentitems.shoptype + "-shop");
      $(".shop-name").text(Shop.contentitems.shopname);
      $(".shop-welcome-text").text(Shop.contentitems.welcometext);
      $("#shop-openinghours").text(Shop.contentitems.opens + " - " + Shop.contentitems.closes);
      $("#shop-owner-pic").attr("src","images/shop/"+Shop.contentitems.shoptype +"-shop.gif");

      var items = Shop.availableitems;

      Shop.functions.renderFocusItem(items[0]);

      //generate list
      if(Shop.contentitems.listtype =="normal") {
          var list = new List(items, Shop.propertiestorender, Shop.listoptions,Shop.columns);
      }
      else {
          var list = new ListWebShop(items, Shop.propertiestorender, Shop.listoptions,Shop.columns);
      }
    },

    buyItem: function(item){
      console.log(item);
      if(Player.functions.moneyTransaction(item.value))
      {
        item.playerid = Player.player.id
        if(item.itemtype =="weapon")
        {

          item.personid = Map.itemActive.itemid;
          Player.weapons.push(item);
          Item.functions.openItemMenu(Map.itemActive);
        }
        else if(item.itemtype=="inventoryitem")
        {
            item.personid = Map.itemActive.itemid;
            Player.inventory.push(item);
        }
        else {
              Map.items.push(item)
                Item.functions.renderItem(item, false)
        }


        Player.functions.renderPlayerInfo()

        Shop.availableitems = _.reject(Shop.availableitems, item)

        this.renderShop();
      }
    },

    renderFocusItem: function (iteminfocus)
    {
      if(iteminfocus != undefined){
          $("#shop-focus-item-content").slideUp(500,function(){
            $("#menu-shop-focus-img").attr("src", "images/" + iteminfocus.img);
            $("#shop-focus-item-name").text(iteminfocus.name);
            Shop.iteminfocus = iteminfocus;

          });
          $("#shop-focus-item-content").slideDown();

      }
      else{
        $("#shop-focus-item").hide();
      }
    },

    fetchListColumns:function(tileid)
    {
      switch(tileid)
      {
          case 91:
          return Shop.Tempcarscolumns;
          break;
          case 104:
          return Shop.Tempweaponscolumns;
          break;
          case 90:
          return Shop.Tempuofficecolumns;
          break;
          case 105:
          return Shop.Tempgasstationitemscolumns;
          break;

      }
    },

    fetchAvailableItems: function(tileid)
    {
        switch(tileid)
        {
            case 91:
            return Shop.Tempcars;
            break;
            case 104:
            return Shop.Tempweapons;
            break;
            case 90:
            return Shop.Tempuofficepersons;
            break;
            case 105:
            return Shop.Tempgasstationitems;
            break;
        }
    },

    fetchListOptions: function(tileid)
    {
        switch(tileid)
        {
            case 91:
            return Shop.Tempcarlistsettings;
            break;
            case 104:
            return Shop.Tempweaponlistsettings;
            break;
            case 90:
            return Shop.Tempuofficelistsettings;
            break;
            case 105:
            return Shop.Tempgasstationlistsettings;
            break;
        }
    },

    fetchListProperties: function(tileid)
    {
        switch(tileid)
        {
            case 91:
            return Shop.Tempcarslistproperties;
            break;
            case 104:
            return Shop.Tempweaponslistproperties;
            break;
            case 90:
            return Shop.Tempuofficelistproperties;
            break;
            case 105:
            return Shop.Tempgasstationitemslistproperties;
            break;
        }
    }
}


Shop.temps = {

    contents: [{ tileid:91,shoptype:"vehicle", shopname: "Big Dealys bilar o sånt", welcometext:"fuck off, jag bestämmer!", opens: "10:00", closes:"18:00", listtype:"normal" },
    { tileid:104,shoptype:"weapon", shopname: "Willy Johnssons vapen och järnhandel", welcometext:"Leve gunns and ammo! Vapen är livet. <3 <3", opens: "08:00", closes:"20:00", listtype:"normal" },
      { tileid:90,shoptype:"uoffice", shopname: "Arbetsförmedlingen", welcometext:"Välkommen! Fatta så jävla kul det är o jobba!!! #jävligtkul", opens: "09:00", closes:"18:00", listtype:"normal" },
        { tileid:105,shoptype:"gasstation", shopname: "Jiffys fina bensakedja", welcometext:"Välkommen till Jiffys! ", opens: "06:00", closes:"02:00",listtype:"webshop" },
  ]

}


Shop.Tempcars = [
    { tileid: 91,desc:"", name: "Volvo 244 DL", img: "vehicles/volvo244dl.gif", color: "", energy: 40, playerid: 0, itemid: 6022, mapid: 10, type: "vehicle", vehicletype:"car", seats: 5, passengers: [], fuelcapacity: 40, value: 300,energytomove: 1  },
   { tileid: 91,desc:"", name: "Hooky Oldschool DL", img: "vehicles/hookyoldschooldl.gif", color: "", energy:20, playerid: 0, itemid: 8022, mapid: 10, type: "vehicle",vehicletype:"moped", seats:3, passengers: [], fuelcapacity: 20,value: 150,energytomove: 0.3   },
   { tileid: 91,desc:"", name: "Java Kombi", img: "vehicles/javakombi.gif", color: "", energy: 10, playerid: 0, itemid: 602, mapid: 10, type: "vehicle",vehicletype:"moped", seats: 2, passengers: [], fuelcapacity: 10,value: 40,energytomove: 0.1   },
   { tileid: 91,desc:"", name: "Java Kombi", img: "vehicles/javakombi.gif", color: "", energy: 10, playerid: 0, itemid: 8902, mapid: 10, type: "vehicle",vehicletype:"moped", seats: 2, passengers: [], fuelcapacity: 10,value: 40,energytomove: 0.1   },
   { tileid: 91,desc:"", name: "Bullfix 2000", img: "vehicles/bullfix2000.gif", color: "", energy: 40, playerid: 0, itemid: 68682, mapid: 10, type: "vehicle",vehicletype:"car", seats: 5, passengers: [], fuelcapacity: 40,value: 300,energytomove: 2   },
   { tileid: 91,desc:"", name: "Volvo PV dl", img: "vehicles/volvopwdl.gif", color: "", energy: 43, playerid: 0, itemid: 1231202, mapid: 10, type: "vehicle",vehicletype:"car", seats: 6, passengers: [], fuelcapacity: 43,value: 95 ,energytomove: 1.5  },
   { tileid: 91,desc:"", name: "Caddylick 160 se", img: "vehicles/caddylick160se.gif", color: "", energy: 55, playerid: 0, itemid: 234202, mapid: 10, type: "vehicle",vehicletype:"car", seats: 6, passengers: [], fuelcapacity: 55,value: 140 ,energytomove: 2.1  },
   { tileid: 91,desc:"", name: "Discolight GL Combi", img: "vehicles/discolightglcombi.gif", color: "", energy: 40, playerid: 0, itemid: 6572, mapid: 10, type: "vehicle",vehicletype:"car", seats: 4, passengers: [], fuelcapacity: 60,value: 199,energytomove: 1.1   },
   { tileid: 91,desc:"", name: "Presidential car 63 edt", img: "vehicles/presidentialcar63edt.gif", color: "", energy: 70, playerid: 0, itemid: 572, mapid: 10, type: "vehicle",vehicletype:"car", seats: 8, passengers: [], fuelcapacity: 70,value: 199,energytomove: 3   },
   { tileid: 91,desc:"", name: "Presidential car 63 edt", img: "vehicles/presidentialcar63edt.gif", color: "", energy: 70, playerid: 0, itemid: 573, mapid: 10, type: "vehicle",vehicletype:"car", seats: 8, passengers: [], fuelcapacity: 70,value: 199 ,energytomove: 3  },
        ]
Shop.Tempcarscolumns = [
    { name: "", width: "10%" },
    { name: "Modell", width: "30%" },
    { name: "Tankstorlek", width: "17%",unit:"liter" },
    { name:"Drar",width:"16%",unit:"ltr/ruta"},
    { name: "Typ", width: "15%" },
    { name: "Pris", width: "12%",unit:"pixar" }];
Shop.Tempcarslistproperties = ["img", "name", "fuelcapacity","energytomove", "vehicletype","value"];

Shop.Tempcarlistsettings = { islinkable: true,
      displayheader: true,
      appendelement: "#shop-item-list",
      linkfunction: Shop.functions.renderFocusItem,
    oddcolor:"rgb(244, 153, 25)",
    evencolor:"rgb(247, 169, 47)",
      imgheight: '35px',
      imgwidth:'50px' };

Shop.Tempweapons = [
  { name: "Påk i trä", img: "weapons/1.gif", playerid: 0, weaponid: 32122, personid:null, type: "bat", value: 10, itemtype:"weapon"  },
  { name: "Turtles trådar", img: "weapons/2.gif", playerid: 0, weaponid: 6756022, personid:null, type: "bat", value: 15, itemtype:"weapon"  },
  { name: "Turtles trådar", img: "weapons/2.gif", playerid: 0, weaponid: 58022, personid:null, type: "bat", value: 15, itemtype:"weapon", itemtype:"weapon"  },
  { name: "Baseball trä", img: "weapons/3.gif", playerid: 0, weaponid: 89022, personid:null, type: "bat", value: 16, itemtype:"weapon"  },
  { name: "Påk i trä", img: "weapons/1.gif", playerid: 0, weaponid: 1342, personid:null, type: "bat", value: 11 , itemtype:"weapon" },
  { name: "Elbrödkniven", img: "weapons/4.gif", playerid: 0, weaponid: 558822, personid:null, type: "knife", value: 21, itemtype:"weapon"  },
  { name: "Yxfix med fjärrkontroll", img: "weapons/5.gif", playerid: 0, weaponid: 4737022, personid:null, type: "axe", value: 23, itemtype:"weapon", itemtype:"weapon"  },
  { name: "Maxad TNT (170km/tim)", img: "weapons/6.gif", playerid: 0, weaponid: 34022, personid:null, type: "bomb", value: 24, itemtype:"weapon"  },
  { name: "TommyGun", img: "weapons/7.gif",playerid: 0, weaponid: 220, personid:null, type: "firearm", value: 26, itemtype:"weapon"  },
      ]

Shop.Tempweaponscolumns = [
      { name: "", width: "10%" },
      { name: "namn", width: "50%" },
      { name: "typ", width: "20%" },
      { name: "pris", width: "20%",unit:"pixar" }];

  Shop.Tempweaponslistproperties = ["img", "name", "type","value"];

  Shop.Tempweaponlistsettings = { islinkable: true,
        displayheader: true,
        appendelement: "#shop-item-list",
        linkfunction: Shop.functions.renderFocusItem,
        oddcolor:"",
        evencolor:"#3B693A",
        imgheight: '35px',
        imgwidth:'50px' };

  Shop.Tempuofficepersons = [
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
  ];


  Shop.Tempuofficecolumns = [
      { name: "", width: "10%" },
      { name: "namn", width: "20%" },
      { name: "motto", width: "50%" },
      { name: "typ", width: "10%" },
      { name: "lönekrav", width: "10%" }];
  Shop.Tempuofficelistproperties =["smallimg", "name", "quote", "persontype", "dailycost"];

Shop.Tempuofficelistsettings = { islinkable: true,
      displayheader: true,
      appendelement: "#shop-item-list",
      linkfunction: Shop.functions.renderFocusItem,
      oddcolor:"",
      evencolor:"#D6D6D6",
      imgheight: '35px',
      imgwidth:'50px' };

  Shop.Tempgasstationitems = [
    {itemtype:"inventoryitem",type:"inventoryitem",name:"korv m brö", value:10, energy: 10, description:'"En go vurre som ger dig 10 härliga prossar av energi"', type: "food", img:"inventory/korvmedbrod.png"},
    {itemtype:"inventoryitem",name:"kabanoss m mos o gurkmajonäs", value:14,description:'" För den som vill ha lite mer. Ger 16% extra energi"', energy: 16, type: "food", img:"inventory/kabanoss.png"},
    {itemtype:"inventoryitem",name:"dansk pölse med rostad lök", value:12, energy: 13,description: '"Ta en dansk. (13% i energi)"', type: "food", img:"inventory/danskkorv.png"},
    {itemtype:"inventoryitem",name:"en trefemma", value:3, energy: 5, type: "alcohol",description:'"Varför inte?"', img:"inventory/onebeer.png"},
    {itemtype:"inventoryitem",name:"sexpack mariestad", value:14, energy: 20, type: "alcohol", description:'"Ett par kalla."', img:"inventory/sexpack.png"},
    {itemtype:"inventoryitem",name:"dubbel-IPA", value:10, energy: 2, type: "alcohol", description:'"För hipstern inom oss alla."', img:"inventory/ipa.png"},
    {itemtype:"inventoryitem",name:"raw-foooood", value:21, energy: 4, type: "food", description:'"Dyrt men äckligt. hög trendfaktor."', img:"inventory/rawfood.png"},
    {itemtype:"inventoryitem",name:"bag in box (san giovese 1995 edt)", value:20, energy: 30, description: '"bag in box... o herre gud."', type: "alcohol", img:"inventory/wine.png"},
    {itemtype:"inventoryitem",name:"kådisar XXL", value:20, type: "protection",description:'"för ett säkert umgänge"', img:"inventory/kondomer.png"},
    {itemtype:"inventoryitem",name:"Bensindunk 10 liter", value:20, type: "fuel",description:'"10 liters härlig bensin."', img:"inventory/dunk.png"},
    {itemtype:"inventoryitem",name:"kaffe", value:5, energy: 6, type: "food", description:'"skånerost (6% energi)"', img:"inventory/kaffe.png"},
    {itemtype:"inventoryitem",name:"30 patroner", value:15, type: "ammunition", description:'"gå ut o skjut"', img:"inventory/ammuniton.png"},
    {itemtype:"inventoryitem",name:"10 patroner", value:7, type: "ammunition", description:'"gå ut o skjut, lite"', img:"inventory/ammuniton.png"}


  ];

  Shop.Tempgasstationitemslistproperties = ["name", "img", "description","value"];

  Shop.Tempgasstationitemscolumns= [
      { name: "Volym", width: "30%" },
      { name: "", width: "30%" },
      { name: "", width: "30%", css: {"font-style":"italic", "font-weight":"normal", "padding-top": "7px"}},
      { name: "", width: "30%", unit:"pix"},
      ];

      Shop.Tempgasstationlistsettings = { islinkable: true,
            displayheader: true,
            displayheader: false,itemwidth:"25%",itemheight:"140px", imgwidth: "50px", imgheight:"27px",
            appendelement: "#shop-item-list",
            linkfunction: Shop.functions.renderFocusItem,
            oddcolor:"",
            evencolor:"#D6D6D6" };
