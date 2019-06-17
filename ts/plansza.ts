class Plansza {
    private plansza: Array<number>[];
    private pola: HTMLCollection;
    private length: number = 0;
    private dir: boolean = true;
    private x: HTMLElement;
    private p: string = "rgba(0,255,0,0.5)";
    private i: string = "rgba(255,0,0,0.5)";
    private c: boolean = true;

    constructor() {
        this.plansza = [];

        for (var i = 0; i < 12; i++) {
            this.plansza[i] = [];
            for (var j = 0; j < 12; j++) {
                this.plansza[i][j] = 0;
            }
        }
    }

    public CreatePlansza() {
        let box = document.createElement("div");
        box.className = "plansza";
        box.addEventListener("mouseleave", (e: Event) => this.maluj());
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                let pole = document.createElement("div");
                pole.className = "pole";
                pole.id = (i - 1) + "-" + (j - 1);
                pole.addEventListener("mouseenter", (e: Event) => this.podświetl(pole));
                pole.addEventListener("click", (e: Event) => this.przyłóż(pole));
                pole.addEventListener("mouseleave", (e: Event) => this.odświetl(pole));
                pole.addEventListener("contextmenu", (e: Event) => this.kierunek(e));
                box.appendChild(pole);
            }
        }
        return box;
    }

    public podgląd(x: number) {
        this.pola = document.getElementsByClassName("pole");
        for (let m = 0; m < this.pola.length; m++) {
        }
    }

    private przyłóż(x: HTMLElement) {
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
                        this.plansza[(id1 + i) + 1][id2 + 1] = 1
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
    }

    private podświetl(x: HTMLElement) {
        this.maluj();
        this.c = true;
        this.x = x;
        //x.style.backgroundColor = "rgba(0,255,0,0.5)";
        var id1: number = parseInt(x.id[0]);
        var id2: number = parseInt(x.id[2]);
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
                    var y: HTMLElement = document.getElementById(id1 + "-" + (id2 + i));
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
                    var y: HTMLElement = document.getElementById(id1 + "-" + (9 - i));
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
                    var y: HTMLElement = document.getElementById((id1 + i) + "-" + id2);
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
                    var y: HTMLElement = document.getElementById((9 - i) + "-" + id2);
                    arr.push(y);
                }
            }
        }
        this.kolor(this.c, arr);      
    }

    private possible(x: number, y: number) {
        if (this.plansza[x - 1][y - 1] != 0) {
            return false
        }
        else if (this.plansza[x - 1][y] != 0) {
            return false
        }
        else if (this.plansza[x - 1][y + 1] != 0) {
            return false
        }
        else if (this.plansza[x][y + 1] != 0) {
            return false
        }
        else if (this.plansza[x + 1][y + 1] != 0) {
            return false
        }
        else if (this.plansza[x + 1][y] != 0) {
            return false
        }
        else if (this.plansza[x + 1][y - 1] != 0) {
            return false
        }
        else if (this.plansza[x][y - 1] != 0) {
            return false
        }
        return true;
    }

    private odświetl(x: HTMLElement) {
        this.maluj()
        //x.style.backgroundColor = "white";
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
    }

    private kierunek(e: Event) {
        e.preventDefault();
        this.dir = !this.dir;
        this.maluj();
        this.odświetl(this.x);
        this.podświetl(this.x);
        
    }

    private maluj() {
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
    }

    private kolor(x: boolean, y: Array<any>) {
        for (var i: number = 0; i < y.length; i++) {
            if (x == true) {
                y[i].style.backgroundColor = this.p;
            }
            else {
                y[i].style.backgroundColor = this.i;
            }
        }
    }

    public setLength(x: number) {
        this.length = x;
    }

    public get_bool(){
        return this.c;
    }

    public get_plansza(){
        return this.plansza;
    }
}