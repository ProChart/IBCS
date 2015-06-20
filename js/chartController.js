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

    if(deviationShow == false && data.markedRow != data.activeRow) {
        if(data.markedRow>-1) {drawDelta(number)};

    }
    else {
        document.getElementById('deltasLabels').innerHTML = "";
        document.getElementById('deltas').innerHTML = "";

    };

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
    if (deviationShow){
        document.getElementById('chart').style.top = "130px";
        document.getElementById('chart').style.height = "800px";
        document.getElementById('deviationOnOff').innerHTML = '<a id=link href=# onclick=deviationToggle()><img src=img/ButtonDeltaOn.png height=25px width=25px></a>';
        deviationShow = false;

        drawChart(data.row);
        if(data.markedRow>-1) {drawDelta(data.row)};

    }
    else {
        document.getElementById('chart').style.top = "490px";
        document.getElementById('chart').style.height = "400px";
        document.getElementById('deltas').innerHTML = "";
        document.getElementById('deltasLabels').innerHTML = "";
        document.getElementById('deviationOnOff').innerHTML = '<a id=link href=# onclick=deviationToggle()><img src=img/ButtonDeltaOff.png height=25px width=25px></a>';
        deviationShow = true;

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
