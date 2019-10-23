/*
 * Binding $ to jQuery $ with this Function
 */
;
(function ($) {
    /*
     * Run all below code when document is fully lodded
     */
    $(document).ready(function () {

        /*
         * Variables declaration $ assining value
         */
        var navLinks = $(".group a"), // Select all a tag from ".group" class element
            contentContainer = $("#main-content"), // Select the container where content will be loaded
            defaultTitle = "Dynamic Page | "; // String for title to be used f no title is there 

        /*
         * This Function loads contents from the url to "contentContainer", that is passed by "file" local variable & a callback function when content loading is completed
         */
        function requestContent(file) {
            contentContainer.load(file + ' #content', function () {
                console.log(file + ' #content');
            });
        }

        /*
         * This Function removes all classes with "active" class from navLinks (all a tag from ".group" class element)
         */
        function removeAllClass() {
            navLinks.removeClass('active');
        }

        /*
         * This Function listens clicks from a tags & stops from page refreshing
         */
        navLinks.click(function (e) {
            e.preventDefault(); // Stops page refresh
            console.log(e.target);
            var TitleData = e.target.getAttribute('data-title'), //Get value of "data-title" attribute
                url = e.target.getAttribute('href'); //Get href url from a tag that has been clicked
            removeAllClass(); // Remove all classes
            $(e.target).addClass("active"); // add an active class to the element that hs been clicked
            history.pushState(url, null, url); // history.pushState([changed url], [title], [url of addressbar to be apeard])
            requestContent(url); // Load contents from clicked url
            document.title = defaultTitle + TitleData; // Set a title for the page

        });
        /*
         * This Function listens when a user preses back or forword button & load contents from changed url
         */
        window.addEventListener('popstate', function (e) {
            var url = e.state; // e.state is the url that changed when a user preses back or forword button
            console.log("e.state " + url);
            /*
             * if there is no url then reset everything
             */
            if (url == null) {
                removeAllClass();
                contentContainer.innerHTML = " ";
                document.title = defaultTitle;
            } else {
                requestContent(url); // Load contents from changed url
                removeAllClass(); // remove all active classes
                let currentElement = $("a[href$='" + url + "']"); // Select element that has a href attibute of changed url
                currentElement.addClass("active"); //sets active class to that element
                document.title = defaultTitle + currentElement.attr('data-title'); // Sets Title
            }
        })











    });
})(jQuery)