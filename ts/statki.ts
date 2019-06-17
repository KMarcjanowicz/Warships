class Statki {

    private rodzaje: Array<any>[];
    private ilosc: number = 10;
    private maszty: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    private ids: Array<any>[];
    private t: boolean = true;
    private chosen: number = 0;
    private length: number = 4;

    constructor() {
        this.rodzaje = [];

        for (let i = 0; i < 10; i++) {
            this.rodzaje[i] = [];
            for (let j = 0; j < this.maszty[i]; j++) {
                let część = document.createElement("div");
                część.id = i + "-" + this.maszty[i] + "-" + j
                if(i == 0){
                    część.style.backgroundColor = "blue" 
                }
                część.className = "część";
                część.addEventListener("click", (e: Event) => this.podświetl(część));
                this.rodzaje[i].push(część);
                //console.log(i + " " + j)
                //this.rodzaje[i][j]
            }
        }

    }

    public zobacz_statki() {
        return this.rodzaje;
    }

    private podświetl(x: HTMLElement) {
        //console.log(x.id)
        if (this.t) {
            let wszystkie = document.getElementsByClassName("część");
            //console.log(wszystkie);
            this.ids = [];
            for (let i = 0; i < wszystkie.length; i++) {
                //console.log(wszystkie[i].id)
                let string: string = wszystkie[i].id
                let stringArr: Array<any> = string.split("-");
                //console.log(stringArr);
                this.ids[i] = stringArr;
            }
            //console.log(this.ids);
            this.t = false;
        }
        for(let l = 0; l < this.ids.length; l++){
            if(this.ids[l][0] == this.chosen){
                let d = document.getElementById(this.ids[l][0] + "-" + this.ids[l][1] + "-" + this.ids[l][2])
                if(d){
                    d.style.backgroundColor = "white";
                }
            }
        }
        this.chosen = parseInt(x.id[0]);
        //console.log(this.chosen);
        this.length = 0;
        for(let l = 0; l < this.ids.length; l++){
            if(this.ids[l][0] == this.chosen){
                this.length++;
                let d = document.getElementById(this.ids[l][0] + "-" + this.ids[l][1] + "-" + this.ids[l][2])
                if(d){
                    d.style.backgroundColor = "blue";
                }
            }
        }
    }

    public get_length(){ 
        return this.length;
    }

    public get_maszty(){ 
        return this.maszty;
    }
}