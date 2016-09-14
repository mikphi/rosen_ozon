
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
    show: function(player){
      console.log(player)
    },
    renderPlayerInfo:function()
    {
        var player = Player.player;
        $("#player-name").text(player.name);

        var persons = _.filter(Map.items, function (item) { return item.type == "person" && item.playerid == player.id; });

        var options = { islinkable: true, appendelement: "#menu-persons-content", linkfunction: this.show, displayheader:false, imgheight:'23px', imgwidth:'23px',oddcolor:"#787878" };
        var propertiestorender = ["smallimg", "name", "persontype"];
        var columns = [
            { name: "", width: "10%" },
            { name: "namn", width: "70%" },
            { name: "persontype", width: "20%" }];
        var list = new List(persons, propertiestorender, options, columns);



        var vehicles = _.filter(Map.items, function (item) { return item.type != "person" && item.playerid == player.id; });

        //     $p.click((function (vehicle) {
        //         return function () {
        //             Item.functions.openItemMenu(vehicle);
        //         };
        //     })(vehicle));

        //    $("#menu-vehicles").append($p);
        var options = { islinkable: true, appendelement: "#menu-vehicles-content", linkfunction: this.show, displayheader:false, imgheight:'25px', imgwidth: '50px',oddcolor:"#787878" };
        var propertiestorender = ["img", "name"];
        var columns = [
            { name: "", width: "20%" },
            { name: "namn", width: "80%" }]
        var list = new List(vehicles, propertiestorender, options, columns);

        }
    }
