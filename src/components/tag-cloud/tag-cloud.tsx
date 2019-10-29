import { Component, Prop, h, Method, State, Element } from '@stencil/core';

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


render() {
    
    //const items = this.data.keyItems;
    const items = [{keyword: "ninja",  uri: "https://www.facebook.com", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15}];  
    return ( 
        <ul>
            {items.map((item)=> (<li><a href={item.uri} data-weight={item.weight}>{item.keyword}</a></li>))}
        </ul>
    );
}
}