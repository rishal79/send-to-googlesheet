# ✉️ Contact Form with Google Sheets Backend (No Backend Server Needed)

This project shows how to create a simple, secure HTML contact form that submits data directly to a Google Sheet using Google Apps Script – no backend required.

---

## ✅ Features

- Save contact form submissions to Google Sheets
- Uses only HTML, JavaScript, and Google Apps Script
- Works without a backend server
- Includes automatic timestamp (date) logging
- Supports CORS-friendly `FormData` POST submission




## ⚙️ How to Set Up (Step-by-Step)

### Step 1. 📄 Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com).
2. Create a new spreadsheet.
3. Rename the first tab to: `Sheet1` (or anything you like).
4. In **row 1**, enter the following headers:
   
```
Name | Email | Message | Date
```

### Step 2. ⚡ Set Up Google Apps Script

1. Click **Extensions → Apps Script** in your Google Sheet.
2. Replace the default code with this:

```javascript
const sheetName = 'Sheet1'; // 🔁 Replace 'Sheet1' with your actual sheet name if different
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function formatDate(date) {
return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd-MM-yyyy HH:mm');
}

function doPost(e) {
const lock = LockService.getScriptLock();
lock.tryLock(10000);

try {
 const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
 const sheet = doc.getSheetByName(sheetName);
 const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
 const nextRow = sheet.getLastRow() + 1;

 const newRow = headers.map(header => {
   return header === 'Date' ? formatDate(new Date()) : e.parameter[header];
 });

 sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

 return ContentService
   .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
   .setMimeType(ContentService.MimeType.JSON);
} catch (e) {
 return ContentService
   .createTextOutput(JSON.stringify({ result: 'error', error: e }))
   .setMimeType(ContentService.MimeType.JSON);
} finally {
 lock.releaseLock();
}
}
```
3.Save the script.

4.Select intialSetup in the dropdown and click ▶️ Run (it stores the Sheet ID).

5.Click Deploy →  New Deployment:
  - click settings
    
  - Select Web App
  
  - Set Execute as: Me
  
  - Set Who has access: Anyone (or Anyone with link)
  
  - Deploy and copy the web app URL.
    



### Step 3. create the html file
  
  - ⚠️ Important: The name attributes of the form fields must exactly match the header names in your Google Sheet (e.g., Name, Email, Message).
  
  - ⚠️ The form id must match what is referenced in your JavaScript (contactForm).



### Step 4.Paste the Web App URL into script.js

```javascript
    const scriptURL = 'YOUR_DEPLOYED_WEB_APP_URL'; // ← Paste your web app URL here
```



## 🛠️ Debugging Tips
  - If submissions aren’t appearing:

    - Check if the Sheet tab name matches sheetName
    
    - Make sure headers (Name, Email, Message, Date) are spelled exactly
    
    - Check Apps Script → Executions for logs or errors
    
    - Spreadsheet must be shared with Anyone with the link or set the Web App to “Anyone”



## 📌 Note on Security
  - Google Apps Script deployed as a web app is public (unless secured).
  
  - Do not use this to collect sensitive data like passwords or private info.
      
    
##  Support
If this project helped you or saved you time, please consider giving it a ⭐️ on GitHub! <br/>
Your support encourages me to improve and maintain this project. 

If you face any issues, feel free to open an issue — I'm happy to help!
