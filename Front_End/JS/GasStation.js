var GasStation = {

    vehicleInGasStation : null,
    init: function()
    {

         $("#buygas").on('click', function(){
           GasStation.functions.buygas(vehicleInGasStation)
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
              var litreslefttohalftank = (item.fuelcapacity/2)-item.energy;
              var litreslefttofulltank = item.fuelcapacity-item.energy;

              var fuellist = [];
              if(litreslefttohalftank > 0)
              {
                fuellist.push({type: "halv tank",litres: litreslefttohalftank, cost: (litreslefttohalftank*GasStation.constants.PRICEPERLITRE) });
              }
              fuellist.push({type: "hel tank",litres: litreslefttofulltank, cost: (litreslefttofulltank*GasStation.constants.PRICEPERLITRE) });

              console.log(litreslefttofulltank);
              var options = { islinkable: true,displayheader: false, appendelement: "#gasstation-gas-content", linkfunction: this.buygas, oddcolor:"white" };
              var propertiestorender = ["type", "litres", "cost"];
              var columns = [
                  { name: "", width: "30%" },
                  { name: "", width: "30%",unit:" liter" },
                  { name: "", width: "30%" ,unit: " kr"},
                  ];
              var list = new List(fuellist, propertiestorender, options,columns);


        }

      },

      buygas:function(selection)
      {
        selection.type == "hel tank" ? Map.itemActive.energy = Map.itemActive.fuelcapacity  : Map.itemActive.energy = (Map.itemActive.fuelcapacity/2);

        Player.player.money -= selection.cost;

        Player.functions.renderPlayerInfo()
        Item.functions.openItemMenu(Map.itemActive);
        $("#menu-gasstation").hide();
        Menus.functions.openPlayerMsgDialog("Fullt ös medvetlös med nya väldoftande ångor! Pedal to the metal!");
      },

      buyammo:function()
      {

      }


}

GasStation.constants = {
    OPENS: "06:00",
    CLOSES: "02:00",
    PRICEPERLITRE: 1.2
}
