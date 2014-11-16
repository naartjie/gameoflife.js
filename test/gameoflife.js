'use strict';

var _ = require('lodash'),
    chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    game = require('../gameoflife'),
    containsCell = game.containsCell,
    c = game.c,
    tick = game.tick,
    nextTo = game.nextTo;

function createBlinkerGen1() {
    return [
        c( -1, 0),
        c(  0, 0),
        c(  1, 0)
    ];
}

function createBlock() {
    return [
        c( 0,  0),
        c( 1,  0),
        c( 1, -1),
        c( 0, -1),
    ];
}

describe('blinker pattern: live cells', function() {

    it('should create blinker generation1', function() {
        var generation1 = createBlinkerGen1();
        assert( containsCell(generation1, c(-1, 0)) );

    });

    it('should have 2 cells become alive', function() {
        var generation1 = createBlinkerGen1();
        var generation2 = tick(generation1);

        assert( containsCell(generation2, c(0,1)) );
        assert( containsCell(generation2, c(0,-1)) );
    });

    it('should have 1 cell stay alive', function() {
        var generation1 = createBlinkerGen1();
        var generation2 = tick(generation1);
        assert( containsCell(generation2, c(0,0)) );
    });
});

describe('still patterns: block', function() {

    it('a block should remain a block', function() {
        var block = createBlock();
        var gen2 = tick(block);

        expect( block ).to.have.length(4);
        expect( gen2 ).to.have.length(4);

        assert( _(block).all(function(cell) {
            return containsCell(gen2, cell);
        }));
    });
});

describe('cell neighbour awerness', function() {

    it('know thy neighbours', function() {
        var x = 0, y = 0, cell = c(0,0);
        var cells = nextTo(cell);

        expect( cells ).to.have.length(8);

        assert( containsCell(cells, c(x-1, y+1)) );
        assert( containsCell(cells, c(x-1, y)) );
        assert( containsCell(cells, c(x-1, y-1)) );

        assert( containsCell(cells, c(x+1, y+1)) );
        assert( containsCell(cells, c(x+1, y)) );
        assert( containsCell(cells, c(x+1, y-1)) );

        assert( containsCell(cells, c(x, y+1)));
        assert( containsCell(cells, c(x, y-1)));
    });

});
