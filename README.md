## Speech to Text for Retool

A Custom Component for Retool that adds Speech to Text capability.

It requires, the first time, the permission from the browser to use the microphone.

**Heads up! **

**It ONLY works with Google Chrome because it uses the Chrome SpeechRecognition capability (that is based on Google CLoud API)**

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

You can add options in the `Model` such this example (values are the default). 
An empty object `{}` is required, though.

```js
{
    lang: 'en-US',
    continuous: false,
    interimResults: true,
    maxAlternatives: 1,
    keepActive: true
}
```

Please refer to this [official documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) about the `SpeechRecognition` options.

`keepActive` is a custom option that force the restart of the speech in case of silence. Otherwise the `SpeechRecognition` will end automatically.

### How to get back the text

Fair question. The component expose two additional properties in its model:

```js
{
  lastMessage: '', // String
  messages: [] // Array of strings
}
```

So, you can bind them to your Retool component as usual you do in Retool.
