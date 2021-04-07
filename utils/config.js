import dotenv, { config } from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

export default { PORT }