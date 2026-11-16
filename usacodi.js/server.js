const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise'); // Usamos la versión estable /promise

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. CONFIGURACIÓN DE CONEXIÓN CON CONTROL DE PLUGINS DE WINDOWS
let db;
async function conectarBD() {
    try {
        db = await mysql.createConnection({
            host: '127.0.0.1',       // Forzamos IP numérica local para saltar el proxy de Windows
            user: 'root',
            password: '',            // Contraseña vacía tal como vimos en tu Workbench
            database: 'usacodi2',
            authPlugins: {
                auth_gssapi_client: () => () => Buffer.alloc(0)
            }
        });
        console.log('🔗 ¡Conectado con éxito absoluto a la base de datos MySQL (usacodi2)!');
    } catch (err) {
        console.error('❌ Error crítico al conectar a MySQL:', err.message);
    }
}
conectarBD(); // Ejecutar la conexión forzada al arrancar

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================================
// RUTA: REGISTRAR VEHÍCULO EN LA BASE DE DATOS (ADAPTADA A PROMISE)
// ==========================================================
app.post('/api/vehiculo', upload.single('foto'), async (req, res) => {
    try {
        const { marca, modelo, anio, tipo, placa, fecha_registro } = req.body;
        const fotoPath = req.file ? req.file.path : null;

        console.log("🚗 Datos de Vehículo Recibidos en Frontend, procesando inserción...");

        const sql = `INSERT INTO nueva_informacion (marca, modelo, anio, tipo, placa, fecha_registro, foto) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const valores = [marca, modelo, anio, tipo, placa, fecha_registro, fotoPath];

        // Ejecución síncrona moderna con await
        const [result] = await db.query(sql, valores);
        
        console.log("🚗 ¡Vehículo guardado en la tabla nueva_informacion con ID:", result.insertId);
        res.status(200).json({ status: "success", message: "Vehículo registrado con éxito en MySQL" });

    } catch (error) {
        console.error("❌ Error al insertar en MySQL:", error.message);
        res.status(500).json({ status: "error", message: "Error al guardar en la base de datos." });
    }
});

// Rutas base para los otros módulos
app.post('/api/usuario', upload.single('foto-perfil'), (req, res) => { res.json({ status: "success" }); });
app.post('/api/tarea', upload.single('foto-tarea'), (req, res) => { res.json({ status: "success" }); });

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
