console.log("test")

let base  = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


let map = L.map("map", {
    center: [
        53, 53
    ],
    zoom: 2.5
});

base.addTo(map); // Add the base tile to the map


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then(function(data){

let legend = L.control({ //create a legend
    position: "topright"
});

function setUp(feature){
        //console.log(feature.geometry.coordinates[2])
        return {
              //set color by depth
            opacity: 1,
            fillOpacity: 0.5,
            color: "#000000",
            radius: radiusMag(feature.properties.mag),
            weight: 0.5,
            stroke: true,
            fillColor: colorDepth(feature.geometry.coordinates[2]),
            //color: "#ffffff"
        };
    }

    function colorDepth(depth){
        //establish depths
        switch (true) {
            case depth > 300:
                return "#8b2cea";
            case depth > 200:
                console.log("200")

                return "#9744ec";
            case depth > 100:
              return "#a45bef";
            case depth > 50:
              return "#b172f1";
            case depth > 25:
              return "#be89f3";
            case depth > 10:
              return "#cba0f6";
            case depth > 5:
              return "#d7b8f8";
            default:
              return "#f6effd";
          }
    }

    function radiusMag(magn) {
        return magn*5;
      }

    L.geoJson(data, {
        style: setUp,

        

        onEachFeature: function(feature, layer){
            layer.bindPopup(
                "Depth: "
                + feature.geometry.coordinates[2]
                + "<br>Location: "
                + feature.properties.place
                + "</br>Magnitude: "
                +feature.properties.mag
            );
        },

        pointToLayer: function (feature, point) {
            return L.circleMarker(point);
          },

    }).addTo(map)


    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legfedn")

        let steps = [0, 5, 10, 25, 50, 100, 200, 300]

        //add step values to legend
        for (let i = 0; i < steps.length; i++) {
            div.innerHTML += steps[i] + (steps[i + 1] ? "&ndash;" + steps[i + 1] + "<br>" : "+");
          }
          return div;
        

    
    }//.addTo(map)
    legend.addTo(map);

});