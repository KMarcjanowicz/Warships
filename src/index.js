
document.addEventListener("DOMContentLoaded", function (event) {
    var player_tab = new Plansza();
    var player_ships = new Statki();
    var root = document.getElementById("root")
    var length = 4;
    var ready = 0;
    var gra;
    var player_grid = player_tab.CreatePlansza();
    root.appendChild(player_grid);
    for (var i = 0; i < player_ships.zobacz_statki().length; i++) {
        var gablotka = document.createElement("div");
        gablotka.className = player_ships.get_maszty()[i];

        for (var j = 0; j < player_ships.zobacz_statki()[i].length; j++) {
            gablotka.appendChild(player_ships.zobacz_statki()[i][j]);
            gablotka.onclick = function () {
                length = player_ships.get_length();
                console.log("Length: " + length);
            };
        }
        root.appendChild(gablotka);
    }
    let plansza = document.getElementsByClassName("plansza");
    plansza[0].addEventListener("mouseover", function () { player_tab.setLength(length) });
    if ((ready != player_ships.get_maszty().length)) {
        plansza[0].addEventListener("click", function () {
            if(player_tab.get_bool()){
                var del = document.getElementsByClassName(length);
                console.log(del)
                del[0].remove();
                length = 0;
                ready++;     
            }
            if (ready == player_ships.get_maszty().length) {
                console.log("Gra start!")
                root.innerHTML = ""
                gra = new Gra();
                gra.set_player_tab(player_tab.get_plansza());
            }
        });
    }
});