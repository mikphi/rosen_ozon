var Item  = {

}

Item.functions = {

    renderItem: function (item,keepoldposition)
    {

        var left, topMargin;
        var tile = _.findWhere(Map.tiles, { tileid: item.tileid });

        var belongsToPlayer = item.playerid == Player.player.id;

        var constants = Item.functions.getConstants(item);

        if (keepoldposition)
        {
           left = parseInt($("#item-id" + item.itemid).css("left"));
           topMargin = $("#item-id" + item.itemid).css("margin-top");
        }
        $("#item-id" + item.itemid).remove();

        if (item.type == "person" && item.invehicle) {
            return;
        }

        if (!keepoldposition) {
            left = ($("#tile" + tile.tileid).children("." + constants.CSS_CLASS).length + 1) * constants.LEFT_STARTING_POSITION;
            topMargin = constants.LEFT_STARTING_POSITION * ($("#tile" + tile.tileid).children("." + constants.CSS_CLASS).length) == constants.LEFT_STARTING_POSITION ? constants.TOP_MARGIN : "0px";
        }
        var html = "<div class='"+constants.CSS_CLASS+"' style='left:" + left + "px;margin-top:" + topMargin + "' id='item-id" + item.itemid + "'>";

        if (item.type == "person") {
            html += "<div class='item-name' style='color:"+item.color+"'>" + item.name + "</div>";
            html += "<img src='images/" + item.img + "'>";
            if(belongsToPlayer)
                html +=  Person.functions.renderVerticalBar(item.energy,30,5);
        } else
        {
            html += "<img src='images/" + item.img + "'>";
            html += "<div class='item-name' style='color:" + item.color + "'>" + item.name + "</div>";
            html += Vehicle.functions.renderPassangerIcons(item.passengers);
        }

        html += "</div>";

        $("#tile" + tile.tileid).append(html);

        if(belongsToPlayer)
            $("#item-id" + item.itemid).on("mousedown", function () { Item.functions.openItemMenu(item) });

    },

    getConstants: function(item)
    {
        switch (item.type) {
            case "person":
                return Item.constants.PERSON_CONSTANTS;
                break;
            case "car":
                return Item.constants.VEHICLE_CONSTANTS;
                break;
        }
    },

    openItemMenu: function (item) {

        Map.itemActive = item;
        Map.isItemClicked = true;
        var constants = Item.functions.getConstants(item);

        var tile = _.findWhere(Map.tiles, { tileid: item.tileid });

        item.energy >= constants.ENERGY_TO_MOVE_ONE_TILE ? $("#item-make-move").show() : $("#item-make-move").hide();
        //gemensamt
        $(".left-content").empty();
        $menu = $("#menu-item");
        $menu.css({
            display: "block",
            top: parseInt($("#tile" + tile.tileid).css("top"))-100,
            left: parseInt($("#tile" + tile.tileid).css("left")) - parseInt( constants.WIDTH),
            width: constants.WIDTH,
            height: "auto"

        });



        $("#menu-item-name").text(item.name);
        $("#item-specific-content").empty();
        $("#item-picture").attr("src", "images/" + item.img);

        switch (item.type) {
            case "person":
                Person.functions.renderMenu($menu, item);
                break;
            case "car":
                Vehicle.functions.renderMenu($menu, item);
                break;
        }




    },

    openMoveOptions: function()
    {

        $(".tile-action-marker").css("display", "block");

        Menus.functions.openPlayerMsgDialog("Klicka på den rutan som du vill ta dig till.");


        var item = Map.itemActive;

        var constants = Item.functions.getConstants(item);

        var tile = _.findWhere(Map.tiles, { tileid: item.tileid });

        var potentialDistance = item.energy / constants.ENERGY_TO_MOVE_ONE_TILE;

        Map.markerActivated = true;
        Map.markerUsage = "DisplayMovementDialog";

        for (var i = 0; i < Map.tiles.length; i++) {

            var distanceToTile = (Math.abs(Map.tiles[i].y - tile.y) + (Math.abs(Map.tiles[i].x - tile.x)));

            if (distanceToTile <= potentialDistance) {
               $("#tile" + Map.tiles[i].tileid).children(".tile-action-marker").css("display", "none");
               Map.tiles[i].energytogethere = distanceToTile * constants.ENERGY_TO_MOVE_ONE_TILE;
            }

        }
    },

    makeMove: function (tile) {

        var item = _.findWhere(Map.items, { itemid: Map.itemActive.itemid });
        item.energy -= tile.energytogethere;
        item.tileid = tile.tileid;
        Map.tiles.forEach(function (t) { t.energytogethere = 0; });

        if (item.passengers) { Vehicle.functions.changeTileIdOnPassengers(item.passengers, tile.tileid); }
        Item.functions.renderItem(item);
        Item.functions.openItemMenu(item);
        $("#menu-move").hide();
        $(".tile-action-marker").css("display", "none");


        Map.markerActivated = false;
    },

    displayMovementDialog: function (tile) {
        $("#menu-move-content").empty();

        $menu = $("#menu-move");
        $menu.css({
            display: "block",
            top: Map.mouseCoordinateY - 100,
            left: Map.mouseCoordinateX - 350
        });
        var itemsPresent = _.filter(Map.items, function (item) {
            return item.playerid !== Player.player.id && item.tileid === tile.tileid;
        });

        var html = tile.ownership != "" ? "<p>WTF, crazy kille. Hoodet ägs redan av någon knätshig filur. Vill du åt trubbel?</p>" : "<p>Området är neutralt. Ingen fara o dra hit.</p>";
        html += itemsPresent.length > 0 ? "De finns fientlig aktivitet i området. Förbered dig på fight" : "";
        html += "<p>Om du movar hit kommer du ha " + (Map.itemActive.energy - tile.energytogethere) + "% energi kvar att agera för.</p>";
        html += "<p>Vill du flytta " + Map.itemActive.name + " hit?</p>";

        $("#menu-move-content").append(html);

        $("#menu-move-confirmation-yes").off();
        $("#menu-move-confirmation-yes").on("click", function () { Item.functions.makeMove(tile); });



    }

}

Item.constants = {
    LEFT_STARTING_POSITION: 40,
    CENTER_PERSON_MARGIN_TOP: 20,
    ENERGY_HIGH: "#7dff4f",
    ENERGY_MEDIUM: "#fffd47",
    ENERGY_LOW: "#ff3939",
    VEHICLE_CONSTANTS: {
        ENERGY_TO_MOVE_ONE_TILE: 4,
        CSS_CLASS: "vehicle-content",
        LEFT_STARTING_POSITION: 50,
        TOP_MARGIN: "-6px",
        WIDTH: "300px",

    },
    PERSON_CONSTANTS: {
        ENERGY_TO_MOVE_ONE_TILE: 20,
        CSS_CLASS: "person-content",
        LEFT_STARTING_POSITION: 40,
        TOP_MARGIN: "15px",
        WIDTH:"400px",

    }
}
