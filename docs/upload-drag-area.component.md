# Upload Drag Area Component

Adds a drag and drop area to upload files to Alfresco.

<!-- markdown-toc start - Don't edit this section.  npm run toc to generate it-->

<!-- toc -->

- [Basic Usage](#basic-usage)
  * [Properties](#properties)
  * [Events](#events)

<!-- tocstop -->

<!-- markdown-toc end -->

## Basic Usage

```html
<adf-upload-drag-area (onSuccess)="customMethod($event)">
    <div style="width: 200px; height: 100px; border: 1px solid #888888">
        DRAG HERE
    </div>
</adf-upload-drag-area>
<file-uploading-dialog></file-uploading-dialog>
```

```ts
export class AppComponent {

    public onSuccess(event: Object): void {
        console.log('File uploaded');
    }

}
```

### Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | boolean | false | Toggle component disabled state |
| **(deprecated)** enabled | boolean | true | Toggle component enabled state |
| **(deprecated)** showNotificationBar | boolean | true |  Hide/show notification bar. **Deprecated in 1.6.0: use UploadService events and NotificationService api instead.** |
| rootFolderId | string | '-root-' | The ID of the root folder node. |
| **(deprecated)** currentFolderPath | string | '/' | define the path where the files are uploaded. **Deprecated in 1.6.0: use rootFolderId instead.** |
| versioning | boolean | false |  Versioning false is the default uploader behaviour and it renames the file using an integer suffix if there is a name clash. Versioning true to indicate that a major version should be created  | 

### Events

| Name | Description |
| --- | --- |
| onSuccess | Raised when the file is uploaded |
