//========= ver. 1.0  ===========

var channels = ["freecodecamp", "storbeck", "terakilobyte", "food", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2", "OgamingSC2", "minecraft", "cretetion"];

function show(name, logo, url, status) {

    var html = "";
    html += '<li><div class="row text-center">';
    if (logo) {
        html += '<div class="col-sm-2"><img src=' + logo + ' class="img-circle"></div>';

    } else {
        html += '<div class="col-sm-2"><i class="fa fa-3x fa-question-circle" aria-hidden="true"></i></div>';
    }
    html += '<div class="col-sm-3"><a href=' + url + ' target="_blank">' + name + '</a></div>';
    html += '<div class="col-sm-7">' + status + '</div>';
    html += '</div></li>';

    $("#list").append(html);
}

function twichChannels() {

    $.each(channels, function (index, value) {
        var name, logo, url, status;

        $.getJSON('https://api.twitch.tv/kraken/streams/' + value, function (data) {
            // console.log(data);
            if (data.stream) {
                name = data.stream.channel.display_name;
                logo = data.stream.channel.logo;
                url = data.stream.channel.url;
                status = data.stream.channel.status;
                show(name, logo, url, status);
            } else {
                // console.log(value);
                $.getJSON('https://api.twitch.tv/kraken/channels/' + value, function (data) {
                    console.log(data.display_name);
                    name = data.display_name;
                    logo = data.logo;
                    url = data.url;
                    status = "Offline";
                    show(name, logo, url, status);
                });
            }
        });
    });
}

$(document).ready(function () {
    twichChannels();
});



