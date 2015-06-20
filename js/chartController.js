/**
 * Created by Joerg on 20/06/15.
 */

function setRange(max, min) {
    return (max - min);
}

function setMax(values) {
    var max = 0;

    if (Math.max.apply(Math, values) <= 0) {
        max = 0;
    }
    else {
        max = Math.max.apply(Math, values);
    }
    return (max);
    console.log("MAX:" + max);
}

function setMin(values) {

    if (Math.min.apply(Math, values) >= 0) {
        min = 0;
    }
    else {
        min = Math.min.apply(Math, values);
    }
    return (min);
}

function hoverRow(rowNumber) {
    var number = data.rows[rowNumber].split(',');
    for (i = 0; i < number.length; i++) {
        var rowID = "cell_" + rowNumber + "_" + i;
        document.getElementById(rowID).style.backgroundColor = '#c0c0c0';
    }

    drawChart(number);

    data.activeRow = rowNumber;
    data.row = number;

    if(data.markedRow>-1) {
        if(data.type ==="P") {drawDeviationBars(data.row, data.activeRow)}
        else {drawNeedles(data.row, data.activeRow)}
    }

    if(SplitScreen == false && data.markedRow != data.activeRow) {
        if(data.markedRow>-1) {drawDelta(number)};

    }

    else {
        document.getElementById('deltasLabels').innerHTML = "";
        document.getElementById('deltas').innerHTML = "";

    };

    if(data.activeRow == data.markedRow) {
        document.getElementById('DeviationLabels').innerHTML = "";
    }

}

function unhoverRow(rowNumber) {
    var number = data.rows[rowNumber].split(',');

    for (i = 0; i < number.length; i++) {
        var rowID = "cell_" + rowNumber + "_" + i;
        document.getElementById(rowID).style.backgroundColor = '#ffffff';
    }
}

function hoverBar(barNumber) {
    var barID = "bar_" + barNumber;
    document.getElementById(barID).style.backgroundColor = '#00affa';
}

function unhoverBar(barNumber) {
    var barID = "bar_" + barNumber;
    document.getElementById(barID).style.backgroundColor = '#666666';

}

function clickRow(rowNumber) {
    var number = data.rows[rowNumber].split(',');

    //drawReference(number);

    for (i = 0; i < number.length; i++) {
        var cellID = "cell_" + rowNumber + "_" + i;
        if(data.markedRow>-1) {var referenceCellID = "cell_" + data.markedRow + "_" + i};
//console.log(cellID+":"+referenceCellID);

        document.getElementById(cellID).style.fontWeight = "bold";
        //document.getElementById(cellID).style.color = '#00affa';
        if(data.markedRow>-1) {document.getElementById(referenceCellID).style.fontWeight = "normal"};
    }

    data.markedRow = rowNumber;
    document.getElementById('legend').innerHTML ="Compared to Row:" + (data.markedRow);
    drawDelta(rowNumber);
}

function deviationToggle(){
    if (SplitScreen){
        document.getElementById('chart').style.top = "130px";
        document.getElementById('chart').style.height = "800px";
        document.getElementById('switchView').innerHTML = '<a id=link href=# onclick=deviationToggle()><img src=img/ButtonFullScreenOn.png height=25px width=25px></a>';
        if (data.type == "P") {
            document.getElementById('option_deviation').innerHTML = '<img src=img/ButtonToggleAbsolute.png height=25px width=25px>';
        }
        else {
            document.getElementById('option_deviation').innerHTML = '<img src=img/ButtonTogglePercentages.png height=25px width=25px>';
        };
        document.getElementById('option_deviation').setAttribute("style","opacity:0.2; -moz-opacity:0.2; filter:alpha(opacity=20)");
        SplitScreen = false;

        drawChart(data.row);
        if(data.markedRow>-1) {drawDelta(data.row)};

    }
    else {
        document.getElementById('chart').style.top = "490px";
        document.getElementById('chart').style.height = "400px";
        document.getElementById('deltas').innerHTML = "";
        document.getElementById('deltasLabels').innerHTML = "";
        document.getElementById('switchView').innerHTML = '<a id=link href=# onclick=deviationToggle()><img src=img/ButtonSplitScreenOn.png height=25px width=25px></a>';
        if (data.type == "P") {
            document.getElementById('option_deviation').innerHTML = '<a id=link href=# onclick=drawDeviation()><img src=img/ButtonToggleAbsolute.png height=25px width=25px></a>';
        }
        else {
            document.getElementById('option_deviation').innerHTML = '<a id=link href=# onclick=drawDeviation()><img src=img/ButtonTogglePercentages.png height=25px width=25px></a>';
        };
        document.getElementById('option_deviation').setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");

        SplitScreen = true;

        drawChart(data.row);
        //if(data.markedRow>-1) {drawDelta(data.row)};
        if(data.type ==="P") {drawDeviationBars(data.row, data.activeRow)}
        else {drawNeedles(data.row, data.activeRow)}
    }

}

function ChartTypeToggle(){
    if(myChart.chartType === "Bar") {
        drawChart(data.row);
        myChart.chartType = "Line";
    }
    else {
        drawChart(data.row);
        myChart.chartType = "Bar";
    }
}
