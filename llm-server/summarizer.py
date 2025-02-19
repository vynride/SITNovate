import os

from groq import Groq
from dotenv import load_dotenv
from file_processing import pdf_text_extract


def get_file_type(file_path):
    file_extension = os.path.splitext(file_path)[1.].lower()
    
    if file_extension == ".pdf":
        return pdf_text_extract(file_path)
    elif file_extension == ".docx":
        return doc(file_path)
    elif file_extension == ".pptx":
        return extract_text_from_pptx(file_path)
    else:
        raise ValueError("Unsupported file type")


def main():
    load_dotenv()

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
                "content": 
                """
                A storm descends on a small town, and the downpour soon turns into a flood. As the waters rise, the local preacher kneels in prayer on the church porch, surrounded by water. By and by, one of the townsfolk comes up the street in a canoe.
                "Better get in, Preacher. The waters are rising fast."
                "No," says the preacher. "I have faith in the Lord. He will save me."
                Still the waters rise. Now the preacher is up on the balcony, wringing his hands in supplication, when another guy zips up in a motorboat.
                "Come on, Preacher. We need to get you out of here. The levee's gonna break any minute."
                Once again, the preacher is unmoved. "I shall remain. The Lord will see me through."
                After a while the levee breaks, and the flood rushes over the church until only the steeple remains above water. The preacher is up there, clinging to the cross, when a helicopter descends out of the clouds, and a state trooper calls down to him through a megaphone.
                "Grab the ladder, Preacher. This is your last chance."
                Once again, the preacher insists the Lord will deliver him.
                And, predictably, he drowns.
                A pious man, the preacher goes to heaven. After a while he gets an interview with God, and he asks the Almighty, "Lord, I had unwavering faith in you. Why didn't you deliver me from that flood?"
                God shakes his head. "What did you want from me? I sent you two boats and a helicopter."
                """,
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