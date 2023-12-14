import {format_results_full} from "../utils/formatters";

export class Embedding {
    embedding: number[];
    text: string;

    constructor(embedding: number[], text: string) {
        this.embedding = embedding;
        this.text = text;
    }
}

export class SparseEmbeddingData {
    private readonly indices: number[];
    private readonly values: number[];
    private readonly max_index: number;

    constructor(indices: number[], values: number[], max_index: number) {
        this.indices = indices;
        this.values = values;
        this.max_index = max_index;
    }
}

export class HybridEmbeddings extends Embedding {
    private readonly sparse_embedding: SparseEmbeddingData;

    constructor(embedding: number[], text: string, sparse_embedding: SparseEmbeddingData) {
        super(embedding, text);
        this.sparse_embedding = sparse_embedding;
    }
}

export abstract class Embedder {
    dim: number;

    protected constructor(dim: number) {
        this.dim = dim;
    }

    abstract embed(text: string): Promise<Embedding>;

    abstract embed_batch(texts: string[]): Promise<Embedding[]>;
}

export class SearchResults {
    private readonly content: string;

    constructor(content: string) {
        this.content = content;
    }
}

export abstract class Tool {
    private readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }
}

export abstract class Searcher extends Tool {
    private readonly tool_description: string;

    protected constructor(name: string, tool_description: string) {
        super(name);
        this.tool_description = tool_description;
    }

    abstract raw_search(text: string, limit: number): SearchResults[];

    abstract process_raw_search_results(raw_results: SearchResults[]): string[];

    search(text: string, limit: number): string {
        const raw_search_results = this.raw_search(text, limit);
        const processed_search_results = this.process_raw_search_results(raw_search_results);
        const displayable = format_results_full(processed_search_results);
        return displayable;
    }

}

export abstract class VectorStore {
    abstract upsert(text: string, embedding: Embedding[]): void;

    abstract query(text: string, limit: number): Embedding[];
}


//