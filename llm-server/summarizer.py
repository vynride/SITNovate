import os

from groq import Groq
import google.generativeai as genai
from dotenv import load_dotenv
from file_processing.pdf_text_extract import extract_text_from_pdf
from file_processing.txt_text_extract import extract_text_from_txt
from file_processing.doc_text_extract import extract_text_from_docx
#from file_processing.ppt_text_extract import extract_text_from_ppt


def get_file_type(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == ".pdf":
        return extract_text_from_pdf(file_path)
    
    elif file_extension == ".docx" or file_extension == ".doc":
        return extract_text_from_docx(file_path)
    
    elif file_extension == ".txt":
        return extract_text_from_txt(file_path)

    # elif file_extension == ".pptx" or file_extension == ".ppt":
    #    return extract_text_from_ppt(file_path)

    # TODO: List supported types
    else:
        raise ValueError("Unsupported file type!")


def main():
    load_dotenv()

    # TODO: Add functionality to take file path from command line arguments
    file_path = "E:\\SITNovate-Hackathon\\test.txt"
    text = get_file_type(file_path)

    decided_client = "gemini"

    # gemini
    if (decided_client == "gemini"):
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])

        # Create the model
        generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
        }

        model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        generation_config=generation_config,
        system_instruction=

        """
            You are a research assistant whose job is to extract all relevant and critical information from research papers. 
            Use the provided input to generate a summary using abstractive summarization. 
            Ensure the summary is professional in nature and in paragraphs form. 
            Ensure that you utilize the entire provided input as context for the summarization process. 
            When possible and valid you must provide relevant citations from the provided text itself. 
            Integrate keywords from the text in your final summary.
        """,

        )

        chat_session = model.start_chat(
        history=[
        ]
        )

        response = chat_session.send_message(text)

        print(response.text)

    # groq
    elif (decided_client == "groq"):
        client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

        chat_completion = client.chat.completions.create(
            messages=[
                # system message
                {
                    "role": "system",

                    # system prompt
                    "content":             
                    """
                        You are a research assistant whose job is to extract all relevant and critical information from research papers.
                        Use the provided input to generate a concise summary using abstractive summarization. 
                        Ensure the summary is professional in nature and in paragraph form. Ensure that you utilize the entire provided input as context for the summarization process.
                        When possible you must provide relevant citations from the provided text itself. Integrate keywords from the text in your final summary.
                        If the input is less than 300 words then aim to summarize the input in about 50 words or less.
                    """
                },

                # user message
                {
                    "role": "user",
                    "content": text,
                }
            ],

            # Language model to use
            model="llama-3.3-70b-versatile",

            # Optional parameters
            temperature=0.5,
            max_completion_tokens=1024,
            top_p=1,
            stop=None,
            stream=False,

            
        )

        output = chat_completion.choices[0].message.content

        print(chat_completion.choices[0].message.content)

    # TODO: implement custom fine tuned models from huggingface
    # hugginface
    else:
        print("TODO")



main()
