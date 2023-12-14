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
