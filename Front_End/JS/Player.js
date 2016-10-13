
var Player = {
    player: {},
    weapons: [],
    inventory: [],

    init: function ()
    {
        this.player = this.functions.getPlayer();
        this.weapons = this.functions.getWeapons(this.player.id);

    }
};

Player.functions = {

    getPlayer: function ()
    {

        return { id: 1, mapid: 15, color: "#6ED2FA", cash: 3000, name: "Lungans Vänner AB", money:1000 };
    },

    show: function(player){

    },

    renderPlayerInfo:function()
    {
        var player = Player.player;
        $("#player-name").text(player.name);
        $("#player-money").text(player.money + " pixar");

        var persons = _.filter(Map.persons, function (item) { return item.playerid == player.id; });

        var options = { islinkable: true, appendelement: "#menu-persons-content", linkfunction: this.show, displayheader:false, imgheight:'23px', imgwidth:'23px',oddcolor:"#353333",evencolor:"#232222" };
        var propertiestorender = ["smallimg", "name", "persontype"];
        var columns = [
            { name: "", width: "10%" },
            { name: "namn", width: "70%" },
            { name: "persontype", width: "20%" }];
        var list = new List(persons, propertiestorender, options, columns);


        
        var vehicles = _.filter(Map.vehicles, function (vehicle) { return vehicle.playerid == player.id; });

        var options = { islinkable: true, appendelement: "#menu-vehicles-content", linkfunction: this.show, displayheader:false, imgheight:'25px', imgwidth: '50px',oddcolor:"#353333",evencolor:"#232222" };
        var propertiestorender = ["img", "name"];
        var columns = [
            { name: "", width: "20%" },
            { name: "namn", width: "80%" }]
        var list = new List(vehicles, propertiestorender, options, columns);


    },

    getWeapons:function(playerid)
    {
      return _.filter(TEMPWEAPONS, function (weapon) { return weapon.playerid == playerid; });
    },

    moneyTransaction: function(price)
    {

        if(Player.player.money < price)
        {

              Menus.functions.openPlayerMsgDialog("Du har inte råd!");
              return false;
        }
        else {
            Player.player.money -= price;
            return true;
        }
    }
  }
