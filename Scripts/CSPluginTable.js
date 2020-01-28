jQuery(function ($) {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /// jQuery Plugin to display a  Panel Table with Bootstrap style
    ///       useful for displaying blog comments, comment threads, articles lists, Tweets, or any list 
    ///       featuring a left aligned image and textual content.
    ///
    /// 
    /// Uou can send MVC data inside the opts : { data: MVCdata }
    /// Else, you can Ajax load the data, specifying the URL : { url : "Scripts/TableItems.js" }
    /// opts = { data : JSobject, url : "MyJSONData.js" }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
 jQuery.fn.Table = function (opts)
    {

        var $this = $(this);
        $this.addClass("table-responsive");     

        if (opts === undefined || (opts.data === undefined && opts.url === undefined)) {
            opts = { data: null, url: "Scripts/TableItems.js" };
            fnSendAjaxRequest(opts);
        }
        else if (opts.data === undefined) {
            fnSendAjaxRequest(opts);
        }
        else if (opts.url === undefined) {
            fnLoadData(opts.data);
        }
        else {
            fnLoadData(opts.data);
            fnSendAjaxRequest(opts);
        }

        return $this;    


/////////////  Send Ajax Request ///////////////////////////////////////////////////////////////
        function fnSendAjaxRequest(opts) {

            $.getJSON(opts.url, fnLoadData, function (msg) {

                alert("An Error has been thrown : " + msg);
            });
        }
        
        
        
 ///////////// Create  Panel Table  ////////////////////////////////////////////////////////////////
        function fnLoadData(data) {

            var $table = $("<table/>", { id: "customTable", class: "table table-hover table-striped" });
            $this.append($table);
            var $head = $("<thead/>", { class: "row" }).appendTo($table);
            var $th1 = $("<th/>", { text: "Index", class: "col-xs-1  col-lg-1" }).appendTo($head);
            var $th2 = $("<th/>", { text: "Image", class: "col-xs-3 col-lg-3" }).appendTo($head);
            var $th3 = $("<th/>", { text: "Title", class: "col-xs-2 col-lg-2" }).appendTo($head);
            var $th4 = $("<th/>", { text: "Text", class: "col-xs-6 col-lg-6" }).appendTo($head);
            var $body = $("<tbody/>", { class: "" }).appendTo($table);

             
   

            $.each(data, function (index, obj)
            {
                var $row = $("<tr/>", { class: "row" }).appendTo($body);
                var $td0 = $("<td />", { class: "col-xs-1  col-lg-1" }).appendTo($row);
                var $index = $("<span/>", { class: "col-xs-3 col-lg-3", text: index }).appendTo($td0);
                var $td1 = $("<td />", { class: "" }).appendTo($row);
                var $a = $("<a/>", { href: obj.Url }).appendTo($td1);
                $("<img/>", { class: "responsive img-rounded", src: obj.Image, alt: obj.Title }).appendTo($a);
                var $td2 = $("<td />", { class: "col-xs-2 col-lg-2" }).appendTo($row);
                $("<h3/>", { class: "", text: obj.Title }).appendTo($td2);
                var $td3 = $("<td/>", { class: "col-xs-6 col-lg-6" }).appendTo($row)
                .html(obj.Text);

            });

        }        
    }
});          
             
