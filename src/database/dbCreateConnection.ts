import { Connection, createConnection, getConnectionManager } from "typeorm";

import config from "./config/ormconfig";

export const dbCreateConnection = async (): Promise<Connection | null> => {
    try {
        const conn = await createConnection(config);
        console.log(`Database connection created. Connection: '${conn.name}' 
        \nDatabase: '${conn.options.database}'`);
    } catch (err) { 
        if(err.name == "AlreadHasActiveConnectionError") {
            const activeConnection = getConnectionManager().get(config.name);
            return activeConnection;
        }

        console.log(err);
    }

    return null;
}