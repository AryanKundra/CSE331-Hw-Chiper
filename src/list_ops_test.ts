import * as assert from 'assert';
import { nil } from './list';
import { explode } from './char_list';
import { last, prefix, suffix } from './list_ops';


describe('list_ops', function() {

  it('last', function() {
    // Error case branch
    assert.throws(() => last(nil), Error);

    // 0-1-many: base case
    assert.deepEqual(last(explode("a")), "a".charCodeAt(0));
    assert.deepEqual(last(explode("_")), "_".charCodeAt(0));

    // 0-1-many: one recursive call
    assert.deepEqual(last(explode("hm")), "m".charCodeAt(0));
    assert.deepEqual(last(explode("hu")), "u".charCodeAt(0));

    // 0-1-many: many recursive calls
    assert.deepEqual(last(explode("hub")), "b".charCodeAt(0));
    assert.deepEqual(last(explode("stray")), "y".charCodeAt(0));
    assert.deepEqual(last(explode("shrug")), "g".charCodeAt(0));
  });

  it('prefix', function() {
    // Empty list
    assert.throws(() => prefix(1n, nil), Error);
    
    // Single element list
    assert.deepStrictEqual(prefix(1n, explode("a")), explode("a"));
    assert.throws(() => prefix(2n, explode("a")), Error);

    // Multiple element list
    assert.deepStrictEqual(prefix(2n, explode("hello")), explode("he"));
    assert.deepStrictEqual(prefix(3n, explode("hello")), explode("hel"));
    assert.deepStrictEqual(prefix(5n, explode("hello")), explode("hello"));
    assert.throws(() => prefix(6n, explode("hello")), Error);
  });

  it('suffix', function() {
     // Empty list
     assert.throws(() => suffix(1n, nil), Error);

     // Single element list
     assert.deepStrictEqual(suffix(1n, explode("a")), nil);
     assert.throws(() => suffix(2n, explode("a")), Error);
 
     // Multiple element list
     assert.deepStrictEqual(suffix(2n, explode("hello")), explode("llo"));
     assert.deepStrictEqual(suffix(3n, explode("hello")), explode("lo"));
     assert.deepStrictEqual(suffix(5n, explode("hello")), nil);
     assert.throws(() => suffix(6n, explode("hello")), Error);
  });

});
