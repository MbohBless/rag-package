// implemeting the local embedder 

import { Embedder, Embedding } from "../types";

class LocalEmbedder extends Embedder{
    constructor(){
        super(-1);
        
    }
    embed(text: string): Promise<Embedding> {
        throw new Error("😁 Currenly taking NLP in school, will implement later");
    }
    embed_batch(texts: string[]): Promise<Embedding[]> {
        throw new Error("😁 Currenly taking NLP in school, will implement later");
    }


}