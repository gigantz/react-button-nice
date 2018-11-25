# react-button-nice
Adding hover/active effects into your buttons. 

![Screenshot](https://media.giphy.com/media/vxA8ZKUUTiBIumZkJ3/giphy.gif)

[Demo link](https://codesandbox.io/s/rmywll97lq)

```
npm i --save react-button-nice

OR

yarn add react-button-nice
```

#### Using wrapped element background-color and border-radius to generate effect.

```javascript
import ButtonNice from 'react-button-nice';

const btnDefaultStyle = {
  padding: '16px 32px',
  cursor: 'pointer',
  fontSize: 16,
  color: 'white',
  border: 'none',
  borderRadius: '40px',
  outline: 'none',
  width: 300,
};

<ButtonNice>
  <button style={{ ...btnDefaultStyle, backgroundColor: '#843CC7' }}>
    Your button
  </button>
</ButtonNice>
```

#### Component props

| props | default | desc
|------|------|------
|wrapperColor| null| it disables auto-color-matching and use custom color
|speed| 400ms | transition speed
|alpha| 0.4 | opacity for effect
|disabled| false | disabling wrapper and wrapped component

Tested on `Chrome 70+, Firefox 63+, Opera 56+, Safari 12+, Edge 15+, IE 10+`
