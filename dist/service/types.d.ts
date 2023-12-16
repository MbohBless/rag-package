export declare class Embedding {
    embedding: number[];
    text: string;
    constructor(embedding: number[], text: string);
}
export declare class SparseEmbeddingData {
    private readonly indices;
    private readonly values;
    private readonly max_index;
    constructor(indices: number[], values: number[], max_index: number);
}
export declare class HybridEmbeddings extends Embedding {
    private readonly sparse_embedding;
    constructor(embedding: number[], text: string, sparse_embedding: SparseEmbeddingData);
}
export declare abstract class Embedder {
    dim: number;
    protected constructor(dim: number);
    abstract embed(text: string): Promise<Embedding>;
    abstract embed_batch(texts: string[]): Promise<Embedding[]>;
}
export declare class SearchResults {
    private readonly content;
    constructor(content: string);
}
export declare abstract class Tool {
    private readonly name;
    protected constructor(name: string);
}
export declare abstract class Searcher extends Tool {
    private readonly tool_description;
    protected constructor(name: string, tool_description: string);
    abstract raw_search(text: string, limit: number): SearchResults[];
    abstract process_raw_search_results(raw_results: SearchResults[]): string[];
    search(text: string, limit: number): string;
}
export declare abstract class VectorStore {
    abstract upsert(text: string, embedding: Embedding[]): void;
    abstract query(text: string, limit: number): Embedding[];
}
//# sourceMappingURL=types.d.ts.map