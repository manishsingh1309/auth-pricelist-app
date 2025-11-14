# Assets Directory - Setup Instructions

## 📁 Directory Structure

```
frontend/src/assets/
├── images/
│   ├── diamond.png      (Logo icon)
│   ├── GB.png           (British flag - 24x16px recommended)
│   ├── SE.png           (Swedish flag - 24x16px recommended)
│   └── sverige43.jpg    (Background image - 1920x1080px recommended)
└── README.md
```

## 🖼️ Image Requirements

### 1. diamond.png
- **Purpose**: Main logo icon for the application
- **Recommended size**: 40x40px or higher resolution
- **Format**: PNG with transparency
- **Source**: 123Fakturera logo

### 2. GB.png (British Flag)
- **Purpose**: English language selector flag
- **Recommended size**: 24x16px
- **Format**: PNG
- **Aspect ratio**: 3:2

### 3. SE.png (Swedish Flag)
- **Purpose**: Swedish language selector flag
- **Recommended size**: 24x16px
- **Format**: PNG
- **Aspect ratio**: 3:2

### 4. sverige43.jpg
- **Purpose**: Login page background image
- **Recommended size**: 1920x1080px or higher
- **Format**: JPG
- **Description**: Swedish lake/nature scene with red houses

## 📥 How to Add Images

1. Download the images from the reference website or use the provided attachments
2. Place them in the `frontend/src/assets/images/` directory
3. Ensure the filenames match exactly as listed above
4. The application will automatically import and use them

## 🔗 Image Sources

All images are referenced from https://online.123fakturera.se for educational/portfolio purposes:

- Logo: https://storage.123fakturera.se/public/icons/diamond.png
- GB Flag: https://storage.123fakturere.no/public/flags/GB.png
- SE Flag: https://storage.123fakturere.no/public/flags/SE.png
- Background: https://storage.123fakturera.se/public/wallpapers/sverige43.jpg

## ⚠️ Important Notes

- Make sure all images are optimized for web use
- Keep file sizes reasonable (background < 500KB recommended)
- Images are imported directly in React components using ES6 imports
- If images are missing, the app will show broken image icons

## 🚀 For Deployment

When deploying to production:
1. Ensure all images are committed to the repository
2. Images will be bundled with the application during build
3. Vite will optimize and hash the filenames automatically
