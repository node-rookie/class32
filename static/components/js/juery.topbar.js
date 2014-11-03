/*  
    http://www.dailycoding.com/ 
    Topbar message plugin
*/
(function ($) {
    $.fn.showTopbarMessage = function (options) {

        var defaults = {
            background: "#f00",
            borderColor: "#000",
            foreColor: "#fff",
            height: "40px",
            fontSize: "20px",
            close: "click",
            success: true
        };
        var options = $.extend(defaults, options);

        var barStyle = " width: 300px;position: fixed;height: " + options.height + ";top: 0px;left: 50%;margin-left: -150px;display: none;";
        var overlayStyle = "height: " + options.height + ";filter: alpha(opacity=50);-moz-opacity: 0.5;-khtml-opacity: 0.5;opacity: 0.5;background-color: " + options.background + ";border-bottom: solid 5px " + options.borderColor + ";";
        var messageStyle = " width: 100%;position: absolute;height: " + options.height + ";top: 0px;left: 0px;right: 0px;margin: 0px;color: " + options.foreColor + ";font-weight: bold;font-size: " + options.fontSize + ";text-align: center;padding: 10px 0px";
		var successStyle = "text-align:center;padding: 8px 35px 8px 14px;margin-bottom: 20px;text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);color: #468847;background-color: #dff0d8;border-color: #d6e9c6;border: 1px solid #fbeed5;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;";
		var errorStyle = "text-align:center;padding: 8px 35px 8px 14px;margin-bottom: 20px;text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);color: #b94a48;background-color: #f2dede;border-color: #eed3d7;border: 1px solid #fbeed5;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;";
        return this.each(function () {
            obj = $(this);

            if ($(".topbarBox").length > 0) {
                // Hide already existing bars
                $(".topbarBox").hide()
                $(".topbarBox").slideUp(200, function () {
                    $(".topbarBox").remove();
                });
            }


            //var html = ""
                //+ "<div class='topbarBox' style='" + barStyle + "'>"
                //+ "  <div style='" + overlayStyle + "'>&nbsp;</div>"
                //+ "  <div style='" + messageStyle + "'>" + obj.html() + "</div>"
               // + "</div>"
            var html = "";
            if(options.success){
				html = "<div class='topbarBox' style='" + barStyle + "'>"
                + "  <div style='"+successStyle+"'>" + obj.html() + "</div>"
                + "</div>"
			} else {
				html = "<div class='topbarBox' style='" + barStyle + "'>"
                + "  <div style='"+errorStyle+"'>" + obj.html() + "</div>"
                + "</div>"
			}
            if (options.close == "click") {
                $(html).click(function () {
                    $(this).slideUp(200, function () {
                        $(this).remove();
                    });
                }).appendTo($('body')).slideDown(200);
            }
            else {
                $(html).appendTo($('body')).slideDown(200).delay(options.close).slideUp(200, function () {
                    $(this).remove();
                });
            }

        });
    };
})(jQuery);
