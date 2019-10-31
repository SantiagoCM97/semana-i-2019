import { Component, h, Prop, Method, Event, EventEmitter} from '@stencil/core';
import {CarbonLDP} from "carbonldp";
import '../../assets/tagcanvas.js'

@Component({
    tag: 'tag-cloud',
    styleUrl: 'tag-cloud.css',
    shadow: false
})
export class TagCloud {    
    carbonldp = new CarbonLDP("https://data-itesm.lab.base22.com/");
    addCloud() {
        TagCanvas.Start('myCanvas','tags', {
                textFont: 'Roboto',
                textColour: '#ff970c',
                reverse: true,
                depth: 2,
                interval: 20, // espacio entre palabras.
                minBrightness: 0.1,
                pulsateTo: 0.2,
                pulsateTime: 0.75,
                initial: [0.1,-0.1],
                decel: 0.98,
                hideTags: false,
                shadow: '#ccf',
                shadowBlur: 3,
                weight: true,
                weightFrom: 'data-weight',
                fadeIn: 800,
                maxSpeed: 0.05
        });
    }

    @Prop() info = [];
    @Method() async assignWeights() {
        var tempArr = [];
    
        // Insert the values from each result into an array
        this.info.forEach((item : any) => {
            if(item && item.label && item.count)
                tempArr.push({
                    keyword: item.label || "",
                    weight: item.count || ""
                })
        });

        // Assign data-weights based on a tier depending on array position
        var lastPos = 0;
        // Tier 1 (top 5%)= data-weight of 20
        while (tempArr.length * 0.05 > lastPos) {
            tempArr[lastPos].weight = 20;
            lastPos++;
        }
        // Tier 2 (next 20%) = data-weight of 18
        while (tempArr.length * 0.2 > lastPos) {
            tempArr[lastPos].weight = 18;
            lastPos++;
        }
        // Tier 3 (next 50%) = data-weight of 15
        while (tempArr.length * 0.5 > lastPos) {
            tempArr[lastPos].weight = 15;
            lastPos++;
        }
        // Tier 4 (next 20%)= data-weight of 13
        while (tempArr.length * 0.7 > lastPos) {
            tempArr[lastPos].weight = 13;
            lastPos++;
        }
        // Tier 5 (bottom 5%)= data-weight of 10
        while (tempArr.length > lastPos) {
            tempArr[lastPos].weight = 10;
            lastPos++;
        }

        // Array randomization for random tag cloud positions
        tempArr.sort(() => Math.random() - 0.5);

        this.info = tempArr;
        return;
    }

    componentDidUpdate(){
        if (this.info.length) {
          this.addCloud();
        }
    }

    @Event() myCustomEvent: EventEmitter;
    private myEvent(item){
        this.myCustomEvent.emit(item);
    }

  render() {
    if (this.info.length > 0) {
        this.assignWeights();
        return (
            <div>
                <div id="myCanvasContainer">
                    <canvas width="1000" height="300" id="myCanvas">
                    </canvas>
                </div>
                <div id='tags'>
                        {this.info.map((item)=> (<li><a href="#" onClick={() => item.myEvent(item)}data-weight={item.weight}>{item.keyword}</a></li>))}
                </div>
            </div>
            );
        }
    }
}
