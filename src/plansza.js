var Plansza = (function () {
    function Plansza() {
        this.length = 0;
        this.dir = true;
        this.p = "rgba(0,255,0,0.5)";
        this.i = "rgba(255,0,0,0.5)";
        this.c = true;
        this.plansza = [];
        for (var i = 0; i < 12; i++) {
            this.plansza[i] = [];
            for (var j = 0; j < 12; j++) {
                this.plansza[i][j] = 0;
            }
        }
    }
    Plansza.prototype.CreatePlansza = function () {
        var _this = this;
        var box = document.createElement("div");
        box.className = "plansza";
        box.addEventListener("mouseleave", function (e) { return _this.maluj(); });
        for (var i = 1; i < 11; i++) {
            var _loop_1 = function () {
                var pole = document.createElement("div");
                pole.className = "pole";
                pole.id = (i - 1) + "-" + (j - 1);
                pole.addEventListener("mouseenter", function (e) { return _this.podświetl(pole); });
                pole.addEventListener("click", function (e) { return _this.przyłóż(pole); });
                pole.addEventListener("mouseleave", function (e) { return _this.odświetl(pole); });
                pole.addEventListener("contextmenu", function (e) { return _this.kierunek(e); });
                box.appendChild(pole);
            };
            for (var j = 1; j < 11; j++) {
                _loop_1();
            }
        }
        return box;
    };
    Plansza.prototype.podgląd = function (x) {
        this.pola = document.getElementsByClassName("pole");
        for (var m = 0; m < this.pola.length; m++) {
        }
    };
    Plansza.prototype.przyłóż = function (x) {
        var id1 = parseInt(x.id[0]);
        var id2 = parseInt(x.id[2]);
        for (var i = 0; i < this.length; i++) {
            if (this.dir) {
                if ((id2 + i) <= 9) {
                    if (this.c) {
                        this.plansza[id1 + 1][(id2 + i) + 1] = 1;
                    }
                }
                else {
                    if (this.c) {
                        this.plansza[id1 + 1][(9 - i) + 1] = 1;
                    }
                }
            }
            else {
                if ((id1 + i) <= 9) {
                    if (this.c) {
                        this.plansza[(id1 + i) + 1][id2 + 1] = 1;
                    }
                }
                else {
                    if (this.c) {
                        this.plansza[(9 - i) + 1][id2 + 1] = 1;
                    }
                }
            }
        }
        this.maluj();
    };
    Plansza.prototype.podświetl = function (x) {
        this.maluj();
        this.c = true;
        this.x = x;
        var id1 = parseInt(x.id[0]);
        var id2 = parseInt(x.id[2]);
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (this.dir) {
                if ((id2 + i) <= 9) {
                    if (this.c) {
                        if (this.possible(id1 + 1, (id2 + i) + 1)) {
                            this.c = true;
                        }
                        else {
                            this.c = false;
                        }
                    }
                    var y = document.getElementById(id1 + "-" + (id2 + i));
                    arr.push(y);
                }
                else {
                    if (this.c) {
                        if (this.possible(id1 + 1, (9 - i) + 1)) {
                            this.c = true;
                        }
                        else {
                            this.c = false;
                        }
                    }
                    var y = document.getElementById(id1 + "-" + (9 - i));
                    arr.push(y);
                }
            }
            else {
                if ((id1 + i) <= 9) {
                    if (this.c) {
                        if (this.possible((id1 + i) + 1, id2 + 1)) {
                            this.c = true;
                        }
                        else {
                            this.c = false;
                        }
                    }
                    var y = document.getElementById((id1 + i) + "-" + id2);
                    arr.push(y);
                }
                else {
                    if (this.c) {
                        if (this.possible((9 - i) + 1, id2 + 1)) {
                            this.c = true;
                        }
                        else {
                            this.c = false;
                        }
                    }
                    var y = document.getElementById((9 - i) + "-" + id2);
                    arr.push(y);
                }
            }
        }
        this.kolor(this.c, arr);
    };
    Plansza.prototype.possible = function (x, y) {
        if (this.plansza[x - 1][y - 1] != 0) {
            return false;
        }
        else if (this.plansza[x - 1][y] != 0) {
            return false;
        }
        else if (this.plansza[x - 1][y + 1] != 0) {
            return false;
        }
        else if (this.plansza[x][y + 1] != 0) {
            return false;
        }
        else if (this.plansza[x + 1][y + 1] != 0) {
            return false;
        }
        else if (this.plansza[x + 1][y] != 0) {
            return false;
        }
        else if (this.plansza[x + 1][y - 1] != 0) {
            return false;
        }
        else if (this.plansza[x][y - 1] != 0) {
            return false;
        }
        return true;
    };
    Plansza.prototype.odświetl = function (x) {
        this.maluj();
        var id1 = parseInt(x.id[0]);
        var id2 = parseInt(x.id[2]);
        for (var i = 0; i < this.length; i++) {
            if (this.dir) {
                if ((id2 + i) <= 9) {
                    var y = document.getElementById(id1 + "-" + (id2 + i));
                    y.style.backgroundColor = "white";
                }
                else {
                    var y = document.getElementById(id1 + "-" + (9 - i));
                    y.style.backgroundColor = "white";
                }
            }
            else {
                if ((id1 + i) <= 9) {
                    var y = document.getElementById((id1 + i) + "-" + id2);
                    y.style.backgroundColor = "white";
                }
                else {
                    var y = document.getElementById((9 - i) + "-" + id2);
                    y.style.backgroundColor = "white";
                }
            }
        }
    };
    Plansza.prototype.kierunek = function (e) {
        e.preventDefault();
        this.dir = !this.dir;
        this.maluj();
        this.odświetl(this.x);
        this.podświetl(this.x);
    };
    Plansza.prototype.maluj = function () {
        for (var k = 1; k < this.plansza.length - 1; k++) {
            for (var j = 1; j < this.plansza[k].length - 1; j++) {
                if (this.plansza[k][j] == 0) {
                    var y = document.getElementById((k - 1) + "-" + (j - 1));
                    y.style.backgroundColor = "white";
                }
                else {
                    var y = document.getElementById((k - 1) + "-" + (j - 1));
                    y.style.backgroundColor = "blue";
                }
            }
        }
    };
    Plansza.prototype.kolor = function (x, y) {
        for (var i = 0; i < y.length; i++) {
            if (x == true) {
                y[i].style.backgroundColor = this.p;
            }
            else {
                y[i].style.backgroundColor = this.i;
            }
        }
    };
    Plansza.prototype.setLength = function (x) {
        this.length = x;
    };
    Plansza.prototype.get_bool = function () {
        return this.c;
    };
    Plansza.prototype.get_plansza = function () {
        return this.plansza;
    };
    return Plansza;
}());
