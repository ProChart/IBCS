/**
 * Created by Joerg Decker on 20/06/15.
 */

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear()-2000;
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year;
    return time;
}

function handleFileSelect(evt) {

    //     evt.stopPropagation();
    //     evt.preventDefault();

    //     var files = evt.dataTransfer.files;

    var output_n = [];
    var number = [];

    data.rows[0] = "1427938248,1428938248,1427738248,1426938248,1425938248,-1424938248,1428938248,1428938248,1428938248,1428938248,1428938248,1428938248,-1428938248";
    data.rows[1] = "10,120,30,40,50,20,70,80,90,100,43,120,110";
    data.rows[2] = "200,150,200,150,40,60,30,70,200,180,170,160,120";
    data.rows[3] = "100,100,100,90,90,100,100,100,100,100,100,100,100";

    /*        for (var i = 0, f;f =files[i]; i++){
     if (f.type === "text/plain") {
     var reader = new FileReader();

     reader.onload = function (evt) {
     var contents = evt.target.result;
     data.rows = contents.split('\n');*/

    for (var j = 1; j < data.rows.length; j++) {
        number = data.rows[j].split(',');

        for (var k = 0; k < number.length; k++) {
            data.datapoint.push(number[k]);

        }

    }
    //console.log(data.datapoint);
    drawTable( data.rows);
    /*               };
     }
     }*/






    /*   for (f=0; f<files.length; f++) {
     reader.readAsText(files[f]);
     }*/
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
//document.addEventListener('load',handleFileSelect,false );
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop',handleFileSelect, false);