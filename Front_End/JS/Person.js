var Person  = {

}

Person.functions = {
    renderMenu: function (menuelement, person) {

        $("#menu-item").removeClass("vehicle-menu");

        menuelement.children(".item-energy").append()

        $("#menu-item").addClass("person-menu");

        $personMenu = $("#item-specific-content");

        var attrkeys = Object.keys(person.attributes);

        for(var i = 0; i < attrkeys.length; i++)
        {

            $div = $("<div>");
            $div.css({"height":"30px"},{"padding-bottom":"5px"});
            $div.addClass("attrprogressbar" + i);
            $div.css("position","relative");
            $(".left-content").append($div);

            Person.functions.renderProgressBar(person.attributes[attrkeys[i]],".attrprogressbar" + i, Person.constants.TRANSLATION[attrkeys[i]]);

        }

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
             //alert(Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linktext);
             $a = $("<a>");
             $a.on("click", function () { Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linkfunction() });
             $a.text(Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linktext);
             $personMenu.append($a);
            // switch (tile.tiletype)
            // {
            //     case "uoffice":
            //         $a = $("<a>");
            //         $a.on("click", function () { UOffice.functions.renderUOffice(); });
            //         $a.text(" Gå in på arbetsförmedlingen");
            //         $personMenu.append($a);
            //         break;
            //
            //
            // }
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

    renderProgressBar: function(value,container,attribute)
    {


      var bar = new ProgressBar.Line(container, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        trailColor: '#898989',
        trailWidth: 4,
        from: {color: '#d11919'},
        to: {color: '#a0ea6b'},
        svgStyle: {width: '90%'},
        text: {
          style: {
            color: '#3f3d3d',
            position: 'absolute',
            right: '10px',
            top: '7px',
            padding: 5,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        step: (state, bar) => {
          bar.setText(attribute + ": " + Math.round(bar.value()*10));
          bar.path.setAttribute('stroke', state.color);
        }
      });

      bar.animate(value/10);

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


Person.constants = {

    TRANSLATION: {
      strength:"styrka",
      mobility:"rörlighet",
      intelligence:"intelligens",
      leadership:"ledarskap",
      weaponhandling:"vapenfärdighet",
      influence:"inflytande",
      currage:"mod",
      drugtolerance:"knarktålig",
      workmoral:"arbetsmoral",
      alcoholtolerant:"alkoholtålig"
      }

}
