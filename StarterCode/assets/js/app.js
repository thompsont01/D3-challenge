// @TODO: YOUR CODE HERE!
function makeChart() {

    let svgWidth = 1000;
    let svgHeight = 500;
    let margin = {

    top: 30,
    right: 50,
    bottom: 90,
    left:120
    };
    
    //set height and width
    let w = svgWidth - margin.left - margin.right;
    let h = svgHeight - margin.top - margin.bottom;
    
    //create wrapper
    let svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    //import
    d3.csv("assets/data/data.csv")
        .then(function(riskData){
    
    //convert strings into ints
        riskData.forEach(function(data) {
            data.age = +data.age;
            data.smokes = +data.smokes;
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
            data.abbr = data.abbr;
            data.income = +data.income;
        });

        let xLinearScale = d3.scaleLinear()
            .domain([8.5, d3.max(riskData, d => d.poverty)])
            .range([0, w]);
    
        let yLinearScale = d3.scaleLinear()
            .domain([3.5, d3.max(riskData, d => d.healthcare)])
            .range([h, 0]);
    
    //generate y axis and x axis
        let xAxis = d3.axisBottom(xLinearScale);
        let yAxis = d3.axisLeft(yLinearScale);
    
        chartGroup.append("g")
        .attr("transform", `translate(0, ${h})`)
        .call(xAxis);
    
        chartGroup.append("g")
        .call(yAxis);
        
    //make datapoints
        let circlesGroup = chartGroup.selectAll("circle")
            .data(riskData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", 10)
            .attr("fill", "lightblue")
            .attr("opacity", ".6")
            .attr("stroke-width", "1")
            .attr("stroke", "black");
    
            chartGroup.select("g")
            .selectAll("circle")
            .data(riskData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("dy",-395)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");
         
            console.log(riskData);

    //y axis label
        chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - 50)
          .attr("x", 0 -250)
          .attr("dy", "1em")
          .attr("class", "axisText")
          .text("Lacks Healthcare (%)");
    
    //x axis label
        chartGroup.append("text")
          .attr("transform", `translate(${w / 2.5}, ${h + margin.top + 25})`)
          .attr("class", "axisText")
          .text("In Poverty (%)");
    
    });
    }
    
    makeChart();