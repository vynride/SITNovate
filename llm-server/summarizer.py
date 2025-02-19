import os

from groq import Groq
from dotenv import load_dotenv

from file_processing.pdf_text_extract import extract_text_from_pdf

def get_file_type(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == ".pdf":
        return extract_text_from_pdf(file_path)
    
    # TODO: List supported types
    else:
        raise ValueError("Unsupported file type!")


def main():
    load_dotenv()

    # TODO: Add functionality to take file path from command line arguments
    file_path = "E:\\SITNovate-Hackathon\\r1-paper - Copy-1-10-1-5.pdf"
    text = get_file_type(file_path)

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
                    You are a research assistant whose job is to extract all important information from research papers.
                    Use the following input to generate a concise summary using abstractive summarization. 
                    Ensure the summary is professional and in paragraph form. Ensure that you utilize the entire provided input for summarization.
                    When possible you provide relevant citations from the text only. Use keywords from the text in your final summary.
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

main()