import { render, triggerKeyEvent, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | x-foo', function(hooks) {
  setupRenderingTest(hooks);

  test('triggering the "Enter" keydown event on the <input> tag', async function(assert) {
    await render(hbs`<XFoo />`);
    await triggerKeyEvent('input', 'keydown', 'Enter');

    assert.dom('span').hasText('Thank you for your submission', 'displays the thank you span');
  });

  test('clicking the submit button', async function(assert) {
    await render(hbs`<XFoo />`);
    await click('button');

    assert.dom('span').hasText('Thank you for your submission', 'displays the thank you span');
  });
});
