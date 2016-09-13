var Player = {
    player: {},

    init: function ()
    {
        this.player = this.functions.getPlayer();
      
    }
};

Player.functions = {

    getPlayer: function ()
    {

        return { id: 1, mapid: 15, color: "#6ED2FA", cash: 3000, name: "Lungans Vänner AB" };
    },

    renderPlayerInfo:function()
    {
        var player = Player.player;
        $("#player-name").text(player.name);

        var persons = _.filter(Map.items, function (item) { return item.type == "person" && item.playerid == player.id; });
        
        var options = { islinkable: true, appendelement: "#menu-persons-content", linkfunction: alert, displayheader:false };
        var propertiestorender = ["smallimg", "name", "persontype"];
        var columns = [
            { name: "", width: "20%" },
            { name: "namn", width: "60%" },
            { name: "persontype", width: "20%" }];
           
        List.init(persons, propertiestorender, options, columns);


        var vehicles = _.filter(Map.items, function (item) { return item.type != "person" && item.playerid == player.id; });

        for (var i = 0; i < vehicles.length; i++) {
            var vehicle = vehicles[i];
            $p = $("<p>");


            $img = $("<img>");
            $img.attr("src", "images/" + vehicle.img);

            $div = $("<div>");
            $div.addClass("menu-vehicle-avatar");
            $div.append($img);
            $p.append($div);
            $p.append(vehicle.name);



            $p.click((function (vehicle) {
                return function () {
                    Item.functions.openItemMenu(vehicle);
                };
            })(vehicle));

            $("#menu-vehicles").append($p);

        }
    }

};


