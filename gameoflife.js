'use strict';

var _ = require('lodash');

// a friendly helper 'factory'
function c(x, y) {
    return {x: x, y: y, friends: 0};
}

exports.c = c;

function containsCell(generation, cell) {
    return _.some(generation, {x: cell.x, y: cell.y});
}

exports.containsCell = containsCell;

function nextTo(cell) {
    var friends = _.range(cell.x - 1, cell.x + 2).map(function(x) {
        return _.range(cell.y - 1, cell.y + 2).map(function(y) {
            return c(x, y);
        });
    });

    return _(friends)
    .flatten(true)
    .reject({x: cell.x, y: cell.y})
    .valueOf();
}

exports.nextTo = nextTo;

function tick(generation) {

    var genNext = [];

    _(generation).each(function (liveCell) {
        _(nextTo(liveCell)).each(function (friend) {
            var cell = _(genNext).find( {x: friend.x, y: friend.y} );
            if (!cell) {
                cell = c(friend.x, friend.y);
                genNext.push(cell);
            }
            cell.friends += 1;
        });
    });

    function survivor(cell) {
        return cell.friends === 2 && containsCell(generation, cell);
    }

    function newlyBorn(cell) {
        return cell.friends >= 3;
    }

    return _(genNext)
    .filter(function (cell) {
        return newlyBorn(cell) || survivor(cell);
    })
    .valueOf();
}

exports.tick = tick;
