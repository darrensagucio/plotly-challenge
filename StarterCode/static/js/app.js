// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }

 // var findArrayZero = unpack(data.samples, 0);
// console.log(findArrayZero);

d3.json("samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

    var sampleNames = data.names;
    console.log(sampleNames);

    var findArrayZero = data.samples[6].id
    console.log(findArrayZero);

    //Create Dropdown Menu
    for (var i=0; i < sampleNames.length; i++) {
        
        //https://stackoverflow.com/questions/5182772/append-option-to-select-menu/5182820
        
        var option = document.createElement("option");
        option.text = sampleNames[i];
        option.value = sampleNames[i];
        var select = document.getElementById("selDataset");
        select.appendChild(option);
    }
    // var initSampleValueTest = data.samples[0].sample_values[0];
    // console.log(initSampleValueTest)

    var initSampleValueArray = []; 
    var initOtuIdArray = []; 

    for (var i=0; i < 10; i++) {
        var initSampleValue = data.samples[0].sample_values[i];
        initSampleValueArray.push(initSampleValue);
        var initOtuId = `OTU ${data.samples[0].otu_ids[i]}`;
        initOtuIdArray.push(initOtuId);
    }
   
    var initSampleValueArrayR = initSampleValueArray.reverse();
    var initOtuIdArrayR = initOtuIdArray.reverse();

    function init() {
        var trace = {
            type: "bar",
            x: initSampleValueArrayR,
            y: initOtuIdArrayR,
            orientation: 'h'
        }

        var data = [trace];

        Plotly.newPlot("bar", data);

    }

    // On change to the DOM, call optionChanged()
    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
        var menu = d3.select("#selDataset");

        var userSelectId = menu.property("value");
       
        var SampleValueArray = []; 
        var OtuIdArray = []; 
        
        for (var i=0; i < sampleNames.length; i++) {
            if (userSelectId === data.samples[i].id[i]) {
                for (var i=0; i < 10; i++) {
                    var SampleValue = data.samples[i].sample_values[i];
                    SampleValueArray.push(SampleValue);
                    var OtuId = `OTU ${data.samples[i].otu_ids[i]}`;
                    OtuIdArray.push(OtuId);
                }
                var SampleValueArrayR = SampleValueArray.reverse();
                var OtuIdArrayR = OtuIdArray.reverse();
                updateBarPlotly(SampleValueArrayR, OtuIdArrayR);
                break;
            }

        }
    }

    function updateBarPlotly(newXAxis, newYAxis) {
        Plotly.restyle("bar", "x", [newXAxis]);
        Plotly.restyle("bar", "y", [newYAxis]);
    }

    init();

});