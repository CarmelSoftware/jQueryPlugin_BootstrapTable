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
        
        
        
