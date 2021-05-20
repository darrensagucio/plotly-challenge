
d3.json("samples.json").then((importedData) => {
    var data = importedData;
    console.log("WELCOME TO CONSOLE!");
    console.log(data);

    var sampleNames = data.names;

    //Create Dropdown Menu
    for (var i=0; i < sampleNames.length; i++) {
        
        //https://stackoverflow.com/questions/5182772/append-option-to-select-menu/5182820
        
        var option = document.createElement("option");
        option.text = sampleNames[i];
        option.value = sampleNames[i];
        var select = document.getElementById("selDataset");
        select.appendChild(option);
    }
   
    var initSampleValueArray = []; 
    var initOtuIdArray = []; 
    var initOtuLabelsArray = [];

    for (var i=0; i < 10; i++) {
        var initSampleValue = data.samples[0].sample_values[i];
        initSampleValueArray.push(initSampleValue);
        var initOtuId = `OTU ${data.samples[0].otu_ids[i]}`;
        initOtuIdArray.push(initOtuId);
        var initOtuLabels = data.samples[0].otu_labels[i];
        initOtuLabelsArray.push(initOtuLabels);
    }
   
    var initSampleValueArrayR = initSampleValueArray.reverse();
    var initOtuIdArrayR = initOtuIdArray.reverse();
    var initOtuLabelsArrayR = initOtuLabelsArray.reverse();

    function init() {
        var trace = {
            type: "bar",
            x: initSampleValueArrayR,
            y: initOtuIdArrayR,
            text: initOtuLabelsArrayR, 
            orientation: 'h'
        }

        var layout = {
            title: "Top 10 Bacteria Cultures Found"
        };

        var data = [trace];

        Plotly.newPlot("bar", data, layout);

    }

    init();

});

// When User Clicks A Different ID On Dropdown Menu 

function optionChanged() {
    d3.json("samples.json").then((importedData) => {

        var data = importedData;
        console.log(data);

        var sampleNames = data.names;
        
        // On change to the DOM, call optionChanged()
        d3.selectAll("#selDataset").on("change", optionChanged);

        var menu = d3.select("#selDataset");

        var userSelectId = menu.property("value");
        console.log("Success!");
        console.log(`User clicked on ID: ${userSelectId}`);

        var SampleValueArray = []; 
        var OtuIdArray = []; 

        var counterNum = 0 
        
        for (var i=0; i < sampleNames.length; i++) {
            if (userSelectId === data.samples[i].id) {
                console.log("Match Found!");
                console.log(`Data For ID: ${data.samples[counterNum].id}`)
                for (var i=0; i < 10; i++) {
                    var SampleValue = data.samples[counterNum].sample_values[i];
                    SampleValueArray.push(SampleValue);
                    var OtuId = `OTU ${data.samples[counterNum].otu_ids[i]}`;
                    OtuIdArray.push(OtuId);
                }
                var SampleValueArrayR = SampleValueArray.reverse();
                var OtuIdArrayR = OtuIdArray.reverse();
                updateBarPlotly(SampleValueArrayR, OtuIdArrayR);
                break;
            }
            counterNum++;
        }

        console.log(SampleValueArrayR);
        console.log(OtuIdArrayR);

        function updateBarPlotly(newXAxis, newYAxis) {
            Plotly.restyle("bar", "x", [newXAxis]);
            Plotly.restyle("bar", "y", [newYAxis]);
        }
    
    });

}
