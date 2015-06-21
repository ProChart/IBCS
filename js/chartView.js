/**
 * Created by Joerg Decker on 20/06/15.
 */

function clearBarTimeLine(){
    document.getElementById('bars').innerHTML = "";
    document.getElementById('barlabels').innerHTML = "";
    document.getElementById('deltas').innerHTML = "";
    document.getElementById('deltasLabels').innerHTML = "";
}

function clearLineTimeLine(){
    console.log("ClearLINE");

    document.getElementById('Area').innerHTML = "";
    document.getElementById('Area').style.width = "0px";
    document.getElementById('Area').style.height = "0px";

}

function drawChart(input) {


    var bar_width = myChart.columnWidth;
    var divs = [];
    var divsBars = [];

    var factor = document.getElementById('chart').style.height.substr(0,3)* 0.8/setRange(setMax(data.datapoint),setMin(data.datapoint));

    var zeroPosition = setMax(data.datapoint)* 1.1*factor;
    document.getElementById('axis').style.top = zeroPosition;
    document.getElementById('axis').style.height = "5px";
    document.getElementById('axis').style.width = myChart.columnWidth*input.length+"px";

    var top = 0;
    var topLabel = 0;
    var height = 0;


/*        if(input[i]<=0){
            top=zeroPosition;
            topLabel =zeroPosition+15;
        }
        else {
            top=zeroPosition-input[i]*factor;
            topLabel = zeroPosition-15;
        }

        if(input[i]<0){
            height=(input[i]*-1*factor)+5;
        }
        else {
            height = input[i]*factor;
        }*/

        if (myChart.chartType == "Line") {

            clearBarTimeLine();

            var delta = [];

            var basis = data.rows[data.markedRow].split(',');

            for (i = 1; i < data.rows.length; i++) {
                var basis1 = data.rows[i].split(',');

                for (j = 1; j < data.rows.length; j++) {
                    var basis2 = data.rows[j].split(',');
                    for (k = 1; k < basis2.length; k++) {

                        delta.push(basis1[k] * 1 - basis2[k] * 1);
                        delta.push(basis2[k] * 1 - basis1[k] * 1);
                    }
                    delta.push(basis1[j]);
                }
            }

            var factor = document.getElementById('chart').style.height.substr(0, 3) * 0.8 / setRange(setMax(delta), setMin(delta));
            var zeroPosition = setMax(delta) * 1.1 * factor;
            var polygon = [[]];
            polygon[0] = [];
            var polygonCount = 0;

            var CoordinatesGreen = [];
            var CoordinatesRed = [];
            var InputOnTop = [];
            var CrossesAt = [];
            CrossesAt[0] = 0;
            var CountCrosses = 0;
            var polygonDivs = [];

            //START: Creating Polygons

            for (i = 0; i < input.length; i++) {
                if (input[i] * 1 > basis[i] * 1) {
                    InputOnTop[i] = true;

                }
                else {
                    InputOnTop[i] = false

                }

                if (InputOnTop[i] != InputOnTop[i - 1] && i > 0) {
                    CountCrosses++;
                    CrossesAt[CountCrosses] = i;
                }
            }

            console.log("TOP:" + i + ":" + InputOnTop);

            var x = [];
            var i = 0;

            //setting initial start point at very left

            X = 0;
            Y = (setMax(delta) - input[i]) * factor;

            XStrg = X + "px ";
            YStrg = Y + "px, ";

            polygon[polygonCount].push(XStrg);
            polygon[polygonCount].push(YStrg);

            for (q=0; q<CrossesAt.length; q++) {
            //console.log("LENGHT: "+CrossesAt.length+" Q: "+q);

                if(q+1 === CrossesAt.length){max = input.length}
                else {max = CrossesAt[q+1]}

                for (i = CrossesAt[q]; i < max; i++) {
                    //console.log("Q: "+q+" INPUT: "+input[i]+"Column: "+myChart.columnWidth *i);

                    //setting coordinates until next intersection


                    X = myChart.columnWidth * i + myChart.columnWidth / 2;
                    Y = (setMax(delta) - input[i]) * factor;

                    XStrg = X + "px ";
                    YStrg = Y + "px, ";
                    console.log("1 X: "+X+" Y: "+Y);
                    polygon[polygonCount].push(XStrg + YStrg);

                    //if intersection

                    if (InputOnTop[i] != InputOnTop[i + 1] && i < input.length-1) {

                        var A = ((input[i + 1] * 1 - input[i] * 1) * factor) / myChart.columnWidth;
                        var B = ((basis[i + 1] * 1 - basis[i] * 1) * factor) / myChart.columnWidth;
                        X = ((A - B) * (myChart.columnWidth * i + myChart.columnWidth / 2) - input[i] * factor + basis[i] * factor) / (A - B);
                        Y = A * (X - (myChart.columnWidth * i + myChart.columnWidth / 2)) + input[i] * factor;
                        console.log("IF X: "+X+" Y: "+Y);
                        console.log("Q: "+CrossesAt[q]+" INPUT: "+input[CrossesAt[q]]+" A: "+A/factor+" B: "+B/factor);


                        XStrg = X + "px ";
                        YStrg = Y + "px, ";

                        polygon[polygonCount].push(XStrg + YStrg);
                    }

                    if(i === input.length){
                        X = myChart.columnWidth * i + myChart.columnWidth / 2;
                        Y = (setMax(delta) - input[i]) * factor;

                        XStrg = X + "px ";
                        YStrg = Y + "px, ";

                        polygon[polygonCount].push(XStrg + YStrg);

                    }
                }

                for (j = i-1; j > CrossesAt[q]; j--) {
                    X = myChart.columnWidth * j + myChart.columnWidth / 2;
                    Y = (setMax(delta) - basis[j]) * factor;

                    XStrg = X + "px ";
                    YStrg = Y + "px, ";

                    polygon[polygonCount].push(XStrg + YStrg);

                    //console.log("J: "+j+", X: "+XStrg+", Y: "+YStrg);
                }


                X = myChart.columnWidth*CrossesAt[q]+myChart.columnWidth/2;
                Y = (setMax(delta) - basis[CrossesAt[q]]) * factor;

                XStrg = X + "px ";
                YStrg = Y + "px, ";

                polygon[polygonCount].push(XStrg + YStrg);

                if(q>0) {
                    var A = ((input[CrossesAt[q]] * 1 - input[CrossesAt[q] - 1] * 1) * factor) / myChart.columnWidth;
                    var B = ((basis[CrossesAt[q]] * 1 - basis[CrossesAt[q] - 1] * 1) * factor) / myChart.columnWidth;

                    //console.log("Q: "+CrossesAt[q]+" INPUT: "+input[CrossesAt[q]]+" A: "+A/factor+" B: "+B/factor);

                    X = ((A - B) * (myChart.columnWidth * [CrossesAt[q]-1] + myChart.columnWidth / 2) - input[CrossesAt[q] - 1] * factor + basis[CrossesAt[q] - 1] * factor) / (A - B);
                    Y = A * (X - (myChart.columnWidth * [CrossesAt[q]-1] + myChart.columnWidth / 2)) + input[CrossesAt[q] - 1] * factor;

                }
                else{
                    X = 0;
                    Y = (setMax(delta) - basis[0]) * factor;
                }

                XStrg = X + "px ";
                YStrg = Y + "px ";

                polygon[polygonCount].push(XStrg + YStrg);

                //console.log("Q: "+q+" CrossatQ: "+CrossesAt[q]+" CrossesAt: " +input[CrossesAt[q]]+" Basis: "+basis[CrossesAt[q]]);
                //console.log("POLYGON "+polygonCount+": "+polygon[polygonCount].join(''));

                if (input[CrossesAt[q]]*1>basis[CrossesAt[q]]*1){
                    color = myChart.ColorPositive;
                }
                else{
                    color = myChart.ColorNegative;
                }

                polygonDivs.push('<div id="polygon_'+polygonCount+'" style="width: 800px; height:400px; background-color: '+color+'; position:absolute;'+
                ' -webkit-clip-path: polygon(' + polygon[polygonCount].join('') + ');"></div>');

                //console.log(polygonDivs.join(''));

                polygonCount++;
                polygon[polygonCount] = [];
            }

            document.getElementById('Area').style.width = $("#chart").css("width");
            document.getElementById('Area').style.height = $("#chart").css("height");
            document.getElementById('Area').innerHTML = polygonDivs.join('');


            CoordinatesGreen[0] = "0px " + zeroPosition + "px, ";
            CoordinatesRed[0] = "0px " + zeroPosition + "px, ";


            for (i = 0; i < input.length; i++) {
                if (input[i] * 1 > basis[i] * 1) {

                    if (i > 0) {
                        if (input[i - 1] * 1 < basis[i - 1] * 1) {
                            var X1G = (myChart.columnWidth * (i) + myChart.columnWidth / 2 - myChart.columnWidth * ((1 / (Math.abs(input[i]) - Math.abs(input[i - 1]))) * ((Math.abs(input[i])) - basis[i]))) + "px ";
                            console.log((1 / (Math.abs(input[i]) - Math.abs(input[i - 1]))) * ((Math.abs(input[i])) - basis[i]))
                            var Y1G = zeroPosition + "px, ";
                        }
                        else {
                            var X1G = "";
                            var Y1G = "";
                        }
                    }
                    else {
                        X1G = "0px ";
                        Y1G = (zeroPosition - input[i] * factor) + "px, ";
                    }


                    var X2G = (myChart.columnWidth * i + myChart.columnWidth / 2) + "px ";
                    var Y2G = (zeroPosition - ((input[i] - basis[i]) * factor)) + "px, ";

                    if (i < input.length - 1) {
                        if (basis[i + 1] * 1 > input[i + 1] * 1) {
                            var X3G = (myChart.columnWidth * (i) + myChart.columnWidth / 2 + myChart.columnWidth * (1 / (Math.abs(input[i]) - Math.abs(input[i + 1])) * (Math.abs(input[i]) - basis[i]))) + "px ";
                            var Y3G = zeroPosition + "px, ";
                        }
                        else {
                            var X3G = "";
                            var Y3G = "";
                        }
                    }
                    else {
                        var X3G = "";
                        var Y3G = "";
                    }

                    //console.log(i + ":X1G: " + X1G + " " + Y1G);
                    //console.log(i + ":X2G: " + X2G + " " + Y2G);
                    //console.log(i + ":X3G: " + X3G + " " + Y3G);


                    var PushStringGreen = X1G + Y1G + X2G + Y2G + X3G + Y3G;
                    CoordinatesGreen.push(PushStringGreen);

                    var PushStringRed = myChart.columnWidth * i + myChart.columnWidth / 2 + "px " + zeroPosition + "px, ";
                    CoordinatesRed.push(PushStringRed);
                }
                else {

                    var PushStringGreen = myChart.columnWidth * i + myChart.columnWidth / 2 + "px " + zeroPosition + "px, ";
                    CoordinatesGreen.push(PushStringGreen);


                    if (i > 0) {
                        if (input[i - 1] * 1 > basis[i - 1] * 1) {
                            var X1R = (myChart.columnWidth * (i) - myChart.columnWidth / 2 + myChart.columnWidth * (1 / (Math.abs(input[i - 1]) - Math.abs(input[i]))) * (Math.abs(input[i - 1] - basis[i]))) + "px ";
                            //console.log(((Math.abs(input[i - 1]) - Math.abs(input[i]))));
                            //console.log((Math.abs(input[i - 1] - basis[i])));
                            //console.log((1 / (Math.abs(input[i - 1]) - Math.abs(input[i]))) * (Math.abs(input[i - 1]) - basis[i]));

                            var Y1R = (zeroPosition) + "px, ";
                        }
                        else {
                            var X1R = "";
                            var Y1R = "";
                        }
                    }
                    else {
                        var X1R = "0px ";
                        var Y1R = ((basis[i] - input[i]) * factor + zeroPosition) + "px, ";
                    }

                    var X2R = (myChart.columnWidth * i + myChart.columnWidth / 2) + "px ";
                    var Y2R = ((basis[i] - input[i]) * factor + zeroPosition) + "px, ";

                    if (i < input.length - 1) {
                        if (input[i + 1] * 1 > basis[i + 1] * 1) {
                            var X3R = (myChart.columnWidth * (i) + myChart.columnWidth / 2 + myChart.columnWidth * ((1 / (Math.abs(input[i + 1]) - Math.abs(input[i]))) * (basis[i] - input[i]))) + "px ";

                            var Y3R = (zeroPosition) + "px, ";
                        }
                        else {
                            var X3R = "";
                            var Y3R = "";
                        }
                    }
                    else {
                        var X3R = "";
                        var Y3R = "";
                    }


                    var PushStringRed = X1R + Y1R + X2R + Y2R + X3R + Y3R;
                    CoordinatesRed.push(PushStringRed);
                }
            }


            PushStringGreen = myChart.columnWidth * (i) + "px " + zeroPosition + "px, "
            CoordinatesGreen.push(PushStringGreen);

            PushStringRed = myChart.columnWidth * (i) + "px " + zeroPosition + "px, "
            CoordinatesRed.push(PushStringRed);

            document.getElementById('axis').style.top = zeroPosition;
            document.getElementById('axis').style.height = "5px";
            document.getElementById('axis').style.width = myChart.columnWidth * input.length + "px";

            document.getElementById('areaGreen').style.width = $("#chart").css("width");
            document.getElementById('areaGreen').style.height = $("#chart").css("height");
            //document.getElementById('areaGreen').style.webkitClipPath = "polygon(" + CoordinatesGreen.join('') + " 0px " + zeroPosition + "px)";

            document.getElementById('areaRed').style.width = $("#chart").css("width");
            document.getElementById('areaRed').style.height = $("#chart").css("height");
            //document.getElementById('areaRed').style.webkitClipPath = "polygon(" + CoordinatesRed.join('') + " 0px " + zeroPosition + "px)";

            document.getElementById('areaBase').style.height = $("#chart").css("height").substr(0, 3) - zeroPosition - 5;
            document.getElementById('areaBase').style.width = $("#chart").css("width");
            //document.getElementById('areaBase').style.top = zeroPosition + 5;

        }

        else {

           clearLineTimeLine();

            for(i=0; i<input.length; i++) {

                 if(input[i]<=0){
                    top=zeroPosition;
                    topLabel =zeroPosition+15;
                 }
                 else {
                    top=zeroPosition-input[i]*factor;
                    topLabel = zeroPosition-15;
                 }

                 if(input[i]<0){
                    height=(input[i]*-1*factor)+5;
                 }
                 else {
                    height = input[i]*factor;
                 }

                divs.push('<div id="bar_' + i + '"' +
                ' style="background-color: #666666; position:absolute;' +
                ' height:' + height + 'px;' +
                ' width:' + myChart.columnWidth * myChart.barWidth + 'px;' +
                ' top:' + top + 'px;' +
                ' left:' + (myChart.columnWidth * i + (1 - myChart.barWidth) / 2 * myChart.columnWidth) + 'px"' +
                ' onmouseover="hoverBar(' + i + ')"' +
                ' onmouseleave="unhoverBar(' + i + ')"' + '></div>');

                divsBars.push('<div id="barLabel_' + i + '"' +
                ' style="color: #000000; position:absolute; text-align: center; text-shadow: 0px 0px 3px #ffffff, 3px 0 3px #ffffff,0 3px 3px #ffffff, -3px 0 3px #ffffff,0 -3px 3px #ffffff; font-family: Arial; font-size: ' + myChart.fontSize + '; text-align: center;' +
                ' height:20px;' +
                ' width:' + myChart.columnWidth + 'px;' +
                ' top:' + (topLabel) + 'px;' +
                ' left:' + (myChart.columnWidth * i) + 'px">' + input[i] + '</div>');

                document.getElementById('bars').innerHTML = divs.join('');
                document.getElementById('barlabels').innerHTML = divsBars.join('');
            }
        }


}

function drawTable(rows) {

    var divs = [];

    for (i = 0; i < rows.length; i++) {

        number = rows[i].split(',');

        var top = 0;
        var left = 0;
        var height = 0;

        top = 20*i+1;
        width = number.count * 50;

        divs.push('<div id="row_'+ i +'" style="top:'+ top +'px; height: 21px; width:' + width +'px; background-color:#eeeeee;">');

        for (j=0; j<number.length; j++) {

            if(i>0) {
                var interaction = ' onmouseover="hoverRow('+i+')"' +
                    ' onclick="clickRow('+i+')"' +
                    ' onmouseleave="unhoverRow('+i+') "'

            }
            else {
                number[j] = timeConverter(number[j]);
            }


            divs.push('<div id="cell_' + i + '_'+j+'"' +
            ' style="font-family: Arial; font-size: '+myChart.fontSize+'; text-align: right; vertical-align: middle; position:absolute;' +
            ' height: 20px;' +
            ' width: 50px;' +
            ' top:' + 21*i + 'px;' +
            ' left:' + 50 *j + 'px" ' + interaction +
            '>' + number[j] + '</div>');
            // '><span style="display: table-cell; vertical-align: middle; horizontal-align: right">' + number[j] + '</span></div>')
        }
        divs.push("</div>");
    }
    document.getElementById('cells').innerHTML = divs.join('');

}

function drawNeedles(input,hoveredRow) {
    //document.getElementById('helper').innerHTML = input + ":" + data.rows[data.markedRow];
    var top = 0;
    var headPosition = 0;
    var labelPosition = 0;
    var divs = [];
    var divHeads = [];
    var divLabels = [];
    var color = [];
    var height = 0;
    var deltaRelative  = [];
    var labelSpace = 20;
    var basis = data.rows[data.markedRow].split(',');



    for(i=0; i<input.length; i++) {

        deltaRelative[i] = (input[i] - basis[i]) / basis[i];
    }


    if(setMax(deltaRelative) > 1) {
        var max = 1;
    }
    else
    {
        var max = setMax(deltaRelative);
    }

    if(setMin(deltaRelative) < -1) {
        var min = -1;
    }
    else
    {
        var min = setMin(deltaRelative);
    }

    var factor = (document.getElementById('DeviationChart').style.height.substr(0,3)-(2*labelSpace))*0.8/setRange(max,min);
    var zeroPosition = max*factor+labelSpace;
    //console.log("MAX: " +max + "MIN: "+ min + ":" + factor + ":" +setRange(max,min));

    for(i=0; i<input.length; i++) {

        if(deltaRelative[i] > 1) {
            var shape = "position: absolute; width: 0; height: 0; border-style: solid; border-width: 0 8px 8px 8px; border-color: #ffffff #ffffff "+ myChart.ColorPositive + " #ffffff; left:" + (myChart.columnWidth*i + myChart.columnWidth/2 -7) + "px;";

            // "width: 0; height: 0; border-style: solid; border-width: 0 10px 10px 10px; border-color: transparent transparent #666666 transparent;";
        }
        else if (deltaRelative[i] < -1){
            var shape = "position: absolute; width: 0; height: 0; border-style: solid; border-width: 8px 8px 0 8px; border-color: "+ myChart.ColorNegative + " #ffffff #ffffff #ffffff; left:" + (myChart.columnWidth*i + myChart.columnWidth/2 -7) + "px;";
            //var shape = "border: solid; border-width: 10px  border-color: #00affa;";
        }
        else {
            var shape = "position:absolute; border-radius: 10px; height: 8px; width:8px; left:" + (myChart.columnWidth*i + myChart.columnWidth/2 -4) + "px;";
        }



        if (deltaRelative[i] > 0) {
            if(deltaRelative[i]>1){height = factor;}else {height= deltaRelative[i]*factor};
            top = zeroPosition-height;
            headPosition = top;
            labelPosition = top - 15;
            color[i] = myChart.ColorPositive;
        }
        else {
            if(deltaRelative[i]<-1){height = factor;}else {height= height = deltaRelative[i]*-1 * factor};
            top = zeroPosition;
            headPosition = top + height;
            labelPosition = top + height + 10;
            color[i] = myChart.ColorNegative;
        };
        // console.log(factor+":"+":"+height+":"+deltaRelative[i]+":"+top);


        divs.push('<div id="needleLine_' + i +'" style="background-color: '+ color[i] + '; position:absolute;' +
        ' top:'+top+'px;' +
        ' height:'+ height+'px;' +
        ' width:2px;' +
        ' left:' + (myChart.columnWidth*i + myChart.columnWidth/2) + 'px"' +
        '></div>');

        top = zeroPosition-height-5;

        if(data.markedRow != hoveredRow ){

            divHeads.push('<div id="needleHead_' + i + '" style="border: 1px solid '+ color[i] + '; background-color:'+ color[i] + ';' +
            ' top:'+headPosition+'px;' + shape +
            '"></div>');
        }

        var displayLabel = deltaRelative[i]*100;

        divLabels.push('<div id="DeviationLabel_' + i +'" style="background-color: transparent; text-align: center; position:absolute; font-family: Arial; font-size: '+myChart.fontSize+'; text-align: center;' +
        ' top:'+labelPosition +'px;' +
        ' height: 20px;' +
        ' left:' + (myChart.columnWidth*i) + 'px;' +
        ' width:'+ myChart.columnWidth + 'px"' +
        ' >' + displayLabel.toFixed(1) +'</div>');

    }

    document.getElementById('needleAxis').style.top = zeroPosition;
    document.getElementById('needleAxis').style.height = "5px";
    document.getElementById('needleAxis').style.width = myChart.columnWidth*input.length;
    document.getElementById('needles').innerHTML = divs.join('');
    document.getElementById('needleHeads').innerHTML = divHeads.join('');
    document.getElementById('DeviationLabels').innerHTML = divLabels.join('');

}

function drawDeviationBars(input,hoveredRow){

    document.getElementById('needles').innerHTML = "";
    document.getElementById('needleHeads').innerHTML = "";
    document.getElementById('DeviationLabels').innerHTML = "";

    var top = 0;
    var labelPosition = 0;
    var divs = [];
    var divLabels = [];
    var color = [];
    var height = 0;
    var deltaAbsolute  = [];
    var labelSpace = 20;
    var basis = data.rows[data.markedRow].split(',');



    for(i=0; i<input.length; i++) {

        deltaAbsolute[i] = input[i] - basis[i];
    }


    var factor = (document.getElementById('DeviationChart').style.height.substr(0,3)-(2*labelSpace))*0.8/setRange(setMax(input),setMin(input));
    //console.log("FAKTOR: "+factor);


    var zeroPosition = setMax(deltaAbsolute)*factor+labelSpace;


    for(i=0; i<input.length; i++) {

        if (deltaAbsolute[i] > 0) {
            height= deltaAbsolute[i]*factor;
            top = zeroPosition-height;
            labelPosition = top - 15;
            color[i] = myChart.ColorPositive;
        }
        else {
            height= height = deltaAbsolute[i]*-1 * factor;
            top = zeroPosition;
            labelPosition = top + height + 10;
            color[i] = myChart.ColorNegative;
        };
 //       console.log(factor+":"+":"+height+":"+deltaRelative[i]+":"+top);



        divs.push('<div id="needleLine_' + i +'" style="background-color: '+ color[i] + '; position:absolute;' +
        ' top:'+top+'px;' +
        ' height:'+ height+'px;' +
        ' width:30px;' +
        ' left:' + (myChart.columnWidth*i + (1-myChart.barWidth)/2*myChart.columnWidth) + 'px"' +
        '></div>');

        top = zeroPosition-height-5;

        var displayLabel = deltaAbsolute[i];

        divLabels.push('<div id="DeviationLabel_' + i +'" style="background-color: transparent; text-align: center; position:absolute; font-family: Arial; font-size: '+myChart.fontSize+'; text-align: center;' +
        ' top:'+labelPosition +'px;' +
        ' height: 20px;' +
        ' left:' + (myChart.columnWidth*i) + 'px;' +
        ' width:'+ myChart.columnWidth + 'px"' +
        ' >' + displayLabel.toFixed(1) +'</div>');

    }

    document.getElementById('needleAxis').style.top = zeroPosition;
    document.getElementById('needleAxis').style.height = "5px";
    document.getElementById('needleAxis').style.width = myChart.columnWidth*input.length;
    document.getElementById('needles').innerHTML = divs.join('');
    document.getElementById('DeviationLabels').innerHTML = divLabels.join('');



}

function drawDeviation(){
    if (data.type === "A") {
        document.getElementById('option_deviation').innerHTML = '<a id=link href=# onclick=drawDeviation()><img src=img/ButtonToggleAbsolute.png height=25px width=25px></a>';
        data.type = "P";

        drawDeviationBars(data.row, data.activeRow);
    }
    else {
        document.getElementById('option_deviation').innerHTML = '<a id=link href=# onclick=drawDeviation()><img src=img/ButtonTogglePercentages.png height=25px width=25px></a>';
        data.type = "A";

        drawNeedles(data.row, data.activeRow);
    }

}

function drawDelta(input) {

    var inputReference = data.rows[data.markedRow].split(',');
    var deltaSpacer = 0;
    var topSpacer = 0;

    var bar_width = 10;
    var divs = [];
    var divsDeltaLabels = [];

    var factor = document.getElementById('chart').style.height.substr(0,3)* 0.8/setRange(setMax(data.datapoint),setMin(data.datapoint));
    var zeroPosition = setMax(data.datapoint)* 1.1*factor;

    for(i=0; i<input.length; i++) {

        var top = 0;
        var topLabel = 0;
        var height = 0;

        if(input[i] > 0 && inputReference[i] >0) {
            deltaSpacer = 0;
            topSpacer = 0;
        }

        if(input[i] < 0 && inputReference[i]<0) {
            deltaSpacer = 0;
            topSpacer = 5;
        }

        if(input[i]>0 && inputReference[i]<0){
            deltaSpacer = 5;
            topSpacer = 0;
        }

        if(input[i]<0 && inputReference[i]>0){
            deltaSpacer = 0;
            topSpacer = 5;
        }

        if(inputReference[i] - input[i]<0){
            var delta = input[i] - inputReference[i];
            var deltaPx = delta*factor + deltaSpacer;
            top=zeroPosition-input[i]*factor+topSpacer;
            var color = myChart.ColorPositive;
        }
        else {
            var delta = inputReference[i] - input[i];
            var deltaPx = delta*factor+deltaSpacer;
            top=zeroPosition-inputReference[i]*factor+ topSpacer;
            var color = myChart.ColorNegative;
        }

        if(inputReference[i] - input[i]<0){
            var deltaText = "+"+delta;
            var deltaTextPos = top - 15;
            var deltaTextFormat = "color: #000000; position:absolute; text-align: right; text-shadow: 0px 0px 3px "+myChart.ColorPositive+", 3px 0 3px "+myChart.ColorPositive+",0 3px 3px "+myChart.ColorPositive+", -3px 0 3px "+myChart.ColorPositive+",0 -3px 3px "+myChart.ColorPositive+"; font-family: Arial; font-size: "+myChart.fontSize+"; text-align: center;"

        }
        if(inputReference[i] - input[i]>0){
            var deltaText = "-"+delta;
            var deltaTextPos = top + deltaPx;
            var deltaTextFormat = "color: #000000; position:absolute; text-align: right; text-shadow: 0px 0px 3px "+myChart.ColorNegative+", 3px 0 3px "+myChart.ColorNegative+",0 3px 3px "+myChart.ColorNegative+", -3px 0 3px "+myChart.ColorNegative+",0 -3px 3px "+myChart.ColorNegative+"; font-family: Arial; font-size: "+myChart.fontSize+"; text-align: center;"
            console.log(height);
        }

        divs.push('<div id="bar_' + i + '"' +
        ' style="background-color: '+ color + '; position:absolute;' +
        ' height:' + deltaPx + 'px;' +
        ' width:' + myChart.columnWidth*0.3+ 'px;' +
        ' top:' + top + 'px;' +
        ' left:' + (myChart.columnWidth*i+0.55*myChart.columnWidth)  + 'px"' +
        '></div>' );

        divsDeltaLabels.push('<div id="deltasLabels_' + i + '" style="position:absolute;' + deltaTextFormat +
        ' height: 50px;' +
        ' width: '+myChart.columnWidth + 'px;' +
        ' top: '+deltaTextPos+'px;'+
        ' left:'+(myChart.columnWidth*i +10)+'px">'+deltaText+'</div>');

    }

    document.getElementById('deltas').innerHTML = divs.join('');
    document.getElementById('deltasLabels').innerHTML = divsDeltaLabels.join('');
    //console.log(divsDeltaLabels.join(''))

}
