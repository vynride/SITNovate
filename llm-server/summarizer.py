import os
import sys
import json
import io
from groq import Groq
import google.generativeai as genai
from dotenv import load_dotenv
from file_processing.pdf_text_extract import extract_text_from_pdf
from file_processing.txt_text_extract import extract_text_from_txt
from file_processing.doc_text_extract import extract_text_from_docx

def get_file_type_from_buffer(file_buffer, file_name):
    file_extension = os.path.splitext(file_name)[1].lower()
    
    if file_extension == ".pdf":
        return extract_text_from_pdf(io.BytesIO(file_buffer))
    elif file_extension == ".docx" or file_extension == ".doc":
        return extract_text_from_docx(io.BytesIO(file_buffer))
    elif file_extension == ".txt":
        return file_buffer.decode('utf-8')
    else:
        raise ValueError(f"Unsupported file type: {file_extension}")

def process_text_with_ai(text, prompt=None):
    decided_client = "gemini"  # or "groq"

    if decided_client == "gemini":
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
        }

        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            generation_config=generation_config,
        )

        system_prompt = """
        You are a research assistant whose job is to extract all relevant and critical information from research papers. 
        Generate a concise summary using abstractive summarization. 
        Ensure the summary is professional and in paragraphs form. 
        When possible, provide relevant citations from the provided text itself. 
        Integrate keywords from the text in your final summary.
        """

        if prompt:
            user_prompt = f"{system_prompt}\nUser request: {prompt}\nText to analyze: {text}"
        else:
            user_prompt = f"{system_prompt}\nText to analyze: {text}"

        response = model.generate_content(user_prompt)
        return response.text

    elif decided_client == "groq":
        # ... existing groq code ...
        pass

def main():
    try:
        load_dotenv()
        
        # Get command line arguments
        file_name = sys.argv[1] if len(sys.argv) > 1 else None
        user_prompt = sys.argv[2] if len(sys.argv) > 2 else None
        
        # Read file content from stdin
        file_buffer = sys.stdin.buffer.read()
        
        # Extract text from file
        extracted_text = get_file_type_from_buffer(file_buffer, file_name)
        
        # Process with AI
        summary = process_text_with_ai(extracted_text, user_prompt)
        
        # Return JSON response
        response = {
            "success": True,
            "extractedText": extracted_text,
            "summary": summary
        }
        
        print(json.dumps(response))
        sys.stdout.flush()
        
    except Exception as e:
        error_response = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_response))
        sys.stdout.flush()
        sys.exit(1)

if __name__ == "__main__":
    main()
