import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
const bodyParser = require('body-parser');


const prisma = new PrismaClient();


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hotel API',
        version: '1.0.0',
        description: 'API for managing hotels and apartments',
      },
    },
    apis: ['src/server.ts'],
};
  
  const specs = swaggerJsdoc(options);
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.json());


/**
 * @swagger
 * /apartments:
 *   post:
 *     summary: Create a new apartment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               pricePerNight:
 *                 type: number
 *             example:
 *               name: "Apartment 1"
 *               description: "A cozy apartment with a great view"
 *               pricePerNight: 100
 *     responses:
 *       200:
 *         description: The created apartment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricePerNight:
 *                   type: number
 *             example:
 *               id: 1
 *               name: "Apartment 1"
 *               description: "A cozy apartment with a great view"
 *               pricePerNight: 100
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
app.post('/apartments', async (req, res) => {
    try {
      console.log(req.body)
      const { name, description, pricePerNight } = req.body;
      const apartment = await prisma.apartment.create({
        data: { name, description, pricePerNight },
      });
      res.json(apartment);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Retrieve a list of all apartments
 *     responses:
 *       200:
 *         description: A list of apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   pricePerNight:
 *                     type: number
 *                 example:
 *                   id: 1
 *                   name: "Apartment 1"
 *                   description: "A cozy apartment with a great view"
 *                   pricePerNight: 100
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
app.get('/apartments', async (req, res) => {
    try {
      const apartments = await prisma.apartment.findMany()
      res.json(apartments);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

/**
 * @swagger
 * /apartments/{id}:
 *   patch:
 *     summary: Update an apartment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the apartment to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               pricePerNight:
 *                 type: number
 *             example:
 *               name: "Apartment 1"
 *               description: "A cozy apartment with a great view"
 *               pricePerNight: 100
 *     responses:
 *       200:
 *         description: The updated apartment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricePerNight:
 *                   type: number
 *             example:
 *               id: 1
 *               name: "Apartment 1"
 *               description: "A cozy apartment with a great view"
 *               pricePerNight: 100
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
app.patch('/apartments/:id', async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, pricePerNight } = req.body;
        const { id } = req.params;
        const apartment = await prisma.apartment.update({
            where: { id: parseInt(id) },
            data: { name, description, pricePerNight },
        });
        res.json(apartment);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /apartments/{id}:
 *   delete:
 *     summary: Delete an apartment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the apartment to delete
 *     responses:
 *       200:
 *         description: The deleted apartment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricePerNight:
 *                   type: number
 *             example:
 *               id: 1
 *               name: "Apartment 1"
 *               description: "A cozy apartment with a great view"
 *               pricePerNight: 100
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
app.delete('/apartments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await prisma.apartment.delete({
            where: { id: parseInt(id) },
        });
        res.json(apartment);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /apartments/{id}:
 *   get:
 *     summary: Retrieve an apartment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the apartment to retrieve
 *     responses:
 *       200:
 *         description: The requested apartment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricePerNight:
 *                   type: number
 *             example:
 *               id: 1
 *               name: "Apartment 1"
 *               description: "A cozy apartment with a great view"
 *               pricePerNight: 100
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
app.get('/apartments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await prisma.apartment.findFirst({
            where: { id: parseInt(id) },
        });
        res.json(apartment);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.get('/', async (req, res) => {
    try {
      res.json({"message": "hello world!"});
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
