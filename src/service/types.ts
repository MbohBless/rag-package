import { format_results_full } from "../utils/formatters";

export class Embedding{
    embedding: number[];
    text: string;
    constructor(embedding: number[], text: string){
        this.embedding = embedding;
        this.text = text;
    }
}

export class SparseEmbeddingData{
    indicies: number[];
    values: number[];
    max_index: number;
    constructor(indicies: number[], values: number[], max_index: number){
        this.indicies = indicies;
        this.values = values;
        this.max_index = max_index;
    }
}

export class HybridEmbeddings extends Embedding{
    sparse_embedding: SparseEmbeddingData;
    constructor(embedding: number[], text: string, sparse_embedding: SparseEmbeddingData){
        super(embedding, text);
        this.sparse_embedding = sparse_embedding;
    }
}

export abstract class Embedder{
    dim: number;
    constructor(dim: number){
        this.dim = dim;
    }
    abstract embed(text: string): Embedding;
    abstract embed_batch(texts: string[]): Embedding[];
}

export class SearchResults{
    content: string;
    constructor(content: string){
        this.content = content;
    }
}

export abstract class Tool {
    name: string;
    constructor(name: string){
        this.name = name;
    }
}

export abstract class Searcher extends Tool{
    tool_description: string;
    constructor(name: string, tool_description: string){
        super(name);
        this.tool_description = tool_description;
    }
    abstract raw_search(text: string, limit:number): SearchResults[];
    abstract process_raw_search_results(raw_results: SearchResults[]): string[];
    search(text:string, limit:number): string{
      const raw_search_results = this.raw_search(text, limit);
      const processed_search_results = this.process_raw_search_results(raw_search_results);
      const displayable = format_results_full(processed_search_results);  
      return displayable;
    }

}

export abstract class VectorStore{
    abstract upsert(text: string, embedding: Embedding[]): void;
    abstract query(text: string, limit: number): Embedding[];
}





// 