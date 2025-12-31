# GitHub Pages Deployment

This repository is configured to automatically deploy the Resume Builder application to GitHub Pages.

## Automatic Deployment

The application is automatically deployed to GitHub Pages when:
- Code is pushed to the `main` branch
- Code is pushed to the `copilot/create-resume-webpage` branch
- Manual workflow dispatch is triggered

## Setup Instructions

To enable GitHub Pages for this repository:

1. Go to the repository settings on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Build and deployment**:
   - Set **Source** to "GitHub Actions"
4. The workflow will automatically deploy the application

## Accessing the Application

Once deployed, the application will be available at:
```
https://TouchstoneTheDev.github.io/incubyte-v1/
```

Direct link to Resume Builder:
```
https://TouchstoneTheDev.github.io/incubyte-v1/resume
```

## Local Development

The base path is configured for GitHub Pages. For local development:

```bash
cd frontend
npm install
npm run dev
```

The application will run at `http://localhost:5173/`

## Manual Deployment

You can also trigger the deployment manually:
1. Go to **Actions** tab on GitHub
2. Select "Deploy Resume Builder to GitHub Pages"
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## Build Configuration

- **Base Path**: `/incubyte-v1/` (configured in `frontend/vite.config.ts`)
- **Build Output**: `frontend/dist/`
- **Node Version**: 18.x
