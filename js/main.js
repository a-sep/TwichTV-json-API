//========= ver. 1.0  ===========

var channels = ["freecodecamp", "brunofin", "storbeck", "terakilobyte", "food", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2", "OgamingSC2", "minecraft", "cretetion"];

function show(name, logo, url, status) {


    var html = "";
    html += '<li><div class="row text-center ' + (status == "Offline" || status == "Account Closed" ? "offline" : "online") + '">' +
        '<div class="col-md-2 col-xs-6">';
    if (logo) {
        html += '<img src=' + logo + ' class="img-circle pull-left">';
    } else {
        html += '<i class="fa fa-3x fa-question-circle pull-left" aria-hidden="true"></i>';
    }
    html += '</div><div class="col-md-2 "><a href=' + url + ' target="_blank">' + name + '</a></div>';
    html += '<div class="col-md-8 ">' + status + '</div>';
    html += '</div></li>';

    $("#list").append(html);
}

function twichChannels() {

    $.each(channels, function (index, value) {
        var name, logo, url, status;

        $.getJSON('https://api.twitch.tv/kraken/streams/' + value, function (data) {
            console.log(data);

            if (data.stream) {
                name = data.stream.channel.display_name;
                logo = data.stream.channel.logo;
                url = data.stream.channel.url;
                status = data.stream.channel.status;
                show(name, logo, url, status);
            } else {
                // console.log(value);
                $.getJSON('https://api.twitch.tv/kraken/channels/' + value, function (data) {
                    // console.log(data.display_name);
                    name = data.display_name;
                    logo = data.logo;
                    url = data.url;
                    status = "Offline";
                    show(name, logo, url, status);
                });
            }
        }).fail(function () {
            name = value;
            url = "#";
            status = "Account Closed";
            show(name, logo, url, status);
        });
    });
}

$(document).ready(function () {
    twichChannels();

    $("#all").on("click", function () {
        $("li").show();
    });

    $("#on").on("click", function () {
        $("li").show();
        $('li').has('.offline').hide();
    });

    $("#off").on("click", function () {
        $("li").show();
        $('li').has('.online').hide();

    });

});



