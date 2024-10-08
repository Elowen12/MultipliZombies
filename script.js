


var dia = 1
var diaNombre = ""
var respawn = 0
var moverZombie = 0
vida = 4

function ChoqueBalas(){

    const balas = document.querySelectorAll(".bala")
    const zombies = document.querySelectorAll(".zombie")

    if(balas.length  > 0){

        balas.forEach(bala =>{

            if(zombies.length > 0){

                zombies.forEach(zombie =>{

                    if(colicion(zombie,bala)){
                        zombie.remove()
                        bala.remove()

                        var puntaje = document.getElementById("puntaje")
                        puntaje.textContent = parseInt(puntaje.textContent) + 100

                    }
                })

            }

        })

    }

}

function moverBalas(){

    var balas = document.querySelectorAll(".bala")

        if (balas.length  >= 0){
        
            balas.forEach(bala =>{

                var pocicion = parseInt(bala.style.left) || 10

                if(pocicion < 80){
                     bala.style.left = (pocicion + 1 ) + "%"
                }else{
                    bala.remove()
                }

            })

        }
}


function generarMultiplicacion(){
    var num1 = document.getElementById("num1")
    var num2 = document.getElementById("num2")
    var num3 = document.getElementById("num3")

    num1.value = Math.floor(Math.random() * 10) + 1;
    num2.value = Math.floor(Math.random() * 10) + 1;

    num3.value = ""
    num3.focus()

}


function reaccionPersonaje(pocion1,pocicion2){
    const personaje = document.getElementById("principal")
    setTimeout(function(){
        personaje.src = pocion1
    },40)
    setTimeout(function(){
        personaje.src = pocicion2
    },100)
}

function administrarCorazones(){

    var corazon1 = document.getElementById("corazon1")
    var corazon2 = document.getElementById("corazon2")
    var corazon3 = document.getElementById("corazon3")
    var corazon4 = document.getElementById("corazon4")

    if(vida == 4){

        corazon1.style.display= "block"
        corazon2.style.display = "block"
        corazon2.style.display = "block"
        corazon3.style.display = "block"
        corazon4.style.display = "block"
    }
    else if(vida == 3){
        corazon1.style.display = "block"
        corazon2.style.display = "block"
        corazon3.style.display = "block"
        corazon4.style.display = "none"
    }
    else if(vida == 2){
        corazon1.style.display = "block"
        corazon2.style.display = "block"
        corazon3.style.display = "none"
        corazon4.style.display = "none"
    }
    else if(vida == 1){
        corazon1.style.display = "block"
        corazon2.style.display = "none"
        corazon3.style.display = "none"
        corazon4.style.display = "none"
    }
    else if(vida == 0){
        corazon1.style.display = "none"
        corazon2.style.display = "none"
        corazon3.style.display = "none"
        corazon4.style.display = "none"
    }

}

function ataqueZombie(){

    const personaje = document.getElementById("principal")
    const zombies = document.querySelectorAll(".zombie")

    if(zombies.length  > 0){

        zombies.forEach(zombie =>{

            if(colicion(personaje,zombie)){
                console.log("El zombie Ataco al personaje")
                zombie.remove()
                vida = vida -1
                administrarCorazones()
                if(vida <=4 && vida > 0){
                    reaccionPersonaje("assets/llorando.png","assets/principal.png")
                }else{
                    personaje.src = "assets/morida.png"
                    personaje.style.top = "72%"
                    personaje.style.width = "13%"
                    personaje.style.height = "15%"

                    var num3 = document.getElementById("num3")
                    num3.disabled = true;


                    var reiniciar = document.getElementById("botonReiniciar")
                    reiniciar.style.display = "block"
                    reiniciar.addEventListener("click",function(){
                        window.location.reload();
                    })

                }
            }

        })

    }

}


function colicion(elemento1,elemento2){

    var posELemento1 = elemento1.getBoundingClientRect();
    var posELemento2 = elemento2.getBoundingClientRect();


    if(posELemento1.left < posELemento2.right && posELemento1.right > posELemento2.left && posELemento1.top < posELemento2.bottom && posELemento1.bottom > posELemento2.top){
        return true
    }

}

function cambiarCicloDia(){

    if(dia <= 10){

        contenedor.style.backgroundColor = "#1E90FF"
        diaNombre = "dia"    
        dia = dia +1
    }
    else if(dia <= 20){
        contenedor.style.backgroundColor = "#DAA520"
        dia = dia +1
        diaNombre = "tarde"
    }
    else if(dia <= 30){ 
        contenedor.style.backgroundColor = "#1b1b1b"       
        dia = dia +1
        diaNombre = "noche"
        console.log(diaNombre)
    }
    else
    {
        dia = 1
    }

}

function cambiarEdificios(){

    var edificio1 = document.getElementById("edificio1")
    var decorador = document.querySelectorAll(".decorador")
    var astro = document.getElementById("astro")
    
    
    if(diaNombre == "dia"){
        edificio1.src = "assets/edificios.png"
        edificio2.src = "assets/edificios.png"

        astro.src = "assets/sol.png"

        decorador.forEach(dec =>{

            dec.src = "assets/nubes.png"

        })
    }
    else if(diaNombre == "noche"){
        edificio1.src = "assets/edificiosnoche.png"
        edificio2.src = "assets/edificiosnoche.png"

        astro.src = "assets/luna.png"

        decorador.forEach(dec =>{

            dec.src = "assets/estrellas.png"

        })

    }

}

function crearZombie(){

    if (respawn == 8){
        
        zombies = document.querySelectorAll('.zombie')

        if (zombies.length  <= 10){

            var zom  ='<div  class="zombie">'
            zom += '<img src="assets/zombie.png" alt="" / class="zmb">'
            zom += '<input type="text" name="vida" value=1>'
            zom +='</div>'
            contenedor.innerHTML += zom

        }

        respawn = 1
    }
    else if(respawn < 8){
        respawn += 1
        
    }

}

function moverZombies(){

    var zombies = document.querySelectorAll(".zombie")

        if (zombies.length  >= 0){
        
            zombies.forEach(zombie =>{

                var pocicion = parseInt(zombie.style.left) || 80

                zombie.style.left = (pocicion - 2 ) + "%"

                var zom = zombie.querySelectorAll(".zmb")

                setTimeout(function(){

                    zom.forEach(zm => {
                        zm.src = "assets/zombieCaminando.png"  
                    })

                },25)

                zom.forEach(zm => {
                    zm.src = "assets/zombie.png"
                })               

            })

        }


}

function recurrentes(){

    cambiarCicloDia()
    cambiarEdificios()
    crearZombie()
    moverZombies()
    ataqueZombie()
    moverBalas()
    ChoqueBalas()
    colicion(principal,plataforma)

}

var multi = document.getElementById("num3")
    multi.addEventListener("keydown",function(e){

        if(e.key == "Enter"){

            var num1 = document.getElementById("num1")
            var num2 = document.getElementById("num2")
            var num3 = document.getElementById("num3")
            var res =  parseInt(num1.value) * parseInt(num2.value) 
            if(res == parseInt(multi.value)){
                
                contededor = document.getElementById("contenedor")
                bala = "<img src='assets/bala.png' class='bala'>"
                contenedor.innerHTML += bala
                num3.value = ""
                generarMultiplicacion()
                num3.focus()

            }else{
                num3.value = ""
                generarMultiplicacion()
                num3.focus()

            }

        }
        

    })

    var audio = document.getElementById('musicaFondo');
    var audio2 = document.getElementById("vozZombies")
    var boton = document.getElementById('botonInvisible');
        
    // Añadir un evento al botón invisible para reproducir el audio cuando sea clicado
    boton.addEventListener('click', function() {
        audio.play();
        audio2.volume = 0.6; 
        audio2.play();
    
        generarMultiplicacion()
        setInterval(recurrentes,1000)

        boton.style.display = "None"
    
    });


