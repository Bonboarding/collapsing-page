<img width="460" alt="Collapsing Page Effect" src="https://bonboarding.fra1.digitaloceanspaces.com/collapsing-page/header.png">

## Collapsing page effect on your website

<img alt="Collapsing Page Effect demonstration" src="https://bonboarding.fra1.digitaloceanspaces.com/collapsing-page/collapse.gif">

👀 Or [try it yourself](https://htmlpreview.github.io/?https://github.com/Bonboarding/collapsing-page/blob/main/example/build/index.html), by clicking on the **Logout** button in the demo page.

## Installation

```bash
npm install --save collapsing-page
```

## Usage

```jsx
import React, { useState } from 'react';
import CollapsingPage from 'collapsing-page';

const Example = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <React.Fragment>
      <button type="button" onClick={() => setCollapse(true)}>
        Destroy page
      </button>

      <CollapsingPage collapse={collapse}>
        <div className="after-collapse">
          <h1>This will stay when everything else's gone</h1>
        </div>
      </CollapsingPage>
    </React.Fragment>
  );
};
```

The children of the `CollapsingPage` component will stay visible after the collapse.

**⚠️ Note:** to keep the children visible after the collapse, set their position to `fixed` and a `z-index: -1` to make it look cool.

You can find a fully-working example in the `example` folder.

## Props

The only prop that's required is `collapse` which is a boolean.  
Once it's changing to `true`, the collapse effect starts animating.

| name     | type                 | description                                                             |
| -------- | -------------------- | ----------------------------------------------------------------------- |
| collapse | boolean **required** | setting it to true triggers the collapsing animation                    |
| duration | number               | the maximum duration of the animation in milliseconds (8000 by default) |
| onFinish | function             | a callback function that is executed when the animation is over         |

## Using without React

If you don't use React, you can still execute the collapsing page animation.

```jsx
import { collapsePage } from 'collapsing-page';

function logout() {
  collapsePage({
    excludedElement: document.querySelector('#goodbye'),
    onFinish: function () {
      alert('See you soon!');
    }
  });
}
```

### Parameters

| name            | type        | description                                                                                                                                                                                   |
| --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| excludedElement | DOM element | a reference to a DOM element that should stay visible after the collapse (it should be a direct child of the body, otherwise it's parents will be collapsed so it will not be visible either) |
| duration        | number      | the maximum duration of the animation in milliseconds (8000 by default)                                                                                                                       |
| onFinish        | function    | a callback function that is executed when the animation is over                                                                                                                               |

## License

MIT © [Bonboarding](https://github.com/bonboarding)
