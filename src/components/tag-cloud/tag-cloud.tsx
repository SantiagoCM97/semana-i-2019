import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tag-cloud',
  styleUrl: 'tag-cloud.css',
  shadow: true
})
export class TagCloud {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
