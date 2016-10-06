function ListWebShop(items,propertiestorender,options,columns) {
    var defaultValues = { islinkable: false, appendelement: "", linkfunction: null,displayheader:true,
    hovercolor: "#b7b7b7", imgheight: '20px', imgwidth:'20px',itemheight:"150px", itemwidth:"33%",bgcolor:"#ffffff"  }
    var options = setOptions(options, defaultValues)
    var columns = columns
    var propertiesToRender = propertiestorender

    //setOptions(options);
    renderList(items);

    function renderList (items)
    {
        $(options.appendelement).empty();


        $.each(items, function (index, item) {
            $div = $("<div>");
            $div.addClass("list-webshop-item");

            $div.css({"width":options.itemwidth})


            if (options.islinkable)
            {
                $div.css("cursor","pointer");
                $div.on("click", function () {
                    //alert(item[this.options.linkproperty]);
                    options.linkfunction(item);
                });
            }
            var list = propertiesToRender;

            $innerdiv = $("<div>");
            $innerdiv.addClass("list-webshop-item-content");
            $innerdiv.css({"background-color": options.bgcolor,"height": options.itemheight});

            $innerdiv.hover(function(){
              $(this).css("background-color",options.hovercolor);

            },
            function(){
                $(this).css("background-color",options.bgcolor);
            });

            for (var i = 0; i < list.length; i++)
            {
                var prop = item[list[i]];
                var columnSetting = columns[i];
                $propdiv = $("<div>");

                if(columnSetting.css != undefined){
                      console.log(columnSetting.css);
                      $propdiv.css(columnSetting.css);
                }

                if (!prop.toString().match(/\.(jpe?g|png|gif|bmp)$/i)) {
                    $propdiv.text(prop + " " + (columnSetting.unit != undefined ? columnSetting.unit : ""));

                }
                else {
                    $img = $("<img>");
                    $img.attr("src", "images/" + prop);
                    $img.css({"height": options.imgheight, "width": options.imgwidth})
                    $propdiv.append($img);
                }

                $innerdiv.append($propdiv);
            }

            $div.append($innerdiv);

            $(options.appendelement).append($div);
        });

      }



    function setOptions(options, defaultValues){

        var optionskeys = Object.keys(defaultValues);

        $.each(options, function (key, value) {
            var k = _.find(optionskeys, function (num) { return num == key; });
            if (k != undefined)
            {
                defaultValues[key] = options[k];
            }
        });
        return defaultValues
    }
}
