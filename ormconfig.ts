import { User } from 'src/entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const connectToDatabase: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'auth-nest',
  entities: [User],
  synchronize: true,
};

export default connectToDatabase;
