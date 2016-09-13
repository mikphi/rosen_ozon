
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

        return { id: 1, mapid: 15, color: "#6ED2FA", cash: 3000, name: "Lungans V�nner AB" };
    },
    show: function(player){
      console.log(player)
    },
    renderPlayerInfo:function()
    {
        var player = Player.player;
        $("#player-name").text(player.name);

        var persons = _.filter(Map.items, function (item) { return item.type == "person" && item.playerid == player.id; });

        var options = { islinkable: true, appendelement: "#menu-persons-content", linkfunction: this.show, displayheader:false };
        var propertiestorender = ["smallimg", "name", "persontype"];
        var columns = [
            { name: "", width: "20%" },
            { name: "namn", width: "60%" },
            { name: "persontype", width: "20%" }];
        var list = new List(persons, propertiestorender, options, columns);


        //for (var i = 0; i < persons.length; i++)
        //{
        //    var person = persons[i];
        //    $p = $("<p>");


        //    $img = $("<img>");
        //    $img.attr("src", "images/" + person.img);

        //    $div = $("<div>");
        //    $div.addClass("menu-persons-avatar");
        //    $div.append($img);
        //    $p.append($div);
        //    $p.append(person.name);

        //    $("#menu-persons").append($p);

        //}

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
