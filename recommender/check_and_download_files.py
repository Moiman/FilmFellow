import os
from download_files.extract_zip_file import extract_zip_file
from download_files.download_zip_file import download_zip_file

FILE_PATH = os.path.join(os.path.dirname(__file__), "Recommender_files")
ZIP_FILE_URL = 'https://dl.dropbox.com/scl/fi/bep2a6hloxzcg3s4neem3/' \
+ 'Recommender_files.zip?rlkey=hgz3jdwjosrqk18ny7ti5y42l&st=bvwsfebx&dl=1'
ZIP_FILE_PATH = os.path.join(os.path.dirname(__file__),
"Recommender_files.zip")
FILE_DESTINATION = os.path.dirname(__file__)

def check_and_download_files():
    """
    Downloads the recommender zip files from dropbox.
    """
    if not os.path.exists(FILE_PATH):
        os.makedirs(FILE_PATH)
    if not os.listdir(FILE_PATH):
        print("Recommender files missing. Downloading and " +
        "extracting zip file...")
        download_zip_file(ZIP_FILE_URL, ZIP_FILE_PATH)
        extract_zip_file(ZIP_FILE_PATH, FILE_DESTINATION)
        os.remove(ZIP_FILE_PATH)
