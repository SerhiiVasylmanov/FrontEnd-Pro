var distanceHome = 3;
var distanceWork = 12000;

var distanceHomeMeter = distanceHome * 1000;
var distanceWorkMeter = distanceWork * 0.305;


if (distanceHomeMeter === distanceWorkMeter) {
    alert(`Distances (${distanceHome}km) & (${distanceWork}ft) are equal ==> (${distanceHomeMeter}m = ${distanceWorkMeter}m)`);
} else if (distanceHomeMeter > distanceWorkMeter) {
    alert(`distance home (${distanceHome}km) more distance to work (${distanceWork}ft) ==> (${distanceHomeMeter}m > ${distanceWorkMeter}m)`);
} else {
    alert(`distance home (${distanceHome}km) less distance to work (${distanceWork}ft) ==> (${distanceHomeMeter}m < ${distanceWorkMeter}m)`);
};


