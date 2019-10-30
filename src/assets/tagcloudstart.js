window.onload = function() {
    try {
        TagCanvas.Start('myCanvas', {
            textFont: 'Roboto',
            textColour: '#ff970c',
            outlineColour: '#08454a',
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
        console.log("Entra Aqi");
    } catch(e) {
        console.log(e);
        
        // something went wrong, hide the canvas container
    }
};