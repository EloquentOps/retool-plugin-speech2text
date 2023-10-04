## Speech to Text for Retool

Custom component for Retool to add Speech to Text capability.

It requires, the first time, the permission from the browser to use the microphone.

**Heads up! It ONLY works with Google Chrome because it uses the Chrome SpeechRecognition capability (that is based on Google CLoud API)**

### Installation

Drag a Custom Component into your canvas.

Put this code into the `IFrame Code` area of the Custom Component:

```html
<script src="https://unpkg.com/@eloquentops/retool-plugin-speech2text"></script>
```

Allow the following checkbox in the `interaction` section:
- Microphone
- Storage and cookies


### Configuration

Put this optional object, values are the default:

```js
{
    lang: 'en-US',
    continuous: false,
    interimResults: true,
    maxAlternatives: 1,
    keepActive: true
}
```

Please refer to this official documentation about the `SpeechRecognition` options.

`keepActive` is a custom option that force the restart of the speech in case of silence. Otherwise the `SpeechRecognition` will end automatically.

