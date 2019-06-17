var Statki = (function () {
    function Statki() {
        var _this = this;
        this.ilosc = 10;
        this.maszty = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        this.t = true;
        this.chosen = 0;
        this.length = 4;
        this.rodzaje = [];
        for (var i = 0; i < 10; i++) {
            this.rodzaje[i] = [];
            var _loop_1 = function (j) {
                var część = document.createElement("div");
                część.id = i + "-" + this_1.maszty[i] + "-" + j;
                if (i == 0) {
                    część.style.backgroundColor = "blue";
                }
                część.className = "część";
                część.addEventListener("click", function (e) { return _this.podświetl(część); });
                this_1.rodzaje[i].push(część);
            };
            var this_1 = this;
            for (var j = 0; j < this.maszty[i]; j++) {
                _loop_1(j);
            }
        }
    }
    Statki.prototype.zobacz_statki = function () {
        return this.rodzaje;
    };
    Statki.prototype.podświetl = function (x) {
        if (this.t) {
            var wszystkie = document.getElementsByClassName("część");
            this.ids = [];
            for (var i = 0; i < wszystkie.length; i++) {
                var string = wszystkie[i].id;
                var stringArr = string.split("-");
                this.ids[i] = stringArr;
            }
            this.t = false;
        }
        for (var l = 0; l < this.ids.length; l++) {
            if (this.ids[l][0] == this.chosen) {
                var d = document.getElementById(this.ids[l][0] + "-" + this.ids[l][1] + "-" + this.ids[l][2]);
                if (d) {
                    d.style.backgroundColor = "white";
                }
            }
        }
        this.chosen = parseInt(x.id[0]);
        this.length = 0;
        for (var l = 0; l < this.ids.length; l++) {
            if (this.ids[l][0] == this.chosen) {
                this.length++;
                var d = document.getElementById(this.ids[l][0] + "-" + this.ids[l][1] + "-" + this.ids[l][2]);
                if (d) {
                    d.style.backgroundColor = "blue";
                }
            }
        }
    };
    Statki.prototype.get_length = function () {
        return this.length;
    };
    Statki.prototype.get_maszty = function () {
        return this.maszty;
    };
    return Statki;
}());
