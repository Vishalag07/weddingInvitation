/**
 * Wedding Audio Player
 * Plays "AAJ SAJEYA" by Goldie Sohel
 */

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  public readonly songTitle = 'AAJ SAJEYA';
  public readonly artist = 'Goldie Sohel';

  private readonly songSrc = '/assets/aaj_sajeya.mp3';

  private initAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(this.songSrc);
      this.audio.loop = true;
      this.audio.volume = 0.65;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.setPlayingState(true);
      });

      this.audio.addEventListener('pause', () => {
        this.setPlayingState(false);
      });

      this.audio.addEventListener('ended', () => {
        // If looping, the song will restart, don't flicker to paused
        if (!this.audio?.loop) {
          this.setPlayingState(false);
        }
      });

      this.audio.addEventListener('error', () => {
        this.setPlayingState(false);
      });
    }
  }

  private setPlayingState(playing: boolean) {
    if (this.isPlaying !== playing) {
      this.isPlaying = playing;
      this.notify();
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public async play() {
    this.initAudio();
    if (!this.audio) return;

    try {
      if (this.audio.paused) {
        await this.audio.play();
      }
      this.setPlayingState(true);
    } catch (err) {
      console.warn('Audio play request notice:', err);
      this.setPlayingState(false);
    }
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.setPlayingState(false);
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getPlaying() {
    return this.isPlaying;
  }

  public setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

export const weddingAudio = new WeddingAudioManager();
