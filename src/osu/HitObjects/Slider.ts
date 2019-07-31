import { HitSoundAdditionFlag, SampleSet } from '../enums';

class Slider {
    public curveType: SliderCurveType = 0;
    public sliderNodes: SliderNode[] = [];
    public repeatCount: number = 0;
    public sliderLength: number = 0;
    public sliderHits: SliderHit[] = [];
}

interface SliderNode {
    x: number;
    y: number;
}

interface SliderHit {
    hitsoundAddition: HitSoundAdditionFlag;
    sampleSet: SampleSet;
    additionSampleSet: SampleSet;
}

enum SliderCurveType {
    None,
    Linear,
    Catmull,
    Bezier,
    Perfect,
}

export { Slider, SliderCurveType };
