$(function () {
    function searchList() {
        if ($('.searchList li').length != 0) {
            // Add a Search feature to <ul class="searchList"> 
            $('a.showNext').parent().next('li').css('list-style', 'none').slideUp();
            $('.showNext').click(function () {
                $(this).parent().next('li').slideToggle();
            });
            // Create text box input for entering filter strings
            $('<input type="text" value="" class="srchField" id="srchLi" placeholder="Filter" /><div class="small-1 columns text-center"><label for="srchLi"><span id="lblIconLi" class="fa fa-magic"></span></label>').insertBefore('.searchList');
            $(".searchList li:not(li li)").each(function () {
                var sf = $(this).text().toLowerCase(); //all li text
                $("<span class='txtIndex'></span>").hide().text(sf).appendTo(this);
            });
            // Filter Rows on each keystroke
            $('#srchLi').keyup(function () {
                var cs = $(this).val().toLowerCase().split(" ");
                //show all rows.
                $('.searchList li').show();
                $.each(cs, function () {
                    $(".searchList li .txtIndex:not(:contains('" + this + "'))").parent().hide();
                    $(".searchList li .txtIndex:contains('" + this + "')").parent().show();
                    $(".searchList li:visible:has(.showNext)").next().show();
                    $(".searchList li:has(.showNext):hidden").next('li:visible').prev('li').show();
                });
                // For FAQs (where <li> alternate between quesions and answers) match both question for search string
                $(".searchList li:visible:has(.showNext)").next().show();
                $(".searchList li:has(.showNext):hidden").next('li:visible').prev('li').show();

                if ($('#srchLi').val().length == 0) {
                    $('.searchList li').show();
                    $('a.showNext').parent().next('li').css('list-style', 'none').slideUp();
                }
            }); //key up.
            $('#srchLi').hover(function () {
                $('#lblIconLi').toggleClass('fa fa-spinner fa-spin fa-lg');
            });


        }
    }

    function searchTable() {
        if ($('.searchTable td').length != 0) {
            function updateTableRowColor() {
                $('.searchTable tr:visible:even').css('background', '#f1f1f1');
                $('.searchTable tr:visible:odd').css('background', '#ffffff');
            }
            // Add searchability to any table with this class <table class="searchTable">
            $('<input type="text" value="" class="srchField" id="srchTable" placeholder="Filter" /><label class="lblSrchTable" for="srchTable"><span id="lblIconTable" class="fa fa-magic"></span></label>').insertBefore('.searchTable');

            $(".searchTable tr:has(td)").each(function () {
                var et = $(this).text().toLowerCase(); //all row text
                $("<td class='indexColumn2'></td>").hide().text(et).appendTo(this);
            });
            updateTableRowColor();
            // Filter Rows on each keystroke
            $('#srchTable').keyup(function () {
                var es = $(this).val().toLowerCase().split(" ");
                //show all rows.
                $(".searchTable tr:hidden").show();
                $.each(es, function () {
                    $(".searchTable tr:visible .indexColumn2:not(:contains('" + this + "'))").parent().hide();
                });
                // Reset the alternating background colors
                updateTableRowColor();

            }); //key up.
            $('#srchTable').hover(function () {
                $('#lblIconTable').toggleClass('fa fa-spinner fa-spin fa-large');
            });

        }
    }
    function searchInput() {
        // Hanlde placeholder text attribute for browsers that can't
        if ($('.srchField').length > 0) {
            $('.srchField').css('color', '#999999').val('Filter');
            $('.srchField').focusout(function () {
                if ($(this).val() == "" ? $(this).val('Filter').css('color', '#999') : null);
            });
            $('.srchField').focusin(function () {
                if ($(this).val() == "Filter" ? $(this).val('').css('color', '#000') : null);
            });
        }
    }
    // Secure link by class
    function secureLink(cssClass) {
        var thisLinkClass = '.' + cssClass;
        if (window.location.protocol != 'https:') {
            var secureHREF = $(thisLinkClass).attr('href');
            secureHREF = secureHREF.replace('http', 'https');
            $(thisLinkClass).attr('href', secureHREF);
        }
    }
    secureLink('https'); // use class="https" to secure any link
    searchList();
    searchTable();
    searchInput();
});
