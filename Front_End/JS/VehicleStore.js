var VehicleStore = {
    vehicleinfocus : undefined,
    avalibleVehicles: undefined,

    init: function()
    {
        // this.unemployedPersons = this.functions.fetchAvalibleUnemployed(Map.mapId);
         $("#buyvehicle").on('click', function(){
           VehicleStore.functions.buyVehicle(VehicleStore.vehicleinfocus)
         })
        VehicleStore.avalibleVehicles = VehicleStore.Tempcars;
        VehicleStore.functions.renderVehicleStore();
    }
}

VehicleStore.functions = {

    renderVehicleStore: function () {

        var vehicles = VehicleStore.avalibleVehicles;
        $.each(vehicles, function(index,vehicle) {
          vehicle.translation = Vehicle.constants.TRANSLATION[vehicle.type];
        });

         VehicleStore.functions.renderFocusVehicle(vehicles[0]);

          //generate list
          var options = { islinkable: true,
                displayheader: true,
                appendelement: "#menu-vehiclestore-list",
                linkfunction: this.renderFocusVehicle,
                oddcolor:"#fccf2d",
                evencolor:"#fcac5d",
                imgheight: '35px',
                imgwidth:'50px' };

          var propertiestorender = ["img", "name", "fueltank", "translation","value"];
          var columns = [
              { name: "", width: "10%" },
              { name: "namn", width: "20%" },
              { name: "tankstorlek", width: "30%",unit:"liter" },
              { name: "typ", width: "20%" },
              { name: "pris", width: "20%",unit:"pixar" }];
          var list = new List(vehicles, propertiestorender, options,columns);
        $("#menu-vehiclestore").show();
        $("#vehiclestoreopeninghours").text(`${VehicleStore.constants.OPENS} - ${VehicleStore.constants.CLOSES}`)


      },
      buyVehicle: function(vehicle){

        if(Player.functions.moneyTransaction(vehicle.value))
        {
          Map.items.push(vehicle)
          vehicle.playerid = Player.player.id
          Player.functions.renderPlayerInfo()
          Item.functions.renderItem(vehicle, false)
          VehicleStore.avalibleVehicles = _.reject(VehicleStore.avalibleVehicles, vehicle)
          //UOffice.personinfocus = null;
          this.renderVehicleStore();
        }
      },

      renderFocusVehicle: function (vehicleinfocus)
      {
        if(vehicleinfocus != undefined){
            $("#menu-vehiclestore-focus").show();
          $("#menu-vehiclestore-focus-img").attr("src", "images/" + vehicleinfocus.img);

          $("#menu-vehiclestore-name").text(vehicleinfocus.name);
          VehicleStore.vehicleinfocus = vehicleinfocus;
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

VehicleStore.constants = {
    OPENS: "10:00",
    CLOSES: "18:00"
}


VehicleStore.Tempcars = [
    { tileid: 91, name: "Volvo 244 DL", img: "vehicles/volvo244dl.gif", color: "", energy: 40, playerid: 0, itemid: 6022, mapid: 10, type: "car", seats: 5, passengers: [], fueltank: 60, value: 300  },
   { tileid: 91, name: "Hooky Oldschool DL", img: "vehicles/hookyoldschooldl.gif", color: "", energy: 40, playerid: 0, itemid: 8022, mapid: 10, type: "car", seats:3, passengers: [], fueltank: 60,value: 150   },
   { tileid: 91, name: "Java Kombi", img: "vehicles/javakombi.gif", color: "", energy: 40, playerid: 0, itemid: 602, mapid: 10, type: "car", seats: 2, passengers: [], fueltank: 60,value: 40   },
          ]
