class Gra {
    private player_tab: Array<number>[];
    private computer_tab: Array<number>[];
    private player_grid: HTMLCollection;
    private computer_grid: HTMLCollection;
    private root: HTMLElement = document.getElementById("root");
    private maszty: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    private p: string = "rgba(0,255,0,0.5)";
    private i: string = "rgba(255,0,0,0.5)";
    private klik: boolean = true;
    private arri: Array<number> = [];
    private arrj: Array<number> = [];
    private pptk: number = 0;
    private cptk: number = 0;

    constructor() {
        this.computer_tab = [];

        for (var i = 0; i < 12; i++) {
            this.computer_tab[i] = [];
            for (var j = 0; j < 12; j++) {
                this.computer_tab[i][j] = 0;
            }
        }

        var box: HTMLElement = document.createElement("div");
        box.innerHTML = "<p>Tablica gracza</p>"
        box.className = "plansza2";
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                var x: HTMLElement = document.createElement("div");
                x.className = "pole";
                x.id = "p-" + i + "-" + j;
                box.appendChild(x);
            }
        }

        this.root.appendChild(box);

        var box2: HTMLElement = document.createElement("div");
        box2.innerHTML = "<p>Tablica komuptera</p>"
        box2.className = "plansza2";
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                let x: HTMLElement = document.createElement("div");
                x.addEventListener("click", (e: Event) => this.shoot(x));
                x.className = "pole";
                x.id = "c-" + i + "-" + j;
                //plansza komputera - klikanie pol
                box2.appendChild(x);
            }
        }

        this.root.appendChild(box2);
        this.rozstaw_statki();
        var divek:HTMLElement = document.createElement("div");
        divek.id = "overlay";
        this.root.appendChild(divek);
        var butt:HTMLButtonElement = document.createElement("button");
        butt.addEventListener("click", function(){
            console.log("remove!")
            divek.remove();
        });
        butt.textContent = "Gra Start!";
        butt.id ="butt"
        divek.appendChild(butt);

    }

    private rozstaw_statki() {
        for (var i = 0; i < this.maszty.length; i++) {
            var x: number = Math.floor(Math.random() * 10) + 1;
            var y: number = Math.floor(Math.random() * 10) + 1;
            var z: number = this.maszty[i];
            var dir = Math.floor(Math.random() * 2) + 1;
            var tab: Array<number>[] = [];
            if (dir == 1) {
                console.log("Ilosc: " + z)
                for (var j = 0; j < z;) {
                    console.log("maszt: " + j)
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
                this.przypisz_statki(tab)
            }
            else {
                console.log("Ilosc: " + z)
                for (var j = 0; j < z;) {
                    console.log("maszt: " + j)
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
                this.przypisz_statki(tab)
            }
        }
    }

    private przypisz_statki(x: Array<number>[]) {
        for (var h = 0; h < x.length; h++) {
            this.computer_tab[x[h][0]][x[h][1]] = 1;
        }
    }

    private possible(x: number, y: number, z: Array<number>[]) {
        if (z[x - 1][y - 1] != 0) {
            return false
        }
        else if (z[x - 1][y] != 0) {
            return false
        }
        else if (z[x - 1][y + 1] != 0) {
            return false
        }
        else if (z[x][y + 1] != 0) {
            return false
        }
        else if (z[x + 1][y + 1] != 0) {
            return false
        }
        else if (z[x + 1][y] != 0) {
            return false
        }
        else if (z[x + 1][y - 1] != 0) {
            return false
        }
        else if (z[x][y - 1] != 0) {
            return false
        }
        return true;
    }

    private maluj() {
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                // if (this.computer_tab[i][j] == 1) {
                //     var y = document.getElementById("c-" + i + "-" + j);
                //     y.style.backgroundColor = this.i;
                // }
                if (this.player_tab[i][j] == 1) {
                    var y = document.getElementById("p-" + i + "-" + j);
                    y.style.backgroundColor = "blue";
                }
            }
        }
    }

    private shoot(z: HTMLElement) {
        console.log(z.style.backgroundColor)
        if (z.style.backgroundColor == "") {
            console.log(this.computer_tab)
            var str = z.id;
            var ids = str.split("-");
            console.log(ids)
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
            console.log("już klikniete")
        }
    }

    private computer() {
        let i = Math.floor(Math.random() * 10) + 1;
        let j = Math.floor(Math.random() * 10) + 1;
        let is = true;
        for (let k = 0; k < this.arri.length; k++) {
            if (this.arri[k] == i && this.arrj[k] == j) {
                is = false;
            }
        }
        console.log("computer: " + i + ", " + j)
        if (is == false) {
            this.computer();
        } else {
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
    }

    private game() {
        var that = this;
        if (this.pptk < 20 && this.cptk < 20) {
            var msg = new Msg("Komputer myśli")
                msg.greet();
            setTimeout(() => {
                that.computer();
            }, 1000); 
        }
        else{
            if(this.pptk >= 20){
                window.alert("Player wins!");
            }
            else if(this.cptk >= 20){
                window.alert("Computer wins!");
            }
        }
    }

    public set_player_tab(x: Array<number>[]) {
        this.player_tab = x;
        this.maluj();
    }
}
class Msg {
    message: string;
    constructor(message: string) {
        this.message = message;
    }

    @enumerable("Komputer myśli")
    greet() {
       console.log(this.message);
       
    }
}
function enumerable(value: string) {
    return function (target: any, propertyKey: string) {
        console.log(propertyKey);
    };
}
