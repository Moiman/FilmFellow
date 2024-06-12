import zipfile

def extract_zip_file(zip_file_path: str, extract_to_directory: str):
    """
    Extracts zip file to given directory.
    
    Args:
        zip_file_path: str: The path of the zip file.
        extract_to_directory: str: The path to extract the zip file.
    """
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to_directory)