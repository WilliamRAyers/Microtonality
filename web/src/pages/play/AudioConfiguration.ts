import { MicrotonalScale } from "../../utility/microtonal/MicrotonalScale"

export class AudioConfiguration {

    audioContext: AudioContext;
    masterGain: GainNode;

    currentScale: MicrotonalScale
    selectedNotes: Array<number>

    currentOctave: number;
    maxOctave: number = 8;
    minOctave: number = 0;

    pitchBend: number
    pitchBendRange: number

    volume: number

    constructor() {
        this.currentScale = new MicrotonalScale();
        this.currentOctave = 4;
        this.volume = 0.05;
    }

    OctaveUp(): number {
        if (this.currentOctave < this.maxOctave)
            this.currentOctave++;
        
        return this.currentOctave;
    }

    OctaveDown(): number {
        if (this.currentOctave > this.minOctave)
            this.currentOctave--;

        return this.currentOctave;
    }

    InitializeContextAndNodes(): void {

        this.audioContext = new (window.AudioContext)();

        // TODO: Connect other nodes for effects.
        this.masterGain = new GainNode(this.audioContext);
        this.masterGain.gain.setValueAtTime(this.volume, 0);
        this.masterGain.connect(this.audioContext.destination);
    }

    Connect(oscillator: OscillatorNode): void {

        // TODO: Once we add other nodes, do we 
        // still want to connect oscillators
        // to this one?
        oscillator.connect(this.masterGain);
    }

    UpdateVolume = (volume: number) => {

        if (volume < 0 || volume > 1)
            return;

        this.volume = volume

        this.masterGain.gain.setValueAtTime(this.volume, 0);
    }

    //TODO: Synthesizer integration
}
