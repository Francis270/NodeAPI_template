import app from './app';
import { PORT } from './utils/config';

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});