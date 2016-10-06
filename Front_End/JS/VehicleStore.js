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

    }
}

VehicleStore.functions = {

    renderVehicleStore: function () {

        var vehicles = VehicleStore.avalibleVehicles;
        $.each(vehicles, function(index,vehicle) {
          vehicle.translation = Vehicle.constants.TRANSLATION[vehicle.vehicletype];
        });

         VehicleStore.functions.renderFocusVehicle(vehicles[0]);

          //generate list
          var options = { islinkable: true,
                displayheader: true,
                appendelement: "#menu-vehiclestore-list",
                linkfunction: VehicleStore.functions.renderFocusVehicle,
                oddcolor:"rgb(244, 153, 25)",
                evencolor:"rgb(247, 169, 47)",
                imgheight: '35px',
                imgwidth:'50px' };

          var propertiestorender = ["img", "name", "fuelcapacity","energytomove", "translation","value"];
          var columns = [
              { name: "", width: "10%" },
              { name: "Modell", width: "30%" },
              { name: "Tankstorlek", width: "17%",unit:"liter" },
              { name:"Drar",width:"16%",unit:"ltr/ruta"},
              { name: "Typ", width: "15%" },
              { name: "Pris", width: "12%",unit:"pixar" }];
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
    { tileid: 91, name: "Volvo 244 DL", img: "vehicles/volvo244dl.gif", color: "", energy: 40, playerid: 0, itemid: 6022, mapid: 10, type: "vehicle", vehicletype:"car", seats: 5, passengers: [], fuelcapacity: 40, value: 300,energytomove: 1  },
   { tileid: 91, name: "Hooky Oldschool DL", img: "vehicles/hookyoldschooldl.gif", color: "", energy:20, playerid: 0, itemid: 8022, mapid: 10, type: "vehicle",vehicletype:"moped", seats:3, passengers: [], fuelcapacity: 20,value: 150,energytomove: 0.3   },
   { tileid: 91, name: "Java Kombi", img: "vehicles/javakombi.gif", color: "", energy: 10, playerid: 0, itemid: 602, mapid: 10, type: "vehicle",vehicletype:"moped", seats: 2, passengers: [], fuelcapacity: 10,value: 40,energytomove: 0.1   },
   { tileid: 91, name: "Java Kombi", img: "vehicles/javakombi.gif", color: "", energy: 10, playerid: 0, itemid: 8902, mapid: 10, type: "vehicle",vehicletype:"moped", seats: 2, passengers: [], fuelcapacity: 10,value: 40,energytomove: 0.1   },
   { tileid: 91, name: "Bullfix 2000", img: "vehicles/bullfix2000.gif", color: "", energy: 40, playerid: 0, itemid: 68682, mapid: 10, type: "vehicle",vehicletype:"car", seats: 5, passengers: [], fuelcapacity: 40,value: 300,energytomove: 2   },
   { tileid: 91, name: "Volvo PV dl", img: "vehicles/volvopwdl.gif", color: "", energy: 43, playerid: 0, itemid: 1231202, mapid: 10, type: "vehicle",vehicletype:"car", seats: 6, passengers: [], fuelcapacity: 43,value: 95 ,energytomove: 1.5  },
   { tileid: 91, name: "Caddylick 160 se", img: "vehicles/caddylick160se.gif", color: "", energy: 55, playerid: 0, itemid: 234202, mapid: 10, type: "vehicle",vehicletype:"car", seats: 6, passengers: [], fuelcapacity: 55,value: 140 ,energytomove: 2.1  },
   { tileid: 91, name: "Discolight GL Combi", img: "vehicles/discolightglcombi.gif", color: "", energy: 40, playerid: 0, itemid: 6572, mapid: 10, type: "vehicle",vehicletype:"car", seats: 4, passengers: [], fuelcapacity: 60,value: 199,energytomove: 1.1   },
   { tileid: 91, name: "Presidential car 63 edt", img: "vehicles/presidentialcar63edt.gif", color: "", energy: 70, playerid: 0, itemid: 572, mapid: 10, type: "vehicle",vehicletype:"car", seats: 8, passengers: [], fuelcapacity: 70,value: 199,energytomove: 3   },
   { tileid: 91, name: "Presidential car 63 edt", img: "vehicles/presidentialcar63edt.gif", color: "", energy: 70, playerid: 0, itemid: 573, mapid: 10, type: "vehicle",vehicletype:"car", seats: 8, passengers: [], fuelcapacity: 70,value: 199 ,energytomove: 3  },
        ]
