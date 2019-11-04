### tl;dr

In an integration test, using the test helper `triggerKeyEvent` on an input inside a `<form>` does not submit the `<form>`.

### Setup

This question is based on the demo repo https://github.com/bartocc/so-enter-key-integration-test

This demo Ember.js app contains the `<XFoo>` component. When rendered, it displays a simple `<form>` with a text input and a submit button.

The `<form>` has an action bound on its `submit` event that will set the component's `submitted` property to `true`. By default, it is `false`.

The desired behaviour is to display a thank you message instead of the `<form>` after submitting it.

Here is the component's template:

```hbs
{{#if this.submitted}}
  <span>
    Thank you for your submission
  </span>
{{else}}
  <form {{action (mut this.submitted) true on="submit"}}>
    {{! template-lint-disable self-closing-void-elements }}
    <input type="text" />
    <button type="submit">
      Save
    </button>
  </form>
{{/if}}
```

I've added 2 integration tests for `<XFoo>`:

- one tries to send the `Enter` keydown event to the `<input>` tag with the code

```js
await render(hbs`<XFoo />`);
await triggerKeyEvent('input', 'keydown', 'Enter');
```

- the other clicks the submit button with

```js
await render(hbs`<XFoo />`);
await click('button');
```

Both tests check the presence of the thank you message with:

```js
assert.dom('span').hasText('Thank you for your submission', 'displays the thank you span');
```

The first test fails, the second one passes.

I would like to understand why using `triggerKeyEvent` does not submit the form.
