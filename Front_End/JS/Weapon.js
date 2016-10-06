var Weapon = {}

Weapon.functions = {
  displaySelectedWeapon: function(weapon)
  {
      $(".right-content").children().hide();
      $(".person-weapon-highlight").show();
      $(".person-weapon-highlight").empty();
      $(".person-weapon-highlight").append("<img src='images/"+weapon.img+"'' /><div>" +weapon.name + "</div>");

      var personsincrew = _.filter(Map.items, function (item) {
          return item.tileid == Map.itemActive.tileid && item.playerid == Map.itemActive.playerid && item.name != Map.itemActive.name;
      });

      console.log(personsincrew);
      if(personsincrew.length >0)
      {
        $div = $("<div>");
        $div.text("Dumpa't på:");
        $div.append("<br/>");
        $.each(personsincrew,function(index,person){
            $a = $("<a>");
            $a.text(person.name);
            $a.on("click",function() { Weapon.functions.handOverWeapon(person.itemid, weapon) });
            $div.append($a);
            $div.append("<br/>");

        });
          $(".person-weapon-highlight").append($div);
      }

  },

  handOverWeapon: function(personid, weapon)
  {
      //alert(personid + ":" + weapon);
      weapon.personid = personid;
    Item.functions.openItemMenu(Map.itemActive);

  }
}

Weapon.constants = {
  TRANSLATION: {
    bat:"slagträ",
    knife:"kniv",
    firearm:"skjutvapen",
    bomb:"bomb",
    axe:"yxa"

    }
}
