import express, { Request, Response } from "express";
import { getConcepts } from './concept';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/concepts', async (req: Request, res: Response) => {
  try {
    // fetch concepts from concept.ts
    const concepts = await getConcepts();
    res.json(concepts);
  } catch (error) {

    console.error("Error getting concepts:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// catch-all route for invalid endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
