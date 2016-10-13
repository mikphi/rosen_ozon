var Person  = {

}

Person.functions = {

    displayMenu: function(item)
    {
      Map.itemActive = item;
      Map.isItemClicked = true;

       var tile = _.findWhere(Map.tiles, { tileid: item.tileid });
      //
      item.energy >= item.energytomove ? $("#item-make-move").show() : $("#item-make-move").hide();

      $menu = $("#person");
      $menu.css({
          display: "block",
          top: parseInt($("#tile" + tile.tileid).css("top")),
          left: parseInt($("#tile" + tile.tileid).css("left")),
          height: "auto"
      });

      $("#person-name").text(item.name);
      $("#person-image").attr("src","images/persons/1profile.png");

      //render actions
      $actions = $("#person-actions");
      if(item.energy >= item.energytomove)
      {
        $a = $("<div>");
        $a.on("click", function () { Item.functions.openMoveOptions() });
        $a.text("Flytta");
        $actions.append($a);
      }

      //$divs.append("<img src='images/persons/1profile.png'>");

      //
      //
      //
      // $("#menu-item-name").text(item.name);
      // $("#item-specific-content").empty();
      // $("#item-picture").attr("src", "images/" + item.img);
      // $("#menu-item").removeClass("vehicle-menu");
      //
      //
      // menuelement.children(".item-energy").append()
      //
      // $("#menu-item").addClass("person-menu");
      //
      // $personMenu = $("#item-specific-content");
      //
      // //render person attributes
      // var attrkeys = Object.keys(person.attributes);
      //
      // $attributesdiv = $("<div>");
      // $attributesdiv.addClass("person-attributes-div");
      // $(".right-content").append($attributesdiv);
      //
      // for(var i = 0; i < attrkeys.length; i++)
      // {
      //     $div = $("<div>");
      //     $div.css({"height":"30px"},{"padding-bottom":"5px"});
      //     $div.addClass("attrprogressbar" + i);
      //     $div.css("position","relative");
      //     $(".person-attributes-div").append($div);
      //
      //     Person.functions.renderProgressBar(person.attributes[attrkeys[i]],".attrprogressbar" + i, Person.constants.TRANSLATION[attrkeys[i]]);
      //
      // }
      //
      //
      //
      //
      // $a = $("<a>");
      // $a.on("click", function () { Item.functions.openMoveOptions() });
      // $a.text("Flytta");
      // $personMenu.append($a);
      //
      // var tile = _.findWhere(Map.tiles, { tileid: person.tileid });
      // if (tile.ownership != Player.functions.getPlayer().color && tile.tiletype == "normal") {
      //     $a = $("<a>");
      //     $a.on("click", function () { Tile.functions.changeOwnershipOfTile(person.tileid) });
      //     $a.text(" Ta över området");
      //     $personMenu.append($a);
      // }
      //
      // if (tile.tiletype != "normal")
      // {
      //
      //      $a = $("<a>");
      //      $a.on("click", function () { Shop.init(tile.tileid)});
      //      //$a.on("click", function () { Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linkfunction() });
      //      $a.text(Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linktext);
      //      $personMenu.append($a);
      //
      // }
      //
      //
      // var inventoryitems = _.filter(Player.inventory, { personid: person.itemid });
      //
      // if(inventoryitems.length > 0)
      // {
      //   $img = $("<img>");
      //   $img.attr("src","images/inventory.png");
      //   $img.attr("width","40");
      //   $img.on("click",function() {
      //     Inventory.functions.displayInventory();
      //   });
      //   $personMenu.append($img);
      //   //$(".right-content").append("<div class='person-inventory'></div>");
      //     //Inventory.functions.displayInventory();
      // }
      //
      // console.log(inventoryitems);
      //
      //
      // $personMenu.append(this.renderEnterCarOptions(person));
      //
      // $div = $("<div>");
      // $div.addClass("person-weapons");
      // $personMenu.append($div);
      //
      //
      // var weapons = _.filter(Player.weapons, function (weapon) {
      //     return weapon.personid == person.itemid;
      // });
      //
      // if(weapons != undefined)
      // {
      //   var options = { islinkable: true,
      //         displayheader: false,
      //         appendelement: ".person-weapons",
      //         linkfunction: Weapon.functions.displaySelectedWeapon,
      //       oddcolor:"#353333",
      //       evencolor:"#232222",
      //         imgheight: '23px',
      //         imgwidth:'23px' };
      //
      //   var propertiestorender = ["img","name"];
      //   var columns = [
      //       { name: "", width: "20%" },
      //       { name: "", width: "50%" },
      //   ];
      //
      //   var list = new List(weapons, propertiestorender, options,columns);
      //
      //
      //   $(".right-content").append("<div class='person-weapon-highlight'></div>");

        $("#person").show();
    },

    renderMenu: function (menuelement, person) {

        $("#menu-item").removeClass("vehicle-menu");

        menuelement.children(".item-energy").append()

        $("#menu-item").addClass("person-menu");

        $personMenu = $("#item-specific-content");

        //render person attributes
        var attrkeys = Object.keys(person.attributes);

        $attributesdiv = $("<div>");
        $attributesdiv.addClass("person-attributes-div");
        $(".right-content").append($attributesdiv);

        for(var i = 0; i < attrkeys.length; i++)
        {
            $div = $("<div>");
            $div.css({"height":"30px"},{"padding-bottom":"5px"});
            $div.addClass("attrprogressbar" + i);
            $div.css("position","relative");
            $(".person-attributes-div").append($div);

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

             $a = $("<a>");
             $a.on("click", function () { Shop.init(tile.tileid)});
             //$a.on("click", function () { Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linkfunction() });
             $a.text(Tile.constants.SPECIAL_TILE_LINKS[tile.tiletype].linktext);
             $personMenu.append($a);

        }


        var inventoryitems = _.filter(Player.inventory, { personid: person.itemid });

        if(inventoryitems.length > 0)
        {
          $img = $("<img>");
          $img.attr("src","images/inventory.png");
          $img.attr("width","40");
          $img.on("click",function() {
            Inventory.functions.displayInventory();
          });
          $personMenu.append($img);
          //$(".right-content").append("<div class='person-inventory'></div>");
            //Inventory.functions.displayInventory();
        }




        $personMenu.append(this.renderEnterCarOptions(person));

        $div = $("<div>");
        $div.addClass("person-weapons");
        $personMenu.append($div);


        var weapons = _.filter(Player.weapons, function (weapon) {
            return weapon.personid == person.itemid;
        });

        if(weapons != undefined)
        {
          var options = { islinkable: true,
                displayheader: false,
                appendelement: ".person-weapons",
                linkfunction: Weapon.functions.displaySelectedWeapon,
              oddcolor:"#353333",
              evencolor:"#232222",
                imgheight: '23px',
                imgwidth:'23px' };

          var propertiestorender = ["img","name"];
          var columns = [
              { name: "", width: "20%" },
              { name: "", width: "50%" },
          ];

          var list = new List(weapons, propertiestorender, options,columns);


          $(".right-content").append("<div class='person-weapon-highlight'></div>");

        }

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
        trailColor: '#4f4949',
        trailWidth: 4,
        from: {color: '#d11919'},
        to: {color: '#a0ea6b'},
        svgStyle: {width: '90%'},
        text: {
          style: {
            color: '#cecccc',
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

        var vehicles = _.filter(Map.items, function (item) { return item.tileid == person.tileid && item.type == "vehicle" && item.passengers.length < item.seats; });

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
    },

}
