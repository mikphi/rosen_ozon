function List(items,propertiestorender,options,columns) {
    var options = options || { islinkable: false, appendelement: "", linkfunction: null,displayheader:true }
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

            if (options.islinkable)
            {
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
                $propdiv.css("width", columnSetting.width);

                if (!prop.toString().match(/png/g)) {
                    $propdiv.text(prop);
                }
                else {
                    $img = $("<img>");
                    $img.attr("src", "images/" + prop);
                    $propdiv.append($img);
                }

                $div.append($propdiv);
            }

            $(options.appendelement).append($div);
        });

      }



    // function setOptions(options){
    //
    //     var optionskeys = Object.keys(options);
    //
    //     $.each(options, function (key, value) {
    //
    //         var k = _.find(optionskeys, function (num) { return num == key; });
    //         if (k != undefined)
    //         {
    //             options[key] = options[k];
    //
    //         }
    //     });
    //
    // }


}
