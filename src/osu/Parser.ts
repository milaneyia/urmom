import OsuFile from './OsuFile';
import TimingPoint from './TimingPoint';
import HitObject from './HitObject';
import Circle from './HitObjects/Circle';
import { Slider, SliderCurveType } from './HitObjects/Slider';
import Spinner from './HitObjects/Spinner';

function parseFile(rawFile: string): OsuFile {
    const osuFile = new OsuFile();
    const lines = rawFile.split(/\r|\n/);
    let section: string = '';

    for (let line of lines) {
        line = line.trim();
        if (!line) {
            continue;
        }

        if (line.startsWith('[') && line.endsWith(']')) {
            section = line;
            continue;
        } else if (line.startsWith('osu file format')) {
            continue;
        }

        let keyValue: string[];
        let key: string;
        let value: string;
        let values: string[];

        switch (section) {
            case '[General]':
            case '[Editor]':
            case '[Metadata]':
            case '[Difficulty]':
                keyValue = line.split(':');
                key = keyValue[0].trim();
                key = key.charAt(0).toLowerCase() + key.slice(1);
                value = keyValue[1].trim();

                if (typeof osuFile[key] === 'string') {
                    osuFile[key] = value;
                } else if (typeof osuFile[key] === 'number') {
                    osuFile[key] = parseFloat(value);
                } else if (typeof osuFile[key] === 'boolean') {
                    osuFile[key] = (value === '1');
                } else if (typeof osuFile[key] === 'object') {
                    if (key === 'tags') {
                        const tags = value.split(' ');

                        for (let tag of tags) {
                            tag = tag.trim();
                            if (tag) {
                                osuFile.tags.push(tag);
                            }
                        }
                    } else if (key === 'bookmarks') {
                        const bookmarks = value.split(',');
                        for (const bookmark of bookmarks) {
                            osuFile.bookmarks.push(parseFloat(bookmark));
                        }
                    }
                }

                break;
            // case '[Events]':
            case '[TimingPoints]':
                values = line.split(',');
                const timingPoint = new TimingPoint();
                timingPoint.offset = parseFloat(values[0]);
                timingPoint.beatDuration = parseFloat(values[1]);
                timingPoint.beatsPerMeasure = parseFloat(values[2]);
                timingPoint.sampleSet = parseFloat(values[3]);
                timingPoint.customSampleSet = parseFloat(values[4]);
                timingPoint.volume = parseFloat(values[5]);
                timingPoint.isInherited = (values[6] === '1');
                timingPoint.isKiai = (values[7] === '1');

                osuFile.timingPoints.push(timingPoint);

                break;
            case '[Colours]':
                keyValue = line.split(':');
                value = keyValue[1].trim();
                osuFile.comboColours.push(value);

                break;
            case '[HitObjects]':
                values = line.split(',');

                const hitObject = new HitObject();
                hitObject.x = parseFloat(values[0]);
                hitObject.y = parseFloat(values[1]);
                hitObject.startTime = parseFloat(values[2]);
                hitObject.hitObjectFlag = parseFloat(values[3]);
                hitObject.hitSoundAdditionFlag = parseFloat(values[4]);

                if (hitObject.isCircle()) {
                    const circle = new Circle();

                    if (values.length > 5) {
                        hitObject.parseExtras(values[5].split(':'));
                    }

                    hitObject.hitObject = circle;
                } else if (hitObject.isSlider()) {
                    const slider = new Slider();
                    const sliderValues = values[5].split('|');

                    switch (sliderValues[0]) {
                        case 'L':
                            slider.curveType = SliderCurveType.Linear;
                            break;
                        case 'C':
                            slider.curveType = SliderCurveType.Catmull;
                            break;
                        case 'B':
                            slider.curveType = SliderCurveType.Bezier;
                            break;
                        case 'P':
                            slider.curveType = SliderCurveType.Perfect;
                            break;
                        default:
                            break;
                    }

                    for (let i = 1; i < sliderValues.length; i++) {
                        const points = sliderValues[i].split(':');
                        slider.sliderNodes.push({
                            x: parseFloat(points[0]),
                            y: parseFloat(points[1]),
                        });
                    }

                    slider.repeatCount = parseFloat(values[6]);
                    slider.sliderLength = parseFloat(values[7]);

                    if (values.length > 9) {
                        const sliderAdditionValues = values[8].split('|');
                        const sliderSamplesetValues = values[9].split('|');

                        for (let i = 0; i < sliderAdditionValues.length; i++) {
                            const addition = parseFloat(sliderAdditionValues[i]);

                            const sliderSamplesetValue = sliderSamplesetValues[i];
                            const sampleSets = sliderSamplesetValue.split(':');
                            const sampleset = parseFloat(sampleSets[0]);
                            const additionSampleset = parseFloat(sampleSets[1]);

                            slider.sliderHits.push({
                                hitsoundAddition: addition,
                                sampleSet: sampleset,
                                additionSampleSet: additionSampleset,
                            });
                        }
                    }

                    if (values.length > 10) {
                        hitObject.parseExtras(values[10].split(':'));
                    }

                    hitObject.hitObject = slider;
                } else if (hitObject.isSpinner()) {
                    const spinner = new Spinner();
                    spinner.endTime = parseFloat(values[5]);

                    if (values.length > 6) {
                        hitObject.parseExtras(values[5].split(':'));
                    }

                    hitObject.hitObject = spinner;
                }
                // else if (hitObject.isHold())

                osuFile.hitObjects.push(hitObject);

                break;
            default:
                break;
        }
    }

    return osuFile;
}

export default parseFile;
