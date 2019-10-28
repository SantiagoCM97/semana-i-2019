import { Component, Prop, h,Event ,EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'tag-cloud',
  styleUrl: 'tag-cloud.css',
  shadow: true
})
export class TagCloud {
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

    const items = this.data.keyItems;

    return (
      <div class="my-tag-cloud">
            {items.map((item)=> (<a href={item.uri} data-weight={item.weight}>{item.keyword}</a>))}
      </div>
    );
    );
  }

}
