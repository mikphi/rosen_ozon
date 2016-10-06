var GasStation = {

    vehicleInGasStation : null,
    cart: [],
    init: function()
    {
         $("#buygas").on('click', function(){
           GasStation.functions.buygas(vehicleInGasStation)
         });

         $("#gasstation-buy-items").on('click', function(){
            GasStation.functions.buyItems()
         });
    }
}

GasStation.functions = {

    renderGasStation: function () {

        var item = Map.itemActive;
        $("#menu-gasstation").show();
        $("#gasstationopeninghours").text(`${GasStation.constants.OPENS} - ${GasStation.constants.CLOSES}`)

        if(item.type == "vehicle")
        {
              $("#gasstation-shop-content").hide();
              $("#gasstation-gas-content").show();

              var litreslefttohalftank = (item.fuelcapacity/2)-item.energy;
              var litreslefttofulltank = item.fuelcapacity-item.energy;

              var fuellist = [];
              if(litreslefttohalftank > 0)
              {
                fuellist.push({type: "halv tank",litres: litreslefttohalftank, cost: (litreslefttohalftank*GasStation.constants.PRICEPERLITRE) });
              }
              fuellist.push({type: "hel tank",litres: litreslefttofulltank, cost: (litreslefttofulltank*GasStation.constants.PRICEPERLITRE) });


              var options = { islinkable: true,displayheader: false, appendelement: "#gasstation-gas-content", linkfunction: this.buygas, oddcolor:"white" };
              var propertiestorender = ["type", "litres", "cost"];
              var columns = [
                  { name: "Volym", width: "30%" },
                  { name: "", width: "30%",unit:" liter" },
                  { name: "", width: "30%" ,unit: " kr"},
                  ];
              var list = new List(fuellist, propertiestorender, options,columns);


        }
        else {

          $("#gasstation-shop-content").show();
          $("#gasstation-gas-content").hide();
          var inventoryitems = TEMPINVENTORYITEMS;

          var options = { islinkable: true,displayheader: false,itemwidth:"25%",itemheight:"140px", imgwidth: "50px", imgheight:"27px",appendelement: "#gasstation-shop-content", linkfunction: GasStation.functions.addtocart, oddcolor:"white" };
          var propertiestorender = ["name", "img", "description","price"];
          var columns = [
              { name: "Volym", width: "30%" },
              { name: "", width: "30%" },
              { name: "", width: "30%", css: {"font-style":"italic", "font-weight":"normal", "padding-top": "7px"}},
              { name: "", width: "30%", unit:"pix"},
              ];
          var list = new ListWebShop(inventoryitems, propertiestorender, options,columns);
        }

      },

      buygas:function(selection)
      {
        if(Player.functions.moneyTransaction(selection.cost))
        {
          selection.type == "hel tank" ? Map.itemActive.energy = Map.itemActive.fuelcapacity  : Map.itemActive.energy = (Map.itemActive.fuelcapacity/2);
          Player.functions.renderPlayerInfo()
          Item.functions.openItemMenu(Map.itemActive);
          $("#menu-gasstation").hide();
          Menus.functions.openPlayerMsgDialog("Fullt ös medvetlös med nya väldoftande ångor! Pedal to the metal!");
        }
      },

      addtocart:function(item)
      {
          console.log(GasStation.cart);
          GasStation.cart.length > 0 ? GasStation.cart.splice(GasStation.cart.length-1,1) : "";
          GasStation.cart.push(item);
          GasStation.functions.renderCart();
      },

      renderCart: function()
      {
        $("#gasstation-cart").show();
        $("#gastation-cart-items").empty();

        var options = { islinkable: false,displayheader: false, appendelement: "#gastation-cart-items", oddcolor:"#F9DA89",evencolor:"#F9E2A7" };
        var propertiestorender = ["name", "price"];
        var columns = [
            { name: "", width: "70%" },
            { name: "", width: "30%",unit:" pix" }
            ];

        var sum = _.reduce(GasStation.cart, function(memo, num){ return memo + num.price; }, 0);

        GasStation.cart.push({name:"Summa", price:sum});
        var list = new List(GasStation.cart, propertiestorender, options,columns);

      },
      buyItems: function()
      {
          var sum = GasStation.cart[GasStation.cart.length-1].price;

          if(Player.functions.moneyTransaction(sum))
          {
            var items = GasStation.cart;
              items.splice(items.length-1,1)

              for(var i = 0; i < items.length; i++)
              {
                items[i].personid = Map.itemActive.itemid;
              }

              Player.inventory = Player.inventory.concat(items);

              GasStation.cart = [];

              Player.functions.renderPlayerInfo();
            $("#gastation-cart-items").empty();
              $("#menu-gasstation").hide();
          }
      }
}

GasStation.constants = {
    OPENS: "06:00",
    CLOSES: "02:00",
    PRICEPERLITRE: 1.2
}

var TEMPINVENTORYITEMS = [
  {name:"korv m brö", price:10, energy: 10, description:'"En go vurre som ger dig 10 härliga prossar av energi"', type: "food", img:"inventory/korvmedbrod.png"},
  {name:"kabanoss m mos o gurkmajonäs", price:14,description:'" För den som vill ha lite mer. Ger 16% extra energi"', energy: 16, type: "food", img:"inventory/kabanoss.png"},
  {name:"dansk pölse med rostad lök", price:12, energy: 13,description: '"Ta en dansk. (13% i energi)"', type: "food", img:"inventory/danskkorv.png"},
  {name:"en trefemma", price:3, energy: 5, type: "alcohol",description:'"Varför inte?"', img:"inventory/onebeer.png"},
  {name:"sexpack mariestad", price:14, energy: 20, type: "alcohol", description:'"Ett par kalla."', img:"inventory/sexpack.png"},
  {name:"dubbel-IPA", price:10, energy: 2, type: "alcohol", description:'"För hipstern inom oss alla."', img:"inventory/ipa.png"},
  {name:"raw-foooood", price:21, energy: 4, type: "food", description:'"Dyrt men äckligt. hög trendfaktor."', img:"inventory/rawfood.png"},
  {name:"bag in box (san giovese 1995 edt)", price:20, energy: 30, description: '"bag in box... o herre gud."', type: "alcohol", img:"inventory/wine.png"},
  {name:"kådisar XXL", price:20, type: "protection",description:'"för ett säkert umgänge"', img:"inventory/kondomer.png"},
  {name:"Bensindunk 10 liter", price:20, type: "fuel",description:'"10 liters härlig bensin."', img:"inventory/dunk.png"},
  {name:"kaffe", price:5, energy: 6, type: "food", description:'"skånerost (6% energi)"', img:"inventory/kaffe.png"},
  {name:"30 patroner", price:15, type: "ammunition", description:'"gå ut o skjut"', img:"inventory/ammuniton.png"},
  {name:"10 patroner", price:7, type: "ammunition", description:'"gå ut o skjut, lite"', img:"inventory/ammuniton.png"}


];
