var Tile = {

    init: function (tile,top,left,tileid)
    {
        return this.functions.rendertile(tile,top,left,tileid)
    }
};

Tile.functions = {

    rendertile : function(tile,top,left,tileid)
    {
        var html = "<div class='tile' style='top:"+top+"; left:"+left+"' id='tile"+tileid+"' onmouseup='Tile.functions.displayTileInfo(this,event)'><img src='images/tiles/tile_" + tile.tileno + "/tile_" + tile.tileno + "_base.png' />";


        var walls = Tile.housewalls.renderwalls(tile.tileno);

        if (tile.ownership != "") {
            html += walls.replace(/frontcolor/g, tile.ownership).replace(/backcolor/g, this.ColorLuminance(tile.ownership, -0.3)).replace(/nodisplay/g, '').replace(/Layer_1/g, "wallno" + tile.tileid);
        }
        else
        {
            html += walls.replace(/Layer_1/g, "wallno" + tile.tileid);
        }

        console.log(tile.tiletype);
          html += "<img src='images/tiles/tile_" + tile.tileno + "/tile_" + tile.tileno + "_windows.png' />";

        html += Tile.highlight.renderhighlights(tile.tileno, tileid);
        html += "<img src='images/tiles/tile_" + tile.tileno + "/tile_" + tile.tileno + "_windows_night.png' class='tile-windows-night' style='display:" + Betongen.daySettings.displaywindows + "'/>";
        html += Tile.actionmarker.renderactionmarkers(tile.tileno, tileid);
        html += Tile.marker.rendermarkers(tile.tileno, tileid);
        html += "</div>";
        return html;
    },

    displayTileInfo: function(elm,e)
    {
        var mouseX = e.pageX;
        var mouseY = e.pageY;


        $(".tile-marker").hide();

        if (mouseX == Map.mouseCoordinateX && mouseY == Map.mouseCoordinateY) {

            if (!Map.markerActivated && !Map.isItemClicked) {

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
                            var tilediv = $("#tile" + tile.tileid);
                            console.log(tilediv);
                            console.log(tile);
                            var menutilediv = $("#menu-tile");
                            menutilediv.css({
                                display: "block",
                                top: parseInt(tilediv.css("top")) - 250,
                                left: parseInt(tilediv.css("left")) - 150


                            });

                            var completetile = _.findWhere(Map.tiles, { tileid: tile.tileid });

                            $("#menu-tile-picture").attr("src","images/tiles/tile_" + completetile.tileno + "/tile_" + completetile.tileno + "_base.png");

                            //gubbar p� tilen ska in h�r

                            switch (completetile.tiletype)
                            {
                                case "normal":
                                    break;
                                case "uoffice":
                                   // UOffice.functions.renderUOffice();
                            }

                        }

                    }
                }





            }
        }
    },

    changeOwnershipOfTile: function (tileid) {

        var tile = _.findWhere(Map.tiles, { tileid: tileid });
        var playercolor = Player.functions.getPlayer().color;
        tile.ownership = playercolor;
        $("#wallno" + tile.tileid).children(".wallfcolor").attr("fill", playercolor);
        $("#wallno" + tile.tileid).children(".wallbcolor").attr("fill", this.ColorLuminance(playercolor, -0.3));

        $("#wallno" + tile.tileid).show();
    },



    ColorLuminance: function(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;
    }

};

Tile.constants = {
  SPECIAL_TILE_LINKS: { uoffice: {linktext:" Gå in på arbetsförmedlingen", linkfunction:UOffice.functions.renderUOffice },
                        vehiclestore: {linktext:" Besök Big Dealys fina etablissemang", linkfunction:VehicleStore.functions.renderVehicleStore},
                        weaponstore: {linktext:" Entra Willy Johnssons domäner", linkfunction:WeaponStore.functions.renderWeaponStore},
                        gasstation: {linktext:" Handla hos jiffys", linkfunction:GasStation.functions.renderGasStation}
                      }

}

Tile.housewalls = {
    renderwalls: function (tileno)
    {
        for(var i = 0; i< this.walls.length; i++)
        {
            if (tileno == this.walls[i].tileno)
            {
                return this.walls[i].svgcode;
            }
        }
        return "";
    },

    walls: [
        { tileno: "01", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-walls tile-walls-one nodisplay" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="201.814px" height="99.589px" viewBox="0 0 201.814 99.589" xml:space="preserve"><polygon fill="frontcolor" class="wallfcolor" points="151.041,34.826 151.041,87.258 167.499,96.696 167.499,44.266 "/><polygon fill="backcolor" class="wallbcolor" points="167.499,44.266 167.499,96.696 184.081,87.129 184.081,35.081 "/><polygon fill="backcolor" class="wallbcolor" points="185.229,83.939 185.229,32.913 201.814,23.728 201.814,74.756 "/><polygon fill="backcolor" class="wallbcolor" points="16.584,99.589 16.584,73.564 33.083,64.21 33.083,90.147 "/><polygon fill="frontcolor" class="wallfcolor" points="0,64.295 0,90.233 16.584,99.589 16.584,73.564 "/><polygon fill="backcolor" class="wallbcolor" points="34.359,89.468 34.359,63.444 50.772,54.089 50.772,80.113 "/><polygon fill="frontcolor" class="wallfcolor" points="88.916,51.92 88.916,13.649 64.932,0 64.932,38.143 "/><polygon fill="backcolor" class="wallbcolor" points="113.025,0 113.025,38.016 88.916,51.92 88.916,13.649 "/></svg>' },
        { tileno: "02", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-walls tile-walls-two nodisplay" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="208.511px" height="92.544px" viewBox="0 0 208.511 92.544" xml:space="preserve"><polygon fill="frontcolor" class="wallfcolor" points="157.373,79.451 157.373,53.435 173.951,62.872 173.951,88.762 "/><polygon fill="backcolor" class="wallbcolor" points="190.529,79.579 190.529,53.563 173.951,62.872 173.951,88.762 "/><polygon fill="backcolor" class="wallbcolor" points="191.932,78.048 191.932,52.16 208.469,42.765 208.511,68.867 "/><polygon fill="backcolor" class="wallbcolor" points="16.494,66.527 16.494,92.544 33.073,83.021 33.073,57.006 "/><polygon fill="frontcolor" class="wallfcolor" points="0,57.091 0,83.276 16.494,92.544 16.494,66.527 "/><polygon fill="backcolor" class="wallbcolor" points="34.773,55.306 34.773,81.576 51.181,71.969 51.181,46.123 "/><polygon fill="frontcolor" class="wallfcolor" points="61.278,1.02 61.214,26.908 77.792,36.345 77.792,10.33 "/><polygon fill="frontcolor" class="wallfcolor" points="79.323,11.222 79.323,37.366 96.029,46.803 96.029,20.532 "/><polygon fill="backcolor" class="wallbcolor" points="112.544,11.351 112.481,37.302 96.029,46.868 96.029,20.595 "/><polygon fill="backcolor" class="wallbcolor" points="114.012,9.373 114.012,35.517 130.526,26.08 130.526,0 "/></svg>' },
        { tileno: "03", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-walls tile-walls-three nodisplay" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="208.697px" height="90.563px" viewBox="0 0 208.697 90.563" xml:space="preserve"><polygon fill="backcolor" class="wallbcolor" points="184.573,52.207 184.573,90.501 208.697,76.714 208.697,38.549 "/><polygon fill="frontcolor" class="wallfcolor" points="160.193,76.714 160.193,38.421 184.573,52.207 184.573,90.501 "/><polygon fill="backcolor" class="wallbcolor" points="122.666,10.339 122.666,36.379 106.199,45.824 106.199,19.785 "/><polygon fill="frontcolor" class="wallfcolor" points="89.605,10.467 89.605,36.379 106.199,45.824 106.199,19.785 "/><polygon fill="frontcolor" class="wallfcolor" points="87.819,35.357 87.819,9.19 71.479,0 71.479,26.04 "/><polygon fill="backcolor" class="wallbcolor" points="49.653,51.313 49.653,77.417 66.119,67.971 66.119,41.932 "/><polygon fill="backcolor" class="wallbcolor" points="48.441,76.905 48.441,38.613 24.188,52.398 24.188,90.563 "/><polygon fill="frontcolor" class="wallfcolor" points="0,38.613 0,76.523 24.188,90.563 24.188,52.398 "/></svg>' },
        { tileno: "04", svgcode: '<svg version="1.2" baseProfile="tiny"  class="tile-walls tile-walls-four nodisplay" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="191.03px" height="116.018px" viewBox="0 0 191.03 116.018" xml:space="preserve"><polygon fill="backcolor" class="wallbcolor" points="33.536,80.195 33.536,106.175 50.092,96.667 50.092,70.686 "/><polygon fill="frontcolor" class="wallfcolor" points="140.972,70.644 140.972,96.794 157.444,106.047 157.444,80.067 "/><polygon fill="backcolor" class="wallbcolor" points="16.557,116.018 16.557,63.931 32.857,54.762 32.857,106.467 "/><polygon fill="frontcolor" class="wallfcolor" points="0,54.634 0,106.849 16.557,116.018 16.557,63.931 "/><polygon fill="frontcolor" class="wallfcolor" points="157.917,54.38 157.917,106.594 174.474,115.764 174.474,63.676 "/><polygon fill="frontcolor" class="wallfcolor" points="81.506,9.296 81.506,61.511 98.062,70.681 98.062,18.594 "/><polygon fill="backcolor" class="wallbcolor" points="98.317,70.681 98.317,18.594 114.618,9.424 114.618,61.129 "/><polygon fill="backcolor" class="wallbcolor" points="115.127,61.256 115.127,9.169 131.428,0 131.428,51.705 "/><polygon fill="backcolor" class="wallbcolor" points="174.728,115.764 174.728,63.676 191.03,54.507 191.03,106.212 "/></svg>' }
    ]
}

Tile.highlight = {
    renderhighlights: function (tileno,tileid) {
        var highlight = _.findWhere(this.highlights, { tileno: tileno }).svgcode;

        return highlight.replace("Layer_1", "tile-highlight"+tileid)
    },

    highlights: [
        { tileno: "01", svgcode: '<svg version="1.2" class="tile-highlight" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240.171px" height="191.0px" viewBox="0 0 240.171 162.664" xml:space="preserve"><path class="tile-highlight-area" d="M120.268,162.664L0,93.891l10.128-6.129c0,0-4.937-2.043-4.084-6.299c0.851-4.256,0.17-5.788,0.681-6.469 c0.511-0.68,1.021-3.404,2.553-3.915c1.533-0.511,3.234-1.532,4.767-1.701c1.532-0.171,3.916,1.871,5.106,2.212 c1.192,0.341,2.214,0.851,3.405,2.043s1.191,3.744,1.191,3.744s-0.341,2.555,0.17,2.555c0.511,0,66.561-37.792,66.561-37.792V13.881 L114.599,0l23.884,13.541l0.044,22.215l38.089,21.79l0.127-7.533l34.365-21.04l16.577,9.421v48.518l12.486,7.318L120.268,162.664z"/></svg>' },
        { tileno: "02", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-highlight" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240.199px" height="204.0px" viewBox="0 0 240.199 149.278" xml:space="preserve"><path class="tile-highlight-area" d="M120.282,149.278L0,80.327l10.215-5.874c0,0-5.362-1.787-4.852-6.385c0.511-4.597,1.021-2.809,1.532-5.873 s-0.511-4.597,3.319-5.107c3.831-0.511,2.724-2.299,7.917,0c2.926,1.295,4.597,1.532,4.852,3.83 c0.256,2.299,2.731,4.156,1.788,5.448c-0.165,0.225,61.29-35.327,61.29-35.327l-0.296-20.282l17.113-9.818l17.113,9.818l2.063,0.335 V9.818L139.167,0l17.113,9.818l-0.501,21.987l40.349,23.24l21.104-12.297l17.113,9.818l-0.422,24.441l6.274,3.32L120.282,149.278z"/></svg>' },
        { tileno: "03", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-highlight" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.405px" height="205.0px" viewBox="0 0 239.405 148.138" xml:space="preserve"><path d="M137.83,21.381l1.824,0.976c0,0,1.061-3.436,1.018-3.903s-1.442-1.951-0.127-3.182c1.315-1.23,2.333-2.248,3.86-3.013 c1.526-0.763,2.334-1.145,4.836-0.593c2.503,0.551,4.793,2.376,5.685,3.012c0.891,0.637,1.951,0.679,1.951,1.994 c0,1.315,0.042,2.716,0.34,4.03c0.297,1.315,0.382,2.545,0.169,3.097c-0.212,0.551-0.551,0.934-0.551,1.994 s-0.934,1.739-1.781,2.164c-0.85,0.423-3.182,1.485-3.182,1.485l26.895,15.527l20.235-11.54l25.114,14.80 c0.891,0,7,2.799,9.545,4.454c2.546,1.655,2.8,4.455,2.927,6.746c0.128,2.29-1.018,3.436-0.89,5.345 c0.126,1.909-0.51,3.69-2.419,4.327c-1.909,0.636-5.981,2.418-5.981,2.418l0.128,1.399l11.979,7l-119.266,68.215L0,79.414 l14.763-8.654L14.254,48.36l24.944-14.762l19.854,11.454l26.979-14.764V9.927L102.322,0l35.38,20.363"/></svg>' },
        { tileno: "04", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-highlight" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.313px" height="180px" viewBox="0 0 239.313 173.219" xml:space="preserve"><path d="M120.093,173.219L0,104.521l0,0l24.426-13.995l-0.241-25.938l17.05-9.781l17.05,9.781l-0.528,6.729l28.37-16.03 c0,0-5.725-3.307-4.453-8.651c1.272-5.343,1.145-6.233,1.145-7.124s1.781-5.088,5.343-5.979c3.563-0.891,3.69-1.145,7.379,0.764 c3.689,1.908,5.979,3.053,5.979,3.053s1.272,2.036,1.399,3.689c0.128,1.653,0.764,4.198,0.764,4.198l2.417-1.4l-0.489-24.493 L139.619,0l16.096,9.49l0.127,47.07l25.444,14.63l1.145-0.381l-0.367-6.686l17.05-9.781l17.05,9.781l-0.743,26.979l23.894,13.674  L120.093,173.219z"/></svg>' },
        { tileno: "05", svgcode: '<svg version="1.2" baseProfile="tiny"  class="tile-highlight" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240px" height="202px" viewBox="0 0 240 151.615" xml:space="preserve"><path d="M120.334,151.615L0,82.948l12.333-7.333c0,0,0.333-7.667,2-9.667s5.301-5.002,10.333-2.666C27,64.365,25,54.948,26,54.282 s10.125-16.792,21,1.333c0.546,0.91,51.333-29.667,51.333-29.667s1.293-5.209,5.667-8.333c1.75-1.25-3.125-15.125,7.375-17 c16.735-2.988,15.626,5.667,15.292,9.667s0.333,7,0.333,7s12.041-4.292,16.375,2.708s1.958,8.958,1.958,8.958l39,22.333 c0,0,5.849-9.282,19.792,2.208c0.708,0.583,3.917-3.708,11.625-2.75c3.309,0.412,10.75,7.083,9.75,13.75s-3.499,7.792-4.833,7.792 S240,83.74,240,83.74L120.334,151.615z"/></svg>' }
    ]
}

Tile.actionmarker = {
    renderactionmarkers: function (tileno, tileid) {
        var actionmarker = _.findWhere(this.actionmarkers, { tileno: tileno }).svgcode;

        return actionmarker.replace("Layer_1", "action-marker" + tileid)
    },

    actionmarkers: [
        { tileno: "01", svgcode: '<svg version="1.2" class="tile-action-marker" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240.171px" height="191.0px" viewBox="0 0 240.171 162.664" xml:space="preserve"><path fill="black" d="M120.268,162.664L0,93.891l10.128-6.129c0,0-4.937-2.043-4.084-6.299c0.851-4.256,0.17-5.788,0.681-6.469 c0.511-0.68,1.021-3.404,2.553-3.915c1.533-0.511,3.234-1.532,4.767-1.701c1.532-0.171,3.916,1.871,5.106,2.212 c1.192,0.341,2.214,0.851,3.405,2.043s1.191,3.744,1.191,3.744s-0.341,2.555,0.17,2.555c0.511,0,66.561-37.792,66.561-37.792V13.881 L114.599,0l23.884,13.541l0.044,22.215l38.089,21.79l0.127-7.533l34.365-21.04l16.577,9.421v48.518l12.486,7.318L120.268,162.664z"/></svg>' },
        { tileno: "02", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-action-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240.199px" height="204.0px" viewBox="0 0 240.199 149.278" xml:space="preserve"><path fill="black" d="M120.282,149.278L0,80.327l10.215-5.874c0,0-5.362-1.787-4.852-6.385c0.511-4.597,1.021-2.809,1.532-5.873 s-0.511-4.597,3.319-5.107c3.831-0.511,2.724-2.299,7.917,0c2.926,1.295,4.597,1.532,4.852,3.83 c0.256,2.299,2.731,4.156,1.788,5.448c-0.165,0.225,61.29-35.327,61.29-35.327l-0.296-20.282l17.113-9.818l17.113,9.818l2.063,0.335 V9.818L139.167,0l17.113,9.818l-0.501,21.987l40.349,23.24l21.104-12.297l17.113,9.818l-0.422,24.441l6.274,3.32L120.282,149.278z"/></svg>' },
        { tileno: "03", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-action-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.405px" height="205.0px" viewBox="0 0 239.405 148.138" xml:space="preserve"><path fill="black" d="M137.83,21.381l1.824,0.976c0,0,1.061-3.436,1.018-3.903s-1.442-1.951-0.127-3.182c1.315-1.23,2.333-2.248,3.86-3.013 c1.526-0.763,2.334-1.145,4.836-0.593c2.503,0.551,4.793,2.376,5.685,3.012c0.891,0.637,1.951,0.679,1.951,1.994 c0,1.315,0.042,2.716,0.34,4.03c0.297,1.315,0.382,2.545,0.169,3.097c-0.212,0.551-0.551,0.934-0.551,1.994 s-0.934,1.739-1.781,2.164c-0.85,0.423-3.182,1.485-3.182,1.485l26.895,15.527l20.235-11.54l25.114,14.80 c0.891,0,7,2.799,9.545,4.454c2.546,1.655,2.8,4.455,2.927,6.746c0.128,2.29-1.018,3.436-0.89,5.345 c0.126,1.909-0.51,3.69-2.419,4.327c-1.909,0.636-5.981,2.418-5.981,2.418l0.128,1.399l11.979,7l-119.266,68.215L0,79.414 l14.763-8.654L14.254,48.36l24.944-14.762l19.854,11.454l26.979-14.764V9.927L102.322,0l35.38,20.363"/></svg>' },
        { tileno: "04", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-action-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.313px" height="180px" viewBox="0 0 239.313 173.219" xml:space="preserve"><path fill="black" d="M120.093,173.219L0,104.521l0,0l24.426-13.995l-0.241-25.938l17.05-9.781l17.05,9.781l-0.528,6.729l28.37-16.03 c0,0-5.725-3.307-4.453-8.651c1.272-5.343,1.145-6.233,1.145-7.124s1.781-5.088,5.343-5.979c3.563-0.891,3.69-1.145,7.379,0.764 c3.689,1.908,5.979,3.053,5.979,3.053s1.272,2.036,1.399,3.689c0.128,1.653,0.764,4.198,0.764,4.198l2.417-1.4l-0.489-24.493 L139.619,0l16.096,9.49l0.127,47.07l25.444,14.63l1.145-0.381l-0.367-6.686l17.05-9.781l17.05,9.781l-0.743,26.979l23.894,13.674  L120.093,173.219z"/></svg>' },
        { tileno: "05", svgcode: '<svg version="1.2" baseProfile="tiny"  class="tile-action-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240px" height="202px" viewBox="0 0 240 151.615" xml:space="preserve"><path fill="black" d="M120.334,151.615L0,82.948l12.333-7.333c0,0,0.333-7.667,2-9.667s5.301-5.002,10.333-2.666C27,64.365,25,54.948,26,54.282 s10.125-16.792,21,1.333c0.546,0.91,51.333-29.667,51.333-29.667s1.293-5.209,5.667-8.333c1.75-1.25-3.125-15.125,7.375-17 c16.735-2.988,15.626,5.667,15.292,9.667s0.333,7,0.333,7s12.041-4.292,16.375,2.708s1.958,8.958,1.958,8.958l39,22.333 c0,0,5.849-9.282,19.792,2.208c0.708,0.583,3.917-3.708,11.625-2.75c3.309,0.412,10.75,7.083,9.75,13.75s-3.499,7.792-4.833,7.792 S240,83.74,240,83.74L120.334,151.615z"/></svg>' }
    ]
}

Tile.marker = {
    rendermarkers: function (tileno, tileid) {
        var rendermarker = _.findWhere(this.markers, { tileno: tileno }).svgcode;

        return rendermarker.replace("Layer_1", "tile-marker" + tileid)
    },

    markers: [
        { tileno: "01", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240.171px" height="216.664px" viewBox="0 0 240.171 162.664" xml:space="preserve"><path fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M120.268,162.664L0,93.891 l10.128-6.129c0,0-4.937-2.043-4.084-6.299c0.851-4.256,0.17-5.788,0.681-6.469c0.511-0.68,1.021-3.404,2.553-3.915 c1.533-0.511,3.234-1.532,4.767-1.701c1.532-0.171,3.916,1.871,5.106,2.212c1.192,0.341,2.214,0.851,3.405,2.043 c1.191,1.192,1.191,3.744,1.191,3.744s-0.341,2.555,0.17,2.555S90.478,42.14,90.478,42.14V13.881L114.599,0l23.884,13.541 l0.044,22.215l38.09,21.79l0.127-7.533l34.364-21.04l16.577,9.421v48.518l12.486,7.318L120.268,162.664z"/></svg>' },
        { tileno: "02", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240.199px" height="228.277px" viewBox="0 0 240.199 175.277" xml:space="preserve"><path fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M120.282,162.278L0,93.327 l10.215-5.874c0,0-5.362-1.787-4.852-6.386c0.511-4.597,1.021-2.809,1.532-5.873c0.511-3.063-0.511-4.597,3.319-5.106 c3.831-0.511,2.724-2.299,7.917,0c2.926,1.295,4.597,1.532,4.852,3.83c0.256,2.299,2.731,4.156,1.788,5.448 c-0.165,0.225,61.29-35.327,61.29-35.327l-0.296-20.282l17.113-9.818l17.113,9.818l2.063,0.335v-1.274L139.167,13l17.112,9.817 l-0.5,21.987l40.349,23.24l21.104-12.297l17.113,9.817l-0.423,24.441l6.274,3.32L120.282,162.278z"/> </svg>' },
        { tileno: "03", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.404px" height="230.139px" viewBox="0 0 239.404 148.139" xml:space="preserve"><path fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="11" d=" M137.83,21.381l1.823,0.977c0,0,1.062-3.437,1.019-3.903s-1.442-1.951-0.127-3.182c1.314-1.23,2.333-2.248,3.859-3.014 c1.526-0.763,2.334-1.145,4.837-0.593c2.503,0.551,4.793,2.376,5.685,3.013c0.891,0.637,1.951,0.679,1.951,1.993 c0,1.315,0.042,2.717,0.34,4.03c0.297,1.315,0.382,2.545,0.169,3.097c-0.212,0.552-0.551,0.935-0.551,1.994 c0,1.061-0.935,1.739-1.781,2.164c-0.85,0.423-3.182,1.485-3.182,1.485l26.895,15.527l20.235-11.54l25.114,14.806 c0.891,0,7,2.799,9.545,4.454c2.546,1.655,2.8,4.455,2.927,6.746c0.128,2.29-1.019,3.436-0.89,5.345 c0.126,1.909-0.511,3.69-2.42,4.327c-1.908,0.636-5.98,2.418-5.98,2.418l0.128,1.398l11.979,7l-119.266,68.216L0,79.414 l14.763-8.653l-0.509-22.4l24.943-14.762l19.854,11.454l26.979-14.765V9.927L102.322,0l35.381,20.363"/> </svg>' },
        { tileno: "04", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="239.313px" height="204.219px" viewBox="0 0 239.313 173.219" xml:space="preserve"><path fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M120.093,173.219L0,104.521 l0,0l24.426-13.995l-0.241-25.938l17.05-9.781l17.051,9.781l-0.528,6.729l28.37-16.029c0,0-5.726-3.308-4.453-8.651 c1.271-5.343,1.145-6.233,1.145-7.124s1.781-5.088,5.344-5.979c3.563-0.892,3.689-1.146,7.379,0.764 c3.688,1.908,5.979,3.053,5.979,3.053s1.272,2.036,1.399,3.689c0.128,1.652,0.764,4.197,0.764,4.197l2.417-1.399l-0.489-24.493 L139.619,0l16.096,9.489l0.127,47.07l25.444,14.63l1.145-0.381l-0.367-6.686l17.05-9.781l17.051,9.781l-0.743,26.979l23.894,13.674 L120.093,173.219z"/></svg>' },
        { tileno: "05", svgcode: '<svg version="1.2" baseProfile="tiny" class="tile-marker" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="240px" height="226.615px" viewBox="0 0 240 151.615" xml:space="preserve"><path fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M120.334,151.615L0,82.948 l12.333-7.333c0,0,0.333-7.667,2-9.667s5.301-5.002,10.333-2.666C27,64.365,25,54.948,26,54.282s10.125-16.792,21,1.333 c0.546,0.91,51.333-29.667,51.333-29.667s1.293-5.209,5.667-8.333c1.75-1.25-3.125-15.125,7.375-17 c16.734-2.988,15.626,5.667,15.292,9.667s0.333,7,0.333,7s12.041-4.292,16.375,2.708s1.958,8.958,1.958,8.958l39,22.333 c0,0,5.849-9.282,19.792,2.208c0.708,0.583,3.917-3.708,11.625-2.75c3.309,0.412,10.75,7.083,9.75,13.75s-3.499,7.792-4.833,7.792 S240,83.74,240,83.74L120.334,151.615z"/> </svg>' }
    ]
}
