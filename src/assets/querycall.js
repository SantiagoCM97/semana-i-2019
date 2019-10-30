import {CarbonLDP} from "carbonldp";

export default function init() {
    const carbonldp = new CarbonLDP("https://data-itesm.lab.base22.com/");

    // Executing a "raw" SPARQL query

    carbonldp.documents.$executeSELECTQuery(
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
        console.log("Raw SPARQL query result");
        console.log(response);
        const keywordDiv = document.querySelector("#keyword");
        response.bindings.forEach((keyword) => {
            const p = document.createElement("p");
            p.appendChild(document.createTextNode(keyword.label + " "));
            p.appendChild(document.createTextNode(keyword.count));
            keywordDiv.appendChild(p);
        });
    })
}