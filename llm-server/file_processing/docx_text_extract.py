import docx2txt

def extract_text_from_docx(docx_path):
    
    with open(docx_path, 'r') as file:
        # TODO: implement image extraction and description
        # text = docx2txt.process(docx_path, "/tmp/img_dir") 
        text = docx2txt.process(docx_path)
        return text
