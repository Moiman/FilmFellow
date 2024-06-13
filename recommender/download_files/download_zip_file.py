import requests

def download_zip_file(url: str, zip_file_path: str):
    """
    Downloads file from given url.
    
    Args:
        url: str: The URL path to the downloadable content.
        zip_file_path: str: The directory path where the file is loaded.
    """
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(zip_file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
    else:
        print("Failed to download the zip file")