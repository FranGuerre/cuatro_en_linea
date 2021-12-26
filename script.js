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
  let fila = fi + 1;
  let columna = col + 1;
  let ficha = document.getElementById(`${fila}${columna}`);
  console.log(`agregarFichaATablero = fila ${fila}, col ${columna}`);
  if(banderaTurno === 1) {
    ficha.classList.add("ficha--A");
  } else {
    ficha.classList.add("ficha--B");
  }
}
function lugarEnCol(col) { // devuelve el último lugar ocupado de la columna
  let cCol = 0;
  columna = parseInt(col);
  
  for(let i = 0; i < 6; i++) {
    if(matriz[i][columna] != 0) {
      cCol++;      
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
  let columna = col - 1;
  let fila = lugarEnCol(columna) - 1;
  let id = [fila, columna];
  console.log(`validarJugada = fila ${fila}, col ${columna},`);
  let win = true, noWin = false;

  if(fila != -1) {  
    //validacion jugada horizontal
    console.log("VALIDACIÓN JUGADA HORIZONTAL");  
    let banderaD = 1, banderaI = 1, cJugada = 0, contadorD = 1, contadorI = 1;

    for(let i = 0; i < 5; i++) {
      if(banderaD === 1) {//valida lado derecho
        if(matriz[fila][columna + contadorD] === banderaTurno) {            
          console.log(`DERECHA: fila${fila}col${columna + contadorD} = ${matriz[fila][columna + contadorD]}`); 
          contadorD++;  
          banderaD = 1;        
          cJugada++;
        } else {
          console.log(`DERECHA: fila${fila}col${columna + contadorD} = ${matriz[fila][columna + contadorD]}`); 
          banderaD = 0;
        }
      }
      if(banderaI === 1) {//valida lado izquierdo
        if(matriz[fila][columna - contadorI] === banderaTurno) {
          console.log(`IZQUIERDA: fila${fila}col${columna - contadorI} = ${matriz[fila][columna - contadorI]}`); 
          contadorI++;
          banderaI = 1;
          cJugada++;
        } else {
          console.log(`IZQUIERDA: fila${fila}col${columna - contadorI} = ${matriz[fila][columna - contadorI]}`);
          banderaI = 0;
        }  
      }
      
      if(banderaD === 0 && banderaI === 0) {
        break;
      }
    }
    if(cJugada >= 3) {
      return win;
    }
    //fin validacion jugada horizontal 

    //validacion jugada vertical
    if(fila >= 3) { 
      console.log("VALIDACIÓN JUGADA VERTICAL");
      if(matriz[fila - 1][columna] === banderaTurno 
        && matriz[fila - 2][columna] === banderaTurno 
        && matriz[fila - 3][columna] === banderaTurno) 
      {
        console.log(`fila${fila}col${columna} = ${matriz[id[0]][columna]}`);          
        console.log(`fila${fila - 1}col${columna} = ${matriz[id[0] - 1][columna]}`);
        console.log(`fila${fila - 2}col${columna} = ${matriz[id[0] - 2][columna]}`);
        console.log(`fila${fila - 3}col${columna} = ${matriz[id[0] - 3][columna]}`);        
        return win;
      }  
    }
    //fin validacion jugada vertical 
    //validacion jugada diagonal
    console.log("VALIDACIÓN JUGADA DIAGONAL /");
    if(contadorTurnos > 9) {      
      let banderaD = 1, banderaI = 1, banderaDB = 1, banderaIB = 1, cJugada = 0;
      let contadorDA = 1, contadorIA = 1, contadorDB = 1, contadorIB = 1;
  
      for(let i = 0; i < 5; i++) {
        if(banderaD === 1) {//valida lado derecho a /
          if(matriz[fila + contadorDA][columna + contadorDA] === banderaTurno) {            
            console.log(`DERECHA_A: fila${fila}col${columna + contadorD} = ${matriz[fila][columna + contadorD]}`); 
            contadorDA++;  
            banderaD = 1;        
            cJugada++;
          } else {
            console.log(`DERECHA_A: fila${fila}col${columna + contadorDA} = ${matriz[fila][columna + contadorDA]}`); 
            banderaD = 0;
          }
        }
        if(banderaI === 1) {//valida lado izquierdo a /
          if(matriz[fila - contadorIA][columna - contadorIA] === banderaTurno) {
            console.log(`IZQUIERDA_A: fila${fila}col${columna - contadorIA} = ${matriz[fila][columna - contadorIA]}`); 
            contadorIA++;
            banderaI = 1;
            cJugada++;
          } else {
            console.log(`IZQUIERDA_A: fila${fila}col${columna - contadorIA} = ${matriz[fila][columna - contadorIA]}`);
            banderaI = 0;
          }  
        }             
        if(banderaD === 0 && banderaI === 0) {
          break;
        }
      }
      if(cJugada >= 3) {
        return win;
      }
      // if(banderaD === 1) {//valida lado derecho b \
        //   if(matriz[fila][columna + contadorDB] === banderaTurno) {            
        //     console.log(`DERECHA: fila${fila}col${columna + contadorDA} = ${matriz[fila][columna + contadorDA]}`); 
        //     contadorD++;  
        //     banderaD = 1;        
        //     cJugada++;
        //   } else {
        //     console.log(`DERECHA: fila${fila}col${columna + contadorDA} = ${matriz[fila][columna + contadorDA]}`); 
        //     banderaD = 0;
        //   }
        // }
        // if(banderaI === 1) {//valida lado izquierdo b \
        //   if(matriz[fila][columna - contadorIB] === banderaTurno) {
        //     console.log(`IZQUIERDA: fila${fila}col${columna - contadorI} = ${matriz[fila][columna - contadorI]}`); 
        //     contadorI++;
        //     banderaI = 1;
        //     cJugada++;
        //   } else {
        //     console.log(`IZQUIERDA: fila${fila}col${columna - contadorI} = ${matriz[fila][columna - contadorI]}`);
        //     banderaI = 0;
        //   }  
        // }  
    }
    //fin validacion jugada diagonal
    
  }
  return noWin;
}

function reset() {
  resetTablero();
  indicadorTurno("");
  contadorTurnos = 0;
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

function resetJugadores() {

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

//modulo

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

//fin modulo