import { Component, h, State, Method, Event} from '@stencil/core';
import {CarbonLDP} from "carbonldp";
import '../../assets/tagcanvas.js'

@Component({
    tag: 'tag-cloud',
    styleUrl: 'tag-cloud.css',
    shadow: false
})
export class TagCloud {
    /**
   * The first name
   */    
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

   @State() info = [];
   @Method() async fetchTags () {
    return this.carbonldp.documents.$executeSELECTQuery(
        `
        SELECT ?keyword ?label (COUNT(?label) AS ?count)
        WHERE {
            <https://data-itesm.lab.base22.com/movies/> <http://www.w3.org/ns/ldp#contains> ?movie .
            ?movie <http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#Keyword> ?keyword .
            ?keyword <http://www.w3.org/2000/01/rdf-schema#label> ?label .
        }
        GROUP BY ?keyword ?label
        ORDER BY DESC(?count)
        LIMIT 200
        `
        ).then((response) => {

            var tempArr = [];

            response.bindings.forEach((item : any) => {
                if(item && item.label && item.count)
                    tempArr.push({
                        keyword: item.label || "",
                        weight: item.count || ""
                    })

            });
            this.info = tempArr;
            return;

        });
    }
    componentDidUpdate(){
        if(this.info.length){
          this.addCloud();
      }
  }
    @Event() myCustomEvent: EventEmitter;
    private myEvent(item){
        this.myCustomEvent.emit(item);
    }

  render() {
    if (this.info.length == 0) {
        this.fetchTags();
    }
    if(this.info.length > 0) 
        //const items = this.data.keyItems;
        //const items = [{keyword: "ninja",  uri: "https://www.facebook.com", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15}];  
        return (
            <div>
                <div id="myCanvasContainer">
                    <canvas width="1000" height="300" id="myCanvas">
                    </canvas>
                </div>
                <div id='tags'>
                        {this.info.map((item)=> (<li><a  onClick={() => this.myEvent(item)} data-weight='15'>{item.keyword}</a></li>))}
                </div>
            </div>

            );
    }
}
