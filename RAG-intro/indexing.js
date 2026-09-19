import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv";
dotenv.config();

async function generateVectorEmbeddingsForFile(filepath) {
  // load the pdf content as document
  const loader = new PDFLoader(filepath);
  const document = await loader.load();

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apikey: process.env.OPENAI_API_KEY,
  });

  //the vector store
  const vectoreStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    { url: "http://localhost:6333", collectionName: "Example-docs" },
  );

  await vectoreStore.addDocuments(document);
  console.log(`All the documents are indexed`);
}

generateVectorEmbeddingsForFile("dsa.pdf");
