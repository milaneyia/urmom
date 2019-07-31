import TimingPoint from './TimingPoint';
import HitObject from './HitObject';

export default class OsuFile {
    // General
    public audioFilename: string = '';
    public audioLeadIn: number = 0;
    public previewTime: number = 0;
    public countdown: boolean = false;
    public sampleSet: string = '';
    public stackLeniency: number = 0;
    public mode: number = 0;
    public letterboxInBreaks: boolean = false;
    public widescreenStoryboard: boolean = false;

    // Editor
    public bookmarks: number[] = [];
    public distanceSpacing: number = 0;
    public beatDivisor: number = 0;
    public gridSize: number = 0;
    public timelineZoom: number = 0;

    // Metadata
    public title: string = '';
    public titleUnicode: string = '';
    public artist: string = '';
    public artistUnicode: string = '';
    public creator: string = '';
    public version: string = '';
    public source: string = '';
    public tags: string[] = [];
    public beatmapID: number = 0;
    public beatmapSetID: number = 0;

    // Difficulty
    public hPDrainRate: number = 0;
    public circleSize: number = 0;
    public overallDifficulty: number = 0;
    public approachRate: number = 0;
    public sliderMultiplier: number = 0;
    public sliderTickRate: number = 0;

    // Events

    // Timing Points
    public timingPoints: TimingPoint[] = [];

    // Colours
    public comboColours: string[] = [];

    // Hit Objects
    public hitObjects: HitObject[] = [];
}
