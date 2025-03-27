export type AlarmSound = {
  id: string;
  name: string;
  data: string; // Base64 encoded audio data
};

export const ALARM_SOUNDS: AlarmSound[] = [
  {
    id: 'gentle',
    name: 'Gentle Wake',
    // Base64 encoded sine wave beep
    data: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 
          'tvT19' + Array(100).fill('AAAA').join('')
  },
  {
    id: 'classic',
    name: 'Classic Alarm',
    // Base64 encoded square wave beep
    data: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 
          'tvT19' + Array(100).fill('////').join('')
  },
  {
    id: 'digital',
    name: 'Digital Beep',
    // Base64 encoded sawtooth wave beep
    data: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + 
          'tvT19' + Array(100).fill('AQID').join('')
  }
];

class AlarmSoundService {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private currentSound: AlarmSound | null = null;

  private initializeAudioContext() {
    if (typeof window === 'undefined') return;
    
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0.5;
      }
    } catch (e) {
      console.error('Failed to initialize audio context:', e);
    }
  }

  async playSound(sound: AlarmSound) {
    this.initializeAudioContext();
    if (!this.audioContext || !this.gainNode) return;
    
    try {
      this.currentSound = sound;
      
      // Stop any existing sound
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
      }

      // Resume audio context if it's suspended (needed for some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Create and configure oscillator
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.type = sound.id === 'gentle' ? 'sine' :
                            sound.id === 'classic' ? 'square' : 'sawtooth';
      this.oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4 note
      
      // Add some variation for more interesting sound
      if (sound.id === 'digital') {
        this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.2);
        this.oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime + 0.4);
      }

      // Connect and start
      this.oscillator.connect(this.gainNode);
      this.oscillator.start();
    } catch (e) {
      console.error('Failed to play sound:', e);
    }
  }

  stopSound() {
    try {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
    } catch (e) {
      console.error('Failed to stop sound:', e);
    }
  }

  getCurrentSound() {
    return this.currentSound;
  }

  setVolume(volume: number) {
    try {
      if (this.gainNode) {
        this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
      }
    } catch (e) {
      console.error('Failed to set volume:', e);
    }
  }
}

// Create a singleton instance only on the client side
let alarmSoundService: AlarmSoundService;
if (typeof window !== 'undefined') {
  alarmSoundService = new AlarmSoundService();
}

export { alarmSoundService }; 