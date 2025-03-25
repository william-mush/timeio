export type AlarmSound = {
  id: string;
  name: string;
  url: string;
};

export const ALARM_SOUNDS: AlarmSound[] = [
  {
    id: 'gentle',
    name: 'Gentle Wake',
    url: '/sounds/gentle-wake.mp3'
  },
  {
    id: 'classic',
    name: 'Classic Alarm',
    url: '/sounds/classic-alarm.mp3'
  },
  {
    id: 'digital',
    name: 'Digital Beep',
    url: '/sounds/digital-beep.mp3'
  }
];

class AlarmSoundService {
  private audio: HTMLAudioElement | null = null;
  private currentSound: AlarmSound | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
    }
  }

  async playSound(sound: AlarmSound) {
    if (!this.audio) return;
    
    this.currentSound = sound;
    this.audio.src = sound.url;
    this.audio.loop = true;
    
    try {
      await this.audio.play();
    } catch (error) {
      console.error('Failed to play alarm sound:', error);
    }
  }

  stopSound() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  getCurrentSound() {
    return this.currentSound;
  }
}

export const alarmSoundService = new AlarmSoundService(); 