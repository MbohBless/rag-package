
import CustomError from "../../utils/custom-error";
import log from "../../utils/logger";
import { Embedding, SearchResults, VectorStore } from "../types";
import fs from 'fs';
import { createInterface } from "readline";

class LocalVectorStore extends VectorStore{
  
    private readonly storagePath: string;
    private readonly embeddings: Embedding[];
    private embeddings_matrix: number[][];
    
    constructor(storagePath: string){
        super();
        this.storagePath = storagePath;
        this.embeddings = [];
        this.embeddings_matrix = [];
        if (!fs.existsSync(this.storagePath)){
            log.info(`Creating storage path ${this.storagePath}`);
            fs.mkdirSync(this.storagePath);
        }
        this.__loadData();

    }

    __create_normed_embedding_matrix():void{
        this.embeddings.forEach((embedding)=>{
            this.embeddings_matrix.push(embedding.embedding);
        });
        if(this.embeddings_matrix.length>0){
            const normed_embeddings = this.__normalize(this.embeddings_matrix);
            this.embeddings.forEach((embedding, index)=>{
                embedding.embedding = normed_embeddings[index];
            });
           return; 
        }
        this.embeddings_matrix = [];
    }

    __normalize(embeddings: number[][]): number[][]{
        const normed_embeddings: number[][] = [];
        embeddings.forEach((embedding)=>{
            const norm = Math.sqrt(embedding.reduce((acc, val)=>acc+val*val, 0));
            normed_embeddings.push(embedding.map((val)=>val/norm));
        });
        return normed_embeddings;
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
    /**
     *  important note: if i did not normalize the embeddings, the euclidean distance would be the same as the cosine distance
     * but since i normalized the embeddings, the euclidean distance is not the same as the cosine distance 
     * so since normalized, the cosine similarity is prefered to the euclidean distance */
    __nearestNeighbours(embedding: Embedding, limit: number): Embedding[]{
            const query_vector = embedding.embedding;
            const query_vector_norm = Math.sqrt(query_vector.reduce((acc, val)=>acc+val*val, 0));
            const cosine_similarities: number[] = [];
            this.embeddings.forEach((embedding)=>{
                const embedding_vector = embedding.embedding;
                const embedding_vector_norm = Math.sqrt(embedding_vector.reduce((acc, val)=>acc+val*val, 0));
                const dot_product = embedding_vector.reduce((acc, val, index)=>acc+val*query_vector[index], 0);
                const cosine_similarity = dot_product/(embedding_vector_norm*query_vector_norm);
                cosine_similarities.push(cosine_similarity);
            });
            const sorted_cosine_similarities = cosine_similarities.sort((a, b)=>b-a);
            const nearest_neighbours: Embedding[] = [];
            sorted_cosine_similarities.slice(0, limit).forEach((cosine_similarity)=>{
                const index = cosine_similarities.indexOf(cosine_similarity);
                nearest_neighbours.push(this.embeddings[index]);
            });
            return nearest_neighbours;
    }
    // methods to implement from the abstract class

    upsert(embedding: Embedding[]): void {
        const stream = fs.createWriteStream(this.storagePath, {flags: 'a'});
        embedding.forEach((item)=>{
            stream.write(JSON.stringify(item)+'\n');
        })
        stream.end();
        
    }
    query(query_embedding: Embedding, limit: number): SearchResults[] {
      if (this.embeddings.length === 0){
        log.info(`No embeddings in the vector store`);
        return [];
      }
        const bestResults = this.__nearestNeighbours(query_embedding, limit);
        const search_results: SearchResults[] = [];
        bestResults.forEach((embedding)=>{
            search_results.push(new SearchResults(embedding.text));
        });
        return search_results;
    }
}

class LocalHybridVectorStore extends VectorStore{
    
    upsert(embedding: Embedding[]): void {
        throw new Error("Method not implemented.");
    }
    query(query_embedding: Embedding, limit: number): SearchResults[] {
        throw new Error("Method not implemented.");
    }
}


export {
    LocalVectorStore
}