# Process Attachment List component

Displays attached documents on a specified process instance

<!-- markdown-toc start - Don't edit this section.  npm run toc to generate it-->

<!-- toc -->

- [Basic Usage](#basic-usage)
  * [Properties](#properties)
  * [Events](#events)

<!-- tocstop -->

<!-- markdown-toc end -->

## Basic Usage

```html
<adf-process-attachment-list
    [processInstanceId]="YOUR_PROCESS_INSTANCE_ID"
    (attachmentClick)="YOUR_ATTACHMENT_CLICK_EMITTER_HANDLER">
</adf-process-attachment-list>
```

### Properties

| Name | Type | Description |
| --- | --- | -- |
| processInstanceId | string | (**required**): The ID of the process instance to display |
| disabled | boolean | false | Disable/Enable read only mode for attachement list |

### Events

| Name | Description |
| --- | --- |
| attachmentClick | Raised when the attachment double clicked or selected view option from context menu by the user from within the component and return a Blob obj of the object clicker|
| success | Raised when the attachment list fetch all the attach and return a list of attachments |
| error | Raised when the attachment list is not able to fetch the attachments for example network error   |
