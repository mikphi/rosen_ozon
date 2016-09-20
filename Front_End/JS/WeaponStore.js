var WeaponStore = {
    weaponInFocus : undefined,
    avalibleWeapons: undefined,

    init: function()
    {
        // this.unemployedPersons = this.functions.fetchAvalibleUnemployed(Map.mapId);
         $("#weaponstore-buy").on('click', function(){
           WeaponStore.functions.buyWeapon(WeaponStore.weaponInFocus)
         })
        WeaponStore.avalibleWeapons = WeaponStore.Tempweapons;

    }
}

WeaponStore.functions = {

    renderWeaponStore: function () {

        var weapons = WeaponStore.avalibleWeapons;
        $.each(weapons, function(index,weapon) {
          weapon.translation = Weapon.constants.TRANSLATION[weapon.type];
        });

         WeaponStore.functions.renderFocusWeapon(weapons[0]);

          //generate list
          var options = { islinkable: true,
                displayheader: true,
                appendelement: "#menu-weaponstore-list",
                linkfunction: WeaponStore.functions.renderFocusWeapon,
                oddcolor:"#467c45",
                evencolor:"#69af67",
                imgheight: '35px',
                imgwidth:'50px' };

          var propertiestorender = ["img", "name", "translation","value"];
          var columns = [
              { name: "", width: "10%" },
              { name: "namn", width: "50%" },
              { name: "typ", width: "20%" },
              { name: "pris", width: "20%",unit:"pixar" }];
          var list = new List(weapons, propertiestorender, options,columns);
        $("#menu-weaponstore").show();
        $("#weaponstoreopeninghours").text(`${WeaponStore.constants.OPENS} - ${WeaponStore.constants.CLOSES}`)


      },
      buyWeapon: function(weapon){

        console.log(weapon);
        if(Player.functions.moneyTransaction(weapon.value))
        {
          weapon.playerid = Player.player.id;
          weapon.personid = Map.itemActive.itemid;
          Player.weapons.push(weapon);

          Player.functions.renderPlayerInfo()
          Item.functions.openItemMenu(Map.itemActive);
          WeaponStore.avalibleWeapons = _.reject(WeaponStore.avalibleWeapons, weapon)
          
          this.renderWeaponStore();
        }
      },

      renderFocusWeapon: function (weaponinfocus)
      {
        if(weaponinfocus != undefined){
            $("#menu-weaponstore-focus").show();
          $("#menu-weaponstore-focus-img").attr("src", "images/" + weaponinfocus.img);

          $("#menu-weaponstore-name").text(weaponinfocus.name);
          WeaponStore.weaponInFocus = weaponinfocus;
        }
        else{
          $("#menu-weaponstores-focus").hide();
        }


      },

      fetchAvalibleWeapons: function (mapid)
      {
          return WeaponStore.tempweapons;
      }
}

WeaponStore.constants = {
    OPENS: "10:00",
    CLOSES: "18:00"
}



WeaponStore.Tempweapons = [
    { name: "Påk i trä", img: "weapons/1.gif", playerid: 0, weaponid: 32122, personid:null, type: "bat", value: 10  },
    { name: "Turtles trådar", img: "weapons/2.gif", playerid: 0, weaponid: 6756022, personid:null, type: "bat", value: 15  },
    { name: "Turtles trådar", img: "weapons/2.gif", playerid: 0, weaponid: 58022, personid:null, type: "bat", value: 15  },
    { name: "Baseball trä", img: "weapons/3.gif", playerid: 0, weaponid: 89022, personid:null, type: "bat", value: 16  },
    { name: "Påk i trä", img: "weapons/1.gif", playerid: 0, weaponid: 1342, personid:null, type: "bat", value: 11  },
    { name: "Elbrödkniven", img: "weapons/4.gif", playerid: 0, weaponid: 558822, personid:null, type: "knife", value: 21  },
    { name: "Yxfix med fjärrkontroll", img: "weapons/5.gif", playerid: 0, weaponid: 4737022, personid:null, type: "axe", value: 23  },
    { name: "Maxad TNT (170km/tim)", img: "weapons/6.gif", playerid: 0, weaponid: 34022, personid:null, type: "bomb", value: 24  },
    { name: "TommyGun", img: "weapons/7.gif",playerid: 0, weaponid: 220, personid:null, type: "firearm", value: 26  },
        ]
