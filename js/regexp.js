// koffee 1.14.0

/*
00000000   00000000   0000000   00000000  000   000  00000000 
000   000  000       000        000        000 000   000   000
0000000    0000000   000  0000  0000000     00000    00000000 
000   000  000       000   000  000        000 000   000      
000   000  00000000   0000000   00000000  000   000  000
 */
var regexp;

regexp = function(s) {
    s = String(s);
    s = s.replace(/([^.]+\|[^.]+)/g, '($1)');
    s = s.replace(/\./g, '\\.');
    s = s.replace(/\^/g, '\\^');
    s = s.replace(/\?/g, '[^.]');
    s = s.replace(/\*\*/g, '####');
    s = s.replace(/\*/g, '[^.]*');
    s = s.replace(/####/g, '.*');
    return new RegExp("^" + s + "$");
};

module.exports = regexp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhwLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsicmVnZXhwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQTs7QUFRQSxNQUFBLEdBQVMsU0FBQyxDQUFEO0lBQ0wsQ0FBQSxHQUFJLE1BQUEsQ0FBTyxDQUFQO0lBQ0osQ0FBQSxHQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsaUJBQVYsRUFBNkIsTUFBN0I7SUFDSixDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCO0lBQ0osQ0FBQSxHQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsS0FBVixFQUFpQixLQUFqQjtJQUNKLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBRixDQUFVLEtBQVYsRUFBaUIsTUFBakI7SUFDSixDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxPQUFWLEVBQW1CLE1BQW5CO0lBQ0osQ0FBQSxHQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsS0FBVixFQUFpQixPQUFqQjtJQUNKLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBRixDQUFVLE9BQVYsRUFBbUIsSUFBbkI7V0FDSixJQUFJLE1BQUosQ0FBVyxHQUFBLEdBQUksQ0FBSixHQUFNLEdBQWpCO0FBVEs7O0FBV1QsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbjAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgXG4wMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgIDAwMCAgICAgICAgMDAwIDAwMCAgIDAwMCAgIDAwMFxuMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwICAwMDAwICAwMDAwMDAwICAgICAwMDAwMCAgICAwMDAwMDAwMCBcbjAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgMDAwICAgMDAwICAgICAgXG4wMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgICAgIFxuIyMjXG5cbnJlZ2V4cCA9IChzKSAtPlxuICAgIHMgPSBTdHJpbmcgc1xuICAgIHMgPSBzLnJlcGxhY2UgLyhbXi5dK1xcfFteLl0rKS9nLCAnKCQxKSdcbiAgICBzID0gcy5yZXBsYWNlIC9cXC4vZywgJ1xcXFwuJ1xuICAgIHMgPSBzLnJlcGxhY2UgL1xcXi9nLCAnXFxcXF4nXG4gICAgcyA9IHMucmVwbGFjZSAvXFw/L2csICdbXi5dJ1xuICAgIHMgPSBzLnJlcGxhY2UgL1xcKlxcKi9nLCAnIyMjIydcbiAgICBzID0gcy5yZXBsYWNlIC9cXCovZywgJ1teLl0qJ1xuICAgIHMgPSBzLnJlcGxhY2UgLyMjIyMvZywgJy4qJ1xuICAgIG5ldyBSZWdFeHAgXCJeXCIrcytcIiRcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2V4cFxuIl19
//# sourceURL=../coffee/regexp.coffee