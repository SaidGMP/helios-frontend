import { useEffect, useState } from "react";

function App() {

  const [memories, setMemories] = useState([]);
  const [text, setText] = useState("");

  // NUEVO
  const API_URL =
    import.meta.env.VITE_API_URL;

  const fetchMemories = async () => {

    const response = await fetch(
      `${API_URL}/memories`
    );

    const data = await response.json();

    setMemories(data);
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const saveMemory = async () => {

    if (!text.trim()) return;

    await fetch(
      `${API_URL}/memories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
        }),
      }
    );

    setText("");

    fetchMemories();
  };

  const startVoice = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Tu navegador no soporta reconocimiento de voz"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "es-ES";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setText(transcript);
    };

    recognition.onerror = (event) => {

      console.error(
        "Error de voz:",
        event.error
      );
    };
  };

  const urgentMemories = memories.filter(
    (m) => m.priority === "high"
  );

  return (

    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-2">
          HELIOS
        </h1>

        <p className="text-zinc-400">
          Tu sistema operativo personal
        </p>

      </div>

      {/* INPUT */}

      <div className="bg-zinc-900 p-6 rounded-2xl mb-10">

        <h2 className="text-xl mb-4">
          Nueva memoria
        </h2>

        <div className="flex gap-4">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="¿Qué necesitas recordar?"
            className="flex-1 bg-zinc-800 rounded-xl p-4 outline-none"
          />

          {/* BOTÓN VOZ */}

          <button
            onClick={startVoice}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 rounded-2xl"
          >
            🎤
          </button>

          {/* BOTÓN GUARDAR */}

          <button
            onClick={saveMemory}
            className="bg-white text-black px-6 rounded-xl font-semibold"
          >
            Guardar
          </button>

        </div>

      </div>

      {/* DASHBOARD */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* URGENTES */}

        <div className="bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Urgente
          </h2>

          <div className="space-y-4">

            {urgentMemories.map((memory) => (

              <div
                key={memory.id}
                className="bg-zinc-800 p-4 rounded-xl"
              >

                <p className="mb-2">
                  {memory.content}
                </p>

                <small className="text-red-400">
                  {memory.priority}
                </small>

              </div>

            ))}

          </div>

        </div>

        {/* TODAS */}

        <div className="bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Inbox
          </h2>

          <div className="space-y-4">

            {memories.map((memory) => (

              <div
                key={memory.id}
                className="bg-zinc-800 p-4 rounded-xl"
              >

                <p className="mb-3">
                  {memory.content}
                </p>

                <div className="text-sm text-zinc-400">

                  <p>
                    Prioridad: {memory.priority}
                  </p>

                  <p>
                    Tipo: {memory.type}
                  </p>

                  <p>
                    Fecha:
                    {" "}
                    {memory.reminder_date
                      ? new Date(
                          memory.reminder_date
                        ).toLocaleString()
                      : "Sin fecha"}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;