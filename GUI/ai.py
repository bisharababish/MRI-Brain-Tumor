import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torch.utils.tensorboard import SummaryWriter
from torchvision import models, transforms
from torchvision.datasets import ImageFolder
from google.colab import drive
from PIL import Image
import pandas as pd
import asyncio
from TikTokApi import TikTokApi
from tiktok_scraper import TikTokScraper

# Mount Google Drive
drive.mount('/content/drive')

# Function for binary conversion
def binary_conversion(image, threshold=0.5):
    return torch.where(image > threshold, torch.tensor(1.0), torch.tensor(0.0))

# Path to the folder containing the labeled images on Google Drive
labeled_images_folder = "/content/drive/MyDrive/Data"
threshold_value = 0.9

# Define transformation for preprocessing
transform = transforms.Compose([
    transforms.Resize((244, 244)),
    transforms.ToTensor(),
    transforms.Lambda(lambda x: binary_conversion(x, threshold=threshold_value))
])

# Create a dataset using ImageFolder
labeled_dataset = ImageFolder(labeled_images_folder, transform=transform)

# Split the dataset into training and validation sets
train_size = int(len(labeled_dataset) * 0.8)
train_dataset, val_dataset = random_split(labeled_dataset, [train_size, len(labeled_dataset) - train_size])

# Create data loaders for the training and validation sets
batch_size = 64
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_dataloader = DataLoader(val_dataset, batch_size=batch_size)

# Initialize TensorBoard writer
writer = SummaryWriter()

# Define the model, criterion, and optimizer
model = models.resnet18(pretrained=True)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 10)  # Assuming 10 output classes
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.001)

# Training loop
num_epochs = 10
patience = 3
early_stopping_counter = 0
best_val_loss = float('inf')

for epoch in range(num_epochs):
    model.train()
    running_train_loss = 0.0

    for inputs, labels in train_dataloader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_train_loss += loss.item() * inputs.size(0)

    epoch_train_loss = running_train_loss / len(train_dataset)

    model.eval()
    running_val_loss = 0.0

    with torch.no_grad():
        for inputs, labels in val_dataloader:
            outputs = model(inputs)
            val_loss = criterion(outputs, labels)
            running_val_loss += val_loss.item() * inputs.size(0)

    epoch_val_loss = running_val_loss / len(val_dataset)

    writer.add_scalar('Loss/train', epoch_train_loss, epoch)
    writer.add_scalar('Loss/validation', epoch_val_loss, epoch)

    print(f'Epoch [{epoch+1}/{num_epochs}], Train Loss: {epoch_train_loss:.4f}, Validation Loss: {epoch_val_loss:.4f}')

    if epoch_val_loss < best_val_loss:
        best_val_loss = epoch_val_loss
        early_stopping_counter = 0
    else:
        early_stopping_counter += 1
        if early_stopping_counter >= patience:
            print("Early stopping triggered!")
            break

writer.close()

# Save the trained model
model_save_path = '/content/drive/MyDrive/Data/my_model_1.pth'
torch.save(model.state_dict(), model_save_path)

# Load the trained model
model.load_state_dict(torch.load(model_save_path))
model.eval()

# Path to the new image data
new_data = "/content/drive/MyDrive/Data/Test/Test0.jpg"

# Load and preprocess the image
image = Image.open(new_data).convert("RGB")
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])
input_data = preprocess(image).unsqueeze(0)

# Predict the label for the new image
with torch.no_grad():
    outputs = model(input_data)
    _, predicted_labels = torch.max(outputs, 1)

print("Predicted Label:", predicted_labels.item())

# TikTok scraping
scraper = TikTokScraper()

# Video URL
video_url = "https://www.tiktok.com/@3zoz.izzet/video/7349114744933418514"

# Fetch video data
video_data = scraper.get_tiktok_video(url=video_url)

# Extract and save information
video_id = video_data['id']
description = video_data['description']
likes = video_data['stats']['diggCount']
shares = video_data['stats']['shareCount']
post_date = video_data['createTime']
video_duration = video_data['video']['duration']
video_views = video_data['stats']['playCount']

df = pd.DataFrame({
    'Video ID': [video_id],
    'Description': [description],
    'Likes': [likes],
    'Shares': [shares],
    'Post Date': [post_date],
    'Video Duration': [video_duration],
    'Video Views': [video_views],
    'Engagement Rate': [(likes + shares) / video_views]
})

csv_file_path = "video_data.csv"
df.to_csv(csv_file_path, index=False)

print(f"Video data saved to {csv_file_path}")

# Async TikTok API
async def main():
    api = await TikTokApi.create_instance()
    trending_videos = await api.get_trending()
    for video in trending_videos:
        print(video)

asyncio.run(main())
