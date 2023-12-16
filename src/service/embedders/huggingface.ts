import createAxiosClient from "../../utils/axios-client";
import {Embedder, Embedding} from "../types"
import logger from "../../utils/logger";
import CustomError from "../../utils/custom-error";

// create  the embedder 
class HuggingFaceEmbedder extends Embedder {
    private readonly model_name: string;
    private readonly base_url: string;
    private readonly headers: any;
    private readonly config_url: string;

    constructor(api_key: string, model_name: string) {
        super(-1);
        this.model_name = model_name;
        this.base_url = `https://api-inference.huggingface.co/pipeline/feature-extraction/${model_name}`;
        this.headers = {'Authorization': `Bearer ${api_key}`}
        this.config_url = `https://huggingface.co/${this.model_name}/resolve/main/config.json`
        const configClient = createAxiosClient(this.config_url, {})
        logger.info(`Fetching config from ${this.config_url}`)
        configClient.get(this.config_url).then((response) => {
            this.dim = response.data['hidden_size'];
            logger.info(`Config fetched from ${this.config_url} with dim ${this.dim}`)

        }).catch((error) => {
            logger.error(`Error fetching config from ${this.config_url}`)
            // console.log(error.message)
            throw CustomError(error.message).status(error.statusCode || 500)
        })

    }

    async embed(text: string): Promise<Embedding> {
        const embedded = await this.embed_batch([text])
        return embedded[0]
    }

    async embed_batch(texts: string[]): Promise<Embedding[]> {
        const client = createAxiosClient(this.base_url, this.headers);
        const data = {
            "inputs": [
                ...texts
            ]
        }
        logger.info(`Sending data to ${this.base_url}`)
        try {

            const response = await client.post(this.base_url, 
                JSON.stringify(data),
                )
            logger.info(`Data sent to ${this.base_url}`)
            const embeddings = response.data;
            if (!Array.isArray(embeddings)) {
                throw CustomError("Embeddings are not of the format list").status(500)
            }
            if (embeddings.length !== texts.length) {
                throw CustomError("Embeddings length does not match input length").status(500)
            }
            return embeddings.map((embedding, index) => {
                return new Embedding(embedding, texts[index])
            })
        } catch (error: any) {
            logger.error(`Error sending data to ${this.base_url}`)
            console.log(error.message)
            throw CustomError("There was an error working with the data").status(500)
        }
    }

    // display all the parameters 
    display() {
        return {
            model_name: this.model_name,
            base_url: this.base_url,
            headers: this.headers,
            config_url: this.config_url,
            dim: this.dim
        }
    }

}


export default HuggingFaceEmbedder;