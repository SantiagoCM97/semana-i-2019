function startTagCloud() {
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
};