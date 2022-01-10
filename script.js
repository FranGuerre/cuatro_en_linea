let matriz = crearMatriz(6, 7, 0);
let columnas = document.querySelectorAll(".columna");
let banderaTurno = 1, contadorTurnos = 1, gameover = false;
let pA, pB;
//crea tablero y jugadores
$(document).ready(function() {
  crearTablero();  
});



//fin crea tablero

function juego() 
{
  console.log(matriz);
  banderaTurno = 1, contadorTurnos = 1;
  gameover = false;
  guardarNombres();
  const jsonA = sessionStorage.getItem("pA");
  const jsonB = sessionStorage.getItem("pB");
  pA = JSON.parse(jsonA);
  pB = JSON.parse(jsonB);
  indicadorTurno(banderaTurno);
  funcionalidadColumnas();
}

function ponerFicha(col) { // guarda ficha en la matriz
  let columna = col - 1; // ponerFicha se ocupa de la conversión
  let espacioEnCol = lugarEnCol(columna);
  console.log(`ponerFicha = fila ${espacioEnCol}, col ${columna}`)
  if(espacioEnCol != 6) { //la fila 6 es fuera del tablero y por ende invalida
    if(banderaTurno === 1) {
      matriz[espacioEnCol][columna] = 1;  
    } else {
      matriz[espacioEnCol][columna] = 2;
    }
    console.log(matriz);
    agregarFichaATablero(espacioEnCol, columna);

    return true;
  } else {
    return false;
  }
}

function agregarFichaATablero(fi, col) {
  let filaConv = fi + 1;
  let columnaConv = col + 1;
  let ficha = document.getElementById(`${filaConv}${columnaConv}`);
  console.log(`agregarFichaATablero = fila ${filaConv}, col ${columnaConv}`);
  if(banderaTurno === 1) {
    ficha.classList.add("ficha--A");
  } else {
    ficha.classList.add("ficha--B");
  }
}
function lugarEnCol(col) { // devuelve el último lugar ocupado de la columna
  let cCol = 0;
  let columna = parseInt(col);
  
  for(let i = 0; i < 6; i++) {
    if(matriz[i][columna] != 0) {
      cCol++;      
    } else {
      break;
    }
  }
  console.log(`lugarEnCol = fila ${cCol}, col ${columna}`);
  return cCol;
} 

function mostrarMatriz() {
  let matrizStr = "";
  for(let i = 5; i >= 0; i--) {
    matrizStr += matriz[i];
    matrizStr += "\n";
  }  
  alert(matrizStr);
}

function validarJugada(col) {
  let fila = lugarEnCol(col - 1);
  let gana = true, noGana = false;

  console.log(`validarJugada = fila ${fila}, col ${col},`);

  if(fila != -1) {  
    if(Validaciones.ValidacionHorizontal(fila, col) || Validaciones.ValidacionVertical(fila, col) || Validaciones.ValidacionDiagonalA(fila, col) || Validaciones.ValidacionDiagonalB(fila, col)) {
      return gana;
    }   
  }
  return noGana;
}

function reset() {
  sessionStorage.clear();
  resetTablero();
  indicadorTurno("");
  contadorTurnos = 1, banderaTurno = 1, gameover = false;
}

function resetTablero() {
  for (let i = 0; i < 7; i++) {       
    for (let j = 0; j < 6; j++) {
      matriz[j][i] = 0; 
      $(`#${j + 1}${i + 1}`).removeClass("ficha--A");
      $(`#${j + 1}${i + 1}`).removeClass("ficha--B");    
    }
  }
  console.log(matriz);
}

function funcionalidadColumnas() 
{
  columnas.forEach(col => {
    col.addEventListener("click", function() {      
      let colId = col.id;
      colId = colId.split("");
      colId = parseInt(colId[colId.length - 1]);
      console.log(`col click id: ${colId}`);
     
      if(ponerFicha(colId)) {
        if(banderaTurno === 1) {
          pA.turno = parseInt(colId);
          if(contadorTurnos >= 6) { //empieza a validarJugada una vez que se superaron seis turnos
            if(validarJugada(pA.turno)) {
              hayGanador(pA.nombre);
            }
          }
        } else {
          pB.turno = parseInt(colId);
          if(contadorTurnos >= 6) {
            if(validarJugada(pB.turno)) {
              hayGanador(pB.nombre);
            }
          }
        }
        cambiarTurno();
        indicadorTurno(banderaTurno);
        contadorTurnos++;
      }     
    });
  });
}

function cambiarTurno() {
  if(banderaTurno === 1) {
    banderaTurno = 2;
  } else {
    banderaTurno = 1;
  }
}

function indicadorTurno(turno) {
  if(turno === 1) {
    console.log(pA.nombre);
    $("#indicador-turno").text(pA.nombre);
  } else if(turno === 2) {
    console.log(pB.nombre);
    $("#indicador-turno").text(pB.nombre);
  } else {
    $("#indicador-turno").text("");
  }
}
function mensaje(str, color) {
  let msj = document.getElementById('msj');

  msj.innerHTML = str;
}


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


//tablero y matriz
function crearMatriz(rows, cols, valorDefault) {
  let arr = [];

  for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
          arr[i][j] = valorDefault;
      }
  }
  
  return arr;
}

function crearTablero() {
  let ficha;
  for(let i = 7; i > 0; i--) {
    for(let j = 6; j > 0; j--) {
      ficha = document.createElement("DIV");
      ficha.setAttribute("id", `${j}${i}`);
      ficha.setAttribute("class", "ficha");

      $(`#col-${i}`).append(ficha);
    } 
  }
}
//fin tablero y matriz

//almacenamiento

function guardarNombres() {
  if(sessionStorage.getItem("pA") === null) {
    const pA = {nombre:"", puntos: 0, turno: 0};
    const pB = {nombre:"", puntos: 0, turno: 0};
    
    pA.nombre = prompt("Nombre player A");
    pB.nombre = prompt("Nombre player B");
  
    const jsonA = JSON.stringify(pA);
    const jsonB = JSON.stringify(pB);
  
    sessionStorage.setItem("pA", jsonA);
    sessionStorage.setItem("pB", jsonB);
  }
}

//fin almacenamiento

//botones
$("#btn").click(function() {
  juego();
});

$("#btn-reset").click(function() {
  reset();
  alert("reset");
});

//fin botones

//modulos

function hayGanador(jugador) {
  console.log(`${jugador}, ganaste!`);
  $(".modal-ganador").addClass("mostrar");
  $(".modal-ganador__msj").text(`${jugador}, ganaste!`);
  $(".modal-ganador__btn").click(function() {
    $(".modal-ganador").removeClass("mostrar");
    $(".modal-ganador").addClass("ocultar");
    reset();
  });
}

//fin modulos

let fueraTablero = {
  DiagonalA: function(fila, col, contadorI, contadorD, direccion) {
    if(direccion === 1) { //suma o resta en base a si valida izquierda o derecha -1 o 1
      return fila - contadorD < 1 || col + contadorD > 7;
      
    } else {
      return fila + contadorI > 6 || col - contadorI < 1;
    }
  },

  DiagonalB: function(fila, col, contadorI, contadorD, direccion) {
    if(direccion === 1) { //suma o resta en base a si valida izquierda o derecha -1 o 1
      return fila + contadorD > 6 || col + contadorD > 7;
    } else {
      return fila - contadorI < 1 || col - contadorI < 1;
    }
  }
}


let Validaciones = {

  ValidacionHorizontal: function(fila, col) {
    console.log("VALIDACIÓN JUGADA HORIZONTAL");  
    let banderaD = 1, banderaI = 1, cJugada = 0, contadorD = 1, contadorI = 1;
    let filaConv = fila - 1, colConv = col - 1;
    let gana = true, noGana = false;

    for(let i = 0; i < 5; i++) {
      if(banderaD === 1) {//valida lado derecho
        if(matriz[filaConv][colConv + contadorD] === banderaTurno) {            
          console.log(`DERECHA: fila${fila}col${col + contadorD} = ${matriz[filaConv][colConv + contadorD]}`); 
          contadorD++;  
          banderaD = 1;        
          cJugada++;
        } else {
          banderaD = 0;
        }
      }
      if(banderaI === 1) {//valida lado izquierdo
        if(matriz[filaConv][colConv - contadorI] === banderaTurno) {         
          contadorI++;
          banderaI = 1;
          cJugada++;
        } else {        
          banderaI = 0;
        }  
      }
      
      if(banderaD === 0 && banderaI === 0) {
        break;
      }
    }
    if(cJugada >= 3) {
      return gana;
    }
    //fin validacion jugada horizontal 
    return noGana;
  },

  ValidacionVertical: function(fila, col) {
    let filaConv = fila - 1, colConv = col - 1;
    let gana = true, noGana = false;

    if(fila >= 3) { 
      console.log("VALIDACIÓN JUGADA VERTICAL");
      if(matriz[filaConv - 1][colConv] === banderaTurno 
        && matriz[filaConv - 2][colConv] === banderaTurno 
        && matriz[filaConv - 3][colConv] === banderaTurno) 
      {      
        return gana;
      }  
    }
    return noGana;
  },

  ValidacionDiagonalA: function(fila, col) {

    let gana = true, noGana = false; 
    console.log("VALIDACIÓN JUGADA DIAGONAL \\");
    if(contadorTurnos > 9) {     
      let filaConv = fila - 1, colConv = col - 1;      
      let banderaD = 1, banderaI = 1, cJugada = 0;
      let contadorD = 1, contadorI = 1;
  
      for(let i = 0; i < 5; i++) {
        if(banderaD === 1) {//valida lado derecho de \
          direccion = 1;
          if(!fueraTablero.DiagonalA(fila, col, contadorI, contadorD, direccion) && matriz[filaConv - contadorD][colConv + contadorD] === banderaTurno) {                         
            contadorD++;  
            banderaD = 1;        
            cJugada++;
          } else {            
            banderaD = 0;
          }
          if(!fueraTablero.DiagonalA(fila, col, contadorI, contadorD, direccion)) {
            console.log(`DERECHA_A: fila
            ${fila + contadorD}col${col + contadorD} = ${matriz[filaConv - contadorD][colConv + contadorD]}`);
          }          
        }
        if(banderaI === 1) {//valida lado izquierdo de \
          direccion = -1;
          if(!fueraTablero.DiagonalA(fila, col, contadorI, contadorD, direccion) && matriz[filaConv + contadorI][colConv - contadorI] === banderaTurno) {
            contadorI++;
            banderaI = 1;
            cJugada++;
          } else {            
            banderaI = 0;
          }
          if(!fueraTablero.DiagonalA(fila, col, contadorI, contadorD, direccion)) {
            console.log(`IZQUIERDA_A: fila${fila - contadorI}col${col - contadorI} = ${matriz[filaConv + contadorI][colConv - contadorI]}`);
          }
        }             
        if(banderaD === 0 && banderaI === 0) {
          break;
        }
        console.log("cJugada: " + cJugada);
        if(cJugada >= 3) {
          return gana;
        }
      }
    }
    return noGana;
  },

  ValidacionDiagonalB: function(fila, col) {

    let gana = true, noGana = false; 
    console.log("VALIDACIÓN JUGADA DIAGONAL /");
    if(contadorTurnos > 9) {     
      let filaConv = fila - 1, colConv = col - 1;
      let banderaD = 1, banderaI = 1, cJugada = 0;
      let contadorD = 1, contadorI = 1;
  
      for(let i = 0; i < 5; i++) {
        if(banderaD === 1) {//valida lado derecho a /
          direccion = 1;
          if(!fueraTablero.DiagonalB(fila, col, contadorI, contadorD, direccion) && matriz[filaConv + contadorD][colConv + contadorD] === banderaTurno) {                         
            contadorD++;  
            banderaD = 1;        
            cJugada++;
          } else {            
            banderaD = 0;
          }
          if(!fueraTablero.DiagonalB(fila, col, contadorI, contadorD, direccion)) {
            console.log(`DERECHA_A: fila
            ${fila + contadorD}col${col + contadorD} = ${matriz[filaConv + contadorD][colConv + contadorD]}`);
          }          
        }
        if(banderaI === 1) {//valida lado izquierdo a /
          direccion = -1;
          if(!!fueraTablero.DiagonalB(fila, col, contadorI, contadorD, direccion) && matriz[filaConv - contadorI][colConv - contadorI] === banderaTurno) {
            contadorI++;
            banderaI = 1;
            cJugada++;
          } else {            
            banderaI = 0;
          }
          if(!fueraTablero.DiagonalB(fila, col, contadorI, contadorD, direccion)) {
            console.log(`IZQUIERDA_A: fila${fila - contadorI}col${col - contadorI} = ${matriz[filaConv - contadorI][colConv - contadorI]}`);
          }
        }             
        if(banderaD === 0 && banderaI === 0) {
          break;
        }
        console.log("cJugada: " + cJugada);
        if(cJugada >= 3) {
          return gana;
        }
      }
    }
    return noGana;
  }
}