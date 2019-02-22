
var map = new Map();
var enabledButton = true;

//plynne przejscia
$("li a").click(function () {
    var hash = this.hash;

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 800, function () {

        $(this).collapse('hide');

        window.location.hash = hash;
    });
    return false;
});

//zmiana hasha przy przewijaniu
$('body').on('activate.bs.scrollspy', function () {
    var nav = document.getElementById("myNavbar");
    var activeElements = nav.getElementsByClassName("active");
    var active = activeElements[0];
    var hash = active.childNodes[1].hash;

    console.log(hash);
    //zmiana hasha bez jump
    if (history.pushState) {
        history.pushState(null, null, hash);
    }
    else {
        location.hash = hash;
    }

    var tab = ["#TWD", "#MSM", "#B", "#TWAU", "#GOT", "#TB"]

    var index = 0;
    for (i = 0; i < tab.length; i++) {
        if (hash == tab[i]) break;
        index++;
    }

    //ladowanie strony obecnej i nastepnej
    dynamicPageLoad(tab[index]);

    if (index == 5) dynamicPageLoad(tab[0]);
    else dynamicPageLoad(tab[index + 1]);
})

function dynamicPageLoad(name) {
    if ($(name).has('div').length == 0) $(name).load("pages/" + name.substr(1) + ".html");
}


//show more
$("#content").on("click", ".show-more a", function (event) {
    event.preventDefault();

    var $this = $(this);
    var $content = $this.parent().prev("div");
    var linkText = $this.text().toUpperCase();

    $content.slideToggle(800);
    $this.find("span").toggleClass("glyphicon glyphicon-menu-down glyphicon glyphicon-menu-up");
});


function changeImage(dir, value) {
    if (enabledButton) {
        enabledButton = false;

        var obj = document.getElementById("image" + dir);

        if (map.get(dir) == null) map.set(dir, 1);
        var temp = map.get(dir);

        if (value > 0) {
            if (temp == 6) temp = 1;
            else temp = temp + 1;
        }
        else {
            if (temp == 1) temp = 6;
            else temp = temp - 1;
        }

        map.set(dir, temp);

        obj.classList.add("fade");
        setTimeout(function () {
            obj.style.backgroundImage = "url(images/" + dir + "/" + temp + ".jpg)";
            setTimeout(function () {
                obj.classList.remove("fade")
                enabledButton = true;
            }, 700);
        }, 700);

    }
}

function enterSlider(x) {
    var logo = x.parentNode.children[0];
    logo.classList.add('logo2');
}

function leaveSlider(x) {
    var logo = x.parentNode.children[0];
    logo.classList.remove('logo2');
}

function resizeBacgroundImage() {
    var all = document.getElementsByClassName("image");
    var captions = document.getElementsByClassName("caption");

    if (all.length > 0) {
        var width = all[0].offsetWidth;

        if (width < 768) {
            var height = parseInt((width * 108) / 192);

            for (var i = 0; i < all.length; i++) {
                all[i].style.height = (height) + "px";
                all[i].style.backgroundPositionY = 0 + "px";
            }

            for (var j = 0; j < captions.length; j++) {
                captions[j].style.height = (height) + "px";
            }
        } else {
            for (var i = 0; i < all.length; i++) {
                all[i].style.backgroundPositionY = 50 + "px";
                all[i].style.height = "700px";
            }

            for (var j = 0; j < captions.length; j++) {
                captions[j].style.height = "700px";
            }
        }
    }
};

window.onresize = function () {
    resizeBacgroundImage();
}

window.onload = function () {
    resizeBacgroundImage();
}

dynamicPageLoad("#TWD");