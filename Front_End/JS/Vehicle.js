var Vehicle = {

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
                    $passengerImg.css("background-image", "url('images/" + passengerObject.img + "')");
                    $passenger.append($passengerImg);
                    $passenger.append(passengerObject.name);
                    $a = $("<a>");
                    $a.on("click", function () {
                        passengerObject.invehicle = false;
                        Item.functions.renderItem(passengerObject);
                        vehicle.passengers = _.reject(vehicle.passengers, function (passenger) { return passenger == passengerObject.itemid; });
                        Item.functions.openItemMenu(vehicle);
                        Item.functions.renderItem(vehicle,true);
                    });
                    $a.text(" kliv ur");
                    $passenger.append($a);
                    $seat.append($passenger);

                }


                $seatsContent.append($seat);
            })();

        }

        return $seatsContent;

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
        $(".right-content").append("<div class='vehicle-fuel'><img src='images/fueltank.png'><br />" + vehicle.energy + " liter<div> ( " + (vehicle.fueltank - vehicle.energy) + " ltr till full tank)</div></div>");
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
      car:"bil",
      bike:"cykel",
      moped:"moped"

      }

}
