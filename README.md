# Speech to Text for Retool

A Custom Component for Retool that adds **Speech to Text** capability.

[![npm version](https://badge.fury.io/js/@eloquentops%2Fretool-plugin-speech2text.svg)](https://badge.fury.io/js/@eloquentops%2Fretool-plugin-speech2text)

> [!NOTE]
>
> It requires, only the first time, the permission from the browser to use the microphone.

> [!WARNING]
>
> Please refer to the  [official documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) of the **SpeechRecognition** capability about browsers compatibility and different implementations between vendors. We've only tested successfully on Google Chrome.

## Installation

Drag a Custom Component into your canvas in a Retool app.

Put this code into the `IFrame Code` area of the Custom Component:

```html
<script src="https://unpkg.com/@eloquentops/retool-plugin-speech2text"></script>
```

Allow the following checkbox in the `interaction` section of the Custom Component:
- [x] Microphone
- [x] Storage and cookies


## Configuration

You can add options in the `Model` such this example (values are the default). 

> [!IMPORTANT]
>
> An empty object `{}` is required! Do not leave empty.

```js
{
    lang: 'en-US',
    continuous: false,
    interimResults: true,
    maxAlternatives: 1,
}
```

Please refer to this [official documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) about the `SpeechRecognition` options.

Further options are:

```js
{
  keepActive: true,
  labelStart: 'Start',
  labelStop: 'Stop'
}
```

`keepActive` is a custom option that force the restart of the speech in case of silence. Otherwise the `SpeechRecognition` will close automatically after few seconds of silence.

The component renders a single button, thus, you can configure labels of the two states.

> [!IMPORTANT]
>
> Right now, when you change an option in the Model, you need to reload the component, because `SpeechRecognition` cannot be reset at runtime. If you need to set an option through another component at runtime, such as select the language, you can trigger a custom component reload during on-change event of the select component.

## How to get back the text

Fair question. The component exposes two additional properties in its model:

```js
{
  lastMessage: '', // String
  messages: [] // Array of strings
}
```

So, you can bind them to your Retool components as you normally would do, such as:

```
Last message: {{customComponent2.model?.lastMessage}}
```

## Licence

This plugin is released under the [3-Clause BSD license](LICENSE).

Copyright © 2023 Fabio Franchino, [https://fabiofranchino.com](https://fabiofranchino.com)