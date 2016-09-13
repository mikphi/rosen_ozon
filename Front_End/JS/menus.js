var Menus = {
    init: function ()
    {
        $("#menu-close-item-menu").on("click", function () {
            Menus.functions.closeItemMenu();
        });

        $("#menu-move-confirmation-no").on("click", function () {
            Menus.functions.removeMovementOptions();
        });

        $("#menu-alert-close").click(function () { $(this).parent().hide() });

        $("#menu-close-notification-msg").click(function () { $(this).parent().hide() });

        $(".menu-generic-close").click(function () { $(this).parent().parent().hide() });
    }
}

Menus.functions = {
    removeMovementOptions: function () {
        $("#menu-move").hide();
        $(".tile-action-marker").css("display", "none");
        Map.tiles.forEach(function (t) { t.energytogethere = 0; });
        Map.markerActivated = false;
    },

    closeItemMenu: function () {
        $("#menu-item").hide();

        Map.isItemClicked = false;

        if (Map.markerActivated) {
            Menus.functions.removeMovementOptions();
        }
    },

    openPlayerMsgDialog: function (text) {
        $("#notification-msg-text").text(text);
        $("#notification-msg").slideDown();
    },

    closePlayerMsgDialog: function ()
    {
        $("#notification-msg").slideUp();
    },

    closeMenu: function (elm) {
        $(elm).hide();
    }
}



