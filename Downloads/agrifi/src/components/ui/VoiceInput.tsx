import { useState, useRef } from 'react'
import { Mic, MicOff } from 'lucide-react'

interface VoiceInputProps {
  inputId:   string
  lang?:     string
  onResult:  (text: string) => void
}

export function VoiceInput({ inputId, lang = 'en-IN', onResult }: VoiceInputProps) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const toggle = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return alert('Voice input not supported')

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const r = new SR()
    r.lang = lang
    r.continuous = false
    r.interimResults = false

    r.onresult = (e: any) => {
      onResult(e.results[0][0].transcript)
      setListening(false)
    }
    r.onerror = () => setListening(false)
    r.onend = () => setListening(false)

    recognitionRef.current = r
    r.start()
    setListening(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`
        absolute right-2 top-1/2 -translate-y-1/2
        w-8 h-8 rounded-md flex items-center justify-center
        transition-all
        ${listening
          ? 'bg-red-100 text-red-600 animate-pulse'
          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
        }
      `}
      title={listening ? 'Stop recording' : 'Speak to fill'}
    >
      {listening ? <MicOff size={14} /> : <Mic size={14} />}
    </button>
  )
}
