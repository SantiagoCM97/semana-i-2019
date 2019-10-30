import { Component, h, State, Method} from '@stencil/core';
import {CarbonLDP} from "carbonldp";


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


render() {
    if(this.info.length > 0) 
        //const items = this.data.keyItems;
        //const items = [{keyword: "ninja",  uri: "https://www.facebook.com", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15},{keyword: "ninja",  uri: "", weight: 15}];  
        return (
            <div id="myCanvasContainer">
                <canvas width="300" height="300" id="myCanvas">
                    <ul id="tags">
                        {this.info.map((item)=> (<li><a href="" data-weight={item.weight}>{item.keyword}</a></li>))}
                    </ul>                
                </canvas>
            </div>

        );
}
}
