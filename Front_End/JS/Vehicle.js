﻿var Vehicle = {

}

Vehicle.functions = {
    renderMenu: function (menuelement, vehicle) {

        this.renderFuelLevel(vehicle);
        $("#menu-item").addClass("vehicle-menu");

        $html = $("#item-specific-content");

        $html.append(this.renderPassenger(vehicle));

        $a = $("<a>");
        $a.on("click", function () { Item.functions.openMoveOptions() });
        $a.text("Flytta");
        $html.append($a);

        var tile = _.findWhere(Map.tiles, { tileid:vehicle.tileid });

        if(tile.tiletype == "gasstation")
        {
          console.log("h");
          $a = $("<a>");
          $a.on("click", function()
          {
            GasStation.functions.renderGasStation();
          });
          $a.text(" Slajda upp vid Jiffys pump");

          $html.append($a);
        }

    },

    renderPassenger: function (vehicle) {

        $seatsContent = $("<div>");
        $seatsContent.addClass("vehicle-seats-content");
        $seatsContent.append("<div>" + vehicle.passengers.length + " av " + vehicle.seats + " säten upptagna</div>");

        for (var i = 0; i < vehicle.seats; i++) {
            (function () {

                $seat = $("<div>");
                $seat.addClass("vehicle-seat");
                var passenger = vehicle.passengers[i];

                if (passenger) {
                    $passenger = $("<div>");
                    $passenger.addClass("vehicle-passenger");

                    var passengerObject = _.findWhere(Map.items, { itemid: passenger });

                    $passengerImg = $("<div>");
                    $passengerImg.addClass("vehicle-img");
                    $passengerImg.text(passengerObject.name);
                    $passengerImg.css("background-image", "url('images/" + passengerObject.img + "')");
                    $passenger.append($passengerImg);
                    $a = $("<a>");
                    $a.on("click", function () {
                        passengerObject.invehicle = false;
                        Item.functions.renderItem(passengerObject);
                        vehicle.passengers = _.reject(vehicle.passengers, function (passenger) { return passenger == passengerObject.itemid; });
                        Vehicle.functions.displayMenu(vehicle);
                        Item.functions.renderItem(vehicle,true);
                    });
                    $a.text(" kliv ur");
                    $passenger.append($a);
                    //$passenger.append(passengerObject.name);

                    $seat.append($passenger);

                }


                $seatsContent.append($seat);
            })();

        }

        return $seatsContent;

    },
    displayMenu: function (item) {

        Map.itemActive = item;
        Map.isItemClicked = true;

        var tile = _.findWhere(Map.tiles, { tileid: item.tileid });

        $menu = $("#vehicle");
        $menu.css({
            display: "block",
            top: parseInt($("#tile" + tile.tileid).css("top")),
            left: parseInt($("#tile" + tile.tileid).css("left")),
            height: "auto"

        });

        $("#vehicle-name").text(item.name);
        $("#vehicle-content").empty();
        $("#vehicle-picture").attr("src", "images/" + item.img);
        Vehicle.functions.renderFuelLevel(item);

        $html = $("#vehicle-stuff");
        $html.empty();
        $html.append(this.renderPassenger(item));

        Vehicle.functions.renderActions(item,tile);

        // if(tile.tiletype == "gasstation")
        // {
        //   $a = $("<a>");
        //   $a.on("click", function()
        //   {
        //     GasStation.functions.renderGasStation();
        //   });
        //   $a.text(" Slajda upp vid Jiffys pump");
        //
        //   $html.append($a);
        // }s
    },

    renderActions: function(item,tile)
    {
      $appndelm = $("#vehicle-actions");
      //add movement action
      $appndelm.empty();
      $div = $("<div>");
      $div.on("click", function () { Item.functions.openMoveOptions() });
      $div.text("Flytta");
      $appndelm.append($div);

      if(tile.tiletype == "gasstation")
      {
        $div = $("<div>");
        $div.on("click", function()
        {
          Shop.init(tile.tiletype);
          //GasStation.functions.renderGasStation();
        });
        $div.text("TNKA");

        $appndelm.append($div);
      }

    },

    renderPassangerIcons: function (passengers) {
        if (passengers.length > 0) {
            var html = "<div class='vehicle-passenger-icons'>";

            for (var i = 0; i < passengers.length; i++)
            {
                passenger = _.findWhere(Map.items, { itemid: passengers[i] });
                html += "<div><img src='images/"+passenger.img+"'></div>";
            }

            html += "</div>";
            return html;
        }

        return "";
    },

    renderFuelLevel: function (vehicle) {
        $("#vehicle-fuel-section").empty();
        $("#vehicle-fuel-section").append("<div class='vehicle-fuel'><img src='images/fueltank.png'><br />" + vehicle.energy + " liter<div> ( " + (vehicle.fuelcapacity - vehicle.energy) + " ltr till full tank)</div></div>");
    },

    changeTileIdOnPassengers: function (passengers,tileid) {

    for (var i = 0; i < passengers.length; i++)
    {
        var item = _.findWhere(Map.items, { itemid: passengers[i] });
        item.tileid = tileid;
        console.log(item.tileid);
    }

},
}


Vehicle.constants = {

    TRANSLATION: {
      car:"Bil",
      bike:"Cykel",
      moped:"Moped"

      }

}
