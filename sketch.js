
let semeCasuale;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // millis garantisce una composizione nuova ad ogni caricamento
  semeCasuale = millis();
}

function draw() {
  background(15, 18, 30); // Sfondo scuro profondo
  angleMode(DEGREES);
  noStroke();

  let numeroglifi = 64; // Griglia 8x8
  let colonne = ceil(sqrt(numeroglifi));
  let righe = sqrt(numeroglifi);
  let discolonna = windowWidth / colonne;
  let disriga = windowHeight / righe;
  
  let xcorrente = 0;
  let ycorrente = 0;

  // Fissiamo il generatore casuale, questo stabilisce le scelte casuali (colori, punte, dimensioni) 
  randomSeed(semeCasuale);

  for (let g = 0; g < numeroglifi; g++) {
    let dimensioneMassimaCella = min(discolonna, disriga);
    let xCentro = xcorrente + discolonna / 2;
    let yCentro = ycorrente + disriga / 2;
    let sizeGlifo = dimensioneMassimaCella * 0.50;

    // Disegniamo il glifo
    glifo(xCentro, yCentro, sizeGlifo);
    
    xcorrente = xcorrente + discolonna;

    if (xcorrente >= windowWidth) {
      xcorrente = 0;
      ycorrente = ycorrente + disriga;
    }
  }
}


// GLIFO

function glifo(_x, _y, _size) {
  push();
  translate(_x, _y);

  // 1. STELLE GRANDI SFONDO 
  let sceltaPunteG = floor(random(3));
  let punteGrande = 6;
  if (sceltaPunteG === 0) {
    punteGrande = 6;
  } else if (sceltaPunteG === 1) {
    punteGrande = 7;
  } else {
    punteGrande = 8;
  }
let sceltaDimG = floor(random(3));
  let rEsternoG = _size * 0.70; 
  if (sceltaDimG === 0) {
    rEsternoG = _size * 0.50;
  } else if (sceltaDimG === 1) {
    rEsternoG = _size * 0.70;
  } else {
    rEsternoG = _size * 0.90;
  }
  let rInternoG = rEsternoG * 0.45;

  let sceltaColoreG = floor(random(3));
  if (sceltaColoreG === 0) {
    fill(255, 45, 85);   // Rosso 
  } else if (sceltaColoreG === 1) {
    fill(255, 130, 0);   // Arancione 
  } else {
    fill(255, 221, 0);   // Giallo 
  }

  // Rotazione lenta e uniforme in senso antiorario (-)
  let rotazioneInizialeG = random(360);
  push();
  rotate(rotazioneInizialeG - (frameCount * 0.3)); 
  disegnaStella(punteGrande, rEsternoG, rInternoG);
  pop();


  // 2. STELLE PICCOLE centrali
  let sceltaPunteP = floor(random(3));
  let puntePiccola = 4;
  if (sceltaPunteP === 0) {
    puntePiccola = 3;
  } else if (sceltaPunteP === 1) {
    puntePiccola = 4;
  } else {
    puntePiccola = 5;
  }

  let sceltaDimP = floor(random(3));
  let rEsternoP = _size * 0.30;
  if (sceltaDimP === 0) {
    rEsternoP = _size * 0.40;
  } else if (sceltaDimP === 1) {
    rEsternoP = _size * 0.30;
  } else {
    rEsternoP = _size * 0.20;
  }
  let rInternoP = rEsternoP * 0.4;

  let sceltaColoreP = floor(random(3));
  if (sceltaColoreP === 0) {
    fill(0, 230, 118);   // Verde
  } else if (sceltaColoreP === 1) {
    fill(41, 121, 255);  // Blu 
  } else {
    fill(0, 229, 255);   // Azzurro 
  }

  // Rotazione  rotazione lenta e uniforme in senso orario (+)
  let rotazioneInizialeP = random(360);
  push();
  rotate(rotazioneInizialeP + (frameCount * 0.2));
  disegnaStella(puntePiccola, rEsternoP, rInternoP);
  pop();

  pop();
}


// 3. FUNZIONE PERSONALIZZATA AUSILIARIA
function disegnaStella(_punte, _rEst, _rInt) {
  let pasAngolo = 360 / _punte;
  for (let i = 0; i < _punte; i++) {
    push();
    rotate(i * pasAngolo);
    triangle(0, 0, 0, -_rEst, _rInt * sin(pasAngolo / 2), -_rInt * cos(pasAngolo / 2));
    triangle(0, 0, 0, -_rEst, -_rInt * sin(pasAngolo / 2), -_rInt * cos(pasAngolo / 2));
    pop();
  }
}
