var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gra = (function () {
    function Gra() {
        var _this = this;
        this.root = document.getElementById("root");
        this.maszty = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        this.p = "rgba(0,255,0,0.5)";
        this.i = "rgba(255,0,0,0.5)";
        this.klik = true;
        this.arri = [];
        this.arrj = [];
        this.pptk = 0;
        this.cptk = 0;
        this.computer_tab = [];
        for (var i = 0; i < 12; i++) {
            this.computer_tab[i] = [];
            for (var j = 0; j < 12; j++) {
                this.computer_tab[i][j] = 0;
            }
        }
        var box = document.createElement("div");
        box.innerHTML = "<p>Tablica gracza</p>";
        box.className = "plansza2";
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                var x = document.createElement("div");
                x.className = "pole";
                x.id = "p-" + i + "-" + j;
                box.appendChild(x);
            }
        }
        this.root.appendChild(box);
        var box2 = document.createElement("div");
        box2.innerHTML = "<p>Tablica komuptera</p>";
        box2.className = "plansza2";
        for (var i = 1; i < 11; i++) {
            var _loop_1 = function () {
                var x_1 = document.createElement("div");
                x_1.addEventListener("click", function (e) { return _this.shoot(x_1); });
                x_1.className = "pole";
                x_1.id = "c-" + i + "-" + j;
                box2.appendChild(x_1);
            };
            for (var j = 1; j < 11; j++) {
                _loop_1();
            }
        }
        this.root.appendChild(box2);
        this.rozstaw_statki();
        var divek = document.createElement("div");
        divek.id = "overlay";
        this.root.appendChild(divek);
        var butt = document.createElement("button");
        butt.addEventListener("click", function () {
            console.log("remove!");
            divek.remove();
        });
        butt.textContent = "Gra Start!";
        butt.id = "butt";
        divek.appendChild(butt);
    }
    Gra.prototype.rozstaw_statki = function () {
        for (var i = 0; i < this.maszty.length; i++) {
            var x = Math.floor(Math.random() * 10) + 1;
            var y = Math.floor(Math.random() * 10) + 1;
            var z = this.maszty[i];
            var dir = Math.floor(Math.random() * 2) + 1;
            var tab = [];
            if (dir == 1) {
                console.log("Ilosc: " + z);
                for (var j = 0; j < z;) {
                    console.log("maszt: " + j);
                    if (x + z - j <= 11) {
                        if (this.possible(x, y, this.computer_tab)) {
                            tab.push([x, y]);
                            x++;
                            j++;
                        }
                        else {
                            j = z;
                            tab = [];
                            i--;
                        }
                    }
                    else {
                        j = z;
                        tab = [];
                        i--;
                    }
                }
                this.przypisz_statki(tab);
            }
            else {
                console.log("Ilosc: " + z);
                for (var j = 0; j < z;) {
                    console.log("maszt: " + j);
                    if (y + z - j <= 11) {
                        if (this.possible(x, y, this.computer_tab)) {
                            tab.push([x, y]);
                            y++;
                            j++;
                        }
                        else {
                            j = z;
                            tab = [];
                            i--;
                        }
                    }
                    else {
                        j = z;
                        tab = [];
                        i--;
                    }
                }
                this.przypisz_statki(tab);
            }
        }
    };
    Gra.prototype.przypisz_statki = function (x) {
        for (var h = 0; h < x.length; h++) {
            this.computer_tab[x[h][0]][x[h][1]] = 1;
        }
    };
    Gra.prototype.possible = function (x, y, z) {
        if (z[x - 1][y - 1] != 0) {
            return false;
        }
        else if (z[x - 1][y] != 0) {
            return false;
        }
        else if (z[x - 1][y + 1] != 0) {
            return false;
        }
        else if (z[x][y + 1] != 0) {
            return false;
        }
        else if (z[x + 1][y + 1] != 0) {
            return false;
        }
        else if (z[x + 1][y] != 0) {
            return false;
        }
        else if (z[x + 1][y - 1] != 0) {
            return false;
        }
        else if (z[x][y - 1] != 0) {
            return false;
        }
        return true;
    };
    Gra.prototype.maluj = function () {
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                if (this.player_tab[i][j] == 1) {
                    var y = document.getElementById("p-" + i + "-" + j);
                    y.style.backgroundColor = "blue";
                }
            }
        }
    };
    Gra.prototype.shoot = function (z) {
        console.log(z.style.backgroundColor);
        if (z.style.backgroundColor == "") {
            console.log(this.computer_tab);
            var str = z.id;
            var ids = str.split("-");
            console.log(ids);
            for (var i = 1; i < 11; i++) {
                for (var j = 1; j < 11; j++) {
                    if (parseInt(ids[1]) == i && parseInt(ids[2]) == j) {
                        if (this.computer_tab[i][j] == 1) {
                            var zz = document.getElementById(ids[0] + "-" + ids[1] + "-" + ids[2]);
                            zz.style.backgroundColor = this.p;
                            this.pptk++;
                        }
                        else {
                            var zz = document.getElementById(ids[0] + "-" + ids[1] + "-" + ids[2]);
                            zz.style.backgroundColor = this.i;
                        }
                    }
                }
            }
            this.game();
        }
        else {
            console.log("już klikniete");
        }
    };
    Gra.prototype.computer = function () {
        var i = Math.floor(Math.random() * 10) + 1;
        var j = Math.floor(Math.random() * 10) + 1;
        var is = true;
        for (var k = 0; k < this.arri.length; k++) {
            if (this.arri[k] == i && this.arrj[k] == j) {
                is = false;
            }
        }
        console.log("computer: " + i + ", " + j);
        if (is == false) {
            this.computer();
        }
        else {
            this.arri.push(i);
            this.arrj.push(j);
            if (this.player_tab[i][j] == 1) {
                var zz = document.getElementById("p-" + i + "-" + j);
                zz.style.backgroundColor = this.i;
                this.cptk++;
            }
            else {
                var zz = document.getElementById("p-" + i + "-" + j);
                zz.style.backgroundColor = this.p;
            }
        }
    };
    Gra.prototype.game = function () {
        var that = this;
        if (this.pptk < 20 && this.cptk < 20) {
            var msg = new Msg("Komputer myśli");
            msg.greet();
            setTimeout(function () {
                that.computer();
            }, 1000);
        }
        else {
            if (this.pptk >= 20) {
                window.alert("Player wins!");
            }
            else if (this.cptk >= 20) {
                window.alert("Computer wins!");
            }
        }
    };
    Gra.prototype.set_player_tab = function (x) {
        this.player_tab = x;
        this.maluj();
    };
    return Gra;
}());
var Msg = (function () {
    function Msg(message) {
        this.message = message;
    }
    Msg.prototype.greet = function () {
        console.log(this.message);
    };
    __decorate([
        enumerable("Komputer myśli")
    ], Msg.prototype, "greet", null);
    return Msg;
}());
function enumerable(value) {
    return function (target, propertyKey) {
        console.log(propertyKey);
    };
}
