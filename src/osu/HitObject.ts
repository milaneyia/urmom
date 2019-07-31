import { SampleSet, HitSoundAdditionFlag } from './enums';

export default class HitObject {
    public x: number = 0;
    public y: number = 0;
    public startTime: number = 0;
    public hitObjectFlag: HitObjectFlag = 0;
    public hitSoundAdditionFlag: HitSoundAdditionFlag = 0;
    public hitObject: any = null;
    public extras: Extras = { additionSampleSet: 0, customSampleSet: 0, sampleSet: 0, volume: 0, samplePath: '' };

    public isCircle() {
        return (this.hitObjectFlag & HitObjectFlag.Circle) === HitObjectFlag.Circle;
    }

    public isSlider() {
        return (this.hitObjectFlag & HitObjectFlag.Slider) === HitObjectFlag.Slider;
    }

    public  isSpinner() {
        return (this.hitObjectFlag & HitObjectFlag.Spinner) === HitObjectFlag.Spinner;
    }

    public parseExtras(extras: string[]) {
        this.extras = {
            sampleSet: parseFloat(extras[0]),
            additionSampleSet: parseFloat(extras[1]),
            customSampleSet: parseFloat(extras[2]),
            volume: extras.length > 3 ? parseFloat(extras[3]) : null,
            samplePath: extras.length > 4 ? extras[4] : '',
        };
    }
}

enum HitObjectFlag {
    Circle = 1,
    Slider = 1 << 1,
    NewCombo = 1 << 2,
    Spinner = 1 << 3,
    SkipColor1 = 1 << 4,
    SkipColor2 = 1 << 5,
    SkipColor3 = 1 << 6 ,
    Hold = 1 << 7,
}

interface Extras {
    sampleSet: SampleSet;
    additionSampleSet: SampleSet;
    customSampleSet: number;
    volume: number | null;
    samplePath: string;
}
