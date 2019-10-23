;
(function ($) {
    $(document).ready(function () {

        var navLinks = $(".group a"),
            contentContainer = $("#main-content"),
            defaultTitle = "Dynamic Page | ";

        function requestContent(file) {
            contentContainer.load(file + ' #content', function () {
                console.log(file + ' #content');

            });
        }

        function removeAllClass() {
            navLinks.removeClass('active');
        }

        navLinks.click(function (e) {
            e.preventDefault();
            console.log(e.target);
            var TitleData = e.target.getAttribute('data-title'),
                url = e.target.getAttribute('href');
            removeAllClass()
            $(e.target).addClass("active");
            history.pushState(url, null, url);
            requestContent(url);
            document.title = defaultTitle + TitleData;

        });

        window.addEventListener('popstate', function (e) {
            var url = e.state;
            console.log("e.state " + url);

            if (url == null) {
                removeAllClass();
                contentContainer.innerHTML = " ";
                document.title = defaultTitle;
            } else {
                requestContent(url);
                removeAllClass();
                let currentElement = $("a[href$='" + url + "']");
                currentElement.addClass("active");
                document.title = defaultTitle + currentElement.attr('data-title');
            }
        })











    });
})(jQuery)