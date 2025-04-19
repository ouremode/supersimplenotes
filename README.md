
# SuperSimpleNotes


## Installation Instructions

### 1. Install dependencies

Navigate to the project directory in your terminal and run:

```bash
pnpm install
```

### 2. Rebuild native folders

Since the iOS and Android folders have been removed from the ZIP file, you need to rebuild them:

```bash
pnpm prebuild
```


### iOS Simulator

```bash
pnpm ios
```

### Android Emulator

```bash
pnpm android
```

### Start the development server


```bash
pnpm start
```



### Notfications

1. For notifications please follow the instructions in the video and configure `google-services.json`

2. In app.json, specify the path to your Firebase configuration file with the "googleServicesFile" property pointing to your configuration file: `"googleServicesFile": "./google-services.json".`

```
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.ouremode.supersimplenote",
      "googleServicesFile": "./google-services.json"
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "PROJECT_ID"
      }
    },
    "owner": "OWNER"
  }
}
```
