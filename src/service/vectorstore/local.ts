
import CustomError from "../../utils/custom-error";
import log from "../../utils/logger";
import { Embedding, VectorStore } from "../types";
import fs from 'fs';
import { createInterface } from "readline";

class LocalVectorStore extends VectorStore{
    private readonly storagePath: string;
    private readonly embeddings: Embedding[];
    constructor(storagePath: string){
        super();
        this.storagePath = storagePath;
        this.embeddings = [];
        if (!fs.existsSync(this.storagePath)){
            log.info(`Creating storage path ${this.storagePath}`);
            fs.mkdirSync(this.storagePath);
        }
    }

     __loadData(): void {
        // split the path and esure that file ends with .jsonl
        const path = this.storagePath.split('/');
        const filename = path[path.length - 1];
        if (!filename.endsWith('.jsonl')){
            throw CustomError(`Storage path ${this.storagePath} does not end with .jsonl`).status(500);
        }
        createInterface({
            input: fs.createReadStream(this.storagePath),
            crlfDelay: Infinity
        }).on('line', (line) => {
            const embedding = JSON.parse(line);
            this.embeddings.push(new Embedding(embedding['vector'], embedding['text']));
        }).on('close', () => {
            log.info(`Loaded ${this.embeddings.length} embeddings from ${this.storagePath}`);
        });

        
  
    }
    upsert(text: string, embedding: Embedding[]): void {
        throw new Error("Method not implemented.");
    }
    query(text: string, limit: number): Embedding[] {
        throw new Error("Method not implemented.");
    }

}