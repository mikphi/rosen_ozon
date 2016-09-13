var List = {
    options: { islinkable: false, appendelement: "", linkfunction: null,displayheader:true },
    columns: [],
    propertiesToRender: {},
    init: function (items,propertiestorender,options,columns)
    {
        this.propertiesToRender = propertiestorender;
        this.columns = columns;
        this.functions.setOptions(options);
        this.functions.renderList(items);
    }
}

List.functions = {
    renderList: function (items)
    {
        $(List.options.appendelement).empty();
        
        if(List.options.displayheader)
        {
            $header = $("<div>");
            $header.addClass("list-row");
            $.each(List.columns, function (index, column) {
                $div = $("<div>");              
                $div.width(column.width);
                $div.text(column.name);
                $header.append($div);
            });

            $(List.options.appendelement).append($header);
        }

        $.each(items, function (index, item) {
            $div = $("<div>");
            $div.addClass("list-row");

            if (List.options.islinkable)
            {
                $div.on("click", function () {
                    //alert(item[List.options.linkproperty]);
                    List.options.linkfunction(item);
                });
            }
            var list = List.propertiesToRender;

            for (var i = 0; i < list.length; i++)
            {
                var prop = item[list[i]];
                var columnSetting = List.columns[i];
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

            $(List.options.appendelement).append($div);
        });

   

    },

    setOptions: function(options){
        
        var optionskeys = Object.keys(options);

        $.each(List.options, function (key, value) {

            var k = _.find(optionskeys, function (num) { return num == key; });
            if (k != undefined)
            {
                List.options[key] = options[k];

            }
        });
       
    }

    
    
}
