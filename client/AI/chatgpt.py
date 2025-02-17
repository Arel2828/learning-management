import os
import sys
from dotenv import load_dotenv

from langchain.chains import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI  
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings  

# Load environment variables from .env
load_dotenv()

# Set OpenRouter API base URL
os.environ["OPENAI_API_BASE"] = "https://openrouter.ai/api/v1"

# Get API key from environment
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("Missing OPENAI_API_KEY. Please set it in your .env file.")

# Enable to save to disk & reuse the model
PERSIST = True

query = None
if len(sys.argv) > 1:
    query = sys.argv[1]

# Use Hugging Face embeddings (explicit model name)
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Load or create vector store
if PERSIST and os.path.exists("persist"):
    print("Reusing index...\n")
    vectorstore = Chroma(persist_directory="persist", embedding_function=embedding_model)
    index = VectorStoreIndexWrapper(vectorstore=vectorstore)
else:
    loader = DirectoryLoader("data/", glob="*.txt", loader_cls=lambda path: TextLoader(path, encoding="utf-8"))
    if PERSIST:
        index = VectorstoreIndexCreator(
            embedding=embedding_model, vectorstore_kwargs={"persist_directory": "persist"}
        ).from_loaders([loader])
    else:
        index = VectorstoreIndexCreator(embedding=embedding_model).from_loaders([loader])

# Create the conversational chain with lower token usage
chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="openai/gpt-3.5-turbo", openai_api_key=api_key),  # Reduced model size
    retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
)

# Chat loop
chat_history = []
while True:
    if not query:
        query = input("Prompt: ")
    if query.lower() in ['quit', 'q', 'exit']:
        sys.exit()

    try:
        result = chain({"question": query, "chat_history": chat_history[-5:]})  # Keep last 5 messages only
        print(result['answer'])
        chat_history.append((query, result['answer']))
        chat_history = chat_history[-5:]  # Trim history to avoid excessive token usage
    except Exception as e:
        print(f"Error: {e}")

    query = None