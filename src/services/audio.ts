const FINISH_SOUND_SRC = '/attention-chime.mp3'

export const playFinishSound = () => {
  void new Audio(FINISH_SOUND_SRC).play()
}
