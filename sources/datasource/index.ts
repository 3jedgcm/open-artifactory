import { DataSource } from "typeorm"
import File from "../entities/File"
import * as dotenv from 'dotenv'

dotenv.config()

const dataSource = new DataSource({
    type: "sqlite",
    database: "",
    entities: [
        File,
    ]
})

export default dataSource
