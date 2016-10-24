var Park = {

    parksections: null,
    activetile: null,
    init: function()
    {

      $('#park-image div').on("click", function(){
        var varSection = _.findWhere(Park.parksections, function(item){
          return item.tileid == Park.activetile && item.position == this.dataset.indexNumber;
        })
        alert(varSection.fertilizer)
      })
    }
}

Park.functions = {
  parkmenushow: function(tileid) {
    $('#park').show();
    Park.activetile = tileid;
    Park.parksections = tempParks;
  }

}

var tempParks = [
  {fertility: 20, developlevel: 1, croptype: "hipster-high",
  fertilizer: "bum-poop sweet-edt", thirst: 4, tileid: 76, position: 1}
]
