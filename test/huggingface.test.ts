// testing class 
import HuggingFaceEmbedder from '../src/service/embedders/huggingface';
import { Embedding } from '../src/service/types';

const token = "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"
const model_id = "sentence-transformers/all-MiniLM-L6-v2"
describe('HuggingFaceEmbedder', ()=>{
    it('should create an instance', ()=>{
        const embedder = new HuggingFaceEmbedder(token, model_id);
        expect(embedder).toBeInstanceOf(HuggingFaceEmbedder);
    });
});

describe('HuggingFaceEmbedder', ()=>{
    it('should test the dim', ()=>{
        const embedder = new HuggingFaceEmbedder(token, model_id);
        expect(embedder.dim).toBe(-1);
    });
}
);

describe('HuggingFaceEmbedder', ()=>{
    it('should test the embed_batch method', ()=>{
        const embedder = new HuggingFaceEmbedder(token, model_id);
        const embed = embedder.embed_batch(['test']);
        expect(embed).toBeInstanceOf(Promise<Embedding[]>);
    });
}
);

describe('HuggingFaceEmbedder', ()=>{
    it('should test the embed methid', ()=>{
        const embedder = new HuggingFaceEmbedder('test', 'test');
        const embed = embedder.embed('test');
        expect(embed).toBeInstanceOf(Promise<Embedding>);
    });
})



