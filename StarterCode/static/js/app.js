
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
    
    // Creating Bar Chart Info 

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

    // Creating Bubble Chart Info 

    console.log(data.samples[0].sample_values.length); //80
    var initBubbleSampleValuesArray = []
    var initBubbleOtuIdNumArray = []
    var initBubbleOtuLabelsArray = []

    for (var i=0; i < data.samples[0].sample_values.length; i++) {
        
        var initBubbleSampleValue = data.samples[0].sample_values[i];
        initBubbleSampleValuesArray.push(initBubbleSampleValue);
        
        var initBubbleOtuIdNum = data.samples[0].otu_ids[i];
        initBubbleOtuIdNumArray.push(initBubbleOtuIdNum);
        
        var initBubbleOtuLabel = data.samples[0].otu_labels[i]
        initBubbleOtuLabelsArray.push(initBubbleOtuLabel);
    }

    // Creating Fuction That Builds All Charts 

    function init() {
        var trace = {
            type: "bar",
            x: initSampleValueArrayR,
            y: initOtuIdArrayR,
            text: initOtuLabelsArrayR, 
            orientation: 'h'
        };

        var layout = {
            title: "Top 10 Bacteria Cultures Found"
        };

        var data = [trace];

        Plotly.newPlot("bar", data, layout);

        var bubbleTrace = {
            x: initBubbleOtuIdNumArray,
            y: initBubbleSampleValuesArray,
            text: initBubbleOtuLabelsArray,
            mode: 'markers',
            marker: {
                color: initBubbleOtuIdNumArray,
                size: initBubbleSampleValuesArray
            }
        }

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            height: 575,
            width: 1300
        };

        var bubbleData = [bubbleTrace];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

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

        // Bar Chart Arrays
        var SampleValueArray = []; 
        var OtuIdArray = [];
        var OtuLabelsArray = [];

        // Bubble Chart Arrays
        var bubbleSampleValuesArray = []
        var bubbleOtuIdNumArray = []
        var bubbleOtuLabelsArray = []

        var counterNum = 0 
        
        for (var i=0; i < sampleNames.length; i++) {
            if (userSelectId === data.samples[i].id) {
                console.log("Match Found!");
                
                // Bar Chart 
                for (var i=0; i < 10; i++) {
                    var SampleValue = data.samples[counterNum].sample_values[i];
                    SampleValueArray.push(SampleValue);
                    var OtuId = `OTU ${data.samples[counterNum].otu_ids[i]}`;
                    OtuIdArray.push(OtuId);
                    var OtuLabels = data.samples[counterNum].otu_labels[i];
                    OtuLabelsArray.push(OtuLabels);
                }
                var SampleValueArrayR = SampleValueArray.reverse();
                var OtuIdArrayR = OtuIdArray.reverse();
                var OtuLabelsArrayR = OtuLabelsArray.reverse();

                console.log(`Data For ID (BarChart): ${data.samples[counterNum].id}`)
                console.log(SampleValueArrayR);
                console.log(OtuIdArrayR);
                console.log(OtuLabelsArrayR);
                updateBarPlotly(SampleValueArrayR, OtuIdArrayR, OtuLabelsArrayR);

                // Bubble Chart 
                for (var i=0; i < data.samples[counterNum].sample_values.length; i++) {
                    
                    var bubbleSampleValue = data.samples[counterNum].sample_values[i];
                        bubbleSampleValuesArray.push(bubbleSampleValue);
        
                    var bubbleOtuIdNum = data.samples[counterNum].otu_ids[i];
                        bubbleOtuIdNumArray.push(bubbleOtuIdNum);
        
                    var bubbleOtuLabel = data.samples[counterNum].otu_labels[i]
                        bubbleOtuLabelsArray.push(bubbleOtuLabel);
                }

                updateBubbleChart(bubbleSampleValuesArray, bubbleOtuIdNumArray, bubbleOtuLabelsArray);
                console.log("Update Bubble Chart Complete!")
                
                break;
            }
            counterNum++;
        }

        function updateBarPlotly(newXAxis, newYAxis, newLabels) {
            Plotly.restyle("bar", "x", [newXAxis]);
            Plotly.restyle("bar", "y", [newYAxis]);
            Plotly.restyle("bar", "text", [ newLabels]);
        }

        function updateBubbleChart(bubSampleValues, bubOtuIds, bubOtuLabels) {
            Plotly.restyle("bubble", "x", [bubOtuIds]);
            Plotly.restyle("bubble", "y", [bubSampleValues]);
            Plotly.restyle("bubble", "text", [bubOtuLabels]);
            Plotly.restyle("bubble", "color", [bubOtuIds]);
            Plotly.restyle("bubble", "size", [bubSampleValues]);
        }

        //data.samples[counterNum].otu_ids[i].length ? To find the length of that specific array
    
    });

}
