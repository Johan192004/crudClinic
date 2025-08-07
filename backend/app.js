const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, (error) => {
    if (error) throw error;
    console.log('Servidor corriendo en http://localhost:3000');
});


/*GET*/
app.get("/", async (req, res) => {
   try {
    let result = await pool.query("");
    return res.json(result);
   } catch (error) {
      res.status().json({error : 'error'})
   }
});

/*POST*/
app.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre) VALUES ($1)',
      [nombre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

/*PUT*/
app.put('//:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1 WHERE id = $2',
      [nombre, id]
    );
    /*Que pasa si el id enviado no existe por favor aqui controlar esa posibilidad*/
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

/*DELETE*/
app.delete('//:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});