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
// function juego() 
// {
//   guardarNombres();
  
//   let gameover = false;
//   let pA, pB;
//   const jsonA = sessionStorage.getItem("pA");
//   const jsonB = sessionStorage.getItem("pB");

//   pA = JSON.parse(jsonA);
//   pB = JSON.parse(jsonB);

//   do
//   {
//     let guardarFicha, AWin = false, BWin = false;
//     //jugador A
//     alert(pA.nombre);
//     banderaTurno = 1;
//     do {      
//       pA.turno = prompt(`Tu jugada ${pA.nombre}`);
//       if(pA.turno === "esc") {
//         gameover = true;
//         break;
//       }     
//       pA.turno = parseInt(pA.turno); 
//       console.log(typeof pA.turno);
//       guardarFicha = ponerFicha(pA.turno - 1);    
//     }while(guardarFicha === false || pA.turno <= 0 || pA.turno > 7);
    
//     if(gameover) {
//       alert("juego cancelado");
//       break;
//     }
    
//     mostrarMatriz();
    
//     AWin = validarJugada(pA.turno);
//     if(AWin) {
//       gameover = true;
//       alert(`${pA.nombre} ha ganado`);

//     } else {
//      //jugador B
//     alert(`${pB.nombre}`);
//       banderaTurno = 2;
//     do {      
//       pB.turno = prompt(`Tu jugada ${pB.nombre}`);
//       if(pB.turno === "esc") {
//         gameover = true;
//         break;
//       }     
//       pB.turno = parseInt(pB.turno);      
//       guardarFicha = ponerFicha(pB.turno - 1); 
//     }while(guardarFicha === false || pB.turno <= 0 || pB.turno > 7 || isNaN(pB.turno));
    
//     if(gameover) {
//       alert("juego cancelado");
//       break;
//     }
    
//     mostrarMatriz();
    
//     BWin = validarJugada(pB.turno);
//     if(BWin) {
//       gameover = true;
//       alert(`${pB.nombre} ha ganado`);

//     }
//    }
//   } while(gameover === false);
// }

function ponerFicha(col) {
  let espacioEnCol = lugarEnCol(col);
  
  if(espacioEnCol != -1) {
    if(banderaTurno === 1) {
      matriz[espacioEnCol][col] = 1;  
    } else {
      matriz[espacioEnCol][col] = 2;
    }
    agregarFichaATablero(espacioEnCol + 1, col + 1);

    return true;
  } else {
    return false;
  }
}

function agregarFichaATablero(fila, col) {
  let ficha = document.getElementById(`${fila}${col}`);
  if(banderaTurno === 1) {
    ficha.classList.add("ficha--A");
  } else {
    ficha.classList.add("ficha--B");
  }
}
function lugarEnCol(col) {
  let cCol;
  col = parseInt(col);
  cCol = 0;
  
  for(let i = 0; i < 6; i++) {
    if(matriz[i][col] === 1 || matriz[i][col] === 2) {
      cCol++;
    }
  }
  if(cCol === 6) {
    return -1;
  } else {
    return cCol;
  }
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
  let fila = lugarEnCol(col);
  let id = [fila, col];
  let win = true, noWin = false;
  if(fila != -1) {
    if(fila >= 3) { //validacion jugada vertical
      if(matriz[id[0] - 1][1] != 0 
        && matriz[id[0] - 2][1] != 0 
        && matriz[id[0] - 3][1] != 0) 
      {          
        return win;
      }  
    } else { //validacion jugada horizontal
      
      let banderaD = 1, banderaI = 1, cJugada = 0, contadorD = 0, contadorI = 0;

      for(let i = 1; i <= 4; i++) {
        if(banderaD === 1) {
          if(matriz[fila][col + i] != 0) {
            console.log("D");
            contadorD++;  
            banderaD = 1;        
            cJugada++;
          } else {
            banderaD = 0;
          }
        }
        if(banderaI === 1) {
          if(matriz[fila][col - i] != 0) {
            contadorI++;
            banderaI = 1;
            cJugada++;
          } else {
            banderaI = 0;
          }  
        }
        
        if(banderaD === 0 && banderaI === 0) {
          cJugada = 0;
          break;
        }
      }

      if(cJugada >= 4) {
        return win;   
      }
    }
    
     
  }
  return noWin;
}

function reset() {
  resetTablero();
  contadorTurnos = 1;
}

function resetTablero() {
  let ficha;
  for (let i = 0; i < 7; i++) {       
    for (let j = 0; j < 6; j++) {
      // ficha = $(`#${j + 1}${i + 1}`);
      matriz[j][i] = 0; 
      $(`#${j + 1}${i + 1}`).removeClass("ficha--A");
      $(`#${j + 1}${i + 1}`).removeClass("ficha--B");    
    }
  }
}

function winVertical() {
  let win;
  for (let i = 0; i < 4; i++) {  
    matriz[i][2] = 1;
  }
  win = validarJugada(4);
  if(win) {
    gameover = true;
    alert("pA ha ganado");
    return gameover;
  }
}



function funcionalidadColumnas() 
{
  columnas.forEach(col => {
    col.addEventListener("click", function() {      
      let colId = col.id;
      colId = colId.split("");
      colId = parseInt(colId[colId.length - 1]);
     
      if(ponerFicha(colId - 1)) {
        if(banderaTurno === 1) {
          pA.turno = parseInt(colId);
          if(contadorTurnos >= 7) {
            if(validarJugada(pA.turno)) {
              hayGanador(pA.nombre);
            }
          }
        } else {
          pB.turno = parseInt(colId);
          if(contadorTurnos >= 7) {
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
  } else {
    console.log(pB.nombre);
    $("#indicador-turno").text(pB.nombre);
  }
}
function mensaje(str, color) {
  let msj = document.getElementById('msj');

  msj.innerHTML = str;
}

function hayGanador(jugador) {
  $("#modal-ganador").addClass("mostrar");
  $("#modal-ganador__msj").text = `${jugador}, ganaste!`;
  $("#modal-ganador__btn").click(function() {
    $("#modal-ganador").removeClass("mostrar");
    reset();
  });
}

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
  const pA = {nombre:"", puntos: 0, turno: 0};
  const pB = {nombre:"", puntos: 0, turno: 0};
  
  pA.nombre = prompt("Nombre player A");
  pB.nombre = prompt("Nombre player B");

  const jsonA = JSON.stringify(pA);
  const jsonB = JSON.stringify(pB);

  sessionStorage.setItem("pA", jsonA);
  sessionStorage.setItem("pB", jsonB);
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