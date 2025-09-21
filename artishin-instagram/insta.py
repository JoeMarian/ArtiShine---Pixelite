#!/usr/bin/env python3
import os
import sys
import argparse
from dotenv import load_dotenv
from instagrapi import Client


def build_caption() -> str:
    # Fancy, emoji-rich caption per your request
    return (
        "👐✨ Handcrafted Terracotta Bowl ✨👐\n\n"
        "🌿 Where ancient traditions meet modern beauty 🌿\n\n"
        "This beautiful ceramic piece represents hours of careful craftsmanship, "
        "shaped by hands that have learned techniques passed down through generations. "
        "Each curve and line tells a story of dedication, patience, and artistic vision.\n\n"
        "—\n"
        "🌸 Materials: Natural clay & earth-fired finish\n"
        "🧡 Made with love by local artisans\n"
        "🏡 Perfect for decor, gifting, or everyday elegance\n\n"
        "#Terracotta #Handcrafted #ArtisanMade #SlowCraft #HomeDecor #CeramicArt #SupportLocal"
    )


def ensure_env(var_name: str) -> str:
    value = os.getenv(var_name)
    if not value:
        print(f"Error: Missing required environment variable {var_name} in .env", file=sys.stderr)
        sys.exit(1)
    return value


def main():
    parser = argparse.ArgumentParser(description="Upload a single image to Instagram with a preset caption.")
    parser.add_argument("--image", required=False, help="Path to the image file to upload (optional; defaults to hardcoded path)")
    parser.add_argument("--caption", required=False, help="Optional custom caption (overrides preset)")
    args = parser.parse_args()

    # Load env vars
    load_dotenv()
    username = ensure_env("INSTAGRAM_USERNAME")
    password = ensure_env("INSTAGRAM_PASSWORD")

    # Default image path (as requested)
    default_image_path = "/Users/joemarian/Desktop/ArtiShine/sample1.jpeg"
    image_path = os.path.abspath(args.image) if args.image else os.path.abspath(default_image_path)

    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}", file=sys.stderr)
        sys.exit(1)

    if not args.image:
        print(f"ℹ️ Using default image path: {image_path}")

    caption = args.caption if args.caption else build_caption()

    try:
        cl = Client()
        # Optional: configure device or settings here if needed
        cl.login(username, password)
        print("✅ Logged in to Instagram")

        cl.photo_upload(image_path, caption=caption)
        print("🎉 Successfully uploaded the photo to Instagram!")
    except Exception as e:
        print(f"❌ Upload failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
