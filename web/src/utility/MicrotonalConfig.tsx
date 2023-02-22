import {Scale} from "./microtonal/Scale";
import {generateEqualTemperedScale} from "./microtonal/ScaleGeneration";
import OscillatorSettings from "./audio/OscillatorSettings";

export interface MicrotonalConfig {
    keyMapping?: Record<string, number>; // Map Keyboard keys to scale degrees, ex. "a": 0
    scaleConfig?: ScaleConfig;
    synthConfig?: SynthConfig;
}

export interface SynthConfig {
    gain?: number
    pitchBend?: number

    attack?: number
    decay?: number
    sustain?: number
    release?: number

    oscillators?: Array<OscillatorSettings>
}

export interface ScaleConfig {
    keysPerOctave?: number; // How many piano keys are mapped per octave, 12 by default
    tuningFrequency?: number; // Anchor frequency of scale
    rootKey?: number; // Which MIDI key maps to the tuningFrequency. In normal 12-tone equal-temperament
    // western music, this is A4 == 440Hz. A4 is MIDI key 69.
    scale?: Scale // The configuration for the scale
}

export const DEFAULT_SYNTH_CONFIG: SynthConfig = {
    gain: 0.5,
    pitchBend: 0,

    attack: 1,
    decay: 1,
    sustain: 1,
    release: 1,

    oscillators: [
        new OscillatorSettings(1, 1, "sine"),
        new OscillatorSettings(2, 1, "sine"),
        new OscillatorSettings(3, 1, "sine"),
        new OscillatorSettings(4, 1, "sine"),
        new OscillatorSettings(5, 1, "sine"),
        new OscillatorSettings(6, 1, "sine"),
        new OscillatorSettings(7, 1, "sine"),
        ]
}

export const DEFAULT_SCALE_CONFIG: ScaleConfig = {
    keysPerOctave: 12,
    tuningFrequency: 440,
    rootKey: 69,
    scale: generateEqualTemperedScale(12)
}

export const DEFAULT_MICROTONAL_CONFIG: MicrotonalConfig = {
    keyMapping: {},
    scaleConfig: DEFAULT_SCALE_CONFIG,
    synthConfig: DEFAULT_SYNTH_CONFIG
}

const createMicrotonalConfig = (
    microtonalConfig?: MicrotonalConfig,
    synthConfig?: MicrotonalConfig,
    scaleConfig?: ScaleConfig
) => {
    let newScaleConfig = {...DEFAULT_SCALE_CONFIG, ...scaleConfig} as ScaleConfig;
    let newSynthConfig = {...DEFAULT_SYNTH_CONFIG, ...synthConfig} as SynthConfig;
    return {
        ...DEFAULT_MICROTONAL_CONFIG,
        scaleConfig: newScaleConfig,
        synthConfig: newSynthConfig,
        ...microtonalConfig
    } as MicrotonalConfig;
}

export {createMicrotonalConfig};
