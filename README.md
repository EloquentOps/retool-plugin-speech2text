## Speech to Text for Retool

Custom component for Retool to add Speech to Text capability.

### Installation

Put this code into the `IFrame` panel of a Retool Custom Component:

```html
<script src="https://unpkg.com/@eloquentops/retool-plugin-speech2text"></script>
```


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

