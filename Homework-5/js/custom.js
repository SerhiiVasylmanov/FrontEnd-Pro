function isLannisterSoldier(color, shield) {
    if ((color === 'red' && shield === null) || (shield === 'lion')) {
        return true;
    } else {
        return false;
    }
};

console.log('A soldier in red armor and a lion shield, Lannister? ==>', isLannisterSoldier('red', 'lion'));
console.log('Soldier in blue armor and no shield, Lannister? ==>', isLannisterSoldier('blue', null));

