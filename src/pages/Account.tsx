import { invoke } from "@tauri-apps/api/core"

function Account() {
  const handleConnect = async () => {
    try {
      await invoke("connect_db");
      console.log("Connected to database");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };

  return (
    <div>
      Account
      {/* {"Esta seccion se usara para crear el formulario de inicio de sesion y registro de usuario, utilizando clerk. ESTA SECCION ME ENCARGO YO."} */}
      <button
        onClick={handleConnect}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Connect to Database
      </button>
    </div>
  )
}

export default Account
