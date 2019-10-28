import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() data: any = { items: []};

  render() {

    const items = this.data.items;

    return items.map( item => <div>{item.name}</div>);
  }
}
