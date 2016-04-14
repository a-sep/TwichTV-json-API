//========= ver. 2.0  ===========
function search(userInput) {
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=search&exchars=500&exlimit=20&exintro=1&inprop=url&gsrsearch=' + userInput + '&callback=?',
        type: 'GET',
        dataType: 'jsonp',
        headers: {'Api-User-Agent': 'Wikipedia-Viewer'}
    }).success(function (data,status) {
        // console.log(data.query.pages);
        $(data.query.pages).each(function () {
            $.each(this, function () {
                // console.log(this.fullurl);
            $("#result").append('<a href=' + this.fullurl + ' target="_blank">' +
                '<blockquote>' +
                '<h4>' + this.title + '</h4>' + this.extract +
                '</blockquote>' +
                '</a>');
            });
        });
    }).error(function (data, status) {
        console.log("error... " + status);
    });
}

$(document).ready(function () {
    // after pressing search icon hide it and show input field
    $(".fa-search").on("click", function () {
        $(".input-group").removeClass('hide');
        $(".fa-search").addClass('hide');
    });

    //after pressing close(x) button hide input, clear screen and show search button
    $(".input-group-btn").on("click", function () {
        $(".input-group").addClass('hide');
        $(".fa-search").removeClass('hide');
        $("#div-middle").addClass('display-table-cell-middle');
        $('#search-input').val(''); // clear inputs field
        $('#result').empty(); // clear screen
    });

    // if user has pressed enter
    $("#search-input").keyup(function (e) {
        var text = encodeURIComponent($('#search-input').val());
        if (e.which === 13) {
            $("#search-input").change(function () {
                $('#result').empty(); // clear screen
            });
            search(text); // search  api with users value
            $("#div-middle").removeClass('display-table-cell-middle');
        }
    });
});
