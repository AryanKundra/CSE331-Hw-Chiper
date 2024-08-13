import * as assert from 'assert';
import { nil } from './list';
import { explode } from './char_list';
import { next_latin_char, prev_latin_char, count_consonants, cipher_encode, cipher_decode,crazy_caps_decode,crazy_caps_encode } from './latin_ops';


describe('latin_ops', function() {

  // For the following 2 functions, there are a finite number of cases
  // but the number exceeds our reasonable case limit of 20, so just some
  // were selected.
  it('next_latin_char', function() {
    assert.equal(next_latin_char("a".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(next_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(next_latin_char("i".charCodeAt(0)), "u".charCodeAt(0));
    assert.equal(next_latin_char("o".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(next_latin_char("u".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(next_latin_char("j".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(next_latin_char("g".charCodeAt(0)), "j".charCodeAt(0));
    assert.equal(next_latin_char("d".charCodeAt(0)), "b".charCodeAt(0));
    assert.equal(next_latin_char("t".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(next_latin_char("c".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(next_latin_char("k".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(next_latin_char("f".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(next_latin_char("v".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(next_latin_char("w".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(next_latin_char("h".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(next_latin_char("l".charCodeAt(0)), "h".charCodeAt(0));
    assert.equal(next_latin_char("r".charCodeAt(0)), "l".charCodeAt(0));
    assert.equal(next_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(next_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(next_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('prev_latin_char', function() {
    assert.equal(prev_latin_char("a".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(prev_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(prev_latin_char("i".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(prev_latin_char("u".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(prev_latin_char("y".charCodeAt(0)), "e".charCodeAt(0));
    assert.equal(prev_latin_char("b".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(prev_latin_char("p".charCodeAt(0)), "t".charCodeAt(0));
    assert.equal(prev_latin_char("j".charCodeAt(0)), "g".charCodeAt(0));
    assert.equal(prev_latin_char("g".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(prev_latin_char("k".charCodeAt(0)), "s".charCodeAt(0));
    assert.equal(prev_latin_char("s".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(prev_latin_char("z".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(prev_latin_char("f".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(prev_latin_char("v".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(prev_latin_char("w".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(prev_latin_char("l".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(prev_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(prev_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(prev_latin_char("q".charCodeAt(0)), "x".charCodeAt(0));
    assert.equal(prev_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('cipher_encode', function() {
    //empty list
    assert.deepStrictEqual(cipher_encode(nil),nil);

    //Single char
    assert.deepStrictEqual(cipher_encode(explode("a")), explode("i"));

    //multiple chars
    assert.deepStrictEqual(cipher_encode(explode("cse")), explode("zky"));
  });

  it('cipher_decode', function() {
    //empty list
    assert.deepStrictEqual(cipher_decode(nil), nil);

    //single char
    assert.deepStrictEqual(cipher_decode(explode("i")), explode("a"));

    //multiple chars
    assert.deepStrictEqual(cipher_decode(explode("zky")), explode("cse"));

  });

  it('crazy_caps_encode', function() {
    // Empty list
    assert.deepStrictEqual(crazy_caps_encode(nil), nil);

    //single char
    assert.deepStrictEqual(crazy_caps_encode(explode("a")), explode("a"));

    //multiple char
    assert.deepStrictEqual(crazy_caps_encode(explode("crazy")), explode("cRaZy"));
    assert.deepStrictEqual(crazy_caps_encode(explode("hello")), explode("hElLo"));
    assert.deepStrictEqual(crazy_caps_encode(explode("world")), explode("wOrLd"));

  });

  it('crazy_caps_decode', function() {
    // Empty list 
    assert.deepStrictEqual(crazy_caps_decode(nil), nil);

    // Single char
    assert.deepStrictEqual(crazy_caps_decode(explode("A")), explode("A"));

    // Multiple chars
    assert.deepStrictEqual(crazy_caps_decode(explode("CrAzY")), explode("crazy"));
    assert.deepStrictEqual(crazy_caps_decode(explode("HeLlO")), explode("hello"));
    assert.deepStrictEqual(crazy_caps_decode(explode("WoRlD")), explode("world"));
  });

  it('count_consonants', function() {
    // base case: nil
    assert.strictEqual(count_consonants(nil), -1n);
    // base case: 1st char is vowel, no recursive calls
    assert.strictEqual(count_consonants(explode("e")), 0n);
    assert.strictEqual(count_consonants(explode("astray")), 0n);
    // base case: no vowels or cosonants
    assert.strictEqual(count_consonants(explode("")), -1n);
    assert.strictEqual(count_consonants(explode("_")), -1n);

    // 1 recursive call:
    assert.strictEqual(count_consonants(explode("say")), 1n);
    assert.strictEqual(count_consonants(explode("l_")), -1n);

    // multiple recursive calls:
    assert.strictEqual(count_consonants(explode("stingray")), 2n);
    assert.strictEqual(count_consonants(explode("stray")), 3n);
    assert.strictEqual(count_consonants(explode("str")), -1n);
    assert.strictEqual(count_consonants(explode("st_a")), -1n);
  });

  // TODO: uncomment the following tests when you are ready to test your
  // Frog Latin functions. You'll need to import these functions.

  // Note: these are just a subset of tests to get you started. We will have
  // additional staff tests, some of which will be hidden. Please add tests/
  // reason through your code carefully to be confident it's correct! Though
  // we will not be grading these things.

  it('frog_latin_encode', function() {
    // assert.strictEqual(compact(frog_latin_encode(explode(""))), "");
    // assert.strictEqual(compact(frog_latin_encode(explode("cd"))), "cd");
    // assert.strictEqual(compact(frog_latin_encode(explode("elf"))), "felfrog");
    // assert.strictEqual(compact(frog_latin_encode(explode("kevin"))), "evinkrog");
    // assert.strictEqual(compact(frog_latin_encode(explode("ten"))), "entrog");
  });

  it('frog_latin_decode', function() {
    // assert.strictEqual(compact(frog_latin_decode(explode("james"))), "james");
    // assert.strictEqual(compact(frog_latin_decode(explode("forangerog"))), "orange");
    // assert.strictEqual(compact(frog_latin_decode(explode("featrog"))), "eat");
    // assert.strictEqual(compact(frog_latin_decode(explode("ameshrog"))), "shame");
    // assert.strictEqual(compact(frog_latin_decode(explode("entrog"))), "nte");
  });

});
