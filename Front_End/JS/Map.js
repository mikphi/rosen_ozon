var Map = {
    mapId: null,
    tiles: {},
    items: {},
    itemActive: {},
    coordinateSystem: {},
    mouseCoordinateX: 0,
    mouseCoordinateY: 0,
    markerActivated: false,
    markerUsage: "",
    mapLayout: {},
    isItemClicked: false,

    init: function (mapid)
    {
        this.mapId = mapid;
        this.tiles = this.functions.fetchTiles(this.mapId);
        this.items = this.functions.fetchItems(this.mapId);
        //tempfunction to add attributes
        tempfunctions.addAttribute(this.items);

        this.coordinateSystem = new Array();
        this.functions.renderMap(this.tiles);
        this.functions.renderItems(this.items);
        this.functions.initCoordinateSystem();
        this.functions.getCoordinateOfMouseClick();


    }
};

Map.functions = {

    fetchTiles: function (mapid)
    {
        //fetch from api
        return this.generatetiles();
    },

    fetchItems: function (mapid) {
        return TEMPITEMS;
    },

    renderMap: function(tiles)
    {
        var top = Map.constants.STARTING_TOP_POSITION;
        var left = Map.constants.STARTING_LEFT_POSITION;
        var startingPointOfRow = Map.constants.STARTING_LEFT_POSITION;
        var numberOfTilesPreviousRow = 0;
        var numberOfTilesThisRow = 1;
        var maximumTilesInRowReached = false;

        var y = 1;

        for (var i = 0; i < tiles.length; i++)
        {
            var tile = tiles[i];
            Map.constants.MAP_ELEMENT.append(Tile.init(tile, top, left, i));
            Map.coordinateSystem.push({ tileid: i, top: top, left: left });

            if (tile.x == Map.constants.MAX_NUMBER_OF_TILES_IN_ROW) {

                top = Map.constants.STARTING_TOP_POSITION + Map.constants.ROW_HEIGHT * y;
                left = Map.constants.STARTING_LEFT_POSITION - Map.constants.HALF_WIDTH_OF_TILE * y;
                y++;

            }
            else {
                top += Map.constants.ROW_HEIGHT;
                left += Map.constants.HALF_WIDTH_OF_TILE;
            }
        }

        this.adjustMapLayout();
    },

    renderItems: function (items) {

        for (var i = 0; i < items.length; i++) {
                Item.functions.renderItem(items[i]);
        }
    },

    adjustMapLayout: function () {

        var mapSettings = Betongen.daySettings;
        $(".tile-highlight").css("opacity", mapSettings.tilehighlightopacity);
        $("#sky").css("background-color", mapSettings.sky);
        $("#land").css("background-color", mapSettings.land);

        this.renderClouds(mapSettings.cloudimg);
    },

    initCoordinateSystem: function () {

        $("#map").on("mouseup", function (e) {

            var mouseX = e.pageX;
            var mouseY = e.pageY;
            $(".tile-marker").hide();

            if (mouseX == Map.mouseCoordinateX && mouseY == Map.mouseCoordinateY && Map.markerActivated) {
                var mapPositionX = $("#map").css("left");
                var mapPositionY = $("#map").css("top");
                for (var i = 0; i < Map.coordinateSystem.length; i++) {
                    var tile = Map.coordinateSystem[i];

                    var left = tile.left + parseInt(mapPositionX);
                    var top = tile.top + parseInt(mapPositionY);

                    if (mouseX > left && mouseX < (left + Map.constants.WIDTH_OF_TILE) && mouseY > (top + 40) && mouseY < (top + Map.constants.HEIGHT_OF_TILE)) {
                        var x = mouseX - left;
                        var y = mouseY - top - 53;
                        var isClicked = false;
                        if (x < 120 && y < 69) {
                            if (x + y > 99) {
                                isClicked = true;
                            }
                        }
                        else if (x > 120 && y < 69) {
                            if ((x - 120) + Math.abs(y - 69) < 90) {
                                isClicked = true;
                            }
                        }
                        else if (x < 120 && y > 69) {
                            if (Math.abs(x - 120) + (y - 69) < 90) {
                                isClicked = true;
                            }
                        }
                        else {
                            if ((x - 120) + (y - 69) < 90) {
                                isClicked = true;
                            }
                        }

                        if (isClicked) {
                            $("#tile-marker" + tile.tileid).css("display", "block");
                            switch (Map.markerUsage) {
                                case "DisplayMovementDialog":
                                    var tileToGoTo = _.findWhere(Map.tiles, { tileid: tile.tileid });
                                    if (tileToGoTo.energytogethere != 0)
                                        Item.functions.displayMovementDialog(tileToGoTo);
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                }
            }
        });
    },

    getCoordinateOfMouseClick: function()
    {
        $("#map").on("mousedown", function (e) {

            Map.mouseCoordinateX = e.pageX;
            Map.mouseCoordinateY = e.pageY;

        });

    },

    renderClouds: function (img) {


        var top = 300;
        var left= 300;
        for (var i = 0; i < 40; i++)
        {
            var top = Math.floor((Math.random() * 800) + 1);
            $("#map").append("<img src='images/"+img+"' class='clouds' width='140' style='top:"+top+";left:"+left+"'>");
            if (i % 2 == 0) {  left += 200; }
        }
    },

    generatetiles: function ()
    {
        var tiles = [];
        var numberoftiles = Map.constants.MAX_NUMBER_OF_TILES;
        var maxtilesinrow = Map.constants.MAX_NUMBER_OF_TILES_IN_ROW;

        for (var i = 0; i < numberoftiles; i++)
        {
            var x = (i % maxtilesinrow) + 1;
            var y = parseInt(i / maxtilesinrow) + 1;
            var tileno = "0" + parseInt((Math.random() * (Map.constants.NUMBER_OF_TILETYPES - 1) + 1));
            var tiletype = "normal";
            var ownership = "";

            if (x == 7 && y == 7)
            {
                tiletype = "uoffice";
                ownership = "#FF0000";
            }

            if (x == 1 && y == 1)
            {
                tiletype = "hq";
                ownership = "#000000";
            }


            if (x == 8 && y == 7)
            {
                tiletype = "vehiclestore";
                ownership = "#AA55EE";
            }


            if (x == 7 && y == 8)
            {
                tiletype = "weaponstore";
                ownership = "#BB44CC";
            }


            var tile = { tiletype: tiletype, tileno: tileno, ownership: ownership, energytogethere: 0, x: x, y: y, tileid: i }
            tiles.push(tile);
        }

        return tiles;
    }

};

Map.constants = {
    MAP_ELEMENT: $("#map"),
    STARTING_TOP_POSITION: 724,
    STARTING_LEFT_POSITION: 2100,
    HALF_WIDTH_OF_TILE: 120,
    ROW_HEIGHT: 68,
    MAX_NUMBER_OF_TILES: 196,
    MAX_NUMBER_OF_TILES_IN_ROW: 14,
    HEIGHT_OF_TILE: 191,
    WIDTH_OF_TILE: 240,
    NUMBER_OF_TILETYPES: 6
}
