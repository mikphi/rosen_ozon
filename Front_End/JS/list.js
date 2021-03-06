function List(items,propertiestorender,options,columns) {
    var defaultValues = { islinkable: false, appendelement: "", linkfunction: null,displayheader:true,
     oddcolor: '#333', evencolor: '#BBB', hovercolor: "#b7b7b7", imgheight: '20px', imgwidth:'20px'  }
    var options = setOptions(options, defaultValues)
    var columns = columns
    var propertiesToRender = propertiestorender

    //setOptions(options);
    renderList(items);

    function renderList (items)
    {
        $(options.appendelement).empty();

        if(options.displayheader)
        {
            $header = $("<div>");
            $header.addClass("list-row");
            $.each(columns, function (index, column) {
                $div = $("<div>");
                $div.width(column.width);
                $div.text(column.name);
                $header.append($div);
            });

            $(options.appendelement).append($header);
        }

        $.each(items, function (index, item) {
            $div = $("<div>");
            $div.addClass("list-row");

            var bgcolor = index % 2 ? options.oddcolor : options.evencolor;
            $div.css("background-color", bgcolor)
            $div.hover(function(){
              $(this).css("background-color",options.hovercolor);

            },
            function(){
                $(this).css("background-color",bgcolor);
            });

            if (options.islinkable)
            {
                $div.css("cursor","pointer");
                $div.on("click", function () {
                    //alert(item[this.options.linkproperty]);
                    options.linkfunction(item);
                });
            }
            var list = propertiesToRender;

            for (var i = 0; i < list.length; i++)
            {
                var prop = item[list[i]];
                var columnSetting = columns[i];
                $propdiv = $("<div>");

                $propdiv.css({"width": columnSetting.width, "line-height": options.imgheight});

                if(columnSetting.css != undefined){
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

                $div.append($propdiv);
            }

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
