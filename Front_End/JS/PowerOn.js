var Betongen = {

    date: "",
    daySettings: {},

    init: function ()
    {
        Player.init();
        this.date = new Date();
        this.daySettings = this.functions.setDaySettings();
        Map.init(Player.player.mapid);
        // UOffice.init();
        Menus.init();
        Park.init();
        // WeaponStore.init();
        // VehicleStore.init();
        // GasStation.init();

        $(function () {
            $("#map").draggable();
            $(".draggable").draggable();
        });

        Player.functions.renderPlayerInfo();
    }
};

window.onload = function()
{
    Betongen.init();

}

Betongen.constants = {
   // Evening: "18:00",
    Day: { starts: "07:00", sky: "#6ed2fa", land: "#437345", tilehighlightopacity: 0,cloudimg: "cloud_day.png", displaywindows: "none" },
    Evening: { starts: "18:00", sky: "#f2a74b", land: "#3a603b", tilehighlightopacity: 0.4, cloudimg: "cloud_evening.png", displaywindows: "none" },
    Night: { starts: "22:00", sky: "black", land: "#131914", tilehighlightopacity: 0.7, cloudimg: "cloud_night.png", displaywindows: "block" },

}

Betongen.functions = {

    addZero: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },

    gettime: function ()
    {

        var date = Betongen.date;
        return this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes());
    },

    setDaySettings: function () {
        var time = Betongen.functions.gettime();
        if (time > Betongen.constants.Evening.starts && time <= Betongen.constants.Night.starts) {
            return Betongen.constants.Evening
        }

        if (time > Betongen.constants.Night.starts || time < Betongen.constants.Day.starts) {
            return Betongen.constants.Night;
        }

        return Betongen.constants.Day;
    }

}
