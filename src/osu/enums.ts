enum HitSoundAdditionFlag {
    None = 0,
    Normal = 1 << 0,
    Whistle = 1 << 1,
    Finish = 1 << 2,
    Clap = 1 << 3,
}

enum SampleSet {
    Auto = 0,
    Normal,
    Soft,
    Drum,
}

export { HitSoundAdditionFlag, SampleSet };
