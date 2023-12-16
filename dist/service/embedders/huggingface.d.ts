import { Embedder, Embedding } from "../types";
declare class HuggingFaceEmbedder extends Embedder {
    private readonly model_name;
    private readonly base_url;
    private readonly headers;
    private readonly config_url;
    constructor(api_key: string, model_name: string);
    embed(text: string): Promise<Embedding>;
    embed_batch(texts: string[]): Promise<Embedding[]>;
    display(): {
        model_name: string;
        base_url: string;
        headers: any;
        config_url: string;
        dim: number;
    };
}
export default HuggingFaceEmbedder;
//# sourceMappingURL=huggingface.d.ts.map