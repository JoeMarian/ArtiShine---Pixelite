'''from instagrapi import Client

# Initialize the client
cl = Client()

# Login
try:
    cl.login("artishine_hachathon", "iamdrstrange@2022")
    print("Successfully logged in!")
    
    # Test getting your profile info
    user_id = cl.user_id
    print(f"Your user ID: {user_id}")
    
except Exception as e:
    print(f"Login failed: {str(e)}")'''


import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv
from instagrapi import Client
from firebase_admin import storage, credentials, initialize_app, firestore

# Load environment variables
load_dotenv()

# Initialize Firebase
cred = credentials.Certificate(os.getenv('SERVICE_ACCOUNT_KEY_PATH'))
firebase_app = initialize_app(cred, {
    'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')
})
bucket = storage.bucket()
db = firestore.client()

def add_artisan(name, email, phone, location, bio, profile_pic_path=None):
    """Add a new artisan to Firestore and upload profile picture"""
    try:
        # Upload profile picture if provided
        profile_pic_url = None
        if profile_pic_path and os.path.exists(profile_pic_path):
            blob = bucket.blob(f"artisans/{name}/profile_pic.jpg")
            blob.upload_from_filename(profile_pic_path)
            blob.make_public()
            profile_pic_url = blob.public_url

        # Add to Firestore
        artisan_ref = db.collection('artisans').document()
        artisan_data = {
            'name': name,
            'email': email,
            'phone': phone,
            'location': location,
            'bio': bio,
            'profile_pic': profile_pic_url,
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP
        }
        artisan_ref.set(artisan_data)
        
        print(f"Artisan added with ID: {artisan_ref.id}")
        return artisan_ref.id
        
    except Exception as e:
        print(f"Error adding artisan: {str(e)}")
        return None

def add_product(artisan_id, title, description, price, category, image_paths, location=None):
    """Add a new product for an artisan"""
    try:
        # Create product folder
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        folder_path = f"products/{artisan_id}/{timestamp}/"
        
        # Upload images
        image_urls = []
        for i, img_path in enumerate(image_paths):
            if os.path.exists(img_path):
                ext = os.path.splitext(img_path)[1] or '.jpg'
                blob = bucket.blob(f"{folder_path}image_{i}{ext}")
                blob.upload_from_filename(img_path)
                blob.make_public()
                image_urls.append(blob.public_url)
        
        if not image_urls:
            print("No valid images provided")
            return None
            
        # Add to Firestore
        product_ref = db.collection('products').document()
        product_data = {
            'artisan_id': artisan_id,
            'title': title,
            'description': description,
            'price': price,
            'category': category,
            'images': image_urls,
            'location': location,
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP
        }
        product_ref.set(product_data)
        
        print(f"Product added with ID: {product_ref.id}")
        return product_ref.id
        
    except Exception as e:
        print(f"Error adding product: {str(e)}")
        return None

def get_latest_product():
    """Get the most recently added product from Firestore"""
    try:
        # Query the most recent product
        products_ref = db.collection('products')
        query = products_ref.order_by('created_at', direction='DESCENDING').limit(1)
        docs = query.stream()
        
        for doc in docs:
            product = doc.to_dict()
            product['id'] = doc.id
            return product
            
        print("No products found")
        return None
        
    except firestore.Error as e:
        print(f"Error getting latest product: {str(e)}")
        return None

def post_to_instagram(product):
    """Post product to Instagram"""
    image_paths = []  # Initialize here to ensure it's available in finally block
    
    try:
        # Initialize client
        cl = Client()
        cl.login(os.getenv('INSTAGRAM_USERNAME'), os.getenv('INSTAGRAM_PASSWORD'))
        
        # Download images to temp folder
        temp_dir = os.path.abspath('temp')
        os.makedirs(temp_dir, exist_ok=True)
        
        for i, img_url in enumerate(product.get('images', [])[:10]):  # Max 10 images
            try:
                response = requests.get(img_url, stream=True)
                if response.status_code == 200:
                    img_path = os.path.join(temp_dir, f"product_{i}.jpg")
                    with open(img_path, 'wb') as f:
                        for chunk in response.iter_content(1024):
                            f.write(chunk)
                    image_paths.append(img_path)
            except Exception as e:
                print(f"Error downloading image {img_url}: {str(e)}")
        
        if not image_paths:
            print("No valid images to post")
            return False
            
        # Create caption
        caption = f"""✨ {product.get('title', 'New Product')} ✨

📝 {product.get('description', '')}

👨\u200d🎨 Artisan: {product.get('artisan_name', 'Unknown')}
📍 {product.get('location', '')}

#Handmade #ArtisanCraft #LocalArt #Handcrafted #SupportLocal"""
        
        # Post to Instagram
        if len(image_paths) == 1:
            # Single image post
            cl.photo_upload(
                image_paths[0],
                caption=caption
            )
        else:
            # Album post - upload all photos at once
            cl.album_upload(
                image_paths,
                caption=caption
            )
            
        print("Successfully posted to Instagram!")
        return True
        
    except Exception as e:
        print(f"Error posting to Instagram: {str(e)}")
        import traceback
        traceback.print_exc()  # Print full traceback
        return False
    finally:
        # Clean up temp files
        for path in image_paths:
            try:
                if os.path.exists(path):
                    os.remove(path)
            except Exception as e:
                print(f"Error removing temp file {path}: {str(e)}")

# Example usage
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Artisan Product Manager')
    subparsers = parser.add_subparsers(dest='command')
    
    # Add Artisan command
    add_artisan_parser = subparsers.add_parser('add_artisan')
    add_artisan_parser.add_argument('--name', required=True)
    add_artisan_parser.add_argument('--email', required=True)
    add_artisan_parser.add_argument('--phone', required=True)
    add_artisan_parser.add_argument('--location', required=True)
    add_artisan_parser.add_argument('--bio', required=True)
    add_artisan_parser.add_argument('--profile_pic')
    
    # Add Product command
    add_product_parser = subparsers.add_parser('add_product')
    add_product_parser.add_argument('--artisan_id', required=True)
    add_product_parser.add_argument('--title', required=True)
    add_product_parser.add_argument('--description', required=True)
    add_product_parser.add_argument('--price', type=float, required=True)
    add_product_parser.add_argument('--category', required=True)
    add_product_parser.add_argument('--images', nargs='+', required=True)
    add_product_parser.add_argument('--location')
    
    # Post to Instagram command
    post_parser = subparsers.add_parser('post_latest')
    
    args = parser.parse_args()
    
    if args.command == 'add_artisan':
        add_artisan(
            args.name, args.email, args.phone, 
            args.location, args.bio, args.profile_pic
        )
    elif args.command == 'add_product':
        add_product(
            args.artisan_id, args.title, args.description,
            args.price, args.category, args.images, args.location
        )
    elif args.command == 'post_latest':
        product = get_latest_product()
        if product:
            post_to_instagram(product)
    else:
        parser.print_help()
