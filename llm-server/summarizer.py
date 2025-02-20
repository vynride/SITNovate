import sys
import json
import tempfile
import os
from pathlib import Path
from groq import Groq
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables at the start
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
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


def process_file(file_name, file_content, user_prompt):
    try:
        # Create temporary file with the same extension
        file_extension = os.path.splitext(file_name)[1].lower()
        with tempfile.NamedTemporaryFile(suffix=file_extension, delete=False) as temp_file:
            temp_file.write(file_content)
            temp_path = temp_file.name

        # Get text from file
        text = get_file_type(temp_path)
        
        # Clean up temp file
        os.unlink(temp_path)

        # Rest of your LLM processing code
        decided_client = "gemini"
        summary = ""

        # Prepare the content with user prompt if provided
        content_with_prompt = f"User Request: {user_prompt}\n\nDocument Content:\n{text}" if user_prompt else text

        # gemini
        if (decided_client == "gemini"):
            if "GEMINI_API_KEY" not in os.environ:
                raise ValueError("GEMINI_API_KEY not found in environment variables")
            
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
                Address the user's specific request if provided, otherwise generate a comprehensive summary.
                Use abstractive summarization and ensure the response is professional in nature.
                When possible, provide relevant citations from the text itself.
                Integrate keywords from the text in your response.
            """,

            )

            chat_session = model.start_chat(
            history=[
            ]
            )

            response = chat_session.send_message(content_with_prompt)
            summary = response.text

        # groq
        elif (decided_client == "groq"):
            if "GROQ_API_KEY" not in os.environ:
                raise ValueError("GROQ_API_KEY not found in environment variables")
            
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
                            Address the user's specific request if provided, otherwise generate a comprehensive summary.
                            Use abstractive summarization and ensure the response is professional in nature.
                            When possible, provide relevant citations from the text itself.
                            Integrate keywords from the text in your response.
                            If the input is less than 300 words then aim to summarize in about 50 words unless specified otherwise.
                        """
                    },

                    # user message
                    {
                        "role": "user",
                        "content": content_with_prompt,
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

            summary = chat_completion.choices[0].message.content

        # TODO: implement custom fine tuned models from huggingface
        # hugginface
        else:
            print("TODO")

        return {
            "success": True,
            "extractedText": text,
            "summary": summary
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def main():
    try:
        if len(sys.argv) < 2:
            raise ValueError("File name argument is required")

        file_name = sys.argv[1]
        user_prompt = sys.argv[2] if len(sys.argv) > 2 else ""

        # Read file content from stdin
        file_content = sys.stdin.buffer.read()

        # Process the file
        result = process_file(file_name, file_content, user_prompt)

        # Output JSON result
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e)
        }))

if __name__ == "__main__":
    main()