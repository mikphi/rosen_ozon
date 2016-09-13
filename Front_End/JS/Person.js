var Person  = {

}

Person.functions = {
    renderMenu: function (menuelement, person) {

        $("#menu-item").removeClass("vehicle-menu");

        menuelement.children(".item-energy").append()

        $("#menu-item").addClass("person-menu");

        $personMenu = $("#item-specific-content");

        $(".left-content").append(this.renderHorizontalBar(person.energy, 10, 100));
        $a = $("<a>");
        $a.on("click", function () { Item.functions.openMoveOptions() });
        $a.text("Flytta");
        $personMenu.append($a);

        var tile = _.findWhere(Map.tiles, { tileid: person.tileid });
        if (tile.ownership != Player.functions.getPlayer().color && tile.tiletype == "normal") {
            $a = $("<a>");
            $a.on("click", function () { Tile.functions.changeOwnershipOfTile(person.tileid) });
            $a.text(" Ta över området");
            $personMenu.append($a);
        }

        if (tile.tiletype != "normal")
        {
            switch (tile.tiletype)
            {
                case "uoffice":
                    $a = $("<a>");
                    $a.on("click", function () { UOffice.functions.renderUOffice(); });
                    $a.text(" Gå in på arbetsförmedlingen");
                    $personMenu.append($a);

                    break;
            }
        }

        $personMenu.append(this.renderEnterCarOptions(person));

    },

    renderVerticalBar: function (value, height, width) {
        var backgroundColor = Item.constants.ENERGY_HIGH;

        if (value < 70) { backgroundColor = Item.constants.ENERGY_MEDIUM; }
        if (value < 30) { backgroundColor = Item.constants.ENERGY_LOW; }

        return "<div class='vertical-bar' style='height:" + height + "px; width:" + width + "'><div style='height:" + (101 - value) + "%'></div><div class='vertical-bar-level' style='height:" + value + "%;background-color:" + backgroundColor + ";'></div></div>";
    },

    renderHorizontalBar: function (value, height, width) {

        var backgroundColor = Item.constants.ENERGY_HIGH;

        if (value < 70) { backgroundColor = Item.constants.ENERGY_MEDIUM; }
        if (value < 30) { backgroundColor = Item.constants.ENERGY_LOW; }

        return "<div class='horizontal-bar' style='height:" + height + "px; width:" + width + "'><div style='width:" + (101 - value) + "%'></div><div class='horizontal-bar-level' style='width:" + value + "%;background-color:" + backgroundColor + ";'></div></div>";

    },

    renderEnterCarOptions: function (person) {

        var vehicles = _.filter(Map.items, function (item) { return item.tileid == person.tileid && item.type == "car" && item.passengers.length < item.seats; });

        if (vehicles.length == 0)
            return

        $html = $("<div>");
        $html.addClass('person-enter-vehicles');
        $html.text('Bilar att åka med:');

        for (var i = 0; i < vehicles.length; i++) {

            if (vehicles[i].passengers.length < vehicles[i].seats) {
                $p = $("<p>");
                $a = $("<a>");
                $a.text(vehicles[i].name);

                var vehicle = vehicles[i];


                $a.click((function (vehicle) {
                    return function () {
                        Person.functions.enterCar(person, vehicle);
                    };
                })(vehicle));

                $p.append($a);
                $html.append($p);
            }

        }


        return $html;
    },

    enterCar: function (person, vehicle) {
        person.invehicle = true;
        Item.functions.renderItem(person);
        vehicle.passengers.push(person.itemid);
        Item.functions.renderItem(vehicle, true);
        Menus.functions.closeItemMenu();

    }


}
