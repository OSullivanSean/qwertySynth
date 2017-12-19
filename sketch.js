var attackLevel = 0.5;
var releaseLevel = 0;

var env, osc1, osc2, filter, currentBaseNote_osc1, currentBaseNote_osc2;

var s_attackTime, s_decayTime, s_susPercent, s_releaseTime, s_filterFreq, s_filterRes, s_osc1_tune, s_osc2_tune, s_pitchEnv_amt;


function setup(){
    
    frameRate(1000);
    
    setupUI();
    
    setupEnv();
    
    setupFilter();
    
    setupOsc1();
    
    setupOsc2();
}

function draw(){
    setPitchEnv();
    setEnv();
    setFilter();
    drawText();
}

function setupEnv(){
    env = new p5.Env();
    env.setRange(attackLevel, releaseLevel);
}

function setupFilter(){
    filter = new p5.LowPass();
}

function setupOsc1(){
    osc1 = new p5.Oscillator('triangle');
    osc1.amp(env);
    osc1.start();
    osc1.freq(0);
    osc1.disconnect();
    osc1.connect(filter);
}

function setupOsc2(){
    osc2 = new p5.Oscillator('triangle');
    osc2.amp(env);
    osc2.start();
    osc2.freq(0);
    osc2.disconnect();
    osc2.connect(filter);
}


function playEnv(){
    osc1.amp(0);
    osc2.amp(0);
    env.play();
}

function keyPressed(){
    switch(keyCode){    
        //NOTES
        case 90: // z
            setNote(261.6)// middle C  
            playEnv();
            break;
        case 83: // s
            setNote(277.2); // C# / Db 
            playEnv();
            break;
        case 88: // x
            setNote(293.7); // D
            playEnv();
            break;
        case 68: // d
            setNote(311.1); // D# / Eb
            playEnv();
            break;
        case 67: // c
            setNote(329.6); // E
            playEnv();
            break;
        case 86: // v
            setNote(349.2); // F
            playEnv();
            break;
        case 71: // g
            setNote(370.0); // F# / Gb
            playEnv();
            break;
        case 66: // b
            setNote(392.0); // G
            playEnv();
            break;
        case 72: // h
            setNote(415.3); // G# / Ab
            playEnv();
            break;
        case 78: // n
            setNote(440.0); // A
            playEnv();
            break;
        case 74: // j
            setNote(466.2); // A# / Bb
            playEnv();
            break;
        case 77: // mxc
            setNote(493.9); // B
            playEnv();
            break;
        case 188: // comma
            setNote(523.3); // C
            playEnv();
            break;
            
            //WAVEFORM
        case 96: // numpad_1
            osc1.setType('sine');
            break;
        case 97: // numpad_1
            osc1.setType('triangle');
            break;
        case 98: // numpad_2
            osc1.setType('sawtooth');
            break;
        case 99: // numpad_3
            osc1.setType('square');
            break;
    }
}

function setupUI(){
    
    var cnv = createCanvas(200, 280);
    background(51);
    
    s_attackTime = createSlider(0.04, 1, 0.06, 0.01);
    s_attackTime.position(10, 10);
    s_attackTime.style('width', '80px');    
    
    s_decayTime = createSlider(0, 1, 0.1, 0.01);
    s_decayTime.position(10, 40);
    s_decayTime.style('width', '80px');
    
    s_susPercent = createSlider(0, 1, 0.5, 0.1);
    s_susPercent.position(10, 70);
    s_susPercent.style('width', '80px');
    
    s_releaseTime = createSlider(0, 1, 0.5, 0.01);
    s_releaseTime.position(10, 100);
    s_releaseTime.style('width', '80px');
    
    s_osc1_tune = createSlider(0.1, 2, 1, 0.1);
    s_osc1_tune.position(10, 130);
    s_osc1_tune.style('width', '80px');
    
    s_osc2_tune = createSlider(-5, 3, 0, 0.1);
    s_osc2_tune.position(10, 160);
    s_osc2_tune.style('width', '80px');
    
    s_filterFreq = createSlider(0, 100, 100, 0.0001);
    s_filterFreq.position(10, 190);
    s_filterFreq.style('width', '80px');
    
    s_filterRes = createSlider(0, 30, 0, 1);
    s_filterRes.position(10, 220);
    s_filterRes.style('width', '80px');
    
    s_pitchEnv_amt = createSlider(-10, 0, 10, 0.1);
    s_pitchEnv_amt.position(10, 250);
    s_pitchEnv_amt.style('width', '80px');
    
}

function setPitchEnv(){
    if(currentBaseNote_osc1 > 0){
        osc1.freq(currentBaseNote_osc1);
    }
    if(currentBaseNote_osc2 > 0){
        osc2.freq(currentBaseNote_osc2);
    }
    currentBaseNote_osc1 += s_pitchEnv_amt.value();    
    currentBaseNote_osc2 += s_pitchEnv_amt.value();
}

function setEnv(){
    env.setADSR(s_attackTime.value(), s_decayTime.value(), s_susPercent.value(), s_releaseTime.value());
}

function setFilter(){
    filter.freq(s_filterFreq.value()*s_filterFreq.value());
    filter.res(s_filterRes.value());
}

function setNote(noteValue){
    if(s_osc1_tune != 0){
        noteValue = noteValue * s_osc1_tune.value();
    }
    currentBaseNote_osc1 = noteValue;
    osc1.freq(noteValue);
    if(s_osc2_tune != 0){
        if(s_osc2_tune.value() > 0){
            osc2.freq(noteValue * s_osc2_tune.value());
            currentBaseNote_osc2 = noteValue * s_osc2_tune.value();
        } else if(s_osc2_tune.value() < 0){
            osc2.freq(noteValue / s_osc2_tune.value());
            currentBaseNote_osc2 = noteValue / s_osc2_tune.value();
        } 
    } else {
        osc2.amp(0);
    }
}

function drawText(){
    text("Attack", 110, 20);
    text("Decay", 110, 50);
    text("Sustain", 110, 80);
    text("Release", 110, 110);
    text("Osc1 Tune", 110, 140);
    text("Osc2 Tune", 110, 170);
    text("Filter Freq", 110, 200);
    text("Filter Res", 110, 230);
    text("Pitch Env", 110, 260);
}