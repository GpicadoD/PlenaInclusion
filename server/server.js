// server/routes/users.js
import express from 'express';
import Users from './models/Users.js';

const app = express();
const port = 3001;

// Middleware para parsear los datos enviados en el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para registrar un nuevo usuario
app.post('/api/users', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar que se hayan proporcionado el nombre de usuario y la contraseña
    if (!username || !password) {
      return res.status(400).json({ message: 'Se requiere un nombre de usuario y una contraseña' });
    }

    // Crear el usuario en la base de datos utilizando el modelo Users
    const user = await Users.create({ username, password });

    // Devolver una respuesta con el nuevo usuario creado
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});