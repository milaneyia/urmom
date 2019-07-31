import { SampleSet } from './enums';

class TimingPoint {
    public offset: number = 0;
    public beatDuration: number = 0;
    public beatsPerMeasure: number = 0;
    public sampleSet: SampleSet = 0;
    public customSampleSet: number = 0;
    public volume: number = 0;
    public isInherited: boolean = false;
    public isKiai: boolean = false;
}

export { TimingPoint as default, SampleSet };
