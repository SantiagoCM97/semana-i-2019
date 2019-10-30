import {Component, Prop, h,Event ,EventEmitter, Method} from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() data: any = { keyItems: []};


  @Method() async printConsoleLog(){
    console.log("method");
  }

  @Event() myCustomEvent: EventEmitter;

  private myEvent(item){
    this.myCustomEvent.emit(item);
  }

  render() {

    const items = this.data.items;

    return (
      <div class="my-class">
        {items.map((item)=> (<div onClick={() => this.myEvent(item)}>{item.name}</div>))}
      </div>
    );
  }
}
