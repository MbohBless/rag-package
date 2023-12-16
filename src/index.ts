import readline from 'readline';
import HuggingFaceEmbedder from './service/embedders/huggingface';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getUserSentence(
    question: string = 'Enter a sentence: '
): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (sentence) => {
            resolve(sentence);
        });
    });
}

async function main() {
    const userSentence = await getUserSentence(
        'Enter a sentence: '
    );
    const token = "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"
    const model_id = "sentence-transformers/all-MiniLM-L6-v2"
    const embedder = new HuggingFaceEmbedder(token, model_id);
    console.log("Embedding sentence: ", userSentence);
    console.log("\n\n\n")
    const embedding = await embedder.embed_batch(["hello", "world"]);
    console.log(embedding);
    rl.close();
}

main();
