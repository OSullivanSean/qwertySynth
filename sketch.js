var attackLevel = 0.5;
var releaseLevel = 0;

var env, osc1;

var s_attackTime, s_decayTime, s_susPercent, s_releaseTime;


function setup() {
    
    setupUI();
    
    var cnv = createCanvas(1000, 1000);

    env = new p5.Env();
    env.setRange(attackLevel, releaseLevel);
    
    osc1 = new p5.Oscillator('triangle');
    osc1.amp(env);
    osc1.start();
    osc1.freq(220);
}

function playEnv(){
    osc1.amp(0);
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

function setNote(noteValue){
    osc1.freq(noteValue);
}

function setupUI(){
    
    s_attackTime = createSlider(0.04, 1, 0.5, 0.01);
    s_attackTime.position(10, 10);
    s_attackTime.style('width', '80px');    
    
    s_decayTime = createSlider(0, 1, 0.5, 0.01);
    s_decayTime.position(10, 40);
    s_decayTime.style('width', '80px');
    
    s_susPercent = createSlider(0, 1, 0.5, 0.1);
    s_susPercent.position(10, 70);
    s_susPercent.style('width', '80px');
    
    s_releaseTime = createSlider(0, 1, 0.5, 0.01);
    s_releaseTime.position(10, 100);
    s_releaseTime.style('width', '80px');
    
}

function draw(){
    env.setADSR(s_attackTime.value(), s_decayTime.value(), s_susPercent.value(), s_releaseTime.value());
    drawText();
}

function drawText(){
    text("Attack", 110, 20);
    text("Decay", 110, 50);
    text("Sustain", 110, 80);
    text("Release", 110, 110);
}